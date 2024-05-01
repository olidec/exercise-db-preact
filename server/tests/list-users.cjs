const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

async function listUsers() {
  const users = await prisma.exercise.findMany({
    where: { categories: { some: { name: { equals: "Analysis" } } } },
    include: { categories: true },
  });
  console.log(users[0].categories[0].name);
}

listUsers();
