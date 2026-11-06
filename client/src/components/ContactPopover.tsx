import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ContactPopoverProps = {
  className?: string;
};

/**
 * "Contact" text button in the nav + the email/Instagram popover, anchored under it
 * (right-aligned). Text only, in the nav's mono style.
 */
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
    // Close on any scroll (capture phase catches the page and inner scrollers alike).
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
        className="inline-flex min-h-11 items-center font-mono text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-editorial-strong decoration-1 underline-offset-[5px] hover:underline min-[380px]:text-[12px]"
        data-testid="button-contact"
      >
        Contact
      </button>

      {open && (
        <div
          id={popoverId}
          className="absolute right-0 top-full flex animate-fade-in flex-col items-end motion-reduce:animate-none"
          // Text only: a soft dark shadow behind the letters keeps them readable on the photo
          style={{ textShadow: "0 0 10px rgb(10 11 8 / 0.9), 0 0 2px rgb(10 11 8 / 0.8)" }}
          data-testid="contact-info"
        >
          <a
            href="https://www.instagram.com/various.degrees/"
            target="_blank"
            rel="noopener"
            className="flex min-h-11 items-center text-editorial-strong decoration-1 underline-offset-[5px] hover:underline"
            data-testid="link-instagram"
          >
            <span className="whitespace-nowrap font-mono text-[12px] tracking-[0.08em]">@various.degrees</span>
          </a>
          <a
            href="mailto:v.degrees@proton.me"
            className="flex min-h-11 items-center text-editorial-strong decoration-1 underline-offset-[5px] hover:underline"
            data-testid="link-email"
          >
            <span className="whitespace-nowrap font-mono text-[12px] tracking-[0.08em]">v.degrees@proton.me</span>
          </a>
        </div>
      )}
    </div>
  );
}
