const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
