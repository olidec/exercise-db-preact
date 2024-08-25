const { canEditEx } = require("../auth/checkuser.cjs")
const { protectedRoute } = require("../auth/checkauth.cjs");

const router = require("express").Router();

const { query, validationResult } = require("express-validator");

const { getRecentExercises, getSingleExercise, getExerciseBySearch, getExercisesBySubcategory, getExercisesByCategory } = require("../controllers/exercises.cjs");
const { createExercise, updateExercise, deleteExercise } = require("../controllers/writeExercises.cjs");

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
    const ex = await getSingleExercise(id);
    res.json(ex);
    } else if (search) {
    const exs = await getExerciseBySearch(search);
    res.json(exs);
    } else if (cat && subcat) {
    console.log(cat, subcat);
    const exs = await getExercisesBySubcategory(cat, subcat);
    res.json(exs);
    } else if (cat) {
    const exs = await getExercisesByCategory(cat);
    res.json(exs);
    } else {
    const exs = await getRecentExercises();
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
      authorId,
      categories,
      subcategories,
    } = req.body;
  
    try {
      const author = { id: authorId };
      const categories = { id: 1 };
      const subcategories = { id: 1 };
      const newEx = await createExercise(content, solution, language, difficulty, author, categories, subcategories)
      res.json(newEx);
    } catch (error) {
      if (error.code === "P2002") {
        res.json({ msg: "Exercise already exists", err: error });
      } else {
        res.json({ msg: "Error in DB request", err: error });
      }
    }
  });
  
  router.put("/",protectedRoute, canEditEx, async (req, res) => {
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
      const updatedEx = await updateExercise(id, content, solution, language, difficulty, author, categories, subcategories);
      res.json(updatedEx);
    } catch (error) {
      res.json({ msg: "Errorrrrr in DB request", err: error });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedEx = await deleteExercise(id);
      res.json(deletedEx);
    } catch (error) {
      res.json({ msg: "Error in DB request", err: error });
    }
  });

module.exports = router;