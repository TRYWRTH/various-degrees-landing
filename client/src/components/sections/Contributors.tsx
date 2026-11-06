import { forwardRef } from "react";
import { afterLabel, NumLabel, numberLabelClass, Section, sectionPad } from "@/components/sections/Section";
import { contributors, type Contributor } from "@/data/contributors";

type ContributorsProps = {
  onSelect: (slug: string, trigger: HTMLButtonElement) => void;
};

/**
 * Fixed line grouping (by slug), alphabetical by first name. The type is sized so the
 * longest row, row 1, just fills the content width (`.name-rows` in index.css, divisor
 * 19.8; row 1 is 19.55em wide). If a name is added or removed, check that row 1 still fits on one line at ~800px
 * and 1440px wide, and adjust the grouping or the divisor. Anyone not listed here is
 * added to the last row, so nobody silently disappears.
 */
const ROWS: string[][] = [
  ["andrea-mikyska", "asmaa-azaizeh", "julio-clavijo"],
  ["kevin-junk", "nicola-sebastian"],
  ["sharlene-durfey-francois", "theresa-weber"],
  ["tomer-rosenthal"],
];

const bySlug = new Map(contributors.map((c) => [c.slug, c]));
const listed = new Set(ROWS.flat());
const rows: Contributor[][] = ROWS.map((row) =>
  row.map((slug) => bySlug.get(slug)).filter((c): c is Contributor => Boolean(c)),
);
rows[rows.length - 1].push(...contributors.filter((c) => !listed.has(c.slug)));

/**
 * Phones group the same names in five lines instead: two, two, one, one, two. A line
 * ends after these names (index.css adds the break after their slash).
 */
const PHONE_LINE_ENDS = new Set([
  "asmaa-azaizeh",
  "kevin-junk",
  "nicola-sebastian",
  "sharlene-durfey-francois",
]);

/**
 * The names in four fixed rows of large light type with faint "/" separators. Each name
 * is a button that opens its bio popup; hovering one dims the others.
 */
export const Contributors = forwardRef<HTMLElement, ContributorsProps>(function Contributors(
  { onSelect },
  ref,
) {
  return (
    <Section
      id="contributors"
      ref={ref}
      aria-labelledby="contributors-heading"
      className={`${sectionPad} m-sec m-contrib`}
    >
      {/* Phones only: the publication cover, above the names. Add the file as
          client/public/assets/cover.jpg (served at /assets/cover.jpg). */}
      <figure className="m-cover hidden">
        <img src="/assets/cover.jpg" alt="Cover of Remnants of a Future" loading="lazy" />
      </figure>

      <h2
        id="contributors-heading"
        className={`${numberLabelClass} m-numlabel m-head`}
      >
        <NumLabel n="03" name="Contributors" />
      </h2>

      <div className={`name-rows ${afterLabel} font-tight font-light text-editorial-strong`}>
        {rows.map((row, r) => (
          <ul key={r}>
            {row.map((contributor) => (
              <li
                key={contributor.slug}
                className={PHONE_LINE_ENDS.has(contributor.slug) ? "m-line-end" : undefined}
              >
                <button
                  type="button"
                  onClick={(e) => onSelect(contributor.slug, e.currentTarget)}
                  aria-haspopup="dialog"
                  aria-label={contributor.name}
                  className="text-left decoration-1 underline-offset-[0.18em] hover:underline focus-visible:underline"
                  data-testid={`button-contributor-${contributor.slug}`}
                >
                  {contributor.name}
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </Section>
  );
});
