const router = require("express").Router();

router.get("/", async (req, res) => {
const subcat = await prisma.subcategory.findMany({
    include: {
    exercises: true,
    },
});
console.log(subcat);

res.json(subcat);
});

module.exports = router;