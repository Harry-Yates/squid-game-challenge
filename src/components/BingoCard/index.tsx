import styles from "./BingoCard.module.css";

type BingoCardProps = {
  numbers: number[][]; // BingoCard grid
  drawnNumbers: number[]; // Numbers that have been drawn
};

const BingoCard: React.FC<BingoCardProps> = ({ numbers, drawnNumbers }) => {
  return (
    <div className={styles.bingoCard}>
      {numbers.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={styles["bingoCard__row"]}>
          {row.map((number, colIndex) => {
            // Check if number is drawn
            const marked = drawnNumbers.includes(number);

            // Set cell classes based on marked status
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
