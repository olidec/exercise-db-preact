const { setupCategories } = require("./add-categories.cjs");
const { setupSubcategories } = require("./add-subcategories.cjs");
const { setupExercises } = require("./add-exercises.cjs");
const { setupUsers } = require("./add-users.cjs");

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

async function setup() {
  await setupCategories();
  await setupSubcategories();
  await setupUsers();
  await setupExercises();
}

setup();
