import { useEffect, useId, useRef, useState } from "react";
import { Instagram, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type ContactPopoverProps = {
  className?: string;
};

/** "Contact" text button in the top bar + the email/Instagram popover, anchored top-left. */
export function ContactPopover({ className }: ContactPopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // The page scrolls inside the snap container, not the window, so listen in the
    // capture phase to catch scroll events from any element.
    const onScroll = () => setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={popoverId}
        className="inline-flex min-h-11 items-center font-sans text-label-m font-medium uppercase text-ink md:text-label"
        data-testid="button-contact"
      >
        Contact
      </button>

      {open && (
        <div
          id={popoverId}
          className="absolute left-0 top-full animate-fade-in motion-reduce:animate-none"
          style={{ textShadow: "0 2px 12px rgba(0, 0, 0, 0.6)" }}
          data-testid="contact-info"
        >
          <a
            href="https://www.instagram.com/various.degrees/"
            target="_blank"
            rel="noopener"
            className="flex min-h-11 items-center gap-3 text-ink transition-colors hover:text-ink-muted"
            data-testid="link-instagram"
          >
            <Instagram className="h-5 w-5 flex-shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" aria-hidden="true" />
            <span className="whitespace-nowrap text-sm font-medium">@various.degrees</span>
          </a>
          <a
            href="mailto:v.degrees@proton.me"
            className="flex min-h-11 items-center gap-3 text-ink transition-colors hover:text-ink-muted"
            data-testid="link-email"
          >
            <Mail className="h-5 w-5 flex-shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" aria-hidden="true" />
            <span className="whitespace-nowrap text-sm font-medium">v.degrees@proton.me</span>
          </a>
        </div>
      )}
    </div>
  );
}
