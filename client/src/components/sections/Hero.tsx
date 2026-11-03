import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

type HeroProps = {
  isLoaded: boolean;
};

/**
 * Unchanged hero. Its opacity (`scrollOpacity`) is written directly by the
 * page's scroll handler through the forwarded ref.
 */
export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero({ isLoaded }, ref) {
  return (
    <section
      id="hero"
      ref={ref}
      tabIndex={-1}
      className="relative flex outline-none min-h-[100svh] snap-start snap-always items-center justify-center px-6 py-16"
      style={{ transition: "opacity 0.3s ease-out" }}
    >
      <div className="flex flex-col items-center gap-3 md:gap-4">
        <h1
          className={`
            text-center font-display text-display-m uppercase text-ink transition-all duration-1000
            md:text-display
            ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
          `}
          style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)" }}
          data-testid="text-title"
        >
          <span className="block md:inline">Various</span> <span className="block md:inline">Degrees</span>
        </h1>
        <p
          className={`
            text-center font-display text-subtitle-m italic text-ink/90 transition-all duration-1000
            md:text-subtitle
            ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
          `}
          style={{
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
            transitionDelay: "200ms",
          }}
          data-testid="text-subtitle"
        >
          Remnants of a future
        </p>
      </div>

      {/* Scroll Indicator: on phones small, faint and near the bottom edge, just a hint */}
      <div
        className={`
          absolute bottom-[calc(20px+env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 transition-all duration-1000
          md:bottom-8 md:gap-2
          ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
        `}
        style={{ transitionDelay: "1200ms" }}
        data-testid="scroll-indicator"
        aria-hidden="true"
      >
        <p className="text-[10px] uppercase tracking-widest text-ink/50 md:text-sm md:text-ink/70">Scroll</p>
        <div className="animate-bounce">
          <ChevronDown className="h-4 w-4 text-ink/50 md:h-8 md:w-8 md:text-ink/70" />
        </div>
      </div>
    </section>
  );
});
