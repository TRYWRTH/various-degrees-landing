import { forwardRef, type CSSProperties } from "react";
import {
  afterLabel,
  Arrow,
  bigLinkSize,
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
    <Section id="order" ref={ref} snap="last" aria-labelledby="order-heading" className={`${sectionPad} m-sec`}>
      <p className={`${numberLabelClass} rv`}>04 — Get a copy</p>

      <h2
        id="order-heading"
        className={`${afterLabel} m-h56 font-tight text-[clamp(44px,8.4vw,132px)] fit:text-[clamp(44px,min(8.4vw,13vh),132px)] font-light leading-[0.98] tracking-[-0.045em] text-editorial-strong`}
      >
        {/* The spans only stack on phones (index.css); on desktop they read as one line */}
        <span className="m-line rv" style={{ "--i": 1 } as CSSProperties}>Remnants</span>{" "}
        <span className="m-line rv" style={{ "--i": 2 } as CSSProperties}>of a</span>{" "}
        <span className="m-line rv" style={{ "--i": 3 } as CSSProperties}>Future</span>
      </h2>

      <div className={`${rightColumn} m-indent mt-[clamp(48px,6.7vw,96px)] fit:mt-[clamp(28px,6vh,96px)]`}>
        <p className={`${paragraphClass} m-text rv`} style={{ "--i": 4 } as CSSProperties}>
          Copies are available from €15. Any extra support goes directly toward funding the project.
          Contributions of €150 or more include a copy of the publication
          plus an original, limited artwork from our artists.
        </p>

        <a
          href={ORDER_URL}
          target="_blank"
          rel="noopener"
          style={{ "--i": 5 } as CSSProperties}
          className={`m-biglink rv mt-12 fit:mt-[clamp(24px,4.5vh,48px)] inline-flex items-center gap-4 border-b border-current pb-1.5 font-tight ${bigLinkSize} font-light leading-none tracking-[-0.03em] text-editorial-strong hover:text-white`}
          data-testid="button-order"
        >
          Order
          <Arrow size={40} stroke={1.1} />
        </a>
      </div>
    </Section>
  );
});
