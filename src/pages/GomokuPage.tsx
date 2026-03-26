import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  BOARD_SIZE,
  type Cell,
  type Move,
  type Player,
  boardFromMoves,
  getGameOutcome,
  getWinningLineFiveCells,
  nextPlayerForMoves,
} from "../lib/gomoku";

function playerLabel(p: Player): string {
  return p === 1 ? "Black" : "White";
}

export function GomokuPage() {
  useDocumentTitle("Gomoku — Zheng Chen");

  const [moves, setMoves] = useState<Move[]>([]);

  const board = useMemo(() => boardFromMoves(moves), [moves]);

  const { winner, draw } = useMemo(() => getGameOutcome(moves), [moves]);

  const current = nextPlayerForMoves(moves);

  const winningLineCells = useMemo(() => {
    if (!winner || moves.length === 0) return null;
    const last = moves[moves.length - 1];
    const b = boardFromMoves(moves);
    return getWinningLineFiveCells(b, last.row, last.col, last.player);
  }, [winner, moves]);

  const status = useMemo(() => {
    if (winner) return `${playerLabel(winner)} wins.`;
    if (draw) return "Draw — board is full.";
    return `${playerLabel(current)} to move.`;
  }, [winner, draw, current]);

  const reset = useCallback(() => {
    setMoves([]);
  }, []);

  const undo = useCallback(() => {
    setMoves((m) => (m.length > 0 ? m.slice(0, -1) : m));
  }, []);

  const onCellClick = useCallback(
    (row: number, col: number) => {
      if (winner || draw) return;
      if (board[row][col] !== 0) return;
      const player = nextPlayerForMoves(moves);
      setMoves((m) => [...m, { row, col, player }]);
    },
    [board, moves, winner, draw],
  );

  return (
    <article>
      <nav aria-label="Breadcrumb" className="mb-4 font-sans text-sm text-mizuno-600 dark:text-mizuno-400">
        <Link
          to="/fun"
          className="underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:hover:text-mizuno-200"
        >
          Fun
        </Link>
        <span aria-hidden="true"> / </span>
        <Link
          to="/fun/games"
          className="underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:hover:text-mizuno-200"
        >
          Games
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-mizuno-800 dark:text-mizuno-200">Gomoku</span>
      </nav>

      <h1 className="mb-2 text-3xl font-semibold text-mizuno-900 dark:text-mizuno-50">
        Gomoku (五子棋)
      </h1>
      <p className="mb-4 text-mizuno-800 dark:text-mizuno-200">
        Two players on one device. Black moves first. First to align five stones
        horizontally, vertically, or diagonally wins.
      </p>
      <p className="mb-3 font-sans text-xs text-mizuno-600 md:hidden dark:text-mizuno-400">
        On small screens, scroll sideways — each cell stays finger-sized.
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <p
          className="font-sans text-sm font-medium text-mizuno-900 dark:text-mizuno-100"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
        <button
          type="button"
          onClick={undo}
          disabled={moves.length === 0}
          className="min-h-[44px] min-w-[44px] touch-manipulation rounded border border-mizuno-400 bg-white px-3 py-1.5 font-sans text-sm text-mizuno-900 shadow-sm hover:bg-mizuno-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-mizuno-600 dark:bg-mizuno-900 dark:text-mizuno-50 dark:hover:bg-mizuno-800 md:min-h-0 md:min-w-0"
          aria-label="Undo last move"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-[44px] min-w-[44px] touch-manipulation rounded border border-mizuno-400 bg-white px-3 py-1.5 font-sans text-sm text-mizuno-900 shadow-sm hover:bg-mizuno-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:border-mizuno-600 dark:bg-mizuno-900 dark:text-mizuno-50 dark:hover:bg-mizuno-800 md:min-h-0 md:min-w-0"
        >
          New game
        </button>
      </div>

      <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4 pb-2 [-webkit-overflow-scrolling:touch] md:mx-0 md:px-0">
        <div className="relative block w-max max-w-none md:w-full">
          <div
            className="relative z-0 inline-grid w-max gap-0.5 rounded border border-mizuno-300 bg-amber-100/80 p-1 [grid-template-columns:repeat(19,minmax(2.5rem,2.5rem))] dark:border-mizuno-600 dark:bg-mizuno-950/80 md:w-full md:max-w-full md:[grid-template-columns:repeat(19,minmax(0,1fr))]"
            role="grid"
            aria-label="Gomoku board 19 by 19"
          >
            {board.map((row, r) =>
              row.map((cell: Cell, c) => (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  className={[
                    "flex size-10 shrink-0 touch-manipulation items-center justify-center rounded-sm border border-mizuno-200/90 bg-amber-50 text-xs font-medium dark:border-mizuno-700 dark:bg-mizuno-900/90",
                    "md:size-auto md:h-auto md:w-full md:min-h-0 md:aspect-square",
                    cell === 0
                      ? "hover:bg-amber-100 active:bg-amber-200 dark:hover:bg-mizuno-800 dark:active:bg-mizuno-800"
                      : "cursor-default",
                  ].join(" ")}
                  aria-label={
                    cell === 0
                      ? `Empty cell row ${r + 1} column ${c + 1}`
                      : cell === 1
                        ? `Black stone row ${r + 1} column ${c + 1}`
                        : `White stone row ${r + 1} column ${c + 1}`
                  }
                  disabled={cell !== 0 || !!winner || draw}
                  onClick={() => onCellClick(r, c)}
                >
                  {cell === 1 ? (
                    <span
                      className="size-7 rounded-full bg-zinc-900 shadow-inner md:size-5"
                      aria-hidden
                    />
                  ) : cell === 2 ? (
                    <span
                      className="size-7 rounded-full border border-zinc-400 bg-white shadow-inner md:size-5"
                      aria-hidden
                    />
                  ) : null}
                </button>
              )),
            )}
          </div>
          {winningLineCells && winningLineCells.length >= 2 && (
            <svg
              className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
              viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
              preserveAspectRatio="none"
              aria-hidden
            >
              <line
                x1={winningLineCells[0].col + 0.5}
                y1={winningLineCells[0].row + 0.5}
                x2={winningLineCells[4].col + 0.5}
                y2={winningLineCells[4].row + 0.5}
                stroke="#dc2626"
                strokeWidth={0.12}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      <p className="mt-4 font-sans text-sm text-mizuno-600 dark:text-mizuno-400">
        Board size: {BOARD_SIZE}×{BOARD_SIZE}. Purely local — no network play.{" "}
        <span className="text-mizuno-700 dark:text-mizuno-300">Undo</span>{" "}
        removes the last stone (one step).
      </p>
    </article>
  );
}
