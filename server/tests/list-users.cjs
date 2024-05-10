const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();
const content = "1";
const solution = "2";
const categories = { id: 1 };
const subcategories = { id: 1 };
const author = { id: 1 };

async function listUsers() {
  const users = await prisma.exercise.create({
    data: {
      content,
      solution,
      language: "Deutsch",
      difficulty: 1,
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
  console.log(users);
}

listUsers();
