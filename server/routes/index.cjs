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


router.get("/api/cat", async (req, res) => {
  const cat = await prisma.category.findMany({
    include: {
      subcategories: true,
    },
  });
  console.log(cat);

  res.json(cat);
});

router.get("/api/subcat", async (req, res) => {
  const subcat = await prisma.subcategory.findMany({
    include: {
      exercises: true,
    },
  });
  console.log(subcat);

  res.json(subcat);
});

// router.post("/api/ex", async (req, res) => {
//   console.log(req.body);
//   const {
//     content,
//     solution,
//     language,
//     difficulty,
//     author,
//     categories,
//     subcategories,
//   } = req.body;

//   try {
//     const author = { id: 1 };
//     const newEx = await prisma.exercise.create({
//       data: {
//         content,
//         solution,
//         language,
//         difficulty,
//         author: {
//           connect: author,
//         },
//         categories: {
//           connect: categories,
//         },
//         subcategories: {
//           connect: subcategories,
//         },
//       },
//       include: {
//         author: true,
//         categories: true,
//         subcategories: true,

//         // oder ein spezifischeres Select/Include
//       },
//     });
//     console.log(newEx);
//     res.json(newEx);
//   } catch (error) {
//     if (error.code === "P2002") {
//       res.json({ msg: "Exercise already exists", err: error });
//     } else {
//       res.json({ msg: "Error in DB request", err: error });
//     }
//   }
// });

// router.put("/api/ex", async (req, res) => {
//   const {
//     id,
//     content,
//     solution,
//     language,
//     difficulty,
//     author,
//     categories,
//     subcategories,
//   } = req.body;
//   try {
//     const updatedEx = await prisma.exercise.update({
//       where: { id },
//       data: {
//         content,
//         solution,
//         language,
//         difficulty,
//         author: { connect: author },
//         categories: { connect: categories },
//         subcategories: { connect: subcategories },
//       },
//       include: {
//         author: true,
//         categories: true,
//         subcategories: true, // oder ein spezifischeres Select/Include
//       },
//     });
//     console.log(updatedEx);
//     res.json(updatedEx);
//   } catch (error) {
//     res.json({ msg: "Errorrrrr in DB request", err: error });
//   }
// });

// router.delete("/api/ex/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedEx = await prisma.exercise.delete({
//       where: { id: Number(id) },
//     });
//     console.log(deletedEx);
//     res.json(deletedEx);
//   } catch (error) {
//     res.json({ msg: "Error in DB request", err: error });
//   }
// });

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
