/** 0 empty, 1 black, 2 white */
export type Cell = 0 | 1 | 2;
export type Player = 1 | 2;

export type Move = { row: number; col: number; player: Player };

export const BOARD_SIZE = 19;

export function emptyBoard(): Cell[][] {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(0),
  ) as Cell[][];
}

export function checkWin(
  board: Cell[][],
  row: number,
  col: number,
  player: Player,
): boolean {
  const dirs: [number, number][] = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (const [dr, dc] of dirs) {
    let count = 1;
    for (let step = 1; step < 5; step++) {
      const r = row + dr * step;
      const c = col + dc * step;
      if (
        r >= 0 &&
        r < BOARD_SIZE &&
        c >= 0 &&
        c < BOARD_SIZE &&
        board[r][c] === player
      ) {
        count++;
      } else {
        break;
      }
    }
    for (let step = 1; step < 5; step++) {
      const r = row - dr * step;
      const c = col - dc * step;
      if (
        r >= 0 &&
        r < BOARD_SIZE &&
        c >= 0 &&
        c < BOARD_SIZE &&
        board[r][c] === player
      ) {
        count++;
      } else {
        break;
      }
    }
    if (count >= 5) return true;
  }
  return false;
}

export function boardFull(board: Cell[][]): boolean {
  return board.every((row) => row.every((cell) => cell !== 0));
}

export function boardFromMoves(moves: ReadonlyArray<Move>): Cell[][] {
  const b = emptyBoard();
  for (const m of moves) {
    b[m.row][m.col] = m.player;
  }
  return b;
}

/** Who is to move next (no moves → black first). */
export function nextPlayerForMoves(moves: ReadonlyArray<Move>): Player {
  return moves.length % 2 === 0 ? 1 : 2;
}

export function getGameOutcome(moves: ReadonlyArray<Move>): {
  winner: Player | null;
  draw: boolean;
} {
  if (moves.length === 0) {
    return { winner: null, draw: false };
  }
  const last = moves[moves.length - 1];
  const b = boardFromMoves(moves);
  if (checkWin(b, last.row, last.col, last.player)) {
    return { winner: last.player, draw: false };
  }
  if (boardFull(b)) {
    return { winner: null, draw: true };
  }
  return { winner: null, draw: false };
}

/**
 * Five consecutive cells that form the winning line through (row, col).
 * If the line is longer than five, picks a window of five that includes the last move.
 */
export function getWinningLineFiveCells(
  board: Cell[][],
  row: number,
  col: number,
  player: Player,
): { row: number; col: number }[] | null {
  const dirs: [number, number][] = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (const [dr, dc] of dirs) {
    let r = row;
    let c = col;
    while (
      r - dr >= 0 &&
      r - dr < BOARD_SIZE &&
      c - dc >= 0 &&
      c - dc < BOARD_SIZE &&
      board[r - dr][c - dc] === player
    ) {
      r -= dr;
      c -= dc;
    }
    const points: { row: number; col: number }[] = [];
    while (
      r >= 0 &&
      r < BOARD_SIZE &&
      c >= 0 &&
      c < BOARD_SIZE &&
      board[r][c] === player
    ) {
      points.push({ row: r, col: c });
      r += dr;
      c += dc;
    }
    if (points.length >= 5) {
      const idx = points.findIndex((p) => p.row === row && p.col === col);
      if (idx === -1) continue;
      const start = Math.min(Math.max(0, idx - 2), points.length - 5);
      return points.slice(start, start + 5);
    }
  }
  return null;
}
