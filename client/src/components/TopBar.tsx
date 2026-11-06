import { useEffect, useState } from "react";
import { ContactPopover } from "@/components/ContactPopover";
import { Arrow, gutter } from "@/components/sections/Section";
import { ORDER_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

/** Shared nav text style: DM Mono caps. */
export const navText =
  "font-mono text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-editorial-strong min-[380px]:text-[12px]";

const navLink = cn(
  navText,
  "inline-flex min-h-11 items-center underline-offset-[5px] decoration-1 hover:underline",
);

/**
 * Fixed nav: Contact and Order (the order form, new tab) in the top-right corner of every
 * screen. They hide while the page is moving and fade back in once it has settled, so
 * they never slide over text. On phones they show on the first screen only.
 * Keyboard focus keeps a link visible. Only the links take clicks.
 */

/**
 * Fallback: how long the page must be still before the links fade back in. Browsers
 * with the scrollend event bring them back the moment scrolling (and snapping) ends.
 */
const SETTLE_MS = 120;

export function TopBar() {
  const [pastHero, setPastHero] = useState(false);
  const [settled, setSettled] = useState(true);

  useEffect(() => {
    let frame = 0;
    let timer = 0;
    const update = () => {
      frame = 0;
      setPastHero(window.scrollY > window.innerHeight * 0.5);
    };
    const settle = () => {
      window.clearTimeout(timer);
      update();
      setSettled(true);
    };
    const onScroll = () => {
      setSettled(false);
      if (!frame) frame = requestAnimationFrame(update);
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, SETTLE_MS);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", settle);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", settle);
      window.removeEventListener("resize", update);
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
        className="m-nav mx-auto flex h-[72px] w-full max-w-[1296px] items-center justify-between gap-4"
      >

        <div
          className={cn(
            "ml-auto flex items-center gap-6 transition-opacity motion-reduce:transition-none min-[480px]:gap-10",
            // Phones: Contact and Order only on the first screen
            pastHero && "m-nav-past",
            settled
              ? "pointer-events-auto opacity-100 duration-200"
              : "pointer-events-none opacity-0 duration-150 focus-within:pointer-events-auto focus-within:opacity-100",
          )}
        >
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
