-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Territory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "spreadsheetURL" TEXT,
    "isCheckedOut" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    CONSTRAINT "Territory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Territory" ("id", "name", "spreadsheetURL", "userId") SELECT "id", "name", "spreadsheetURL", "userId" FROM "Territory";
DROP TABLE "Territory";
ALTER TABLE "new_Territory" RENAME TO "Territory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
