import { forwardRef } from "react";
import { Section, SectionHeading } from "@/components/sections/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ORDER_URL } from "@/lib/links";

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
          <span id="order-heading">Order your copy</span>
        </SectionHeading>

        <p className="mt-6 font-forum text-order-m text-ink md:mt-8 md:text-order">
          Copies are available from €15. Any extra support goes directly toward funding the project
          and the artists involved. Contributions of €150 or more include a copy of the publication
          plus an original, limited-run artwork selected from our artists.
        </p>

        <PrimaryButton href={ORDER_URL} className="mt-8 md:mt-12" data-testid="button-order">
          Order here
        </PrimaryButton>
      </div>
    </Section>
  );
});
