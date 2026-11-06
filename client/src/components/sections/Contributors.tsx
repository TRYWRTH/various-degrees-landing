import { forwardRef } from "react";
import { afterLabel, numberLabelClass, Section, sectionPad } from "@/components/sections/Section";
import { contributors } from "@/data/contributors";

type ContributorsProps = {
  onSelect: (slug: string, trigger: HTMLButtonElement) => void;
};

/**
 * The names as one flowing line of large type, alphabetical by first name, with a thin
 * CSS slash between them (`.name-flow`). Each name keeps its existing behaviour: it
 * opens that contributor's panel. A name only breaks inside itself when it is wider
 * than the whole line.
 */
export const Contributors = forwardRef<HTMLElement, ContributorsProps>(function Contributors(
  { onSelect },
  ref,
) {
  return (
    <Section id="contributors" ref={ref} aria-labelledby="contributors-heading" className={sectionPad}>
      <h2 id="contributors-heading" className={numberLabelClass}>
        03 — Contributors
      </h2>

      <ul
        className={`name-flow ${afterLabel} font-tight text-[clamp(28px,4.2vw,64px)] font-light leading-[1.15] tracking-[-0.03em] text-editorial-strong`}
      >
        {contributors.map((contributor) => (
          <li key={contributor.slug}>
            <button
              type="button"
              onClick={(e) => onSelect(contributor.slug, e.currentTarget)}
              aria-haspopup="dialog"
              className="text-left decoration-1 underline-offset-[0.12em] hover:text-white hover:underline"
              data-testid={`button-contributor-${contributor.slug}`}
            >
              {contributor.name}
            </button>
          </li>
        ))}
      </ul>
    </Section>
  );
});
