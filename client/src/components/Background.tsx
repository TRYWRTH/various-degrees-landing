import { forwardRef, useImperativeHandle, useRef } from "react";
import backgroundImage from "@assets/01-greek.webp";

export type BackgroundHandle = {
  /** 0–1: alpha of the flat dark layer, set from the scroll position */
  setDarkness: (alpha: number) => void;
};

/**
 * One fixed layer behind the whole page: the blurred photo and its dark overlay.
 *
 * The overlay has two parts so it reads "lighter at the top, darker at the bottom" in
 * every section without seams between sections:
 * - a flat dark layer whose alpha the page ramps with the scroll position (a little
 *   darker for each section further down), and
 * - a fixed top-to-bottom gradient over the viewport.
 * Phones crop the photo to its bright sky at the top, so below 768px an extra flat
 * layer keeps the small grey labels at 4.5:1 or better there too.
 */
export const Background = forwardRef<BackgroundHandle>(function Background(_props, ref) {
  const flatRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    setDarkness(alpha) {
      if (flatRef.current) flatRef.current.style.opacity = String(alpha);
    },
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-night" aria-hidden="true">
      {/* Slight scale hides the blurred edges */}
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full scale-[1.04] object-cover blur-[8px] [will-change:transform]"
        data-page-photo=""
      />
      <div ref={flatRef} className="absolute inset-0 bg-night" style={{ opacity: 0.5 }} />
      {/* Darkens as the first screen scrolls away (CSS scroll-driven, see .hero-dim) */}
      <div className="hero-dim absolute inset-0 bg-night/20 opacity-0" />
      <div className="absolute inset-0 bg-night opacity-40 md:hidden" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgb(10 11 8 / 0), rgb(10 11 8 / 0.6))" }}
      />
    </div>
  );
});
