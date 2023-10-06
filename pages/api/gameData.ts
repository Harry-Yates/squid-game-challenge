import type { NextApiRequest, NextApiResponse } from "next";
import testData from "@src/data/testData.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(testData);
}
