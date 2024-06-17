const router = require("express").Router();

// does not "dashboard" in route url already comes from routes/index.cjs
router.get("/", (req, res) => {
  console.log(req.isAuthenticated());
  return res.json({
    title: "Dashboard",
    page: "user-dashboard",
  });
});

module.exports = router;
