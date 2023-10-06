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

  // Check columns
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
