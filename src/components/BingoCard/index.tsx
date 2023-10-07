import styles from "./BingoCard.module.css";

type BingoCardProps = {
  numbers: number[][];
  drawnNumbers: number[];
  latestDraw?: number; // This prop is the latest drawn number.
};

const BingoCard: React.FC<BingoCardProps> = ({
  numbers,
  drawnNumbers,
  latestDraw,
}) => {
  return (
    <div className={styles.bingoCard}>
      {numbers.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={styles["bingoCard__row"]}>
          {row.map((number, colIndex) => {
            const marked = drawnNumbers.includes(number);
            const isLatestDraw = latestDraw === number; // Check if this number is the latest draw.
            const cellClasses = `${styles["bingoCard__cell"]} ${
              marked ? styles["bingoCard__cell--marked"] : ""
            } ${isLatestDraw ? styles["bingoCard__cell--latestDraw"] : ""}`; // Add the latestDraw style if true.

            return (
              <div
                key={colIndex}
                className={cellClasses}>
                {number}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BingoCard;
