const router = require("express").Router();

const { query, validationResult } = require("express-validator");
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

const searchValidation = [
    query("id", "id must be a number").notEmpty().isInt().optional(),
    query("search").isString().notEmpty().optional().escape(),
    query("cat").isString().notEmpty().optional().escape(),
    query("subcat").isString().notEmpty().optional().escape(),
];
  
router.get("/", searchValidation, async (req, res) => {
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

router.post("/", async (req, res) => {
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
  
  router.put("/", async (req, res) => {
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
  
  router.delete("/:id", async (req, res) => {
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

module.exports = router;