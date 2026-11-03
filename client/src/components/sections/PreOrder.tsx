import { forwardRef } from "react";
import { Section, SectionHeading } from "@/components/sections/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PREORDER_URL } from "@/lib/links";

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

        <div className="mt-6 flex flex-col gap-2 font-sans text-note text-ink-muted md:mt-8">
          <p className="text-balance" data-testid="text-shipping">
            Shipping: <span className="whitespace-nowrap">Germany €4.50</span> ·{" "}
            <span className="whitespace-nowrap">EU €8.50</span> ·{" "}
            <span className="whitespace-nowrap">Rest of the world €15</span>
          </p>
          <p className="text-balance" data-testid="text-shipping-info">
            When making the payment, please add your shipping details (full name, address, postal
            code and email address), or let us know you'll pick up your copy at the launch.
          </p>
        </div>

        <PrimaryButton href={PREORDER_URL} className="mt-8 md:mt-12" data-testid="button-preorder">
          Pre-order
        </PrimaryButton>
      </div>
    </Section>
  );
});
