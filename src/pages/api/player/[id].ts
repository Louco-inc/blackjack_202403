import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "PUT") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const params = JSON.parse(req.body);
    const { currentPoint } = params;
    const updatedPlayer = await db.player.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        point: currentPoint,
      },
    });
    res.status(200).json(updatedPlayer);
  }
}
