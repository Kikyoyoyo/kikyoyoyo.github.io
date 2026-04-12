import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  CELL_EMPTY,
  CELL_SAND,
  clearWorld,
  createSandWorld,
  paintCircle,
  stepWorld,
  type CellType,
  type SandWorld,
} from "../lib/sandSim";

const WORLD_WIDTH = 180;
const WORLD_HEIGHT = 120;
const TARGET_FPS = 60;
const STEP_INTERVAL = 1000 / TARGET_FPS;

type BrushType = "sand" | "eraser";

function drawWorldToCanvas(
  ctx: CanvasRenderingContext2D,
  world: SandWorld,
  imageData: ImageData,
): void {
  const data = imageData.data;
  const cells = world.cells;
  const len = cells.length;

  for (let i = 0; i < len; i += 1) {
    const p = i * 4;
    if (cells[i] === CELL_SAND) {
      data[p] = 158;
      data[p + 1] = 122;
      data[p + 2] = 234;
      data[p + 3] = 255;
    } else {
      data[p] = 12;
      data[p + 1] = 14;
      data[p + 2] = 24;
      data[p + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

export function SandSimPage() {
  useDocumentTitle("Sand Simulation — Kikyoyoyo");

  const [running, setRunning] = useState(true);
  const [brushSize, setBrushSize] = useState(3);
  const [brushType, setBrushType] = useState<BrushType>("sand");

  const worldRef = useRef(createSandWorld(WORLD_WIDTH, WORLD_HEIGHT));
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageDataRef = useRef<ImageData | null>(null);
  const paintingRef = useRef(false);

  const brushCellType = useMemo<CellType>(
    () => (brushType === "sand" ? CELL_SAND : CELL_EMPTY),
    [brushType],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      return;
    }

    canvas.width = WORLD_WIDTH;
    canvas.height = WORLD_HEIGHT;
    ctx.imageSmoothingEnabled = false;
    imageDataRef.current = ctx.createImageData(WORLD_WIDTH, WORLD_HEIGHT);
    drawWorldToCanvas(ctx, worldRef.current, imageDataRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      return;
    }

    let rafId = 0;
    let lastMs = performance.now();
    let accumulator = 0;

    const tick = (nowMs: number) => {
      const delta = nowMs - lastMs;
      lastMs = nowMs;
      accumulator += delta;

      if (running) {
        while (accumulator >= STEP_INTERVAL) {
          stepWorld(worldRef.current);
          accumulator -= STEP_INTERVAL;
        }
      } else {
        accumulator = 0;
      }

      const imageData = imageDataRef.current;
      if (imageData) {
        drawWorldToCanvas(ctx, worldRef.current, imageData);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [running]);

  const pointerToCell = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((event.clientX - rect.left) / rect.width) * WORLD_WIDTH);
    const y = Math.floor(((event.clientY - rect.top) / rect.height) * WORLD_HEIGHT);
    return { x, y };
  };

  const applyBrush = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const pos = pointerToCell(event);
    if (!pos) {
      return;
    }
    paintCircle(worldRef.current, pos.x, pos.y, brushSize, brushCellType);
  };

  const handleClear = () => {
    clearWorld(worldRef.current);
  };

  return (
    <article>
      <nav
        aria-label="Breadcrumb"
        className="mb-4 font-sans text-sm text-blueish-600 dark:text-blueish-400"
      >
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
        <span className="text-blueish-800 dark:text-blueish-200">Sand Simulation</span>
      </nav>

      <h1 className="mb-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">
        2D Sand Simulation
      </h1>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Hold and drag to draw particles. Sand falls with simple cellular rules.
      </p>

      <section className="eth-card">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button type="button" className="eth-button px-4 py-2" onClick={() => setRunning((v) => !v)}>
            {running ? "Pause" : "Resume"}
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-300 px-4 py-2 font-sans text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={handleClear}
          >
            Clear
          </button>

          <label className="ml-2 inline-flex items-center gap-2 font-sans text-sm text-slate-700 dark:text-slate-300">
            Brush
            <select
              value={brushType}
              onChange={(e) => setBrushType(e.target.value as BrushType)}
              className="rounded border border-slate-300 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="sand">Sand</option>
              <option value="eraser">Eraser</option>
            </select>
          </label>

          <label className="inline-flex items-center gap-2 font-sans text-sm text-slate-700 dark:text-slate-300">
            Size
            <input
              type="range"
              min={1}
              max={8}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
            />
            <span className="w-6 text-right">{brushSize}</span>
          </label>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-300 bg-[#0c0e18] p-2 dark:border-slate-700">
          <canvas
            ref={canvasRef}
            className="sand-canvas block h-auto w-full max-w-[900px] touch-none"
            onPointerDown={(e) => {
              paintingRef.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              applyBrush(e);
            }}
            onPointerMove={(e) => {
              if (paintingRef.current) {
                applyBrush(e);
              }
            }}
            onPointerUp={(e) => {
              paintingRef.current = false;
              e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            onPointerLeave={() => {
              paintingRef.current = false;
            }}
          />
        </div>
      </section>
    </article>
  );
}
