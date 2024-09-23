const { protectedRoute } = require("../auth/checkauth.cjs");

const { authenticateLocal } = require("../auth/checkauth.cjs");


const router = require("express").Router();

router.delete("/", (req, res) => {
    if (req.session?.passport) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({
            msg: "Error logging out",
          });
        } else {
          res.status(200).json({
            msg: "User logged out",
          }
        )
      }
    })

      }else {
          res.status(401).json({
            msg: "No user logged in",
            err: "No session found",
          });
        }});

module.exports = router;