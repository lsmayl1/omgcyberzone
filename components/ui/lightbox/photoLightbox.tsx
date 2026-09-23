"use client";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { useSwipe } from "./useSwipe";

const Arrow = ({ direction }: { direction: -1 | 1 }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`size-6 ${direction === -1 ? "" : "rotate-180"}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 5 8 12l7 7" />
  </svg>
);

/**
 * The whole photo, uncropped. The cards crop hard to object-cover, so this is
 * the only place a zone's photo is seen as shot.
 *
 * Rendered into document.body: callers sit inside <Reveal>, whose entrance
 * animation makes it a containing block for position:fixed while it runs. A
 * portal puts the overlay out of reach of that entirely.
 */
export const PhotoLightbox = ({
  images,
  index,
  alt,
  onIndexChange,
  onClose,
}: {
  images: string[];
  index: number;
  alt: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) => {
  const { t } = useI18n();

  const step = useCallback(
    (direction: -1 | 1) =>
      onIndexChange((index + direction + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  const swipe = useSwipe(step);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKeyDown);

    // The overlay covers the page; letting it scroll underneath is disorienting.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, step]);

  // Only ever opened by a click, so this never runs during a server render.
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 max-md:p-2"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t.photo.closePhoto}
        autoFocus
        className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/60 p-2 text-white transition-colors hover:bg-mainRed"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* object-contain inside a sized box: the entire frame, never cropped. */}
      <div
        onClick={(event) => event.stopPropagation()}
        {...swipe.handlers}
        className="relative h-full w-full touch-pan-y select-none"
      >
        <Image
          src={images[index]}
          alt={alt}
          fill
          sizes="100vw"
          quality={90}
          priority
          className="object-contain"
        />
      </div>

      {images.length > 1 && (
        <>
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(direction);
              }}
              aria-label={
                direction === -1 ? t.photo.prevPhoto : t.photo.nextPhoto
              }
              className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-3 text-white transition-colors hover:bg-mainRed max-md:p-2 ${
                direction === -1 ? "left-4 max-md:left-2" : "right-4 max-md:right-2"
              }`}
            >
              <Arrow direction={direction} />
            </button>
          ))}

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onIndexChange(i);
                }}
                aria-label={`${alt} — ${i + 1}`}
                aria-current={index === i}
                className={`h-1.5 rounded-full transition-all ${
                  index === i ? "w-6 bg-mainRed" : "w-1.5 bg-white/45"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>,
    document.body,
  );
};
