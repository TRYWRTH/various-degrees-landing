import { useEffect, useState, type MouseEvent } from "react";
import { ContactPopover } from "@/components/ContactPopover";
import { Arrow, gutter } from "@/components/sections/Section";
import { ORDER_URL } from "@/lib/links";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/** In-page links: scroll smoothly (instantly with reduced motion) and move focus there. */
const goTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  if (scrollToSection(id)) e.preventDefault();
};

/** Shared nav text style: DM Mono caps. */
export const navText =
  "font-mono text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-editorial-strong min-[380px]:text-[12px]";

const navLink = cn(
  navText,
  "inline-flex min-h-11 items-center underline-offset-[5px] decoration-1 hover:underline",
);

/**
 * Fixed nav: Contact and Order (the order form, new tab) stay in the top-right corner on
 * every screen. "Various Degrees" (back to the top) shows on the first screen only and
 * fades out once you scroll past it, so it never sits on top of a section's label.
 * Transparent, with a soft dark text shadow so the links stay readable when text
 * scrolls underneath. Only the links take clicks; the rest of the bar lets them through.
 */
export function TopBar() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setPastHero(window.scrollY > window.innerHeight * 0.5);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={cn("pointer-events-none fixed inset-x-0 top-0 z-20", gutter)}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        textShadow: "0 0 10px rgb(10 11 8 / 0.9), 0 0 2px rgb(10 11 8 / 0.8)",
      }}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[72px] w-full max-w-[1296px] items-center justify-between gap-4"
      >
        <a
          href="#hero"
          onClick={goTo("hero")}
          aria-hidden={pastHero || undefined}
          tabIndex={pastHero ? -1 : undefined}
          className={cn(
            navLink,
            "transition-opacity duration-200 motion-reduce:transition-none",
            pastHero ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
          )}
          data-testid="link-wordmark"
        >
          Various Degrees
        </a>

        <div className="pointer-events-auto ml-auto flex items-center gap-6 min-[480px]:gap-10">
          <ContactPopover />
          {/* Straight to the order form, like the Order link in the publication section */}
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener"
            className={cn(navLink, "gap-2 underline")}
            data-testid="link-order-nav"
          >
            Order
            <Arrow size={14} />
          </a>
        </div>
      </nav>
    </header>
  );
}
