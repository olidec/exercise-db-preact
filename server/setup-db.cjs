const PrismaClient = require("@prisma/client")
const prisma = new PrismaClient.PrismaClient()

async function setup() {
    await prisma.user.create({
        data: {
            name: "Oli",
            password: "123456",
            email: "oli@dec.ch"

        }
    })
    console.log("done")
}

setup()