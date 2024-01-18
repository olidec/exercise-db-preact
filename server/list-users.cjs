const PrismaClient = require("@prisma/client")
const prisma = new PrismaClient.PrismaClient()

async function listUsers() {
    const users = await prisma.user.findMany()
    console.log(users)
}

listUsers()