import type { MouseEvent } from "react";
import { ContactPopover } from "@/components/ContactPopover";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

type TopBarProps = {
  isLoaded: boolean;
  /** Wordmark: hidden on the hero, which already shows the title large. */
  showWordmark: boolean;
  /** Compact Order (jumps to the Order section): hidden only while the Order section is in view. */
  showOrder: boolean;
};

/** In-page links: scroll inside the snap container instead of jumping to the hash. */
const goTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  if (scrollToSection(id)) e.preventDefault();
};

const fade = (visible: boolean) =>
  visible ? "pointer-events-auto visible opacity-100" : "invisible opacity-0";

/**
 * Fixed, fully transparent top bar: no background, no blur, no border.
 * Left: "Various Degrees" wordmark (back to the top). Right: Contact, then Order.
 * Wordmark and Contact share one text style (Inter caps), the wordmark one step larger;
 * everything is smaller on phones.
 */
export function TopBar({ isLoaded, showWordmark, showOrder }: TopBarProps) {
  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-30 transition-opacity duration-1000",
        isLoaded ? "opacity-100" : "opacity-0",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)", transitionDelay: "1200ms" }}
    >
      <div
        className="flex h-topbar-m items-center justify-between gap-3 md:h-topbar"
        style={{
          paddingLeft: "max(var(--topbar-pl), env(safe-area-inset-left))",
          paddingRight: "max(var(--topbar-pr), env(safe-area-inset-right))",
        }}
      >
        <a
          href="#hero"
          onClick={goTo("hero")}
          aria-hidden={!showWordmark}
          tabIndex={showWordmark ? undefined : -1}
          className={cn(
            "inline-flex min-h-11 items-center whitespace-nowrap font-sans text-wordmark-m font-medium uppercase text-ink",
            "transition-[opacity,visibility,color] duration-240 ease-out hover:text-ink-muted md:text-wordmark",
            fade(showWordmark),
          )}
          data-testid="link-wordmark"
        >
          Various Degrees
        </a>

        {/* ~24px between Contact and Order; 16px on very narrow phones so the bar fits */}
        <div className="flex items-center gap-6 max-[359px]:gap-4">
          <ContactPopover className="pointer-events-auto" />

          <PrimaryButton
            href="#order"
            external={false}
            onClick={goTo("order")}
            size="compact"
            aria-hidden={!showOrder}
            tabIndex={showOrder ? undefined : -1}
            className={cn(
              "transition-[opacity,visibility,background-color] duration-240 ease-out",
              fade(showOrder),
            )}
            data-testid="button-order-topbar"
          >
            Order
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
}
