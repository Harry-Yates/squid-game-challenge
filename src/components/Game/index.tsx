import React, { useState, useEffect } from "react";
import { hasBoardWon, calculateBoardScore } from "@src/utils/gameUtils";
import BingoCard from "@src/components/BingoCard";
import styles from "./Game.module.css";

type GameProps = {
  boards: number[][][];
  drawSequence: number[];
};

const DRAW_INTERVAL_MS = 100;
const ACTIVE = "Active";
const WON = "Won";

const Game: React.FC<GameProps> = ({ boards, drawSequence }) => {
  const [currentDrawIndex, setCurrentDrawIndex] = useState(0);
  const [boardStatuses, setBoardStatuses] = useState<string[]>(
    boards.map(() => ACTIVE)
  );
  const [winningOrder, setWinningOrder] = useState<number[]>([]);
  const [lastBoardFinalScore, setLastBoardFinalScore] = useState<number | null>(
    null
  );
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const resetGame = () => {
    setCurrentDrawIndex(0);
    setBoardStatuses(boards.map(() => ACTIVE));
    setWinningOrder([]);
    setLastBoardFinalScore(null);
    setIsGameRunning(true);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (currentDrawIndex < drawSequence.length && isGameRunning) {
        const drawnNumbersSoFar = drawSequence.slice(0, currentDrawIndex + 1);

        let localBoardStatuses = [...boardStatuses];
        let updatedWinningBoards = new Set(winningOrder);
        let newWinners: number[] = [];

        boards.forEach((board, index) => {
          if (
            localBoardStatuses[index] === ACTIVE &&
            hasBoardWon(board, drawnNumbersSoFar)
          ) {
            localBoardStatuses[index] = WON;
            if (!updatedWinningBoards.has(index)) {
              updatedWinningBoards.add(index);
              newWinners.push(index);
            }
          }
        });

        setBoardStatuses(localBoardStatuses);
        setWinningOrder((prev) => [...prev, ...newWinners]);

        if (localBoardStatuses.every((status) => status === WON)) {
          setIsGameRunning(false);
          const lastBoardIndex = newWinners[newWinners.length - 1];
          const score = calculateBoardScore(
            boards[lastBoardIndex!],
            drawSequence[currentDrawIndex],
            drawnNumbersSoFar
          );
          setLastBoardFinalScore(score);
        }

        setCurrentDrawIndex((prevIndex) => prevIndex + 1);
      } else if (!isGameRunning) {
        clearInterval(interval);
      }
    }, DRAW_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [
    currentDrawIndex,
    boardStatuses,
    boards,
    drawSequence,
    winningOrder,
    isGameRunning,
    isPaused,
  ]);

  const togglePause = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  return (
    <div>
      <button
        className={styles.btn}
        onClick={togglePause}
        disabled={!isGameRunning}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      <button
        className={styles.btn}
        onClick={resetGame}>
        Reset
      </button>

      <div>
        {currentDrawIndex > 0 && (
          <div className={styles["drawn-numbers__container"]}>
            <div className={styles["highlight--purple"]}>Drawn Numbers: </div>
            <span>{drawSequence.slice(0, currentDrawIndex).join(", ")}</span>
          </div>
        )}
        <div className={styles["winning-order__container"]}>
          <div className={styles["highlight--purple"]}>Winning Order: </div>
          {winningOrder
            .map((boardIndex) => `Board ${boardIndex + 1}`)
            .join(", ")}
        </div>
        {lastBoardFinalScore && (
          <p className={styles["highlight--purple"]}>
            Last board&apos;s final score:{" "}
            <strong className={styles["highlight--black"]}>
              <span>{lastBoardFinalScore}</span>
            </strong>
          </p>
        )}
      </div>

      <div className={styles["bingo-cards__container"]}>
        {boards.map((board, index) => {
          const isWon = boardStatuses[index] === WON;
          const isLastWon = winningOrder[winningOrder.length - 1] === index;
          const shouldHide = isWon && !isLastWon;

          return (
            <div
              key={index}
              className={`${styles["bingo-card__wrapper"]} ${
                shouldHide ? styles.hidden : ""
              }`}>
              <h4>
                Board {index + 1} - {boardStatuses[index]}
              </h4>
              <BingoCard
                numbers={board}
                drawnNumbers={drawSequence.slice(0, currentDrawIndex)}
                latestDraw={drawSequence[currentDrawIndex - 1]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
