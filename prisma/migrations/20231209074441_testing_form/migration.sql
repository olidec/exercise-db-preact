/*
  Warnings:

  - You are about to drop the `_CategoryToExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `authorId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_CategoryToExercise_B_index";

-- DropIndex
DROP INDEX "_CategoryToExercise_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CategoryToExercise";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "solution" TEXT NOT NULL
);
INSERT INTO "new_Exercise" ("content", "createdAt", "id", "solution", "summary", "updatedAt") SELECT "content", "createdAt", "id", "solution", "summary", "updatedAt" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
CREATE UNIQUE INDEX "Exercise_content_key" ON "Exercise"("content");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
