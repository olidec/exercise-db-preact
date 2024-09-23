const { protectedRoute } = require("../auth/checkauth.cjs");

const { authenticateLocal } = require("../auth/checkauth.cjs");


const router = require("express").Router();

router.get("/", (req, res) => {
    return res.redirect("http://localhost:5173/login");
});
  
router.post("/", authenticateLocal, (req, res) => {
  console.log(`-------> User Logged in`);
  res.status(200).json({
    msg: "User logged in",
    data: {
      user: {
        username: req.user.username,
        id: req.user.id,
        // z.B. last login etc. muss im 'serialize' mitgeschickt werden.
      },
    },
  });
});

module.exports = router;