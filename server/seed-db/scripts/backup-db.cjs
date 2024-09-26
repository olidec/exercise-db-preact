const PrismaClient = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient.PrismaClient();
require("dotenv").config();

async function allusers() {
  const users = await prisma.user.findMany();
  fs.writeFileSync("./seed-db/data/users.json", JSON.stringify(users, null, 2));
}

async function allcategories() {
  const topics = await prisma.category.findMany();
  fs.writeFileSync("./seed-db/data/categories.json", JSON.stringify(topics, null, 2));
}

async function allsubcategories() {
  const topics = await prisma.subcategory.findMany();
  fs.writeFileSync("./seed-db/data/subcategories.json", JSON.stringify(topics, null, 2));
}

async function allexercises() {
  const exercises = await prisma.exercise.findMany();
  fs.writeFileSync("./seed-db/data/exercises.json", JSON.stringify(exercises, null, 2));
}

allusers();
allcategories();
allsubcategories();
allexercises();
