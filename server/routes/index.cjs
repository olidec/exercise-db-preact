// node libraries (system level)
const fs = require("fs");

// 'npm' libraries (3rd party)
const { query, validationResult } = require("express-validator");
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

// local libraries
const { getUser, createUser } = require("../controllers/users.cjs");
const { authenticateLocal } = require("../auth/checkauth.cjs");

const router = require("express").Router();

router.use("/dashboard", require("./dashboard.cjs"));

router.get("/login", (req, res) => {
  return res.redirect("http://localhost:5173/exercise-db-preact/login");
});

router.post("/login", authenticateLocal, (req, res) => {
  console.log(`-------> User Logged in`);
  res.status(200).json({
    msg: "User logged in",
    data: {
      user: {
        username: req.user.username,
        // z.B. last login etc. muss im 'serialize' mitgeschickt werden.
      },
    },
  });
});

router.delete("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173/exercise-db-preact/login");
  });
  // res.redirect("/login");
  console.log(`-------> User Logged out`);
});

router.post("/register", async (req, res) => {
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

const searchValidation = [
  query("id", "id must be a number").notEmpty().isInt().optional(),
  query("search").isString().notEmpty().optional().escape(),
  query("cat").isString().notEmpty().optional().escape(),
  query("subcat").isString().notEmpty().optional().escape(),
];

router.get("/api/ex", searchValidation, async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const { id, search, cat, subcat } = req.query;

    if (id) {
      const ex = await prisma.exercise.findUnique({
        where: { id: Number(id) },
      });
      res.json(ex);
    } else if (search) {
      const exs = await prisma.exercise.findMany({
        where: { content: { contains: search } },
      });
      res.json(exs);
    } else if (cat && subcat) {
      console.log(cat, subcat);
      const exs = await prisma.exercise.findMany({
        where: {
          categories: { name: cat },
          subcategories: { name: subcat },
        },
        include: {
          categories: true,
          subcategories: true,
        },
      });
      res.json(exs);
    } else if (cat) {
      const exs = await prisma.exercise.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        where: { categories: { name: cat } },
        include: {
          categories: true,
          subcategories: true,
        },
      });
      res.json(exs);
    } else {
      const exs = await prisma.exercise.findMany({
        include: {
          categories: true,
          subcategories: true,
        },
      });
      res.json(exs);
    }
  } else {
    res.json({ errors: result.array() });
  }
});

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

router.post("/api/ex", async (req, res) => {
  console.log(req.body);
  const {
    content,
    solution,
    language,
    difficulty,
    author,
    categories,
    subcategories,
  } = req.body;

  try {
    const author = { id: 1 };
    const newEx = await prisma.exercise.create({
      data: {
        content,
        solution,
        language,
        difficulty,
        author: {
          connect: author,
        },
        categories: {
          connect: categories,
        },
        subcategories: {
          connect: subcategories,
        },
      },
      include: {
        author: true,
        categories: true,
        subcategories: true,

        // oder ein spezifischeres Select/Include
      },
    });
    console.log(newEx);
    res.json(newEx);
  } catch (error) {
    if (error.code === "P2002") {
      res.json({ msg: "Exercise already exists", err: error });
    } else {
      res.json({ msg: "Error in DB request", err: error });
    }
  }
});

router.put("/api/ex", async (req, res) => {
  const {
    id,
    content,
    solution,
    language,
    difficulty,
    author,
    categories,
    subcategories,
  } = req.body;
  try {
    const updatedEx = await prisma.exercise.update({
      where: { id },
      data: {
        content,
        solution,
        language,
        difficulty,
        author: { connect: author },
        categories: { connect: categories },
        subcategories: { connect: subcategories },
      },
      include: {
        author: true,
        categories: true,
        subcategories: true, // oder ein spezifischeres Select/Include
      },
    });
    console.log(updatedEx);
    res.json(updatedEx);
  } catch (error) {
    res.json({ msg: "Errorrrrr in DB request", err: error });
  }
});

router.delete("/api/ex/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEx = await prisma.exercise.delete({
      where: { id: Number(id) },
    });
    console.log(deletedEx);
    res.json(deletedEx);
  } catch (error) {
    res.json({ msg: "Error in DB request", err: error });
  }
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
