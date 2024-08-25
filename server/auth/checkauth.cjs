const passport = require("passport");

function protectedRoute(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Hello: Unauthorized" });
}

const authenticateLocal = passport.authenticate("local", {
  failureMessage: true,
});

module.exports = { protectedRoute, authenticateLocal };
