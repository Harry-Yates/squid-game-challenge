import styles from "./BingoCard.module.css";

type BingoCardProps = {
  numbers: number[][];
  drawnNumbers: number[];
};

const BingoCard: React.FC<BingoCardProps> = ({ numbers, drawnNumbers }) => {
  return (
    <div className={styles.bingoCard}>
      {numbers.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={styles["bingoCard__row"]}>
          {row.map((number, colIndex) => {
            const marked = drawnNumbers.includes(number);
            const cellClasses = `${styles["bingoCard__cell"]} ${
              marked ? styles["bingoCard__cell--marked"] : ""
            }`;

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
