const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const argon2 = require("argon2");

const { getUser } = require("../controllers/users.cjs");

const localStrategy = new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  verify
);
/**
 * Verify function for passport
 */
async function verify(username, password, callback) {
  try {
    const { user, success } = await getUser({ username: username });
    //check if user exists
    if (!success) {
      return callback(null, false);
    }

    //user exists check for valid pw
    if (await argon2.verify(user.password, password)) {
      return callback(null, user);
    }
    return callback(null, false);
  } catch (e) {
    return callback(e);
  }
}

function initialize(app) {
  // LocalStrategy ruft diese Funktion auf und liest username und password von req.body. callback wird ausgeführt entweder mit error oder ohne (kommt von passport selber)
  // TODO später: "incorrect username or password"

  passport.use(localStrategy);
  // "username" und "password" kommen von form body

  app.use(passport.initialize());
  app.use(passport.session());

  // schreibt user in session
  // möglichst wenig Daten sicher kein pw
  passport.serializeUser((user, done) => {
    done(null, { id: user.id, username: user.username });
  });

  // jedes Mal, wenn ein req kommt, wird user Objekt aufgebaut mit den gewählten Daten
  passport.deserializeUser(async (requestUser, done) => {
    try {
      const { user, success } = await getUser({
        username: requestUser.username,
      });
      if (!success) throw new Error("User not found");
      // hier können auch mehr Felder aus der db geladen werden
      // diese sind in req.user abrufbar
      return done(null, { id: user.id, username: user.username });
    } catch (error) {
      return done(error, null);
    }
  });
}

module.exports = {
  setupPassport: (app) => {
    initialize(app);
  },
};
