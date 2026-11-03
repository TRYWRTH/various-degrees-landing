import { forwardRef } from "react";
import { Section, SectionTitle } from "@/components/sections/Section";
import { contributors } from "@/data/contributors";

type ContributorsProps = {
  revealed: boolean;
  onSelect: (slug: string, trigger: HTMLButtonElement) => void;
};

export const Contributors = forwardRef<HTMLElement, ContributorsProps>(function Contributors(
  { revealed, onSelect },
  ref,
) {
  return (
    <Section id="contributors" ref={ref} aria-labelledby="contributors-label">
      <div className="flex w-full max-w-column flex-col items-center">
        <SectionTitle id="contributors-label">Contributors</SectionTitle>

        <ul className="mt-6 flex w-full flex-col items-center md:mt-8">
          {contributors.map((contributor, index) => (
            <li
              key={contributor.slug}
              className={`
                transition-all duration-1000 motion-reduce:transition-none
                ${revealed ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
              `}
              style={{ transitionDelay: revealed ? `${index * 60}ms` : "0ms" }}
            >
              <button
                type="button"
                onClick={(e) => onSelect(contributor.slug, e.currentTarget)}
                aria-haspopup="dialog"
                className="group flex min-h-11 items-center justify-center px-2 font-sans text-body-m text-ink-muted transition-colors duration-160 ease-out hover:text-ink md:min-h-12 md:text-body"
                data-testid={`button-contributor-${contributor.slug}`}
              >
                <span className="draw-underline">{contributor.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
});
