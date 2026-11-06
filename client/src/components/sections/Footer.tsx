import { useLayoutEffect, useRef } from "react";
import { gutter } from "@/components/sections/Section";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const footerText =
  "font-mono text-[12px] uppercase leading-[1.6] tracking-[0.08em] text-editorial-eyebrow";

/**
 * Page footer: the same credits as before, now in the mono label style.
 * Phones also get "Back to top ↑" here, as before.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);

  // The last section uses this to end exactly one screen above the page bottom
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() => root.style.setProperty("--footer-h", `${el.offsetHeight}px`));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} role="contentinfo" className={cn("relative pb-[calc(32px+env(safe-area-inset-bottom))]", gutter)}>
      <div className="mx-auto flex w-full max-w-[1296px] flex-col items-start">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className={cn(footerText, "mb-3 inline-flex min-h-11 items-center gap-2 text-editorial-strong md:hidden")}
          data-testid="button-back-to-top"
        >
          <span className="underline decoration-1 underline-offset-4">Back to top</span>
          <span aria-hidden="true">↑</span>
        </button>

        {/* Mobile: one line */}
        <p className={cn(footerText, "md:hidden")}>
          <span data-testid="text-copyright">© 2026 Various Degrees. All rights reserved.</span>
          <span> · Designed by YRT</span>
        </p>

        {/* Desktop: two lines */}
        <div className={cn(footerText, "hidden flex-col gap-1 md:flex")}>
          <p>© 2026 Various Degrees. All rights reserved.</p>
          <p data-testid="text-credit">Designed by YRT</p>
        </div>
      </div>
    </footer>
  );
}
