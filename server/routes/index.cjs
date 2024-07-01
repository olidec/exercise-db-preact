// node libraries (system level)
const fs = require("fs");

// 'npm' libraries (3rd party)
// const { query, validationResult } = require("express-validator");
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

// local libraries
const { getUser, createUser } = require("../controllers/users.cjs");
const { authenticateLocal } = require("../auth/checkauth.cjs");

const router = require("express").Router();

router.use("/dashboard", require("./dashboard.cjs"));

router.use("/login", require("./login.cjs"));

router.use("/register", require("./register.cjs"));

router.use("/api/ex", require("./ex.cjs"));

router.use("/api/cat", require("./cat.cjs"));

router.get("/api/subcat", async (req, res) => {
  const subcat = await prisma.subcategory.findMany({
    include: {
      exercises: true,
    },
  });
  console.log(subcat);

  res.json(subcat);
});


router.get("/api/download", async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    const contentAndSolution = exercises.map((exercise) => ({
      content: exercise.content,
      solution: exercise.solution,
    }));
    console.log(contentAndSolution);
    fs.writeFile(
      "server/output/output.txt",
      JSON.stringify(contentAndSolution),
      (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          res.json({ msg: "Error writing to file", err: err });
        } else {
          console.log("Data written to file successfully");
          res.download("server/output/output.txt", "output.txt");
        }
      }
    );
  } catch (error) {
    res.json({ msg: "Error in DB request", err: error });
  }
});

router.post("/api/download", async (req, res) => {
  const { exerciseIds } = req.body;
  console.log(exerciseIds);
  try {
    const exercises = await prisma.exercise.findMany({
      where: {
        id: {
          in: exerciseIds,
        },
      },
    });
    const sortedExercises = exerciseIds.map((id) => {
      const exercise = exercises.find((ex) => ex.id === id);
      return exercise;
    });

    console.log(sortedExercises);
    return res.json(sortedExercises);
    // const writeToFile = (exercises) => {
    //   const contentAndSolution = exercises.map((exercise) => ({
    //     content: exercise.content,
    //     solution: exercise.solution,
    //   }));

    //   fs.writeFile(
    //     "/path/to/output.txt",
    //     JSON.stringify(contentAndSolution),
    //     (err) => {
    //       if (err) {
    //         console.error("Error writing to file:", err);
    //       } else {
    //         console.log("Data written to file successfully");
    //         res.download("/path/to/output.txt", "output.txt");
    //       }
    //     }
    //   );
    // };

    // writeToFile(exercises);
    // res.json(exercises);
  } catch (error) {
    console.error("Error in DB request", error);
    res.status(500).json({ msg: "Error in DB request", err: error });
  }
});

module.exports = {
  setupRoutes: (app) => {
    app.use("/", router);
  },
};
