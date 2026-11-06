import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
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
 *
 * Phones: no wordmark, and when the Order button hides (on the Order screen) Contact
 * slides right into the corner it leaves. Desktop keeps Contact in place.
 */
export function TopBar({ isLoaded, showWordmark, showOrder }: TopBarProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [contactShift, setContactShift] = useState(0);

  // Phones only: how far Contact moves right to fill the hidden Order button's spot
  useLayoutEffect(() => {
    const update = () => {
      const group = groupRef.current;
      const order = group?.lastElementChild as HTMLElement | null;
      if (!group || !order) return;
      const isPhone = window.matchMedia("(max-width: 767px)").matches;
      const gap = parseFloat(getComputedStyle(group).columnGap) || 0;
      setContactShift(isPhone && !showOrder ? order.offsetWidth + gap : 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [showOrder]);

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
            "inline-flex min-h-11 items-center whitespace-nowrap font-sans text-wordmark-m font-medium uppercase text-ink max-md:hidden",
            "transition-[opacity,visibility,color] duration-240 ease-out hover:text-ink-muted md:text-wordmark",
            fade(showWordmark),
          )}
          data-testid="link-wordmark"
        >
          Various Degrees
        </a>

        {/* 24px between Contact and Order. ml-auto keeps the group right when the wordmark is hidden. */}
        <div ref={groupRef} className="ml-auto flex items-center gap-6">
          <div
            className="pointer-events-auto transition-transform duration-240 ease-out motion-reduce:transition-none"
            style={{ transform: contactShift ? `translateX(${contactShift}px)` : undefined }}
          >
            <ContactPopover />
          </div>

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
