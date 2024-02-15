const PrismaClient = require("@prisma/client")
const prisma = new PrismaClient.PrismaClient()

async function setup() {
    await prisma.exercise.create({
        data: { 
            content: "Some content",
            solution: "Some Solution",
            categories: {
                connect: { id: 1 }
            }
        },
        include: { categories: true }
    })
    console.log("done")
}

setup()