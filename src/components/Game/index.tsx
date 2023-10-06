import React, { useState, useEffect } from "react";
import { hasBoardWon } from "@src/utils/gameUtils";
import BingoCard from "@src/components/BingoCard";

type GameProps = {
  boards: number[][][];
  drawSequence: number[];
};

const Game: React.FC<GameProps> = ({ boards, drawSequence }) => {
  const [currentDrawIndex, setCurrentDrawIndex] = useState(0);
  const [boardStatuses, setBoardStatuses] = useState<string[]>(
    boards.map(() => "active")
  );
  const [winningOrder, setWinningOrder] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentDrawIndex < drawSequence.length) {
        const drawnNumbersSoFar = drawSequence.slice(0, currentDrawIndex + 1);

        boards.forEach((board, index) => {
          if (
            boardStatuses[index] === "active" &&
            hasBoardWon(board, drawnNumbersSoFar)
          ) {
            const updatedStatuses = [...boardStatuses];
            updatedStatuses[index] = "won";
            setBoardStatuses(updatedStatuses);

            setWinningOrder((prevOrder) => [...prevOrder, index]);
          }
        });

        if (boardStatuses.every((status) => status === "won")) {
          clearInterval(interval);
          return;
        }

        setCurrentDrawIndex((prevIndex) => prevIndex + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentDrawIndex, boardStatuses]);

  return (
    <div>
      {boards.map((board, index) => (
        <div key={index}>
          <h2>
            Board {index + 1} - {boardStatuses[index]}
          </h2>
          <BingoCard
            numbers={board}
            drawnNumbers={drawSequence.slice(0, currentDrawIndex)}
          />
        </div>
      ))}
      <div>Winning Order: {winningOrder.join(", ")}</div>
    </div>
  );
};

export default Game;
