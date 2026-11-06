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
import { ORDER_URL } from "@/lib/links";

/**
 * The publication: the title set very large, the tiers text in the narrow right column,
 * and "Order" as a large text link to the order form (where the tier is chosen).
 */
export const Order = forwardRef<HTMLElement>(function Order(_props, ref) {
  return (
    <Section id="order" ref={ref} aria-labelledby="order-heading" className={sectionPad}>
      <p className={numberLabelClass}>04 — The publication</p>

      <h2
        id="order-heading"
        className={`${afterLabel} font-tight text-[clamp(44px,8.4vw,132px)] font-light leading-[0.98] tracking-[-0.045em] text-editorial-strong`}
      >
        Remnants of a Future
      </h2>

      <div className={`${rightColumn} mt-[clamp(48px,6.7vw,96px)]`}>
        <p className={paragraphClass}>
          Copies are available from €15. Any extra support goes directly toward funding the project
          and the artists involved. Contributions of €150 or more include a copy of the publication
          plus an original, limited artwork from our artists.
        </p>

        <a
          href={ORDER_URL}
          target="_blank"
          rel="noopener"
          className="mt-12 inline-flex items-center gap-4 border-b border-current pb-1.5 font-tight text-[clamp(32px,3.4vw,52px)] font-light leading-none tracking-[-0.03em] text-editorial-strong hover:text-white"
          data-testid="button-order"
        >
          Order
          <Arrow size={40} stroke={1.1} />
        </a>
      </div>
    </Section>
  );
});
