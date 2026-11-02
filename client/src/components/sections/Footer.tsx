import { forwardRef } from "react";

/** Short snap-end block with credits only (contact lives in the top bar). */
export const Footer = forwardRef<HTMLElement>(function Footer(_props, ref) {
  return (
    <footer
      id="footer"
      ref={ref}
      className="relative flex h-[calc(120px+env(safe-area-inset-bottom))] snap-end flex-col items-center justify-center px-6 pb-[env(safe-area-inset-bottom)] text-center font-sans md:h-[200px]"
    >
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
});
