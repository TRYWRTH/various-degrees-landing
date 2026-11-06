import { forwardRef } from "react";
import {
  afterLabel,
  Arrow,
  bigLinkSize,
  headlineSize,
  NumLabel,
  numberLabelClass,
  paragraphClass,
  rightColumn,
  Section,
  sectionPad,
} from "@/components/sections/Section";
import { ORDER_URL } from "@/lib/links";

const COVER = "/assets/cover.jpg";

/**
 * Get a copy. Built like About: label, About-size headline, then the text in the same
 * right column. Beside the text, a window in which the cover rolls upward without end
 * (index.css, .roll): copies of the cover overlap and fade into each other so the strip
 * reads as one continuous image. The window is exactly as tall as the text block.
 * Phones: headline, then the rolling window at full width, then the text.
 */
export const Order = forwardRef<HTMLElement>(function Order(_props, ref) {
  return (
    <Section id="order" ref={ref} snap="last" aria-labelledby="order-heading" className={`${sectionPad} m-sec`}>
      <p className={`${numberLabelClass} m-numlabel`}>
        <NumLabel n="04" name="Get a copy" />
      </p>

      <h2
        id="order-heading"
        className={`${afterLabel} m-h40 m-head order-head font-tight ${headlineSize} font-light leading-[1.05] tracking-[-0.035em] text-editorial-strong`}
      >
        Every copy carries a piece of the future we imagined
      </h2>

      <div className="order-row mt-[clamp(56px,7.8vw,112px)] fit:mt-[clamp(20px,3.5vh,112px)]">
        {/* The rolling cover: the first copy carries the alt text, the rest are decoration */}
        <div className="roll">
          <div className="roll-stack">
            <img src={COVER} alt="Cover of Remnants of a Future" className="roll-img" />
            <img src={COVER} alt="" aria-hidden="true" className="roll-img" />
            <img src={COVER} alt="" aria-hidden="true" className="roll-img" />
            <img src={COVER} alt="" aria-hidden="true" className="roll-img" />
          </div>
        </div>

        <div className={`${rightColumn} m-indent m-order-col m-order-p flex flex-col items-start gap-7 fit:gap-[clamp(16px,3vh,28px)]`}>
          <p className={`${paragraphClass} m-text`}>
            Copies of the first issue are available from €15. Each one supports a publication
            made by a group of artists, poets and writers, and any extra support goes directly
            toward funding the project.
          </p>
          <p className={`${paragraphClass} m-text`}>
            Contributions of €150 or more include a copy of the publication plus an original,
            limited artwork from our artists, a piece of the collection to keep long after the
            issue is read.
          </p>

          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener"
            className={`accent-link m-biglink mt-5 fit:mt-[clamp(4px,1vh,20px)] inline-flex items-center gap-4 border-b border-current pb-1.5 font-tight ${bigLinkSize} font-light leading-none tracking-[-0.03em] text-editorial-strong hover:text-white`}
            data-testid="button-order"
          >
            Order
            <Arrow size={40} stroke={1.1} />
          </a>
        </div>
      </div>
    </Section>
  );
});
