const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

// npx prisma generate
// npx prisma migrate dev --name init
// node server/tests/setup-db.cjs

// resp. durch
// npm run db-setup
// ersetzen

// backup db:
// sqlite ./dev.db .output ./backup.sql .dump .exit

async function setup() {
  await prisma.subcategory.update({
    where: { id: 20 },
    data: {
      subsubcategory: {
        create: [
          { name: "Bedingte Wahrscheinlichkeit" },
          { name: "Verteilungen" },
          { name: "Erwartungswert" },
        ],
      },
    },
    include: { subsubcategory: true },
  });
  console.log("done");
}

setup();
