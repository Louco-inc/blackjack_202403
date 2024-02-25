import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";
import { CardType } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const histories = await db.history.findMany({
      include: {
        playerHandCards: true,
        dealerHandCards: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(histories);
  } else if (req.method === "POST") {
    const uuid = req.headers.authorization;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const {
      matchDay,
      result,
      increasePoint,
      decreasePoint,
			currentPoint,
      playerHands,
      dealerHands,
    } = body;
    const players = await db.player.findMany({
      where: {
        uuid,
      },
    });
    const history = await db.history.create({
      data: {
        matchDay,
        result,
        increasePoint,
        decreasePoint,
				currentPoint,
        player: {
          connect: {
            id: players[0].id,
          },
        },
        playerHandCards: {
          create: [],
        },
        dealerHandCards: {
          create: [],
        },
      },
    });
		await Promise.all(
			playerHands.map(async (hand: CardType) => {
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
			dealerHands.map(async (hand: CardType) => {
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
    res.status(200).json(history);
  }
}
