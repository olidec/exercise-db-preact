const { protectedRoute } = require("../auth/checkauth.cjs");

const router = require("express").Router();

// does not need "dashboard" in route url already comes from routes/index.cjs
router.get("/", protectedRoute, (req, res) => {
  return res.json({
    title: "Dashboard",
    page: "user-dashboard",
  });
});

module.exports = router;
