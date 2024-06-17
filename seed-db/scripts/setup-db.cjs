const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

// npx prisma generate
// npx prisma migrate dev --name init
// node seed-db/scripts/setup-db.cjs

// resp. durch
// npm run db-setup
// ersetzen

// backup db:
// sqlite3 ./dev.db .output ./backup.sql .dump .exit

// restore db:
// sqlite3 ./dev.db .read ./backup.sql .exit

async function setup() {}

setup();
