import { forwardRef } from "react";
import {
  afterLabel,
  Arrow,
  bigLinkSize,
  headlineSize,
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
        className={`${afterLabel} font-tight ${headlineSize} font-light leading-[1.05] tracking-[-0.035em] text-editorial-strong`}
      >
        Join us for the launch
      </h2>

      <div className={`${rightColumn} mt-[clamp(32px,4vw,56px)] flex flex-col items-start gap-12 fit:gap-[clamp(20px,4.5vh,48px)]`}>
        {/* Date and time lead the details, a step up from the paragraph text */}
        <p
          className="font-tight text-[clamp(24px,2.2vw,34px)] fit:text-[clamp(22px,min(2.2vw,3.6vh),34px)] font-light leading-[1.2] tracking-[-0.025em] text-editorial-strong"
          data-testid="text-launch-date"
        >
          Wednesday 18 November, 18:30
        </p>
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

        <p className={paragraphClass}>
          Celebrate the first issue of Remnants of a Future, the debut publication from Various
          Degrees. Meet some of the artists and contributors, flip through the pages, and stay for
          conversation about lost futures, new dreams, and the traces they leave in between. Drinks,
          good company, and a few fragments of the future to take home.
        </p>

        <a
          href={RSVP_URL}
          target="_blank"
          rel="noopener"
          className={`inline-flex items-center gap-4 border-b border-current pb-1.5 font-tight ${bigLinkSize} font-light leading-none tracking-[-0.03em] text-editorial-strong hover:text-white`}
          data-testid="button-rsvp"
        >
          RSVP
          <Arrow size={40} stroke={1.1} />
        </a>
      </div>
    </Section>
  );
});
