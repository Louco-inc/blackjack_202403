/*
  Warnings:

  - You are about to drop the column `cardNumber` on the `DealerHandCard` table. All the data in the column will be lost.
  - You are about to drop the column `cardNumber` on the `PlayerHandCard` table. All the data in the column will be lost.
  - Added the required column `rank` to the `DealerHandCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suit` to the `DealerHandCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `PlayerHandCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suit` to the `PlayerHandCard` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DealerHandCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dealerHistoryId" INTEGER NOT NULL,
    "imageId" TEXT NOT NULL,
    "suit" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    CONSTRAINT "DealerHandCard_dealerHistoryId_fkey" FOREIGN KEY ("dealerHistoryId") REFERENCES "History" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DealerHandCard" ("createdAt", "dealerHistoryId", "id", "imageId", "updatedAt") SELECT "createdAt", "dealerHistoryId", "id", "imageId", "updatedAt" FROM "DealerHandCard";
DROP TABLE "DealerHandCard";
ALTER TABLE "new_DealerHandCard" RENAME TO "DealerHandCard";
CREATE TABLE "new_PlayerHandCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "playerHistoryId" INTEGER NOT NULL,
    "imageId" TEXT NOT NULL,
    "suit" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    CONSTRAINT "PlayerHandCard_playerHistoryId_fkey" FOREIGN KEY ("playerHistoryId") REFERENCES "History" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlayerHandCard" ("createdAt", "id", "imageId", "playerHistoryId", "updatedAt") SELECT "createdAt", "id", "imageId", "playerHistoryId", "updatedAt" FROM "PlayerHandCard";
DROP TABLE "PlayerHandCard";
ALTER TABLE "new_PlayerHandCard" RENAME TO "PlayerHandCard";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
