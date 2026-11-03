import { scrollToSection } from "@/lib/scroll";

/**
 * Bottom edge of the last (Order) screen: credits, kept faint on purpose.
 * Phones also get "Back to top ↑" here, since the top bar has no wordmark on phones;
 * on desktop the wordmark does that job.
 */
export function Footer() {
  return (
    <footer role="contentinfo" className="flex flex-col items-center text-center font-sans">
      <button
        type="button"
        onClick={() => scrollToSection("hero")}
        className="group mb-1 inline-flex min-h-11 items-center gap-2 font-sans text-note text-ink-muted transition-colors duration-160 ease-out hover:text-ink md:hidden"
        data-testid="button-back-to-top"
      >
        <span className="underline decoration-ink-muted/60 decoration-1 underline-offset-4">
          Back to top
        </span>
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-160 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none"
        >
          ↑
        </span>
      </button>

      {/* Mobile: one line */}
      <p className="text-footer-m md:hidden">
        <span className="text-ink/60" data-testid="text-copyright">
          © 2026 Various Degrees. All rights reserved.
        </span>
        <span className="text-ink/50"> · Designed by YRT</span>
      </p>

      {/* Desktop: two centred lines */}
      <div className="hidden flex-col items-center gap-2 text-footer md:flex">
        <p className="text-ink/60">© 2026 Various Degrees. All rights reserved.</p>
        <p className="text-ink/50" data-testid="text-credit">
          Designed by YRT
        </p>
      </div>
    </footer>
  );
}
