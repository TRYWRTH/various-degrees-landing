/** Scroll back to the hero (the page scrolls inside the snap container). */
function backToTop() {
  const hero = document.getElementById("hero");
  if (!hero) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  hero.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  hero.focus({ preventScroll: true });
}

/**
 * Page-end strip at the bottom of the last (Order) screen: "Back to top" and the
 * credits. Contact lives in the top bar.
 */
export function Footer() {
  return (
    <footer role="contentinfo" className="flex flex-col items-center text-center font-sans">
      <button
        type="button"
        onClick={backToTop}
        className="group mb-1 inline-flex min-h-11 items-center gap-2 font-sans text-note text-ink-muted transition-colors duration-160 ease-out hover:text-ink md:mb-2"
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
        <span className="text-white/55" data-testid="text-copyright">
          © 2026 Various Degrees. All rights reserved.
        </span>
        <span className="text-white/45"> · Designed by YRT</span>
      </p>

      {/* Desktop: two centred lines */}
      <div className="hidden flex-col items-center gap-2 text-footer md:flex">
        <p className="text-white/55">© 2026 Various Degrees. All rights reserved.</p>
        <p className="text-white/45" data-testid="text-credit">
          Designed by YRT
        </p>
      </div>
    </footer>
  );
}
