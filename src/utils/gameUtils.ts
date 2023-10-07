/**
 * Checks if a given row is complete (all numbers are marked)
 */
function isRowComplete(row: number[], drawnNumbers: number[]): boolean {
  return row.every((num) => drawnNumbers.includes(num));
}

/**
 * Checks if a given board has a winning row or column
 */
export function hasBoardWon(
  board: number[][],
  drawnNumbers: number[]
): boolean {
  // Check rows
  for (const row of board) {
    if (isRowComplete(row, drawnNumbers)) return true;
  }

  // Checks columns
  for (let col = 0; col < 5; col++) {
    if (
      isRowComplete(
        board.map((row) => row[col]),
        drawnNumbers
      )
    )
      return true;
  }

  return false;
}

/**
 * Calculates the score for a given board
 */
export function calculateBoardScore(
  board: number[][],
  lastDrawnNumber: number,
  drawnNumbers: number[]
): number {
  let unmarkedSum = 0;
  for (let row of board) {
    for (let number of row) {
      if (!drawnNumbers.includes(number)) {
        unmarkedSum += number;
      }
    }
  }
  return unmarkedSum * lastDrawnNumber;
}
