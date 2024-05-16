const LocalStrategy = require("passport-local").Strategy;
const argon2 = require("argon2");

function initialize(passport, getUser) {
  // const authUser = async (user, password, done) => {
  //     console.log("Authenticating user");
  //     try {
  //         const userFromDb = await prisma.user.findUnique({
  //             where: { username: user },
  //             select: {
  //                 id: true,
  //                 email: true,
  //                 username: true,
  //                 password: true,
  //                 retry: true,
  //                 retryExp: true,
  //             },
  //         });
  //         if (!userFromDb) {
  //             res.json({ msg: "User or password does not match" });
  //             return;
  //         }
  //         console.log(userFromDb);
  //         const pass = await argon2.verify(userFromDb.password, password);
  //         if (!pass) {
  //             if (userFromDb.retry >= 3) {
  //                 if (userFromDb.retryExp > new Date()) {
  //                     res.json({ msg: "User is locked out" });
  //                     return;
  //                 }
  //             }
  //             await prisma.user.update({
  //                 where: {
  //                     username: user,
  //                 },
  //                 data: {
  //                     retry: userFromDb.retry + 1,
  //                     retryExp: new Date(Date.now() + 1000 * 60 * 60),
  //                 },
  //             });
  //             res.json({ msg: "User or password does not match" });
  //             return;
  //         }

  //         await prisma.user.update({
  //             where: {
  //                 username: user,
  //             },
  //             data: {
  //                 retry: 0,
  //                 retryExp: null,
  //             },
  //         });
  //         console.log("User retries updated successfully");
  //         //Let's assume that a search within your DB returned the username and password match for "Kyle".
  //         let authenticated_user = { id: userFromDb.id, name: userFromDb.username };
  //         console.log("User authenticated successfully", authenticated_user);
  //         return authenticated_user;
  //     } catch (error) {
  //         // res.json({ msg: "Error in DB request", err: error });
  //         console.log("Error in DB request");
  //     }
  // };

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
  passport.serializeUser((user, done) => done(null, { ...user }));
  passport.deserializeUser((user, done) => done(null, { ...user }));
}

module.exports = {
  initializePassport: (passport, getUser) => initialize(passport, getUser),
};
