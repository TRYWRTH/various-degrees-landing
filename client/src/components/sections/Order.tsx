import { forwardRef } from "react";
import {
  afterLabel,
  Arrow,
  bigLinkSize,
  NumLabel,
  numberLabelClass,
  paragraphClass,
  rightColumn,
  Section,
  sectionPad,
} from "@/components/sections/Section";
import { ORDER_URL } from "@/lib/links";

/**
 * The publication: the title set very large; below it on desktop the cover on the left
 * and the tiers text with the "Order" link (to the order form) beside it, centred on
 * the cover.
 */
export const Order = forwardRef<HTMLElement>(function Order(_props, ref) {
  return (
    <Section id="order" ref={ref} snap="last" aria-labelledby="order-heading" className={`${sectionPad} m-sec`}>
      <p className={`${numberLabelClass} m-numlabel`}>
        <NumLabel n="04" name="Get a copy" />
      </p>

      <h2
        id="order-heading"
        className={`${afterLabel} m-h56 m-head font-tight text-[clamp(44px,8.4vw,132px)] fit:text-[clamp(44px,min(8.4vw,13vh),132px)] font-light leading-[0.98] tracking-[-0.045em] text-editorial-strong`}
      >
        {/* The spans only stack on phones (index.css); on desktop they read as one line */}
        <span className="m-line">Remnants</span>{" "}
        <span className="m-line">of a</span>{" "}
        <span className="m-line">Future</span>
      </h2>

      {/* Desktop: under the headline, the cover large on the left and the text + Order
          link on the right, centred on the cover's middle. Phones: text only. */}
      {/* The cover is large (about half the content width); the section grows to fit it */}
      <div className="md:mt-[clamp(28px,5vh,56px)] md:flex md:items-center md:gap-[clamp(40px,5vw,96px)]">
        <figure className="hidden md:block md:aspect-[3/4] md:w-[min(50%,720px)] md:shrink-0">
          <img
            src="/assets/cover.jpg"
            alt="Cover of Remnants of a Future"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>

        <div className={`${rightColumn} m-indent m-order-col mt-[clamp(48px,6.7vw,96px)] fit:mt-[clamp(28px,6vh,96px)] md:!mt-0 md:ml-0 md:min-w-0 md:flex-1`}>
          <p className={`${paragraphClass} m-text m-order-p`}>
            Copies are available from €15. Any extra support goes directly toward funding the project.
            Contributions of €150 or more include a copy of the publication
            plus an original, limited artwork from our artists.
          </p>

          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener"
            className={`accent-link m-biglink mt-12 fit:mt-[clamp(24px,4.5vh,48px)] inline-flex items-center gap-4 border-b border-current pb-1.5 font-tight ${bigLinkSize} font-light leading-none tracking-[-0.03em] text-editorial-strong hover:text-white`}
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
