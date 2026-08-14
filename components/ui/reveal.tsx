"use client";
import React, { useEffect, useRef } from "react";

/**
 * Fades its children up once they scroll into view.
 *
 * The hidden state is set here on mount rather than in the rendered markup, so
 * the server HTML is fully visible: with JS disabled, or IntersectionObserver
 * missing, nothing ever goes blank. Anything already on screen at mount
 * reveals on the observer's first callback, so there is no flash above the fold.
 *
 * Do NOT wrap a subtree containing a position:fixed overlay (BookModal, the
 * mobile menu) — the animated transform would become its containing block and
 * trap it inside this element. That rules out Hero and Header.
 */
export const Reveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    el.dataset.reveal = "out";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "in";
        observer.disconnect();
      },
      // Fire a little before the section is fully in view so the motion has
      // finished by the time the reader's eye reaches it.
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
};
