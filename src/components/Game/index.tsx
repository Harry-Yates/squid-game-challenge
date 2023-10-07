import React, { useState, useEffect } from "react";
import { hasBoardWon, calculateBoardScore } from "@src/utils/gameUtils";
import BingoCard from "@src/components/BingoCard";
import styles from "./Game.module.css";

type GameProps = {
  boards: number[][][];
  drawSequence: number[];
};

const DRAW_INTERVAL_MS = 100;

const Game: React.FC<GameProps> = ({ boards, drawSequence }) => {
  const [currentDrawIndex, setCurrentDrawIndex] = useState(0);
  const [boardStatuses, setBoardStatuses] = useState<string[]>(
    boards.map(() => "active")
  );
  const [winningOrder, setWinningOrder] = useState<number[]>([]);
  const [lastBoardFinalScore, setLastBoardFinalScore] = useState<number | null>(
    null
  );
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const resetGame = () => {
    setCurrentDrawIndex(0);
    setBoardStatuses(boards.map(() => "active"));
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
        boards.forEach((board, index) => {
          if (
            localBoardStatuses[index] === "active" &&
            hasBoardWon(board, drawnNumbersSoFar)
          ) {
            localBoardStatuses[index] = "won";
            setWinningOrder((prevOrder) => [...prevOrder, index]);
          }
        });

        setBoardStatuses(localBoardStatuses);

        if (localBoardStatuses.every((status) => status === "won")) {
          setIsGameRunning(false);
          const lastBoardIndex = winningOrder[winningOrder.length - 1];
          const score = calculateBoardScore(
            boards[lastBoardIndex],
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
        className={styles.Btn}
        onClick={togglePause}
        aria-disabled={!isGameRunning || isPaused}
        disabled={!isGameRunning}>
        {isPaused ? "Start" : "Pause"}
      </button>

      <button
        className={styles.Btn}
        onClick={resetGame}
        aria-disabled={false}>
        Reset
      </button>

      <div>
        {currentDrawIndex > 0 && (
          <div className={styles.drawnNumbersContainer}>
            <div className={styles.highlightPurple}>Drawn Numbers: </div>
            <span>{drawSequence.slice(0, currentDrawIndex).join(", ")}</span>
          </div>
        )}
        <div className={styles.winningOrderContainer}>
          <div className={styles.highlightPurple}>Winning Order: </div>
          {winningOrder
            .map((boardIndex) => `Board ${boardIndex + 1}`)
            .join(", ")}
        </div>
        {lastBoardFinalScore && (
          <p className={styles.highlightPurple}>
            Last board&apos;s final score:{" "}
            <strong className={styles.highlightBlack}>
              <span>{lastBoardFinalScore}</span>
            </strong>
          </p>
        )}
      </div>

      <div className={styles.bingoCardsContainer}>
        {boards.map((board, index) => {
          const isWon = boardStatuses[index] === "won";
          const isLastWon = winningOrder[winningOrder.length - 1] === index;
          const shouldHide = isWon && !isLastWon;

          return (
            <div
              key={index}
              className={`${styles.bingoCardWrapper} ${
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
