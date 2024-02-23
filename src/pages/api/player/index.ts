import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const uuid = req.headers.authorization;
    const player = await db.player.findMany({
      where: {
        uuid,
      },
    });
    const response =
      player.length > 0 ? player[0] : { uuid: "", point: 0, nickname: "" };
    res.status(200).json(response);
  } else if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const { nickname } = body;
    const player = await db.player.create({
      data: {
        nickname,
        point: 1000,
        uuid: uuidv4(),
        histories: {
          create: [],
        },
      },
    });
    res.status(200).json(player);
  }
}
