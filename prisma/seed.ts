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
      imageId: "sample1",
      cardNumber: 6,
    },
    {
      imageId: "sample2",
      cardNumber: 7,
    },
    {
      imageId: "sample3",
      cardNumber: 8,
    },
  ];
  const dealerHands = [
    {
      imageId: "sample4",
      cardNumber: 9,
    },
    {
      imageId: "sample5",
      cardNumber: 5,
    },
    {
      imageId: "sample6",
      cardNumber: 4,
    },
  ];

  await Promise.all(
    playerHands.map(async (hand) => {
      await prisma.playerHandCard.create({
        data: {
          imageId: hand.imageId,
          cardNumber: hand.cardNumber,
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
          cardNumber: hand.cardNumber,
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
