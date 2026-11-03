import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Contributor } from "@/data/contributors";
import { SectionLabel } from "@/components/sections/Section";
import { cn } from "@/lib/utils";

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
            "pointer-events-auto relative flex h-full w-full flex-col overflow-hidden bg-surface",
            "animate-panel-up motion-reduce:animate-none md:animate-panel-in",
            "md:h-auto md:max-h-[min(700px,100svh-96px)] md:w-[min(820px,100vw-48px)] md:rounded-2xl md:border md:border-hairline",
          )}
          data-testid="contributor-panel"
        >
          {/* Close: own bar on mobile, floating top-right pill on desktop */}
          <div
            className="flex shrink-0 justify-end border-b border-hairline-soft p-3 md:absolute md:right-4 md:top-4 md:z-10 md:border-0 md:p-0"
            style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-hairline-soft px-5 font-sans text-button-compact font-medium uppercase text-ink transition-colors duration-160 hover:bg-hairline"
              data-testid="button-panel-close"
            >
              Close <span aria-hidden="true" className="text-[16px] leading-none">×</span>
            </button>
          </div>

          <div className="flex shrink-0 flex-col items-center px-gutter pt-8 text-center md:px-24 md:pt-20">
            {contributor.discipline && (
              <SectionLabel className="mb-4">{contributor.discipline}</SectionLabel>
            )}
            <h2
              id={nameId}
              className="text-balance font-forum text-panel-name-m text-ink md:text-panel-name"
            >
              {contributor.name}
            </h2>
          </div>

          <div
            ref={bioRef}
            onScroll={updateFade}
            tabIndex={0}
            aria-label={`About ${contributor.name}`}
            className="slim-scrollbar mt-6 min-h-0 flex-1 overflow-y-auto overscroll-contain px-gutter md:mt-8 md:px-24"
            style={{ paddingBottom: "calc(72px + env(safe-area-inset-bottom))" }}
          >
            <p className="mx-auto max-w-[70ch] hyphens-auto text-justify font-sans text-panel-bio-m text-ink-muted md:text-panel-bio">
              {contributor.bio}
            </p>
          </div>

          {/* Bottom fade */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-[72px] bg-gradient-to-t from-surface to-transparent transition-opacity duration-200",
              showFade ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      </div>
    </div>
  );
}
