PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('cccf71d1-22f5-4b2a-a14d-ee04b69a4198','97166baa7d8feb2812fa7c6560c56a48935c7999188712b3fc4e5f41380ae5be',1715343759047,'20231120143133_init',NULL,NULL,1715343759044,1);
INSERT INTO _prisma_migrations VALUES('4b191a31-4053-4d68-8f04-29adada98801','831fcdb71e2b8eee461e6647bebe892925b9a36d97f6e3bcff51ffea70721415',1715343759050,'20231207091546_added_new_model',NULL,NULL,1715343759047,1);
INSERT INTO _prisma_migrations VALUES('cdbaf472-c50b-424c-8f39-61e3a9ea4f9a','4ed300e57bfc4cf81d6783263f4564bc55f2d2b726bf0dfd016aa84582327aec',1715343759054,'20231209072303_added_summary',NULL,NULL,1715343759051,1);
INSERT INTO _prisma_migrations VALUES('360664d6-4293-48b3-b3c4-9d23012d3c47','2f04ea9951b41f77d07286c29a61084c58d00ce632f6181034884e277436a07d',1715343759057,'20231209074441_testing_form',NULL,NULL,1715343759054,1);
INSERT INTO _prisma_migrations VALUES('50e27e97-1e46-4ecc-95e2-0b21327b3c26','20914d8b679a2ee70be489cfa33de212289031365a57ac77b72a813db76ce5c2',1715343759069,'20240510122239_added_username',NULL,NULL,1715343759065,1);
INSERT INTO _prisma_migrations VALUES('10c0ce43-084d-474b-9415-b1d26758540f','9d2c7b5fc11ebe4cf24e6d090dfb00101b57e8034698c18854e05e793a344918',1715345190066,'20240510124630_added_retry',NULL,NULL,1715345190064,1);
CREATE TABLE IF NOT EXISTS "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "Subcategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Subsubcategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "subcategoryId" INTEGER NOT NULL,
    CONSTRAINT "Subsubcategory_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "_CategoryToExercise" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "summary" TEXT,
    "content" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'Deutsch',
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "authorId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Exercise_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "retry" INTEGER NOT NULL DEFAULT 0,
    "retryExp" DATETIME
);
INSERT INTO User VALUES(1,'a@a','W','w','USER',0,NULL);
INSERT INTO User VALUES(2,'w@w','w','$argon2id$v=19$m=65536,t=3,p=4$xi3p8i8IbrF9tc1gJbtsEQ$KDFMdL++nhPkT35J2JhIJ4qADQxMnHQCAdDK9/k9P6A','USER',0,1715456367547);
INSERT INTO User VALUES(3,'b@b','b','$argon2id$v=19$m=65536,t=3,p=4$n8/862CQHv0+pKxtazrjdg$Y4aVXAdpnU1oU1dEdPAkwGuaBfNOoc1zFLpHMa77Vqw','USER',0,NULL);
INSERT INTO User VALUES(4,'c@c','c','$argon2id$v=19$m=65536,t=3,p=4$tOPpYxMKE1U/mjhHVoDFSw$QJT1c8kdJrgj6sGgsh6G+kfNUVqRuv8m7hDWPqB+6Q8','USER',0,NULL);
INSERT INTO User VALUES(5,'s@s','s','$argon2id$v=19$m=65536,t=3,p=4$crV9epUS61rHilYzyhN0vw$MMmSVVAIEEcvmFoVlWvvwofX59RHejDthYCbNKDKrXw','USER',0,NULL);
INSERT INTO User VALUES(6,'h@h','h','$argon2id$v=19$m=65536,t=3,p=4$EJX1d/7p4K/N8CuITZxDfQ$bk8Bk5GRYBqXrs2J0VgeRJjam4h7RD7UjX1ucwKkQUg','USER',0,NULL);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Exercise',0);
INSERT INTO sqlite_sequence VALUES('User',6);
CREATE UNIQUE INDEX "Exercise_content_key" ON "Exercise"("content");
CREATE UNIQUE INDEX "_CategoryToExercise_AB_unique" ON "_CategoryToExercise"("A", "B");
CREATE INDEX "_CategoryToExercise_B_index" ON "_CategoryToExercise"("B");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
COMMIT;
