import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { usePinchZoomBoard } from "../hooks/usePinchZoomBoard";
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

type GomokuBoardSurfaceProps = {
  board: Cell[][];
  winningLineCells: { row: number; col: number }[] | null;
  winner: Player | null;
  draw: boolean;
  onCellClick: (row: number, col: number) => void;
};

function GomokuBoardSurface({
  board,
  winningLineCells,
  winner,
  draw,
  onCellClick,
}: GomokuBoardSurfaceProps) {
  return (
    <div className="relative block w-max max-w-none md:w-full">
      <div
        className="relative z-0 inline-grid w-max gap-0.5 rounded border border-blueish-300 bg-amber-100/80 p-1 [grid-template-columns:repeat(19,minmax(2.5rem,2.5rem))] dark:border-blueish-600 dark:bg-blueish-950/80 md:w-full md:max-w-full md:[grid-template-columns:repeat(19,minmax(0,1fr))]"
        role="grid"
        aria-label="Gomoku board 19 by 19"
      >
        {board.map((row, r) =>
          row.map((cell: Cell, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              className={[
                "flex size-10 shrink-0 touch-manipulation items-center justify-center rounded-sm border border-blueish-200/90 bg-amber-50 text-xs font-medium dark:border-blueish-700 dark:bg-blueish-900/90",
                "md:size-auto md:h-auto md:w-full md:min-h-0 md:aspect-square",
                cell === 0
                  ? "hover:bg-amber-100 active:bg-amber-200 dark:hover:bg-blueish-800 dark:active:bg-blueish-800"
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
  );
}

export function GomokuPage() {
  useDocumentTitle("Gomoku — Kikyoyoyo");

  const [pinchEnabled, setPinchEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const sync = () => setPinchEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scale, resetZoom, targetRef: pinchRef } =
    usePinchZoomBoard(pinchEnabled);

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

  const surface = (
    <GomokuBoardSurface
      board={board}
      winningLineCells={winningLineCells}
      winner={winner}
      draw={draw}
      onCellClick={onCellClick}
    />
  );

  return (
    <article>
      <nav aria-label="Breadcrumb" className="mb-4 font-sans text-sm text-blueish-600 dark:text-blueish-400">
        <Link
          to="/fun"
          className="underline underline-offset-2 hover:text-blueish-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:hover:text-blueish-200"
        >
          Fun
        </Link>
        <span aria-hidden="true"> / </span>
        <Link
          to="/fun/games"
          className="underline underline-offset-2 hover:text-blueish-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:hover:text-blueish-200"
        >
          Games
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-blueish-800 dark:text-blueish-200">Gomoku</span>
      </nav>

      <h1 className="mb-2 text-3xl font-semibold text-blueish-900 dark:text-blueish-50">
        Gomoku (五子棋)
      </h1>
      <p className="mb-4 text-blueish-800 dark:text-blueish-200">
        Two players on one device. Black moves first. First to align five stones
        horizontally, vertically, or diagonally wins.
      </p>
      <p className="mb-3 font-sans text-xs text-blueish-600 md:hidden dark:text-blueish-400">
        On small screens, scroll sideways — each cell stays finger-sized. Pinch
        with two fingers on the board to zoom the board only (not the whole
        page).
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <p
          className="font-sans text-sm font-medium text-blueish-900 dark:text-blueish-100"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
        <button
          type="button"
          onClick={undo}
          disabled={moves.length === 0}
          className="min-h-[44px] min-w-[44px] touch-manipulation rounded border border-blueish-400 bg-white px-3 py-1.5 font-sans text-sm text-blueish-900 shadow-sm hover:bg-blueish-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blueish-600 dark:bg-blueish-900 dark:text-blueish-50 dark:hover:bg-blueish-800 md:min-h-0 md:min-w-0"
          aria-label="Undo last move"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-[44px] min-w-[44px] touch-manipulation rounded border border-blueish-400 bg-white px-3 py-1.5 font-sans text-sm text-blueish-900 shadow-sm hover:bg-blueish-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:border-blueish-600 dark:bg-blueish-900 dark:text-blueish-50 dark:hover:bg-blueish-800 md:min-h-0 md:min-w-0"
        >
          New game
        </button>
        {pinchEnabled && (
          <button
            type="button"
            onClick={resetZoom}
            disabled={scale === 1}
            className="min-h-[44px] touch-manipulation rounded border border-blueish-400 bg-white px-3 py-1.5 font-sans text-sm text-blueish-900 shadow-sm hover:bg-blueish-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blueish-600 dark:bg-blueish-900 dark:text-blueish-50 dark:hover:bg-blueish-800 md:min-h-0"
            aria-label="Reset board zoom to 100 percent"
          >
            Reset zoom
          </button>
        )}
      </div>

      <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4 pb-2 [-webkit-overflow-scrolling:touch] md:mx-0 md:px-0">
        {pinchEnabled ? (
          <GomokuBoardZoomShell scale={scale} pinchRef={pinchRef}>
            {surface}
          </GomokuBoardZoomShell>
        ) : (
          surface
        )}
      </div>

      <p className="mt-4 font-sans text-sm text-blueish-600 dark:text-blueish-400">
        Board size: {BOARD_SIZE}×{BOARD_SIZE}. Purely local — no network play.{" "}
        <span className="text-blueish-700 dark:text-blueish-300">Undo</span>{" "}
        removes the last stone (one step).
      </p>
    </article>
  );
}

/** Keeps scroll area correct when `transform: scale` is applied (layout size ≠ visual size). Only used on narrow viewports where pinch zoom is enabled. */
function GomokuBoardZoomShell({
  scale,
  pinchRef,
  children,
}: {
  scale: number;
  pinchRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  const [baseSize, setBaseSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = pinchRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setBaseSize({ w: cr.width, h: cr.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [pinchRef]);

  const w = baseSize.w * scale;
  const h = baseSize.h * scale;

  return (
    <div
      className="touch-pan-x overflow-hidden"
      style={{
        width: baseSize.w ? w : undefined,
        height: baseSize.h ? h : undefined,
      }}
    >
      <div
        ref={pinchRef}
        className="w-max touch-pan-x will-change-transform"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
