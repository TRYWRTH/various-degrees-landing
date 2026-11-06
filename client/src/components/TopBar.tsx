import type { MouseEvent } from "react";
import { ContactPopover } from "@/components/ContactPopover";
import { Arrow, gutter } from "@/components/sections/Section";
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
 * Nav over the first screen (it scrolls away with it): "Various Degrees" on the left
 * back to the top, Contact and Order on the right as plain text links.
 */
export function TopBar() {
  return (
    <header
      className={cn("absolute inset-x-0 top-0 z-20", gutter)}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[72px] w-full max-w-[1296px] items-center justify-between gap-4"
      >
        <a href="#hero" onClick={goTo("hero")} className={navLink} data-testid="link-wordmark">
          Various Degrees
        </a>

        <div className="flex items-center gap-6 min-[480px]:gap-10">
          <ContactPopover />
          <a
            href="#order"
            onClick={goTo("order")}
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
