const PrismaClient = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient.PrismaClient();
require("dotenv").config();

const subcategories = require("../data/subcategories.json");

async function setup() {
    const deleteSubcategories = await prisma.subcategory.deleteMany();
    const newSubcategories = await prisma.subcategory.createManyAndReturn({
        data: subcategories,
        // only for postgres
        // skipDuplicates: true,
    });
    console.log(newSubcategories);
}

setup();