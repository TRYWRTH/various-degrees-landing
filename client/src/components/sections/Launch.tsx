import { forwardRef } from "react";
import { Reveal, Section, SectionTitle } from "@/components/sections/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { DESIRELINES_INSTAGRAM_URL, MAPS_URL, RSVP_URL } from "@/lib/links";

// Lines sit close together; each link's tap area extends into the gaps
// (before: pseudo-element) so the block stays easy to tap without the spacing.
const detailLink =
  "relative underline decoration-ink-muted/60 decoration-1 underline-offset-4 transition-colors duration-160 ease-out before:absolute before:-inset-x-3 before:-inset-y-[5px] before:content-['']";

type LaunchProps = {
  revealed: boolean;
};

export const Launch = forwardRef<HTMLElement, LaunchProps>(function Launch({ revealed }, ref) {
  return (
    <Section id="launch" ref={ref} aria-labelledby="launch-heading">
      <div className="flex w-full max-w-body flex-col items-center">
        <SectionTitle id="launch-heading">Publication launch</SectionTitle>

        <Reveal show={revealed} index={0} className="mt-8 md:mt-10">
          <p className="font-sans text-date-m font-medium uppercase text-ink md:text-date">
            Wednesday 18 November, 18:30
          </p>
          <p className="mt-5 flex flex-col items-center gap-2 font-sans uppercase md:mt-6">
            <a
              href={DESIRELINES_INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              aria-label="desirelines books on Instagram (opens in a new tab)"
              className={`${detailLink} text-venue-m font-medium text-ink hover:text-ink-muted md:text-venue`}
              data-testid="link-venue-instagram"
            >
              desirelines books
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener"
              aria-label="Fraenkelufer 28, 10999 Berlin in Google Maps (opens in a new tab)"
              className={`${detailLink} text-address-m text-ink-muted hover:text-ink md:text-address`}
              data-testid="link-maps"
            >
              Fraenkelufer 28, 10999 Berlin
            </a>
          </p>
        </Reveal>

        <Reveal show={revealed} index={1} className="mt-8 md:mt-10">
          <p className="font-sans text-body-m text-ink-muted [text-wrap:pretty] md:text-body">
            Celebrate the first issue of Remnants of a Future, the debut publication from Various
            Degrees. Meet some of the artists and contributors, flip through the pages, and stay for
            conversation about lost futures, new dreams, and the traces they leave in between. Drinks,
            good company, and a few fragments of the future to take home.
          </p>
        </Reveal>

        <Reveal show={revealed} index={2} className="mt-10 flex w-full justify-center">
          <PrimaryButton href={RSVP_URL} data-testid="button-rsvp">
            RSVP
          </PrimaryButton>
        </Reveal>
      </div>
    </Section>
  );
});
