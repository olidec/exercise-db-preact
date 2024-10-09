if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const flash = require("express-flash");
// const cookieParser = require("cookie-parser");

module.exports = {
  setupMiddleware: (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(flash());

    app.use(
      cors({
        origin: "https://letstalkaboutx.ch",
        credentials: true,
      })
    );

    // Source: https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );
  },
};
