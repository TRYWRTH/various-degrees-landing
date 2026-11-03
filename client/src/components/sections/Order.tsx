import { forwardRef } from "react";
import { Reveal, Section, SectionTitle } from "@/components/sections/Section";
import { Footer } from "@/components/sections/Footer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ORDER_URL } from "@/lib/links";

type OrderProps = {
  revealed: boolean;
};

export const Order = forwardRef<HTMLElement, OrderProps>(function Order({ revealed }, ref) {
  return (
    <Section
      id="order"
      ref={ref}
      aria-labelledby="order-heading"
      tabIndex={-1}
      className="outline-none"
      // The last screen ends with the footer strip pinned near its bottom edge
      style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
    >
      <div className="flex w-full max-w-body flex-1 flex-col items-center justify-center">
        <SectionTitle id="order-heading">Order your copy</SectionTitle>

        <Reveal show={revealed} index={0} className="mt-6 md:mt-8">
          <p className="font-sans text-body-m text-ink-muted md:text-body">
            Copies are available from €15. Any extra support goes directly toward funding the project
            and the artists involved. Contributions of €150 or more include a copy of the publication
            plus an original, limited artwork from our artists.
          </p>
        </Reveal>

        <Reveal show={revealed} index={1} className="mt-8 flex w-full justify-center md:mt-12">
          <PrimaryButton href={ORDER_URL} data-testid="button-order">
            Order here
          </PrimaryButton>
        </Reveal>
      </div>

      <Footer />
    </Section>
  );
});
