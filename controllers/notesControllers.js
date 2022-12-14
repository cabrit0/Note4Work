const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { restart } = require("nodemon");

// @desc   Get all notes
// @route  GET /notes
// @Access Private
const getAllNotes = asyncHandler(async (req, res) => {});

// @desc   Create new note
// @route  POST /note
// @Access Private
const createNewNote = asyncHandler(async (req, res) => {});

// @desc   Update note
// @route  PATCH /note
// @Access Private
const updateNote = asyncHandler(async (req, res) => {});

// @desc   Delete note
// @route  DELETE /users
// @Access Private
const deleteNote = asyncHandler(async (req, res) => {});

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote };
