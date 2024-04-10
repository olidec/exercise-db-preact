const express = require("express");
const cors = require("cors");
const { query, validationResult } = require("express-validator");
const PrismaClient = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient.PrismaClient();

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

router.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany();
  // console.log(users)
  res.json(users);
});

router.get("/api/test", (req, res) => {
  res.json({
    msg: "Hello",
    data: {
      name: "Some Name",
      email: "mail@nice.ch",
    },
  });
});

router.post("/api/user", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    console.log(newUser);
    res.json(newUser);
  } catch (error) {
    res.json({ msg: "Error in DB request", err: error });
  }
});

router.put("/api/user/", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        email,
        name,
        password,
      },
    });

    console.log(updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.json({ msg: "Error in DB request", err: error });
  }
});

router.post("/api/secret", checkLogin, (req, res) => {
  res.json({
    msg: "Very secure",
    data: {
      secret: "Top Secret",
    },
  });
});

function checkLogin(req, res, next) {
  console.log(req.body);
  if (req.body.pw === "password") {
    return next();
  }

  res.json({
    msg: "Not allowed",
    err: "Wrong password",
  });
}

const searchValidation = [
  query("id", "id must be a number").notEmpty().isInt().optional(),
  query("search").isString().notEmpty().optional().escape(),
  query("cat").isString().notEmpty().optional().escape(),
];

router.get("/api/ex", searchValidation, async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const { id, search, cat } = req.query;
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
    } else if (cat) {
      const exs = await prisma.exercise.findMany({
        where: { categories: { some: { name: { equals: cat } } } },
      });
      res.json(exs);
    } else {
      const exs = await prisma.exercise.findMany();
      res.json(exs);
    }
  } else {
    res.json({ errors: result.array() });
  }
});

router.get("/api/cat", async (req, res) => {
  const cat = await prisma.category.findMany({
    include: {
      subcategory: true,
    },
  });
  console.log(cat);

  res.json(cat);
});

router.post("/api/ex", async (req, res) => {
  const { content, solution, language, difficulty, categories } = req.body;
  try {
    const newEx = await prisma.exercise.create({
      data: {
        content,
        solution,
        language,
        difficulty,
        categories: { connect: categories },
      },
      include: {
        categories: true, // oder ein spezifischeres Select/Include
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
  const { id, content, solution, language, difficulty, categories } = req.body;
  try {
    const updatedEx = await prisma.exercise.update({
      where: { id },
      data: {
        content,
        solution,
        language,
        difficulty,
        categories: { connect: categories },
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
  try {
    const exercises = await prisma.exercise.findMany({
      where: {
        id: {
          in: exerciseIds,
        },
      },
    });
    const writeToFile = (exercises) => {
      const contentAndSolution = exercises.map((exercise) => ({
        content: exercise.content,
        solution: exercise.solution,
      }));

      fs.writeFile(
        "/path/to/output.txt",
        JSON.stringify(contentAndSolution),
        (err) => {
          if (err) {
            console.error("Error writing to file:", err);
          } else {
            console.log("Data written to file successfully");
            res.download("/path/to/output.txt", "output.txt");
          }
        }
      );
    };

    writeToFile(exercises);
    res.json(exercises);
  } catch (error) {
    res.json({ msg: "Error in DB request", err: error });
  }
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(3000, () => console.log("listening on port 3000"));
