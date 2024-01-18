/*
  Warnings:

  - You are about to drop the column `title` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Exercise_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Exercise" ("authorId", "content", "createdAt", "id", "solution", "updatedAt") SELECT "authorId", "content", "createdAt", "id", "solution", "updatedAt" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
CREATE UNIQUE INDEX "Exercise_content_key" ON "Exercise"("content");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
