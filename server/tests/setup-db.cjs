const PrismaClient = require("@prisma/client")
const prisma = new PrismaClient.PrismaClient()

async function setup() {
    await prisma.subcategory.update({
        where: { id: 20 },
        data: { 
            subsubcategory: {
                create: [
                        { name: "Bedingte Wahrscheinlichkeit" },
                        { name: "Verteilungen" },
                        { name: "Erwartungswert" },
                    ]
            }
        },
        include: { subsubcategory: true }
    })
    console.log("done")
}

setup()