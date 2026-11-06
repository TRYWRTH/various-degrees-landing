import { forwardRef } from "react";
import {
  afterLabel,
  Arrow,
  numberLabelClass,
  paragraphClass,
  rightColumn,
  Section,
  sectionPad,
} from "@/components/sections/Section";
import { DESIRELINES_INSTAGRAM_URL, MAPS_URL, RSVP_URL } from "@/lib/links";

const detailLink = "underline decoration-1 underline-offset-[5px] hover:text-white";

/**
 * The launch event: the date set large, then venue, text and RSVP in the narrow right
 * column. Same copy and links as before.
 */
export const Launch = forwardRef<HTMLElement>(function Launch(_props, ref) {
  return (
    <Section id="launch" ref={ref} aria-labelledby="launch-heading" className={sectionPad}>
      <p className={numberLabelClass}>01 — Publication launch</p>

      <h2
        id="launch-heading"
        className={`${afterLabel} font-tight text-[clamp(36px,5.4vw,84px)] font-light leading-[1.05] tracking-[-0.035em] text-editorial-strong`}
      >
        Join us for the launch
      </h2>

      {/* Date and time one size up from the headline, like the publication title */}
      <p
        className="text-balance mt-[clamp(12px,1.6vw,24px)] font-tight text-[clamp(44px,8.4vw,132px)] font-light leading-[0.98] tracking-[-0.045em] text-editorial-strong"
        data-testid="text-launch-date"
      >
        Wednesday 18 November, 18:30
      </p>

      <div className={`${rightColumn} mt-[clamp(56px,7.8vw,112px)]`}>
        <p className={`${paragraphClass} flex flex-col items-start gap-1 text-editorial-strong`}>
          <a
            href={DESIRELINES_INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            aria-label="desirelines books on Instagram (opens in a new tab)"
            className={detailLink}
            data-testid="link-venue-instagram"
          >
            desirelines books
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener"
            aria-label="Fraenkelufer 28, 10999 Berlin in Google Maps (opens in a new tab)"
            className={detailLink}
            data-testid="link-maps"
          >
            Fraenkelufer 28, 10999 Berlin
          </a>
        </p>

        <p className={`${paragraphClass} mt-7`}>
          Celebrate the first issue of Remnants of a Future, the debut publication from Various
          Degrees. Meet some of the artists and contributors, flip through the pages, and stay for
          conversation about lost futures, new dreams, and the traces they leave in between. Drinks,
          good company, and a few fragments of the future to take home.
        </p>

        <a
          href={RSVP_URL}
          target="_blank"
          rel="noopener"
          className="mt-12 inline-flex items-center gap-4 border-b border-current pb-1.5 font-tight text-[clamp(32px,3.4vw,52px)] font-light leading-none tracking-[-0.03em] text-editorial-strong hover:text-white"
          data-testid="button-rsvp"
        >
          RSVP
          <Arrow size={40} stroke={1.1} />
        </a>
      </div>
    </Section>
  );
});
