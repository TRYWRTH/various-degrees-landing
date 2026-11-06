import { cn } from "@/lib/utils";

const COVER = "/assets/cover.jpg";

/**
 * The publication cover rolling upward in an endless loop (index.css, .roll):
 * overlapping, top-faded copies of the cover read as one continuous strip. The first
 * copy carries the alt text; the others are decoration. Size comes from --rw (width)
 * and the element's own height.
 */
export function RollingCover({ className }: { className?: string }) {
  return (
    <div className={cn("roll", className)}>
      <div className="roll-stack">
        <img src={COVER} alt="Cover of Remnants of a Future" className="roll-img" />
        <img src={COVER} alt="" aria-hidden="true" className="roll-img" />
        <img src={COVER} alt="" aria-hidden="true" className="roll-img" />
        <img src={COVER} alt="" aria-hidden="true" className="roll-img" />
      </div>
    </div>
  );
}
