/*
  Warnings:

  - Added the required column `currentPoint` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "matchDay" DATETIME NOT NULL,
    "result" TEXT NOT NULL,
    "increasePoint" INTEGER NOT NULL,
    "decreasePoint" INTEGER NOT NULL,
    "currentPoint" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "History_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("createdAt", "decreasePoint", "id", "increasePoint", "matchDay", "playerId", "result", "updatedAt") SELECT "createdAt", "decreasePoint", "id", "increasePoint", "matchDay", "playerId", "result", "updatedAt" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
