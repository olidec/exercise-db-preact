const PrismaClient = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient.PrismaClient();
require("dotenv").config();

const users = require("../data/users.json");

async function setup() {
    const newUsers = await prisma.user.createManyAndReturn({
        data: users,
        // only for postgres
        // skipDuplicates: true,
    });
    console.log(newUsers);
}

setup();