import { ContactPopover } from "@/components/ContactPopover";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PREORDER_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

type TopBarProps = {
  /** Compact Pre-order: hidden on the hero and while the Pre-order section is in view. */
  showPreorder: boolean;
  isLoaded: boolean;
};

/** Fixed, fully transparent top bar: no background, no blur, no border. */
export function TopBar({ showPreorder, isLoaded }: TopBarProps) {
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
          href={PREORDER_URL}
          size="compact"
          aria-hidden={!showPreorder}
          tabIndex={showPreorder ? undefined : -1}
          className={cn(
            "transition-[opacity,visibility,background-color] duration-240 ease-out",
            showPreorder ? "pointer-events-auto visible opacity-100" : "invisible opacity-0",
          )}
          data-testid="button-preorder-topbar"
        >
          Pre-order
        </PrimaryButton>
      </div>
    </header>
  );
}
