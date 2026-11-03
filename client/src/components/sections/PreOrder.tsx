import { forwardRef } from "react";
import { Section, SectionHeading, labelClass } from "@/components/sections/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PREORDER_URL } from "@/lib/links";

const SHIPPING_RATES: [string, string][] = [
  ["Germany", "€4.50"],
  ["EU", "€8.50"],
  ["Rest of World", "€15"],
];

export const PreOrder = forwardRef<HTMLElement>(function PreOrder(_props, ref) {
  return (
    <Section
      id="pre-order"
      ref={ref}
      aria-labelledby="pre-order-heading"
      tabIndex={-1}
      className="outline-none"
    >
      <div className="flex w-full max-w-preorder flex-col items-center">
        <SectionHeading>
          <span id="pre-order-heading">Pre-order</span>
        </SectionHeading>

        <p className="mt-6 font-forum text-preorder-m text-ink md:mt-8 md:text-preorder">
          Copies are available from €15. If you're able to contribute more, your extra support goes
          straight into funding the project and supporting the artists involved. As a thank-you,
          contributions of €150 or more come with an original, limited-run artwork selected from our
          artists.
        </p>

        <dl className="mt-8 flex flex-col gap-6 md:mt-10">
          <div className="flex flex-col items-center gap-2">
            <dt className={labelClass}>Shipping rates</dt>
            <dd data-testid="text-shipping">
              <ul className="flex flex-col items-center gap-1 font-sans text-info text-ink md:flex-row md:flex-wrap md:justify-center md:gap-x-5">
                {SHIPPING_RATES.map(([region, price]) => (
                  <li key={region} className="whitespace-nowrap">
                    {region}: <span className="text-ink-muted">{price}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          <div className="flex flex-col items-center gap-2">
            <dt className={labelClass}>Payment note</dt>
            <dd
              className="text-balance font-sans text-info text-ink-muted"
              data-testid="text-shipping-info"
            >
              Please include your full name, address, postal code, and email, or mention{" "}
              <span className="whitespace-nowrap text-ink">“Launch Pickup”</span> to collect your
              copy in person.
            </dd>
          </div>
        </dl>

        <PrimaryButton href={PREORDER_URL} className="mt-8 md:mt-12" data-testid="button-preorder">
          Pre-order
        </PrimaryButton>
      </div>
    </Section>
  );
});
