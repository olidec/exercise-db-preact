const router = require("express").Router();
const { getSubcategories } = require("../controllers/categories.cjs");

router.get("/", async (req, res) => {
const subcat = await getSubcategories();

res.json(subcat);
});

module.exports = router;