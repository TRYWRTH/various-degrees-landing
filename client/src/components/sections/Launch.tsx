import { forwardRef, type CSSProperties } from "react";
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

const detailLink =
  "underline decoration-1 underline-offset-[5px] hover:text-white";

/**
 * The launch event: the date set large, then venue, text and RSVP in the narrow right
 * column. Same copy and links as before.
 */
export const Launch = forwardRef<HTMLElement>(function Launch(_props, ref) {
  return (
    <Section
      id="launch"
      ref={ref}
      aria-labelledby="launch-heading"
      className={`${sectionPad} m-sec m-launch m-st4`}
    >
      <p className={`${numberLabelClass} rv m-label`}>01 — Event</p>

      <h2
        id="launch-heading"
        className={`${afterLabel} m-h56 font-tight ${headlineSize} font-light leading-[1.05] tracking-[-0.035em] text-editorial-strong`}
      >
        {/* The spans only stack on phones (index.css); on desktop they read as one line */}
        <span className="m-line rv" style={{ "--i": 1 } as CSSProperties}>Join us</span>{" "}
        <span className="m-line rv" style={{ "--i": 2 } as CSSProperties}>for the</span>{" "}
        <span className="m-line rv" style={{ "--i": 3 } as CSSProperties}>launch</span>
      </h2>

      {/* Phones: a thin rule that draws when the section reaches the centre */}
      <span className="lock-rule hidden" aria-hidden="true" />

      <div
        className={`${rightColumn} m-launch-col mt-[clamp(32px,4vw,56px)] flex flex-col items-start gap-12`}
      >
        {/* Date and time lead the details, a step up from the paragraph text; the venue sits
            right under it, then 48px to the paragraph */}
        <div className="m-details flex flex-col items-start gap-3">
          {/* "Date" / "Place" keys exist only in the phone layout */}
          <div className="m-row rv-r" style={{ "--i": 4 } as CSSProperties}>
          <span className="m-key hidden">Date</span>
          <p
            className="m-date font-tight text-[clamp(24px,2.2vw,34px)] fit:text-[clamp(22px,min(2.2vw,3.6vh),34px)] font-light leading-[1.2] tracking-[-0.025em] text-editorial-strong"
            data-testid="text-launch-date"
          >
            Wednesday 18 November, 18:30
          </p>
          </div>
          <div className="m-row rv-r" style={{ "--i": 5 } as CSSProperties}>
          <span className="m-key hidden">Place</span>
          <p
            className={`${paragraphClass} m-place flex flex-col items-start gap-1 text-editorial-strong`}
          >
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
          </div>
        </div>

        <p className={`${paragraphClass} m-text m-indent rv-r`} style={{ "--i": 6 } as CSSProperties}>
          Celebrate the first issue of Remnants of a Future, the debut
          publication from Various Degrees. Meet some of the artists and
          contributors, flip through the pages, and stay for conversation about
          lost futures, new dreams, and the traces they leave in between.
          Drinks, good company, and a few fragments of the future to take home.
        </p>

        <a
          href={RSVP_URL}
          target="_blank"
          rel="noopener"
          style={{ "--i": 7 } as CSSProperties}
          className={`m-biglink m-indent rv inline-flex items-center gap-4 border-b border-current pb-1.5 font-tight ${bigLinkSize} font-light leading-none tracking-[-0.03em] text-editorial-strong hover:text-white`}
          data-testid="button-rsvp"
        >
          RSVP
          <Arrow size={40} stroke={1.1} />
        </a>
      </div>
    </Section>
  );
});
