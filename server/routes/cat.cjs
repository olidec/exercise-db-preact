const router = require("express").Router();
const { getCategories } = require("../controllers/categories.cjs");

router.get("/", async (req, res) => {
  const cat = await getCategories();

  res.json(cat);
});

module.exports = router;
