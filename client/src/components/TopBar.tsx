import type { MouseEvent } from "react";
import { ContactPopover } from "@/components/ContactPopover";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";

type TopBarProps = {
  /** Compact Order (jumps to the Order section): hidden on the hero and while the Order section is in view. */
  showOrder: boolean;
  isLoaded: boolean;
};

/** Scroll to the Order section (details + order form) instead of leaving the site. */
function goToOrder(e: MouseEvent<HTMLAnchorElement>) {
  const section = document.getElementById("order");
  if (!section) return;
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  section.focus({ preventScroll: true });
}

/** Fixed, fully transparent top bar: no background, no blur, no border. */
export function TopBar({ showOrder, isLoaded }: TopBarProps) {
  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-30 transition-opacity duration-1000",
        isLoaded ? "opacity-100" : "opacity-0",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)", transitionDelay: "1200ms" }}
    >
      <div
        className="flex h-topbar-m items-center justify-between md:h-topbar"
        style={{
          paddingLeft: "max(var(--topbar-pl), env(safe-area-inset-left))",
          paddingRight: "max(var(--topbar-pr), env(safe-area-inset-right))",
        }}
      >
        <ContactPopover className="pointer-events-auto" />

        <PrimaryButton
          href="#order"
          external={false}
          onClick={goToOrder}
          size="compact"
          aria-hidden={!showOrder}
          tabIndex={showOrder ? undefined : -1}
          className={cn(
            "transition-[opacity,visibility,background-color] duration-240 ease-out",
            showOrder ? "pointer-events-auto visible opacity-100" : "invisible opacity-0",
          )}
          data-testid="button-order-topbar"
        >
          Order
        </PrimaryButton>
      </div>
    </header>
  );
}
