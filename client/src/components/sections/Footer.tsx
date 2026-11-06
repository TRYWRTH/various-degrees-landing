import { useLayoutEffect, useRef } from "react";
import { gutter } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

const footerText =
  "font-mono text-[12px] uppercase leading-[1.6] tracking-[0.08em] text-editorial-eyebrow";

/**
 * Page footer: the copyright line in the mono label style.
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
    <footer ref={ref} role="contentinfo" className={cn("d-footer relative pb-[calc(32px+env(safe-area-inset-bottom))]", gutter)}>
      <div className="mx-auto flex w-full max-w-[1296px] flex-col items-start">

        <p className={footerText} data-testid="text-copyright">
          © 2026 Various Degrees. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
