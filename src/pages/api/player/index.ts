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
      player.length > 0 ? player[0] : { uuid: uuidv4(), point: 1000 };
    res.status(200).json(response);
  }
}
