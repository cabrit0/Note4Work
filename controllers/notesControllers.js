const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { restart } = require("nodemon");

// @desc   Get all notes
// @route  GET /notes
// @Access Private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();

  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }

  //Add username to each note before sending the response
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );
  res.json(notesWithUser);
});

// @desc   Create new note
// @route  POST /notes
// @Access Private
const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  //confirm data
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check duplicate
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(400).json({ message: "Duplicate note title" });
  }

  //creating new note
  const note = await Note.create({ user, title, text });

  if (note) {
    //note created
    return res.status(200).json({ message: "New note created successfully" });
  } else {
    return res.status(400).json({ message: "Invalid data received" });
  }
});

// @desc   Update note
// @route  PATCH /notes
// @Access Private
const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  //confirm data
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const note = await Note.findById(id).exec();

  //check if note already exists
  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  //check duplicates
  const duplicate = await Note.findOne({ title }).lean().exec();

  //allow renaming of original note
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(400).json({ message: "Duplicate note title" });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json(`${updatedNote.title} updated`);
});

// @desc   Delete note
// @route  DELETE /notes
// @Access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  //confirm data
  if (!id) {
    return res.status(400).json({ message: "Note ID required" });
  }

  const note = await Note.findById(id).exec();

  //check if exists
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  const result = await Note.deleteOne();
  const reply = `Note ${result.title} width ID ${result._id} deleted`;
  res.json(reply);
});

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote };
