import type { NextApiRequest, NextApiResponse } from "next";

type Board = number[][];

type GameData = {
  drawNumbers: number[];
  boards: Board[];
};

let data: GameData;

try {
  data = require("@src/data/realData.json");
} catch (error) {
  console.error("Error importing data:", error);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!data) {
    return res.status(500).json({ error: "Failed to load data" });
  }

  res.status(200).json(data);
}
