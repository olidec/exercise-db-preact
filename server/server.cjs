const express = require("express")
const cors = require("cors")
const { query, validationResult } = require("express-validator")
const PrismaClient = require("@prisma/client")
const prisma = new PrismaClient.PrismaClient()

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
  const { email, name, password } = req.body;
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

const searchValidation = [
  query("id", "id must be a number").notEmpty().isInt().optional(),
  query("search").isString().notEmpty().optional().escape(),
  query("cat").isString().notEmpty().optional().escape(),
]

router.get("/api/ex", searchValidation, async (req,res) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    const { id , search , cat } = req.query
    if (id) {
      const ex = await prisma.exercise.findUnique({where: {id: Number(id)}})
      res.json(ex)
    }
    else if (search) {
      const exs = await prisma.exercise.findMany({where: {content: {contains: search}}})
      res.json(exs)
    }
    else if (cat) {
      const exs = await prisma.exercise.findMany({where: {categories: {some: {name: {equals: cat}}}}})
      res.json(exs)
    }
    else {
      const exs = await prisma.exercise.findMany()
      res.json(exs)
    }
  }
else {
  res.json({ errors: result.array() });
}
})



router.get("/api/cat", async (req,res) => {
  const cat = await prisma.category.findMany()
  // console.log(cat)
  res.json(cat)
})



router.post("/api/ex", async (req,res) => {
  const { content, solution, categories } = req.body;
  const catlist = categories.map((c) => {return {id: Number(c)}})
  try {
    const newEx = await prisma.exercise.create({
      data: {
        content,
        solution,
        categories: {
          connect: catlist
      }
    }
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
