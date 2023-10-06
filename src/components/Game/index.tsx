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

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentDrawIndex < drawSequence.length) {
        const drawnNumbersSoFar = drawSequence.slice(0, currentDrawIndex + 1);

        boards.forEach((board, index) => {
          if (
            boardStatuses[index] === "active" &&
            hasBoardWon(board, drawnNumbersSoFar)
          ) {
            // Update board status to 'won' if it's winning now
            const updatedStatuses = [...boardStatuses];
            updatedStatuses[index] = "won";
            setBoardStatuses(updatedStatuses);
          }
        });

        setCurrentDrawIndex((prevIndex) => prevIndex + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentDrawIndex, boardStatuses, boards, drawSequence]);

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
    </div>
  );
};

export default Game;
