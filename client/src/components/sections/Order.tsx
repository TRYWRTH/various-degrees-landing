import { forwardRef } from "react";
import { Reveal, Section, SectionTitle } from "@/components/sections/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ORDER_URL } from "@/lib/links";

/** Scroll back to the hero (the page scrolls inside the snap container). */
function backToTop() {
  const hero = document.getElementById("hero");
  if (!hero) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  hero.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  hero.focus({ preventScroll: true });
}

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
    >
      <div className="flex w-full max-w-body flex-col items-center">
        <SectionTitle id="order-heading">Order your copy</SectionTitle>

        <Reveal show={revealed} index={0} className="mt-6 md:mt-8">
          <p className="font-sans text-body-m text-ink-muted md:text-body">
            Copies are available from €15. Any extra support goes directly toward funding the project
            and the artists involved. Contributions of €150 or more include a copy of the publication
            plus an original, limited-run artwork selected from our artists.
          </p>
        </Reveal>

        <Reveal show={revealed} index={1} className="mt-8 flex w-full justify-center md:mt-12">
          <PrimaryButton href={ORDER_URL} data-testid="button-order">
            Order here
          </PrimaryButton>
        </Reveal>

        <Reveal show={revealed} index={2} className="mt-6 md:mt-8">
          <button
            type="button"
            onClick={backToTop}
            className="group inline-flex min-h-11 items-center gap-2 font-sans text-note text-ink-muted transition-colors duration-160 ease-out hover:text-ink"
            data-testid="button-back-to-top"
          >
            <span className="underline decoration-ink-muted/60 decoration-1 underline-offset-4">
              Back to top
            </span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-160 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              ↑
            </span>
          </button>
        </Reveal>
      </div>
    </Section>
  );
});
