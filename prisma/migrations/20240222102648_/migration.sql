-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nickname" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "matchDay" DATETIME NOT NULL,
    "result" TEXT NOT NULL,
    "increasePoint" INTEGER NOT NULL,
    "decreasePoint" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "History_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerHandCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "playerHistoryId" INTEGER NOT NULL,
    "imageId" TEXT NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    CONSTRAINT "PlayerHandCard_playerHistoryId_fkey" FOREIGN KEY ("playerHistoryId") REFERENCES "History" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DealerHandCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dealerHistoryId" INTEGER NOT NULL,
    "imageId" TEXT NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    CONSTRAINT "DealerHandCard_dealerHistoryId_fkey" FOREIGN KEY ("dealerHistoryId") REFERENCES "History" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
