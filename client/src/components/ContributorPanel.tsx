import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import type { Contributor } from "@/data/contributors";
import { Arrow, gutter, numberLabelClass, paragraphClass, rightColumn } from "@/components/sections/Section";
import { cn } from "@/lib/utils";
import backgroundImage from "@assets/01-greek.webp";

type ContributorPanelProps = {
  contributor: Contributor;
  /** Neighbours in the list (wrapping around), for the previous / next links. */
  previous: Contributor;
  next: Contributor;
  onNavigate: (slug: string) => void;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/** Matches the 200ms opacity fade. */
const FADE_MS = 200;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** 12px stroke × for Close. */
function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M1.5 1.5L10.5 10.5M10.5 1.5L1.5 10.5" />
    </svg>
  );
}

/** Mouse and trackpad only: the media query that switches on the cursor label. */
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** 16px stroke ↗ after the external link. */
function ExternalArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="nudge-ne shrink-0">
      <path d="M4 12L12 4M5.5 4H12V10.5" />
    </svg>
  );
}

/**
 * Contributor dialog: a full-screen text page over the same blurred photo as the site,
 * under a darker overlay. The whole overlay scrolls when the bio is long.
 *
 * Closing: a click or tap anywhere closes it, except on the handle, previous / next and
 * the close button, and except the click that ends a text selection; Esc closes too.
 * Mouse and trackpad (hover + fine pointer): a "Close ×" label follows the pointer and
 * hides the native cursor over the close area. Touch: a small "Click anywhere to close"
 * in the top-right corner. A real, visually hidden "Close bio" button is always there
 * and shows on keyboard focus.
 *
 * Focus moves to the dialog on open (Tab then reaches the close button), Tab is
 * trapped inside, and on close the page returns focus to the name of the artist last
 * shown.
 *
 * Previous / next swap the artist in place: back to the top, focus stays on the link
 * that was pressed (so you can keep pressing it), and the new name is announced.
 */
export function ContributorPanel({ contributor, previous, next, onNavigate, onClose }: ContributorPanelProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);
  const browsingRef = useRef(false);
  const nameId = `contributor-name-${contributor.slug}`;

  // Fade in on the next frame; focus the dialog and start at its top.
  // When browsing to a neighbour, only jump back to the top.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) dialog.scrollTop = 0;
    if (browsingRef.current) {
      browsingRef.current = false;
      return;
    }
    dialog?.focus({ preventScroll: true });
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [contributor.slug]);

  const browse = (slug: string) => {
    browsingRef.current = true;
    onNavigate(slug);
  };

  // Fade out, then let the page unmount it (and restore focus)
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    window.setTimeout(onClose, prefersReducedMotion() ? 0 : FADE_MS);
  }, [onClose]);

  // Esc closes; Tab is trapped inside the dialog.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const inside = dialogRef.current.contains(active) && active !== dialogRef.current;
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [requestClose]);

  // A click anywhere closes it (name and bio text included), except on links and
  // buttons, and except the click that ends a text selection.
  const onBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    // Everything closes except the Instagram / website link and the controls that do
    // their own thing (previous / next, Close, Back)
    if ((e.target as Element).closest("a, button")) return;
    if (window.getSelection()?.toString()) return;
    requestClose();
  };

  // Mouse / trackpad: the "Close ×" label follows the pointer (pointermove + rAF);
  // it fades out over links and buttons and hides when the pointer leaves the window.
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const label = cursorRef.current;
    const fine = window.matchMedia(FINE_POINTER);
    if (!dialog || !label) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    let state: "hidden" | "shown" | "over-link" = "hidden";
    const paint = () => {
      frame = 0;
      label.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      label.dataset.state = state;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.pointerType === "pen") return;
      x = e.clientX;
      y = e.clientY;
      state = (e.target as Element).closest("a, button") ? "over-link" : "shown";
      schedule();
    };
    const onLeave = () => {
      state = "hidden";
      schedule();
    };
    const attach = () => {
      dialog.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
    };
    const detach = () => {
      dialog.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      onLeave();
    };
    const onChange = () => (fine.matches ? attach() : detach());
    if (fine.matches) attach();
    fine.addEventListener?.("change", onChange);
    return () => {
      cancelAnimationFrame(frame);
      detach();
      fine.removeEventListener?.("change", onChange);
    };
  }, []);

  const isInstagram = contributor.link?.label.startsWith("@");

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={nameId}
      tabIndex={-1}
      onClick={onBackgroundClick}
      className={cn(
        "fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-night outline-none",
        "transition-opacity duration-200 ease-out motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
      )}
      data-testid="contributor-panel"
    >
      {/* The site's photo, fixed while the text scrolls, under a 55% → 88% overlay
          (64% at the top on phones, where the photo's light sky sits behind the label) */}
      <div className="fixed inset-0 overflow-hidden" aria-hidden="true">
        <img src={backgroundImage} alt="" className="m-photo absolute inset-0 h-full w-full scale-[1.04] object-cover blur-[8px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_11_8/0.64),rgb(10_11_8/0.88))] md:bg-[linear-gradient(to_bottom,rgb(10_11_8/0.55),rgb(10_11_8/0.88))]" />
      </div>

      <div
        className={cn("relative pb-[clamp(96px,9.7vw,140px)] min-[900px]:pb-0", gutter)}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {/* Wide screens: one screen tall, name left and bio right, centred vertically so
            the whole bio fits without scrolling. Phones: stacked, and the overlay scrolls. */}
        <div className="mx-auto flex w-full max-w-[1296px] flex-col min-[900px]:min-h-[100svh]">
          <div className="flex h-[72px] shrink-0 items-center justify-between gap-4">
            <p className={cn(numberLabelClass, "bio-label")}>03 — Contributors</p>
            {/* Touch screens only: the one close hint */}
            <p className="bio-hint" aria-hidden="true">
              Click anywhere to close
            </p>
            {/* Always in the DOM; visually hidden until it has keyboard focus */}
            <button
              type="button"
              onClick={requestClose}
              aria-label="Close bio"
              className="bio-close"
              data-testid="button-panel-close"
            >
              Close
              <CloseIcon />
            </button>
          </div>

          <div className="min-[900px]:flex min-[900px]:flex-1 min-[900px]:items-center min-[900px]:pb-[clamp(48px,9vh,96px)] min-[900px]:pt-[clamp(24px,4vh,48px)]">
            <div className="w-full min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_min(600px,55%)] min-[900px]:items-start min-[900px]:gap-x-[clamp(48px,6vw,96px)]">
              <div>
                {contributor.discipline && (
                  <p className={cn(numberLabelClass, "mb-6 mt-[clamp(40px,5.6vw,80px)] min-[900px]:mt-0")}>
                    {contributor.discipline}
                  </p>
                )}
                <h2
                  id={nameId}
                  className={cn(
                    "font-tight text-[clamp(46px,8vw,128px)] font-light leading-[0.98] tracking-[-0.045em] text-editorial-strong",
                    "min-[900px]:mt-0 min-[900px]:text-[clamp(46px,min(7vw,12vh),112px)]",
                    !contributor.discipline && "mt-[clamp(56px,8.3vw,120px)]",
                  )}
                >
                  {contributor.name}
                </h2>

                {contributor.link && (
                  <a
                    href={contributor.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${contributor.name}${isInstagram ? " on Instagram" : ", website"} (opens in a new tab)`}
                    className="group m-bio-link mt-9 inline-flex items-center gap-2 border-b border-current pb-1 font-tight text-[20px] font-normal leading-none text-editorial-body hover:text-white"
                    data-testid="link-contributor"
                  >
                    {contributor.link.label}
                    <ExternalArrow />
                  </a>
                )}
              </div>

              <div className={cn(rightColumn, "mt-[clamp(56px,6.7vw,96px)] min-[900px]:ml-0 min-[900px]:mt-0 min-[900px]:max-w-none")}>
                {/* On wide screens the size also follows the window height, so short laptop screens fit too */}
                <p
                  className={cn(paragraphClass, "hyphens-none text-left min-[900px]:text-[clamp(17px,min(1.7vw,2.9vh),25px)]")}
                  data-testid="text-contributor-bio"
                >
                  {contributor.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Browse without closing: previous on the left, next on the right (wraps around) */}
          <nav
            aria-label="Other contributors"
            className="bio-nav mt-[clamp(56px,6.7vw,96px)] flex shrink-0 items-start justify-between gap-6 font-tight text-[clamp(17px,1.4vw,20px)] font-normal leading-[1.3] text-[rgb(244_241_234/0.6)] min-[900px]:mt-0 min-[900px]:pb-[clamp(16px,4vh,40px)]"
          >
            <button
              type="button"
              onClick={() => browse(previous.slug)}
              className="group inline-flex min-h-11 max-w-[48%] items-center gap-2 text-left decoration-1 underline-offset-[0.18em] hover:text-white hover:underline"
              data-testid="button-panel-previous"
            >
              <span className="nudge-l rotate-180">
                <Arrow size={16} />
              </span>
              <span>
                <span className="sr-only">Previous: </span>
                {previous.name}
              </span>
            </button>
            <button
              type="button"
              onClick={() => browse(next.slug)}
              className="group inline-flex min-h-11 max-w-[48%] items-center gap-2 text-right decoration-1 underline-offset-[0.18em] hover:text-white hover:underline"
              data-testid="button-panel-next"
            >
              <span>
                <span className="sr-only">Next: </span>
                {next.name}
              </span>
              <span className="nudge-r">
                <Arrow size={16} />
              </span>
            </button>
          </nav>
          <p className="sr-only" aria-live="polite">
            {contributor.name}
          </p>
        </div>
      </div>

      {/* Mouse / trackpad: the label that follows the pointer */}
      <div ref={cursorRef} className="bio-cursor" data-state="hidden" aria-hidden="true">
        Close
        <CloseIcon />
      </div>
    </div>
  );
}
