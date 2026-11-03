/**
 * Credits along the bottom edge of the last (Order) screen. Kept faint on purpose.
 * (Back to the top: the "Various Degrees" wordmark in the top bar.)
 */
export function Footer() {
  return (
    <footer role="contentinfo" className="flex flex-col items-center text-center font-sans">
      {/* Mobile: one line */}
      <p className="text-footer-m md:hidden">
        <span className="text-ink/35" data-testid="text-copyright">
          © 2026 Various Degrees. All rights reserved.
        </span>
        <span className="text-ink/25"> · Designed by YRT</span>
      </p>

      {/* Desktop: two centred lines */}
      <div className="hidden flex-col items-center gap-2 text-footer md:flex">
        <p className="text-ink/35">© 2026 Various Degrees. All rights reserved.</p>
        <p className="text-ink/25" data-testid="text-credit">
          Designed by YRT
        </p>
      </div>
    </footer>
  );
}
