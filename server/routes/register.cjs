const router = require("express").Router();

const { findOrCreateUser, createUser } = require("../controllers/users.cjs");


router.post("/", async (req, res) => {
    // TODO input validation
    console.log("Registering user");
    console.log(req.body);
    const { email, username, password } = req.body;
  
    try {
      // ACHTUNG nur ein Feld wird überprüft
      // schaue getUser an für Reihenfolge
      // TODO write checkUser function
      const newUser = await createUser(username, email, password);
      console.log(newUser);
        res.json({
          msg: "User created successfully",
          data: {
            name: newUser.username,
          },
        });
    } catch (error) {
      res.json({ msg: "ROUTE: Error in DB request", err: error });
    }
  });

  module.exports = router;