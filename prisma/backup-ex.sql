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
INSERT INTO _prisma_migrations VALUES('55ad1102-7547-4fcb-ac25-2fd2a1f27c06','97166baa7d8feb2812fa7c6560c56a48935c7999188712b3fc4e5f41380ae5be',1715345973309,'20231120143133_init',NULL,NULL,1715345973307,1);
INSERT INTO _prisma_migrations VALUES('8937b6ac-e1a2-4148-a2a0-0350084a35cc','831fcdb71e2b8eee461e6647bebe892925b9a36d97f6e3bcff51ffea70721415',1715345973312,'20231207091546_added_new_model',NULL,NULL,1715345973309,1);
INSERT INTO _prisma_migrations VALUES('3c5e58e8-ccb9-4497-b14b-343027ba8311','4ed300e57bfc4cf81d6783263f4564bc55f2d2b726bf0dfd016aa84582327aec',1715345973316,'20231209072303_added_summary',NULL,NULL,1715345973313,1);
INSERT INTO _prisma_migrations VALUES('e1ba2d2c-4fea-4781-8dc5-cbb219d702a4','2f04ea9951b41f77d07286c29a61084c58d00ce632f6181034884e277436a07d',1715345973319,'20231209074441_testing_form',NULL,NULL,1715345973316,1);
INSERT INTO _prisma_migrations VALUES('1e6359fb-ac5e-48ea-acd0-84e6fb5edda1','cb3df5757ff05ecf369929dab0a0fb1cc93ba325b6e193038dc95680c8be03f7',1715346051396,'20240510130051_fix_indexes',NULL,NULL,1715346051392,1);
CREATE TABLE IF NOT EXISTS "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO Category VALUES(1,'Zahlen');
INSERT INTO Category VALUES(2,'Arithmetik und Algebra');
INSERT INTO Category VALUES(3,'Geometrie');
INSERT INTO Category VALUES(4,'Analysis');
INSERT INTO Category VALUES(5,'Stochastik');
INSERT INTO Category VALUES(6,'Vertiefende Themen');
CREATE TABLE IF NOT EXISTS "Subcategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO Subcategory VALUES(1,'Rechenarten',2);
INSERT INTO Subcategory VALUES(2,'Gleichungen und Ungleichungen',2);
INSERT INTO Subcategory VALUES(3,'Funktionen',2);
INSERT INTO Subcategory VALUES(4,'Sonstiges',2);
INSERT INTO Subcategory VALUES(5,'Allgemeine Geometrie der Ebene',3);
INSERT INTO Subcategory VALUES(6,'Trigonometrie',3);
INSERT INTO Subcategory VALUES(7,'Allgemeine Geometrie des Raums',3);
INSERT INTO Subcategory VALUES(8,'Vektorgeometrie',3);
INSERT INTO Subcategory VALUES(9,'Sonstiges',3);
INSERT INTO Subcategory VALUES(10,'Grundlagen',4);
INSERT INTO Subcategory VALUES(11,'Differentialrechnung',4);
INSERT INTO Subcategory VALUES(12,'Integralrechnung',4);
INSERT INTO Subcategory VALUES(13,'Sonstiges',4);
INSERT INTO Subcategory VALUES(14,'Wahrscheinlichkeitstheorie',5);
INSERT INTO Subcategory VALUES(15,'Kombinatorik',5);
INSERT INTO Subcategory VALUES(16,'Statistik',5);
INSERT INTO Subcategory VALUES(17,'Sonstiges',5);
INSERT INTO Subcategory VALUES(18,'Komplexe Zahlen',6);
INSERT INTO Subcategory VALUES(19,'Kegelschnitte',6);
INSERT INTO Subcategory VALUES(20,'Differentialgleichungen',6);
INSERT INTO Subcategory VALUES(21,'Lineare Abbildungen und Matrizen',6);
INSERT INTO Subcategory VALUES(22,'Graphentheorie',6);
INSERT INTO Subcategory VALUES(23,'Sonstiges',6);
INSERT INTO Subcategory VALUES(24,'Zahlensysteme',1);
INSERT INTO Subcategory VALUES(25,'Spezielle Zahlen',1);
INSERT INTO Subcategory VALUES(26,'Zahlenmengen',1);
INSERT INTO Subcategory VALUES(27,'Sonstiges',1);
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "retry" INTEGER NOT NULL DEFAULT 0,
    "retryExp" DATETIME
);
INSERT INTO User VALUES(1,'me@echo.ch','patrick','1234','USER',0,NULL);
CREATE TABLE IF NOT EXISTS "Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "summary" TEXT,
    "content" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'Deutsch',
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "authorId" INTEGER NOT NULL DEFAULT 1,
    "categoryId" INTEGER NOT NULL DEFAULT 1,
    "subcategoryId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Exercise_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exercise_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exercise_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO Exercise VALUES(2,1715346953780,1717433355645,NULL,'abs','abs','English',2,1,6,19);
INSERT INTO Exercise VALUES(3,1717076605237,1717143030174,NULL,'zuzzzzz','asdas','Deutsch',1,1,3,5);
INSERT INTO Exercise VALUES(4,1717076638724,1717454120949,NULL,'ada','das','Deutsch',2,1,2,3);
INSERT INTO Exercise VALUES(5,1717076670132,1717670658270,NULL,'<c<','<cx<y','English',1,1,1,25);
INSERT INTO Exercise VALUES(6,1717076721468,1717076721468,NULL,'dsf','afafd','Deutsch',2,1,2,3);
INSERT INTO Exercise VALUES(7,1717076933149,1717076933149,NULL,'ascas','cac','English',2,1,3,5);
INSERT INTO Exercise VALUES(8,1717077048813,1717077048813,NULL,'adfa','afadf','Deutsch',1,1,2,1);
INSERT INTO Exercise VALUES(9,1717077141959,1717077141959,NULL,'sfaf','afasf','English',2,1,2,2);
INSERT INTO Exercise VALUES(10,1717077472568,1717579262655,NULL,'axs','x5','Deutsch',2,1,1,26);
INSERT INTO Exercise VALUES(11,1717424355399,1717432582172,NULL,'vdfsdvf','svvsd','English',1,1,2,2);
INSERT INTO Exercise VALUES(12,1717424400707,1717432494638,NULL,'000','rjrdfg','Deutsch',3,1,4,11);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Category',6);
INSERT INTO sqlite_sequence VALUES('Subcategory',27);
INSERT INTO sqlite_sequence VALUES('User',1);
INSERT INTO sqlite_sequence VALUES('Exercise',12);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
COMMIT;
