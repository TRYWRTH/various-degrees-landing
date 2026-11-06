import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  id: string;
  children: ReactNode;
  /** Soft snapping on big screens (see index.css); "last" leaves room for the footer. */
  snap?: "section" | "last";
};

/** Page gutter shared by the nav, every section and the footer. */
export const gutter = "px-[clamp(20px,5vw,72px)]";

/**
 * One text section on the flowing page: left-aligned, content up to 1296px wide.
 * Focusable (tabIndex -1) so in-page links can move focus here after scrolling.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, className, children, snap = "section", ...rest },
  ref,
) {
  return (
    <section
      id={id}
      ref={ref}
      tabIndex={-1}
      className={cn(
        "relative outline-none",
        snap === "last" ? "snap-section-last" : "snap-section",
        gutter,
        className,
      )}
      {...rest}
    >
      <div className="mx-auto w-full max-w-[1296px]">{children}</div>
    </section>
  );
});

/**
 * The text of a section label ("01 — About"). Desktop shows the em dash; phones swap it
 * for a drawn dash that grows when the section is centred (index.css). Screen readers
 * hear "01 to About".
 */
export function NumLabel({ n, name }: { n: string; name: string }) {
  return (
    <>
      {n}
      <span className="m-dash-text" aria-hidden="true">
        {" — "}
      </span>
      <span className="dash hidden" aria-hidden="true" />
      <span className="sr-only"> to </span>
      {name}
    </>
  );
}

/** Small mono label that opens each section ("01 — About"). */
export const numberLabelClass =
  "font-mono text-[12px] font-normal uppercase leading-none tracking-[0.08em] text-editorial-eyebrow";

/** Gap between a section's label and its headline or content. */
export const afterLabel = "mt-[clamp(36px,4vw,56px)] fit:mt-[clamp(20px,4vh,56px)]";

/**
 * Section padding: generous on phones and small windows; on desktop screens where each
 * section is one screen tall (`fit`), it follows the window height so everything fits.
 */
export const sectionPad =
  "pt-[clamp(88px,10.4vw,150px)] pb-[clamp(104px,11.8vw,170px)] fit:pt-[clamp(112px,16vh,160px)] fit:pb-[clamp(24px,4vh,64px)]";

/** Large headlines (About, Launch): on `fit` screens the size also follows the height. */
export const headlineSize = "text-[clamp(36px,5.4vw,84px)] fit:text-[clamp(36px,min(5.4vw,9vh),84px)]";

/** Large text links (Order, RSVP). */
export const bigLinkSize = "text-[clamp(32px,3.4vw,52px)] fit:text-[clamp(28px,min(3.4vw,5.6vh),52px)]";

/** Paragraph style shared by Launch, About and The publication. */
export const paragraphClass =
  "font-tight text-[clamp(19px,1.7vw,25px)] fit:text-[clamp(17px,min(1.7vw,2.8vh),25px)] font-normal leading-[1.45] tracking-[-0.01em] text-editorial-body";

/** Narrow column pushed to the right edge of the container (full width on phones). */
export const rightColumn = "ml-auto w-full max-w-[600px]";

/** The one icon on the page: a thin right arrow drawn with strokes. */
export function Arrow({ size, stroke = 1 }: { size: number; stroke?: number }) {
  const m = size / 2;
  const head = size * 0.3;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="inline-block shrink-0"
    >
      <path d={`M${size * 0.06} ${m}H${size * 0.94}`} />
      <path d={`M${size * 0.94 - head} ${m - head}L${size * 0.94} ${m}L${size * 0.94 - head} ${m + head}`} />
    </svg>
  );
}
