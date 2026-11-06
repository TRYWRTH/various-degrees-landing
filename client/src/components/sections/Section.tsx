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

/** Small mono label that opens each section ("01 — About"). */
export const numberLabelClass =
  "font-mono text-[12px] font-normal uppercase leading-none tracking-[0.08em] text-editorial-eyebrow";

/** Gap between a section's label and its headline or content. */
export const afterLabel = "mt-[clamp(36px,4vw,56px)]";

/** Section padding: about 150px top and 170px bottom on desktop, scaled down on phones. */
export const sectionPad = "pt-[clamp(88px,10.4vw,150px)] pb-[clamp(104px,11.8vw,170px)]";

/** Paragraph style shared by Launch, About and The publication. */
export const paragraphClass =
  "font-tight text-[clamp(19px,1.7vw,25px)] font-normal leading-[1.45] tracking-[-0.01em] text-editorial-body";

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
