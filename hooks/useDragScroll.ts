"use client";
import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
} from "react";

const DRAG_THRESHOLD = 5;

/**
 * Click-and-drag horizontal scrolling for a container.
 *
 * Spread the returned handlers onto the scroll container. A drag that moves
 * further than DRAG_THRESHOLD swallows the trailing click, so dragging across
 * the category strip no longer selects whatever button you released over.
 */
export const useDragScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const dragged = useRef(false);
  // Teardown for a drag that is still in progress, so an unmount mid-drag
  // does not leave the document-level listeners behind.
  const endDrag = useRef<(() => void) | null>(null);

  useEffect(() => () => endDrag.current?.(), []);

  const onMouseDown = useCallback((e: ReactMouseEvent) => {
    const container = ref.current;
    if (!container) return;
    e.preventDefault();

    const startX = e.pageX;
    const startScroll = container.scrollLeft;
    dragged.current = false;
    container.style.cursor = "grabbing";

    const onMove = (ev: MouseEvent) => {
      const dx = ev.pageX - startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) dragged.current = true;
      container.scrollLeft = startScroll - dx;
    };

    const onUp = () => {
      container.style.cursor = "grab";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      endDrag.current = null;

      /*
       * The click that follows this mouseup only reaches onClickCapture when
       * the pointer was released inside the container. Release it outside —
       * easy to do when you fling the strip — and no click ever arrives, so
       * the flag would stay set and eat the next genuine tap on a category.
       * Clear it on a macrotask: the click, if there is one, is dispatched
       * before this runs.
       */
      if (dragged.current) {
        window.setTimeout(() => {
          dragged.current = false;
        }, 0);
      }
    };

    endDrag.current = onUp;
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, []);

  const onClickCapture = useCallback((e: ReactMouseEvent) => {
    if (!dragged.current) return;
    e.preventDefault();
    e.stopPropagation();
    dragged.current = false;
  }, []);

  return { ref, onMouseDown, onClickCapture };
};
