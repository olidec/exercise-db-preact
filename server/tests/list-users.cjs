const PrismaClient = require("@prisma/client")
const prisma = new PrismaClient.PrismaClient()

async function listUsers() {
    const users = await prisma.exercise.findMany({where: {categories: {some: {name: {equals: "Analysis"}}}}})
    console.log(users)
}

listUsers()