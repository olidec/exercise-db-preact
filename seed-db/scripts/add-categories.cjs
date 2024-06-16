const PrismaClient = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient.PrismaClient();
require("dotenv").config();

const categories = require("../data/categories.json");

async function setup() {
    const deleteCategories = await prisma.category.deleteMany();
    const newCategories = await prisma.category.createManyAndReturn({
        data: categories,
        // only for postgres
        // skipDuplicates: true,
    });
    console.log(newCategories);
}

setup();