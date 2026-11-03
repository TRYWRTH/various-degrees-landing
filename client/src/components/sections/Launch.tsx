import { forwardRef } from "react";
import { Section, SectionHeading } from "@/components/sections/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { MAPS_URL, RSVP_URL } from "@/lib/links";

export const Launch = forwardRef<HTMLElement>(function Launch(_props, ref) {
  return (
    <Section id="launch" ref={ref} aria-labelledby="launch-heading">
      <div className="flex w-full max-w-body flex-col items-center">
        <SectionHeading>
          <span id="launch-heading">Publication launch</span>
        </SectionHeading>

        <p className="mt-6 flex flex-col items-center font-sans text-label-m font-medium uppercase text-ink md:w-max md:flex-row md:gap-3 md:whitespace-nowrap md:text-label">
          <span>Wednesday 18 November, 18:30</span>
          <span aria-hidden="true" className="hidden md:inline">
            ·
          </span>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center underline decoration-ink-muted/60 decoration-1 underline-offset-[5px] transition-colors duration-160 ease-out hover:text-ink-muted"
            data-testid="link-maps"
          >
            desirelines books, Berlin
          </a>
        </p>

        <p className="mt-6 font-sans text-body-m text-ink-muted md:mt-8 md:text-body">
          Celebrate the first issue of Remnants of a Future, the debut publication from Various
          Degrees. Meet some of the artists and contributors, flip through the pages, and stay for
          conversation about lost futures, new dreams, and the traces they leave in between. Drinks,
          good company, and a few fragments of the future to take home.
        </p>

        <PrimaryButton href={RSVP_URL} className="mt-8 md:mt-12" data-testid="button-rsvp">
          RSVP
        </PrimaryButton>

      </div>
    </Section>
  );
});
