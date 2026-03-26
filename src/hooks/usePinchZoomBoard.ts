import { useCallback, useEffect, useRef, useState } from "react";

const MIN = 0.55;
const MAX = 3.25;

function touchDistance(a: Touch, b: Touch): number {
  const dx = a.clientX - b.clientX;
  const dy = a.clientY - b.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Two-finger pinch updates `scale` on the target element; `touchmove` uses
 * `{ passive: false }` so the browser does not zoom the whole page.
 */
export function usePinchZoomBoard(enabled: boolean) {
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const initialDistanceRef = useRef<number | null>(null);
  const scaleAtPinchStartRef = useRef(1);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = targetRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDistanceRef.current = touchDistance(e.touches[0], e.touches[1]);
        scaleAtPinchStartRef.current = scaleRef.current;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (
        e.touches.length === 2 &&
        initialDistanceRef.current !== null &&
        initialDistanceRef.current > 0
      ) {
        e.preventDefault();
        const d = touchDistance(e.touches[0], e.touches[1]);
        const next = Math.min(
          MAX,
          Math.max(
            MIN,
            scaleAtPinchStartRef.current * (d / initialDistanceRef.current),
          ),
        );
        scaleRef.current = next;
        setScale(next);
      }
    };

    const onTouchEndOrCancel = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        initialDistanceRef.current = null;
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEndOrCancel);
    el.addEventListener("touchcancel", onTouchEndOrCancel);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEndOrCancel);
      el.removeEventListener("touchcancel", onTouchEndOrCancel);
    };
  }, [enabled]);

  const resetZoom = useCallback(() => {
    setScale(1);
    scaleRef.current = 1;
  }, []);

  useEffect(() => {
    if (!enabled) resetZoom();
  }, [enabled, resetZoom]);

  return { scale, resetZoom, targetRef };
}
