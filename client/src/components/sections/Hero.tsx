import { forwardRef, type CSSProperties } from "react";
import { gutter } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

/** Each line's resting letter-spacing; the load fade starts 0.04em wider (index.css). */
const spacing = (em: number) => ({ "--ls": `${em}em`, letterSpacing: `${em}em` }) as CSSProperties;

/**
 * First screen: exactly one screen tall, the title centred vertically, nothing else but a
 * small "Scroll" hint at the bottom. The nav sits over the top of this screen.
 *
 * Motion lives in index.css and only runs without prefers-reduced-motion:
 * - on load the title fades in once while its letter-spacing settles (`.hero-in`);
 * - as the first screen scrolls away, a CSS scroll-driven animation moves the title up
 *   at about 0.4x the scroll speed, fades it out and blurs it (`.hero-title`), and fades
 *   the hint out as soon as scrolling starts (`.hero-hint`). Browsers without
 *   scroll-driven animations just show the static title. Only transform, opacity and
 *   filter are animated on scroll, so scrolling stays smooth.
 */
export const Hero = forwardRef<HTMLElement>(function Hero(_props, ref) {
  return (
    <section
      id="hero"
      ref={ref}
      tabIndex={-1}
      aria-label="Various Degrees"
      className={cn("snap-hero relative flex h-[100svh] items-center outline-none", gutter)}
    >
      <div className="hero-title mx-auto w-full max-w-[1296px]">
        <p
          className="hero-in font-tight text-[clamp(56px,11.5vw,184px)] font-light leading-[0.92] text-editorial-strong"
          style={spacing(-0.045)}
          data-testid="text-title"
        >
          Various Degrees
        </p>
        <p
          className="hero-in mt-[clamp(16px,2vw,28px)] font-tight text-[clamp(22px,2.4vw,36px)] font-light italic leading-[1.2] text-editorial-body"
          style={spacing(-0.02)}
          data-testid="text-subtitle"
        >
          Remnants of a Future
        </p>
      </div>

      <div
        aria-hidden="true"
        className="hero-hint-in absolute inset-x-0 bottom-[calc(28px+env(safe-area-inset-bottom))] flex justify-center"
      >
        <span className="hero-hint font-mono text-[12px] uppercase leading-none tracking-[0.2em] text-editorial-eyebrow">
          Scroll
        </span>
      </div>
    </section>
  );
});
