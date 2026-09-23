"use client";
import { useRef } from "react";

/** Below this a drag is a tap, not a swipe. */
const THRESHOLD = 44;

/**
 * Horizontal swipe on a pointer-capable surface. Pointer events rather than
 * touch events so a trackpad or a mouse drag works the same way.
 *
 * The element must also carry `touch-pan-y`, or the browser claims the
 * horizontal gesture for its own panning and the pointer stream stops partway.
 */
export const useSwipe = (onSwipe: (direction: -1 | 1) => void) => {
  const origin = useRef<{ x: number; y: number } | null>(null);
  // Read by the click handler: a swipe that ends on the photo would otherwise
  // also open it, because a pointerup still produces a click.
  const swiped = useRef(false);

  return {
    swiped,
    handlers: {
      onPointerDown: (event: React.PointerEvent) => {
        origin.current = { x: event.clientX, y: event.clientY };
        swiped.current = false;
      },
      onPointerUp: (event: React.PointerEvent) => {
        const start = origin.current;
        origin.current = null;
        if (!start) return;

        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        // Steeper than 45° is a scroll, and the page should keep it.
        if (Math.abs(dx) < THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;

        swiped.current = true;
        onSwipe(dx < 0 ? 1 : -1);
      },
      onPointerCancel: () => {
        origin.current = null;
      },
    },
  };
};
