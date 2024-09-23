const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

async function deleteAll() {
  const deleteSubcategories = await prisma.subcategory.deleteMany({});
  const deleteCategories = await prisma.category.deleteMany({});
  const deleteUsers = await prisma.user.deleteMany({});
  const deleteExercises = await prisma.exercise.deleteMany({});
}
deleteAll();
