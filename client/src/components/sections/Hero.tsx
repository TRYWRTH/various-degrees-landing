import { forwardRef } from "react";
import { gutter } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

/**
 * First screen: the site name set large and the publication title under it, at the
 * bottom-left of the photo. The nav sits over the top of this screen.
 */
export const Hero = forwardRef<HTMLElement>(function Hero(_props, ref) {
  return (
    <section
      id="hero"
      ref={ref}
      tabIndex={-1}
      aria-label="Various Degrees"
      className={cn("relative flex min-h-[100svh] flex-col justify-end outline-none", gutter)}
    >
      <div className="mx-auto w-full max-w-[1296px] pb-[clamp(56px,10vh,120px)]">
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
          Remnants of a future
        </p>
      </div>
    </section>
  );
});
