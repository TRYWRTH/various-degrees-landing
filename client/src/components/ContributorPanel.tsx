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

/** 14px stroke × for Close. */
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
      <path d="M2 2L12 12M12 2L2 12" />
    </svg>
  );
}

/** 16px stroke ↗ after the external link. */
function ExternalArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d="M4 12L12 4M5.5 4H12V10.5" />
    </svg>
  );
}

/**
 * Contributor dialog: a full-screen text page over the same blurred photo as the site,
 * under a darker overlay. The whole overlay scrolls when the bio is long.
 *
 * Focus moves to the dialog on open (the dialog itself, so iOS doesn't draw a ring on
 * Close after a tap; Tab then reaches Close), Tab is trapped inside, Esc, Close, Back
 * and a click on empty space fade it
 * out, and the page returns focus to the name of the artist last shown.
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

  // A click on empty space closes it; clicks on the text, links and buttons don't, and
  // neither does the click that ends a text selection.
  const onBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest("a, button, h2, p")) return;
    if (window.getSelection()?.toString()) return;
    requestClose();
  };

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
            <p className={numberLabelClass}>03 — Contributors</p>
            <button
              type="button"
              onClick={requestClose}
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[12px] font-normal uppercase leading-none tracking-[0.2em] text-editorial-strong decoration-1 underline-offset-[5px] hover:underline"
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
                    className="m-bio-link mt-9 inline-flex items-center gap-2 border-b border-current pb-1 font-tight text-[20px] font-normal leading-none text-editorial-body hover:text-white"
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
                  className={cn(paragraphClass, "hyphens-none sm:text-justify min-[900px]:text-[clamp(17px,min(1.7vw,2.9vh),25px)]")}
                  data-testid="text-contributor-bio"
                >
                  {contributor.bio}
                </p>

                {/* Second exit, right where the reading ends */}
                <button
                  type="button"
                  onClick={requestClose}
                  className="m-bio-back mt-[clamp(24px,4vh,40px)] inline-flex items-center gap-2.5 border-b border-current pb-1 font-tight text-[clamp(19px,1.7vw,25px)] font-normal leading-none tracking-[-0.01em] text-editorial-strong hover:text-white min-[900px]:text-[clamp(17px,min(1.7vw,2.9vh),25px)]"
                  data-testid="button-panel-back"
                >
                  {/* Same size as the bio text */}
                  <span className="rotate-180">
                    <Arrow size={18} />
                  </span>
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* Browse without closing: previous on the left, next on the right (wraps around) */}
          <nav
            aria-label="Other contributors"
            className="mt-[clamp(56px,6.7vw,96px)] flex shrink-0 items-start justify-between gap-6 font-tight text-[clamp(17px,1.4vw,20px)] font-normal leading-[1.3] text-editorial-body min-[900px]:mt-0 min-[900px]:pb-[clamp(16px,4vh,40px)]"
          >
            <button
              type="button"
              onClick={() => browse(previous.slug)}
              className="inline-flex min-h-11 max-w-[48%] items-center gap-2 text-left decoration-1 underline-offset-[0.18em] hover:text-white hover:underline"
              data-testid="button-panel-previous"
            >
              <span className="rotate-180">
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
              className="inline-flex min-h-11 max-w-[48%] items-center gap-2 text-right decoration-1 underline-offset-[0.18em] hover:text-white hover:underline"
              data-testid="button-panel-next"
            >
              <span>
                <span className="sr-only">Next: </span>
                {next.name}
              </span>
              <Arrow size={16} />
            </button>
          </nav>
          <p className="sr-only" aria-live="polite">
            {contributor.name}
          </p>
        </div>
      </div>
    </div>
  );
}
