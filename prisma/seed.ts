import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("テストプレイヤーのインサート");
  const player = await prisma.player.create({
    data: {
      nickname: "Yamada Taro",
      point: 1000,
      uuid: "0819ae52-f809-4fcb-a0f2-07150d0ec3b3",
      histories: {
        create: [],
      },
    },
  });
  console.log("テストデータのインサート");
  const history = await prisma.history.create({
    data: {
      result: "win",
      matchDay: new Date(),
      increasePoint: 100,
      decreasePoint: 0,
      currentPoint: 1000,
      playerId: player.id,
      playerHandCards: {
        create: [],
      },
      dealerHandCards: {
        create: [],
      },
    },
  });
  const playerHands = [
    {
      imageId: "diamond6",
      suit: "6",
      rank: "diamond",
    },
    {
      imageId: "diamond7",
      suit: "7",
      rank: "diamond",
    },
    {
      imageId: "diamond8",
      suit: "8",
      rank: "diamond",
    },
  ];
  const dealerHands = [
    {
      imageId: "diamond9",
      suit: "9",
      rank: "diamond",
    },
    {
      imageId: "diamond5",
      suit: "5",
      rank: "diamond",
    },
    {
      imageId: "diamond4",
      suit: "4",
      rank: "diamond",
    },
  ];

  await Promise.all(
    playerHands.map(async (hand) => {
      await prisma.playerHandCard.create({
        data: {
          imageId: hand.imageId,
          suit: hand.suit,
          rank: hand.rank,
          playerHistoryId: history.id,
        },
      });
    })
  );
  await Promise.all(
    dealerHands.map(async (hand) => {
      await prisma.dealerHandCard.create({
        data: {
          imageId: hand.imageId,
          suit: hand.suit,
          rank: hand.rank,
          dealerHistoryId: history.id,
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
