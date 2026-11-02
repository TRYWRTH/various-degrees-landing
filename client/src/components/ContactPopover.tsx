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
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
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
          className="absolute left-0 top-full mt-2 animate-fade-in rounded-2xl border border-hairline bg-night/70 p-2 backdrop-blur-lg motion-reduce:animate-none"
          data-testid="contact-info"
        >
          <a
            href="https://www.instagram.com/various.degrees/"
            target="_blank"
            rel="noopener"
            className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-ink transition-colors hover:text-ink-muted"
            data-testid="link-instagram"
          >
            <Instagram className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap text-sm font-medium">@various.degrees</span>
          </a>
          <a
            href="mailto:v.degrees@proton.me"
            className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-ink transition-colors hover:text-ink-muted"
            data-testid="link-email"
          >
            <Mail className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap text-sm font-medium">v.degrees@proton.me</span>
          </a>
        </div>
      )}
    </div>
  );
}
