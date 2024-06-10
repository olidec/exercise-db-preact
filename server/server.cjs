if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const { query, validationResult } = require("express-validator");
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();
const fs = require("fs");
const flash = require("express-flash");
const methodOverride = require("method-override");

const app = express();
const router = express.Router();
const argon2 = require("argon2");

const { initializePassport } = require("./passport-config.cjs");
initializePassport(passport);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Source: https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
// // init passport on every route call.

app.use(passport.session());
// allow passport to use "express-session".

app.use(methodOverride("_method"));

router.get("/dashboard", (req, res) => {
  console.log(req.isAuthenticated());
  return res.json({
    title: "Dashboard",
    page: "user-dashboard",
  });
});

router.get("/login", (req, res) => {
  return res.redirect("http://localhost:5173/exercise-db-preact/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

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
  console.log(req.body);
  const { email, username, password } = req.body;
  const hashedPassword = await argon2.hash(password);
  try {
    const check =
      (await prisma.user.findUnique({
        where: { email },
      })) ||
      (await prisma.user.findUnique({
        where: { username },
      }));
    if (check) {
      res.json({ msg: "User already exists", err: "User already exists" });
      return;
    } else {
      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });
      console.log(newUser);
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

router.post("/api/ex", async (req, res) => {
  const { summary, content, solution } = req.body;
  try {
    const newEx = await prisma.exercise.create({
      data: {
        summary,
        content,
        solution,
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

router.get("/api/cat", async (req, res) => {
  const cat = await prisma.category.findMany({
    include: {
      subcategory: true,
    },
  });
  console.log(cat);
  res.json(cat);
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

    const writeToFile = (exercises) => {
      const contentAndSolution = exercises.map((exercise) => ({
        content: exercise.content,
        solution: exercise.solution,
      }));
      console.log(contentAndSolution);
      fs.writeFile(
        "server/output/output.txt",
        JSON.stringify(contentAndSolution, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing to file:", err);
            res.status(500).send("Error writing to file");
          } else {
            console.log("Data written to file successfully");
            res.download("server/output/output.txt", "output.txt");
            console.log(exercises);
          }
        }
      );
    };

    //res.json(exercises);
    writeToFile(exercises);
  } catch (error) {
    console.error("Error in DB request", error);
    res.status(500).json({ msg: "Error in DB request", err: error });
  }
});

app.use(
  cors({
    origin: true,
    // origin: ["http://localhost:5173/", "http://localhost:3000/"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(3000, () => console.log("listening on port 3000"));
