if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const { query, validationResult } = require("express-validator");
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();
const fs = require("fs");
const flash = require("express-flash");
const methodOverride = require("method-override");

const app = express();
const router = express.Router();
const argon2 = require("argon2");
// const jwt = require("jsonwebtoken");

const { initializePassport } = require("./passport-config.cjs");
initializePassport(passport, (username) => {
  return prisma.user.findUnique({
    where: { username },
  });
});

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

// This is the basic express session({..}) initialization.

// const verify = async (req, res, next) => {
//   try {
//     if (!(await jwt.verify(req.cookies.accessToken, "process.env.jwtSecret")))
//       res.redirect("403");
//     next();
//   } catch (err) {
//     res.redirect(403, "/login");
//   }
// };

// const authUser = async (user, password, done) => {
//   console.log("Authenticating user");
//   try {
//     const userFromDb = await prisma.user.findUnique({
//       where: { username: user },
//       select: {
//         id: true,
//         email: true,
//         username: true,
//         password: true,
//         retry: true,
//         retryExp: true,
//       },
//     });
//     if (!userFromDb) {
//       res.json({ msg: "User or password does not match" });
//       return;
//     }
//     console.log(userFromDb);
//     const pass = await argon2.verify(userFromDb.password, password);
//     if (!pass) {
//       if (userFromDb.retry >= 3) {
//         if (userFromDb.retryExp > new Date()) {
//           res.json({ msg: "User is locked out" });
//           return;
//         }
//       }
//       await prisma.user.update({
//         where: {
//           username: user,
//         },
//         data: {
//           retry: userFromDb.retry + 1,
//           retryExp: new Date(Date.now() + 1000 * 60 * 60),
//         },
//       });
//       res.json({ msg: "User or password does not match" });
//       return;
//     }

//     await prisma.user.update({
//       where: {
//         username: user,
//       },
//       data: {
//         retry: 0,
//         retryExp: null,
//       },
//     });
//     console.log("User retries updated successfully");
//     //Let's assume that a search within your DB returned the username and password match for "Kyle".
//     let authenticated_user = { id: userFromDb.id, name: userFromDb.username };
//     console.log("User authenticated successfully", authenticated_user);
//     return done(null, authenticated_user);
//   } catch (error) {
//     // res.json({ msg: "Error in DB request", err: error });
//     console.log("Error in DB request");
//   }
// };

// passport.use(new LocalStrategy(authUser));

// passport.serializeUser((userObj, done) => {
//   done(null, userObj);
// });

// passport.deserializeUser((userObj, done) => {
//   done(null, userObj);
// });

// checkAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// };

// checkLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return res.redirect("/dashboard");
//   }
//   next();
// };

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
  // (req, res) => {
  //   console.log(req.isAuthenticated());
  //   res.json({
  //     title: "Dashboard",
  //     page: "user-dashboard",
  //   });
  // }
);

// app.post("/login", (req, res) => {
//   console.log(req.body);
//   res.json({
//     msg: "User logged in successfully",
//   });
// });

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

// app.use(express.json());
// router.get("/", cors(), (req, res) => {});

// const sign = async () => {
//   const signed = await jwt.sign(
//     {
//       role: "USER",
//     },
//     "process.env.jwtSecret",
//     {
//       expiresIn: "30s",
//     }
//   );
//   return signed;
// };

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

// try {
//   const user = await prisma.user.findUnique({
//     where: { email },
//     select: {
//       id: true,
//       email: true,
//       password: true,
//       retry: true,
//       retryExp: true,
//     },
//   });
//   if (!user) {
//     res.json({ msg: "User or password does not match" });
//     return;
//   }
//   const pass = await argon2.verify(user.password, password);
//   if (!pass) {
//     if (user.retry >= 3) {
//       if (user.retryExp > new Date()) {
//         res.json({ msg: "User is locked out" });
//         return;
//       }
//     }
//     await prisma.user.update({
//       where: {
//         email,
//       },
//       data: {
//         retry: user.retry + 1,
//         retryExp: new Date(Date.now() + 1000 * 60 * 60),
//       },
//     });
//     res.json({ msg: "User or password does not match" });
//     return;
//   }

//   console.log(pass);
//   console.log(user.retry);

//   // if (!pass) {
//   //   await prisma.user.update({
//   //     where: {
//   //       email,
//   //     },
//   //     data: {
//   //       retry: user.retry + 1,
//   //     },
//   //   });
//   //   console.log("User retries updated successfully");
//   // } else {
//   // const signedToken = await sign();
//   // console.log(signedToken);

//   await prisma.user.update({
//     where: {
//       email,
//     },
//     data: {
//       retry: 0,
//       retryExp: null,
//     },
//   });
//   console.log("User retries updated successfully");

//   const token = jwt.sign({ id: user.id }, "process.env.JWT_SECRET", {
//     expiresIn: "30s",
//   });
//   res.json({
//     msg: "User logged in successfully",
//     id: user.id,
//     email: user.email,
//     token,
//   });

//   // res.cookie("accessToken", signedToken, {
//   //   httpOnly: true,
//   //   expires: new Date(Date.now() + 8 * 3600000),
//   //   path: "/dashboard",
//   // });
//   // return res.json({
//   //   msg: pass,
//   // });
//   // }

//   // if (pass && user.retry <= 3) {
//   //   const signedToken = await sign();

//   //   await prisma.user.update({
//   //     where: { email },
//   //     data: {
//   //       retry: 0,
//   //       retryExp: null,
//   //     },
//   //   });
//   //   await res.cookie("token", signedToken, {
//   //     httpOnly: true,
//   //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
//   //     path: "/find",
//   //   });
//   //   // res.redirect("/find");
//   //   // next;
//   // }

//   //   console.log(user);
//   //   if (await argon2.verify(user.password, password)) {
//   //     res.json(user);
//   //     console.log("user logged in successfully");
//   //   } else {
//   //     res.json({ msg: "Wrong password" });
//   //     console.log("Wrong password");
//   //   }
//   // } catch (error) {
//   //   // if (user) {
//   //   //   if (user && (await argon2.verify(user.password, password))) {
//   //   //     const accessToken = jwt.sign({
//   //   //       user: {
//   //   //         email: user.email,
//   //   //         name: user.name,
//   //   //       },
//   //   //     });
//   //   // console.log(accessToken);
//   //   //     res.send("user logged in successfully");
//   //   //     res.json(user);
//   //   //   } else {
//   //   //     res.json({ msg: "Wrong password" });
//   //   //   }
//   //   // } else {
//   //   //   res.json({ msg: "User not found" });
//   //   // }
//   //   res.json({ msg: "Error in DB request", err: error });
//   // }
// } catch (error) {
//   // res.status(301).redirect("http://localhost:5173/exercise-db-preact/login");
//   // next;
//   res.json({ msg: "Error in DB request", err: error });
// }
// });

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

// router.get("/api/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   // console.log(users)
//   res.json(users);
// });

// router.get("/api/test", (req, res) => {
//   res.json({
//     msg: "Hello",
//     data: {
//       name: "Some Name",
//       email: "mail@nice.ch",
//     },
//   });
// });

// router.post("/api/user", async (req, res) => {
//   const { email, name, password } = req.body;
//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         name,
//         password,
//       },
//     });
//     // console.log(newUser);
//     res.json(newUser);
//   } catch (error) {
//     res.json({ msg: "Error in DB request", err: error });
//   }
// });

// router.put("/api/user/", async (req, res) => {
//   const { email, name, password } = req.body;

//   try {
//     const updatedUser = await prisma.user.update({
//       where: { email },
//       data: {
//         email,
//         name,
//         password,
//       },
//     });

//     console.log(updatedUser);
//     res.json(updatedUser);
//   } catch (error) {
//     res.json({ msg: "Error in DB request", err: error });
//   }
// });

// router.post("/api/secret", checkLogin, (req, res) => {
//   res.json({
//     msg: "Very secure",
//     data: {
//       secret: "Top Secret",
//     },
//   });
// });

// function checkLogin(req, res, next) {
//   console.log(req.body);
//   if (req.body.pw === "password") {
//     return next();
//   }

//   res.json({
//     msg: "Not allowed",
//     err: "Wrong password",
//   });
// }

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
