import { Link } from "react-router-dom";

import React from "react";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Note4Work</span> wepApplication!
        </h1>
      </header>
      <main className="public__main">
        <p>
          App developed for register notes and help progress some tasks, it can
          be use professionally to organize the daily tasks with ease and no
          problems. Made to help :D
        </p>
        <address className="public__addr">
          Cabrit0's Note4Work WebApp
          <br />
          <a
            href="https://www.linkedin.com/in/cabrit0/"
            target="_blank"
            rel="noreferrer"
          >
            Go to my LinkedIn page
          </a>
          <br />
          <a href="https://github.com/cabrit0" target="_blank" rel="noreferrer">
            Check my GitHub
          </a>
          <br />
          <a
            href="https://cabrit0.github.io/portfolio/"
            target="_blank"
            rel="noreferrer"
          >
            Visit my WebPortfolio
          </a>
          <br />
        </address>
        <br />
        <p>made with love by Cabrit0</p>
      </main>
      <footer>
        <Link to="/login">Employee LogIn</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
