import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Contributor } from "@/data/contributors";
import { SectionLabel } from "@/components/sections/Section";
import { cn } from "@/lib/utils";
import { usePanelBackdropOffset } from "@/hooks/use-panel-backdrop-offset";
import backgroundImage from "@assets/01 Greek_1763915893499.png";

type ContributorPanelProps = {
  contributor: Contributor;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible contributor dialog.
 * Desktop: centred modal over a blurred scrim. Mobile: full-screen sheet that slides up.
 * Only the bio scrolls; label, name and Close stay pinned.
 */
export function ContributorPanel({ contributor, onClose }: ContributorPanelProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const [showFade, setShowFade] = useState(true);
  const nameId = `contributor-name-${contributor.slug}`;

  const updateFade = useCallback(() => {
    const el = bioRef.current;
    if (!el) return;
    setShowFade(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
  }, []);

  useLayoutEffect(() => {
    if (bioRef.current) bioRef.current.scrollTop = 0;
    updateFade();
  }, [contributor.slug, updateFade]);

  // Keep the panel's photo lined up with the page background
  usePanelBackdropOffset(dialogRef, photoRef);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    window.addEventListener("resize", updateFade);
    return () => window.removeEventListener("resize", updateFade);
  }, [updateFade]);

  // Esc closes; Tab is trapped inside the dialog.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const inside = dialogRef.current.contains(active);
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
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Scrim (desktop). Mobile is a full-screen sheet, so the scrim is never visible there. */}
      <div
        className="absolute inset-0 animate-fade-in bg-night/55 backdrop-blur-md motion-reduce:animate-none"
        onClick={onClose}
        aria-hidden="true"
        data-testid="panel-scrim"
      />

      <div className="pointer-events-none relative flex h-full flex-col md:items-center md:justify-center">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={nameId}
          className={cn(
            "panel-glass pointer-events-auto relative flex h-full w-full flex-col overflow-hidden",
            "animate-panel-up motion-reduce:animate-none md:animate-panel-in",
            "md:h-auto md:max-h-[min(700px,100svh-96px)] md:w-[min(820px,100vw-48px)] md:rounded-2xl md:border md:border-glass-border",
          )}
          data-testid="contributor-panel"
        >
          {/* Smoked glass: own blurred copy of the photo (z 0) + tint (z 1); content is z 2 */}
          <img ref={photoRef} src={backgroundImage} alt="" aria-hidden="true" className="panel-glass-photo" />
          <div className="panel-glass-tint" aria-hidden="true" />

          {/* Close: own bar on mobile, floating top-right on desktop; text only, no pill.
              z-3 keeps it above the name block, which overlaps it on desktop. */}
          <div
            className="relative z-[3] flex shrink-0 justify-end border-b border-glass-divider p-3 md:absolute md:right-4 md:top-4 md:border-0 md:p-0"
            style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center gap-2 px-2 font-sans text-button-compact font-medium uppercase text-ink transition-colors duration-160 hover:text-ink-muted"
              data-testid="button-panel-close"
            >
              Close <span aria-hidden="true" className="text-[16px] leading-none">×</span>
            </button>
          </div>

          <div className="relative z-[2] flex shrink-0 flex-col items-center px-gutter pt-8 text-center md:px-24 md:pt-20">
            {contributor.discipline && (
              <SectionLabel className="mb-4">{contributor.discipline}</SectionLabel>
            )}
            <h2
              id={nameId}
              className="text-balance font-forum text-panel-name-m text-ink md:text-panel-name"
            >
              {contributor.name}
            </h2>
            {contributor.link && (
              <a
                href={contributor.link.href}
                target="_blank"
                rel="noopener"
                aria-label={`${contributor.name}${contributor.link.label.startsWith("@") ? " on Instagram" : ", website"} (opens in a new tab)`}
                className="group mt-2 inline-flex min-h-11 items-center gap-1.5 font-sans text-link text-glass-text transition-colors duration-160 ease-out hover:text-ink md:mt-3"
                data-testid="link-contributor"
              >
                <span className="underline decoration-glass-text/60 decoration-1 underline-offset-[6px] group-hover:decoration-ink">
                  {contributor.link.label}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-160 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                >
                  ↗
                </span>
              </a>
            )}
          </div>

          <div
            ref={bioRef}
            onScroll={updateFade}
            tabIndex={0}
            aria-label={`About ${contributor.name}`}
            className="slim-scrollbar relative z-[2] mt-6 min-h-0 flex-1 overflow-y-auto overscroll-contain px-gutter md:mt-8 md:px-24"
            style={{ paddingBottom: "calc(72px + env(safe-area-inset-bottom))" }}
          >
            <p className="mx-auto max-w-[70ch] hyphens-manual text-pretty text-left font-sans text-panel-bio-m text-glass-text md:text-panel-bio">
              {contributor.bio}
            </p>
          </div>

          {/* Bottom fade */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[72px] bg-gradient-to-t from-glass-fade to-glass-clear transition-opacity duration-200",
              showFade ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      </div>
    </div>
  );
}
