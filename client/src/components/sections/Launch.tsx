import { forwardRef } from "react";
import { Section, SectionHeading } from "@/components/sections/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { DESIRELINES_INSTAGRAM_URL, MAPS_URL, RSVP_URL } from "@/lib/links";

const detailLink =
  "inline-flex min-h-11 items-center underline decoration-ink-muted/60 decoration-1 underline-offset-[5px] transition-colors duration-160 ease-out hover:text-ink-muted";

export const Launch = forwardRef<HTMLElement>(function Launch(_props, ref) {
  return (
    <Section id="launch" ref={ref} aria-labelledby="launch-heading">
      <div className="flex w-full max-w-body flex-col items-center">
        <SectionHeading>
          <span id="launch-heading">Publication launch</span>
        </SectionHeading>

        <p className="mt-6 font-sans text-body-m text-ink-muted md:mt-8 md:text-body">
          Celebrate the first issue of Remnants of a Future, the debut publication from Various
          Degrees. Meet some of the artists and contributors, flip through the pages, and stay for
          conversation about lost futures, new dreams, and the traces they leave in between. Drinks,
          good company, and a few fragments of the future to take home.
        </p>

        <p className="mt-8 flex flex-col items-center font-sans text-label-m font-medium uppercase text-ink md:mt-12 md:text-label">
          <span className="inline-flex min-h-11 items-center">Wednesday 18 November, 18:30</span>
          <a
            href={DESIRELINES_INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            aria-label="desirelines books on Instagram (opens in a new tab)"
            className={detailLink}
            data-testid="link-venue-instagram"
          >
            desirelines books
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener"
            aria-label="Fraenkelufer 28, 10999 Berlin in Google Maps (opens in a new tab)"
            className={detailLink}
            data-testid="link-maps"
          >
            Fraenkelufer 28, 10999 Berlin
          </a>
        </p>

        <PrimaryButton href={RSVP_URL} className="mt-3 md:mt-4" data-testid="button-rsvp">
          RSVP
        </PrimaryButton>
      </div>
    </Section>
  );
});
