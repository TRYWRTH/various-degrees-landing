import { forwardRef } from "react";
import { Section, SectionHeading } from "@/components/sections/Section";
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

export const Order = forwardRef<HTMLElement>(function Order(_props, ref) {
  return (
    <Section
      id="order"
      ref={ref}
      aria-labelledby="order-heading"
      tabIndex={-1}
      className="outline-none"
    >
      <div className="flex w-full max-w-body flex-col items-center">
        <SectionHeading>
          <span id="order-heading">Order your copy</span>
        </SectionHeading>

        <p className="mt-6 font-sans text-body-m text-ink-muted md:mt-8 md:text-body">
          Copies are available from €15. Any extra support goes directly toward funding the project
          and the artists involved. Contributions of €150 or more include a copy of the publication
          plus an original, limited-run artwork selected from our artists.
        </p>

        <PrimaryButton href={ORDER_URL} className="mt-8 md:mt-12" data-testid="button-order">
          Order here
        </PrimaryButton>

        <button
          type="button"
          onClick={backToTop}
          className="group mt-6 inline-flex min-h-11 items-center gap-2 font-sans text-note text-ink-muted transition-colors duration-160 ease-out hover:text-ink md:mt-8"
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
      </div>
    </Section>
  );
});
