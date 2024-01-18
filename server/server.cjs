const express = require("express")
const cors = require("cors")
const PrismaClient = require("@prisma/client")
const prisma = new PrismaClient.PrismaClient()
const katex = require("katex")

const app = express()
const router = express.Router()

router.get("/", (req, res) => {
  res.json({ msg: "Hello World" })
})

router.get("/api/users", async (req,res) => {
  const users = await prisma.user.findMany()
  // console.log(users)
  res.json(users)

})

router.get("/api/katex", (req, res) => {
  const html = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}", {
    throwOnError: false
});
  res.json({msg: html})
  // res.setHeader("Content-Type", "text/html")
  // res.send(`<span>ojqnsd</span>`)
}
)

router.get("/api/test", (req, res) => {
  res.json({
    msg: "Hello",
    data: {
      name: "Some Name",
      email: "mail@nice.ch",
    },
  })
})

router.post("/api/user", async (req,res) => {
  const {email, name, password} = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })  
    console.log(newUser)
    res.json(newUser)
    
  } catch (error) {
      res.json({msg:"Error in DB request", err: error})
  }
})

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
  })
})

function checkLogin(req, res, next) {
  console.log(req.body)
  if (req.body.pw === "password") {
    return next()
  }

  res.json({
    msg: "Not allowed",
    err: "Wrong password",
  })
}

router.get("/api/ex", async (req,res) => {
  const exs = await prisma.exercise.findMany()
  exs.forEach(ex => {
    ex.content = katex.renderToString(ex.content, {
      throwOnError: false
    })
    ex.solution = katex.renderToString(ex.solution, {
      throwOnError: false
    })
  })
  // console.log(exs)
  res.json(exs)
})

// router.get("/api/ex/:id", async (req,res) => {
//   const {id} = req.params
//   const ex = await prisma.exercise.findUnique({where: {id: Number(id)}})
//   console.log(ex)
//   res.json(ex)
// })

router.get("/api/exercise-ids", async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany({
      select: {
        id: true, // Only select the id field
      },
    });
    res.json(exercises.map(exercise => exercise.id));
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving exercise IDs", err: error });
  }
});

router.post("/api/ex", async (req,res) => {
  const { summary, content, solution } = req.body;
  try {
    const newEx = await prisma.exercise.create({
      data: {
        summary,
        content,
        solution,
      },
    })  
    console.log(newEx)
    res.json(newEx)
    
  } catch (error) {
    if (error.code === 'P2002') {
      res.json({msg:"Exercise already exists", err: error})
    }
    else {
      res.json({msg:"Error in DB request", err: error})
    }
  }
})

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", router)

app.listen(3000, () => console.log("listening on port 3000"))
