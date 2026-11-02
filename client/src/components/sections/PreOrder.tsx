import { forwardRef } from "react";
import { Section, SectionHeading } from "@/components/sections/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PREORDER_URL } from "@/lib/links";

export const PreOrder = forwardRef<HTMLElement>(function PreOrder(_props, ref) {
  return (
    <Section id="pre-order" ref={ref} aria-labelledby="pre-order-heading">
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

        <PrimaryButton href={PREORDER_URL} className="mt-8 md:mt-12" data-testid="button-preorder">
          Pre-order
        </PrimaryButton>

        <p className="text-balance mt-4 font-sans text-note text-ink-muted">
          Shipping: Germany €4.50 · EU €8.50 · Rest of the world €15
        </p>
      </div>
    </Section>
  );
});
