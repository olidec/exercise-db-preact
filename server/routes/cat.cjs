const router = require('express').Router();

router.get("/", async (req, res) => {
    const cat = await prisma.category.findMany({
    include: {
        subcategories: true,
    },
    });
    console.log(cat);

    res.json(cat);
});

module.exports = router;