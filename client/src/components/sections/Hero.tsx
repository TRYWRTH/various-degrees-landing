import { forwardRef } from "react";
import { gutter } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

/**
 * First screen: exactly one screen tall, the title at the bottom-left, and a small
 * "Scroll" hint at the bottom centre. The nav sits over the top of this screen.
 *
 * Motion lives in index.css and only runs without prefers-reduced-motion: as the first
 * screen scrolls away, a CSS scroll-driven animation moves the title up at about 0.4x
 * the scroll speed and fades it out (`.hero-title`), and the hint fades out as soon as
 * scrolling starts (`.hero-hint`). Only transform and opacity are animated (no blur:
 * blurring type this large made scrolling stutter). Browsers without scroll-driven
 * animations show the static title.
 */
export const Hero = forwardRef<HTMLElement>(function Hero(_props, ref) {
  return (
    <section
      id="hero"
      ref={ref}
      tabIndex={-1}
      aria-label="Various Degrees"
      className={cn("snap-hero relative flex h-[100svh] flex-col justify-end outline-none", gutter)}
    >
      <div className="hero-title mx-auto w-full max-w-[1296px] pb-[clamp(56px,10vh,120px)]">
        <p
          className="font-tight text-[clamp(56px,11.5vw,184px)] font-light leading-[0.92] tracking-[-0.045em] text-editorial-strong"
          data-testid="text-title"
        >
          Various Degrees
        </p>
        <p
          className="mt-[clamp(16px,2vw,28px)] font-tight text-[clamp(22px,2.4vw,36px)] font-light italic leading-[1.2] tracking-[-0.02em] text-editorial-body"
          data-testid="text-subtitle"
        >
          Remnants of a Future
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[calc(28px+env(safe-area-inset-bottom))] flex justify-center"
      >
        <span className="hero-hint font-mono text-[12px] uppercase leading-none tracking-[0.2em] text-editorial-eyebrow">
          Scroll
        </span>
      </div>
    </section>
  );
});
