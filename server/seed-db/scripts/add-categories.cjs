const PrismaClient = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient.PrismaClient();
require("dotenv").config();

const categories = require("../data/categories.json");

async function setup() {
  const newCategories = await prisma.category.createMany({
    data: categories,
    // only for postgres
    skipDuplicates: true,
  });
}

module.exports = { setupCategories: setup };
