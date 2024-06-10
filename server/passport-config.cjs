const LocalStrategy = require("passport-local").Strategy;
const argon2 = require("argon2");
const { getUser } = require("./controllers/users.cjs");

function initialize(passport) {
  // LocalStrategy ruft diese Funktion auf und liest username und password von req.body. callback wird ausgeführt entweder mit error oder ohne (kommt von passport selber)
  // TODO später: "incorrect username or password"

  const authenticateUser = async (username, password, callback) => {
    console.log("PASSPORT:", "Authenticating user");
    try {
      const user = await getUser(username);
      console.log("PASSPORT:", "got user");
      //check if user exists
      if (!user) {
        console.log("PASSPORT:", "No user with that username");
        throw new Error("No user with that username");
      }

      //user exists check for valid pw
      if (await argon2.verify(user.password, password)) {
        console.log("PASSPORT:", user);
        return callback(null, user);
      }

      console.log("PASSPORT:", "Password incorrect");
      throw new Error("Password incorrect");
    } catch (e) {
      return callback(e);
    }
  };

  passport.use(
    // "username" und "password" kommen von form body
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      authenticateUser
    )
  );

  // schreibt user in session
  // möglichst wenig Daten sicher kein pw
  passport.serializeUser((user, done) => {
    console.log("PASSPORT:", "serializing");
    done(null, { id: user.id, username: user.username });
  });

  // jedes Mal, wenn ein req kommt, wird user Objekt aufgebaut mit den gewählten Daten
  passport.deserializeUser(async (user, done) => {
    console.log("PASSPORT:", "deserializing");
    try {
      userLookup = await getUser(user.username);
      if (!userLookup) throw new Error("User not found");
      // hier können auch mehr Felder aus der db geladen werden
      // diese sind in req.user abrufbar
      return done(null, { id: userLookup.id, username: userLookup.username });
    } catch (error) {
      return done(error, null);
    }
  });
}

module.exports = {
  initializePassport: (passport, getUser) => initialize(passport, getUser),
};
