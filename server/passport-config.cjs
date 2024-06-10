const LocalStrategy = require("passport-local").Strategy;
const argon2 = require("argon2");

function initialize(passport, getUser) {
  const authenticateUser = async (username, password, done) => {
    console.log("Authenticating user");
    try {
      const user = await getUser(username, password);
      if (user === null) {
        console.log("No user with that username");
        return done(null, false, { message: "No user with that username" });
      }
      if (await argon2.verify(user.password, password)) {
        console.log(user);
        return done(null, user);
      } else {
        console.log("Password incorrect");
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    try {
      user = getUser(id);
      if (user === null) throw new Error("User not found");
      return done(null, getUser(user));
    } catch (error) {
      return done(null, error);
    }
  });
}

module.exports = {
  initializePassport: (passport, getUser) => initialize(passport, getUser),
};
