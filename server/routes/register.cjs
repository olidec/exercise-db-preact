const router = require("express").Router();

const { getUser, createUser } = require("../controllers/users.cjs");


router.post("/", async (req, res) => {
    // TODO input validation
    const { email, username, password } = req.body;
  
    try {
      // ACHTUNG nur ein Feld wird überprüft
      // schaue getUser an für Reihenfolge
      // TODO write checkUser function
      const { success } = await getUser({
        email: email,
        username: username,
      });
  
      if (success) {
        res.json({ msg: "User already exists", err: "User already exists" });
      } else {
        const newUser = await createUser(username, email, password);
        res.json({
          msg: "User created successfully",
          data: {
            name: newUser.username,
          },
        });
      }
    } catch (error) {
      res.json({ msg: "Error in DB request", err: error });
    }
  });

  module.exports = router;