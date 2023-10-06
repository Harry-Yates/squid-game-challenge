import styles from "./BingoCard.module.css";

interface BingoCardProps {
  numbers: number[][];
}

const BingoCard: React.FC<BingoCardProps> = ({ numbers }) => {
  return (
    <div className={styles.bingoCard}>
      {numbers.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={styles.bingoCard__row}>
          {row.map((number, colIndex) => (
            <div
              key={colIndex}
              className={styles.bingoCard__cell}>
              {number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BingoCard;
