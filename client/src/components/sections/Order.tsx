import { forwardRef } from "react";
import { Section, SectionHeading, labelClass } from "@/components/sections/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ORDER_URL } from "@/lib/links";

const SHIPPING_RATES: [string, string][] = [
  ["Germany", "€4.50"],
  ["EU", "€8.50"],
  ["Rest of World", "€15"],
];

export const Order = forwardRef<HTMLElement>(function Order(_props, ref) {
  return (
    <Section
      id="order"
      ref={ref}
      aria-labelledby="order-heading"
      tabIndex={-1}
      className="outline-none"
    >
      <div className="flex w-full max-w-order flex-col items-center">
        <SectionHeading>
          <span id="order-heading">Order</span>
        </SectionHeading>

        <p className="mt-6 font-forum text-order-m text-ink md:mt-8 md:text-order">
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

        <PrimaryButton href={ORDER_URL} className="mt-8 md:mt-12" data-testid="button-order">
          Order
        </PrimaryButton>
      </div>
    </Section>
  );
});
