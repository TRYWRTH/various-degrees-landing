import { forwardRef, useEffect, type CSSProperties } from "react";
import backgroundImage from "@assets/01-greek.webp";
import { afterLabel, numberLabelClass, Section, sectionPad } from "@/components/sections/Section";
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
 * The names in four fixed rows of large light type with faint "/" separators. Each name
 * is a button that opens its bio popup; hovering one dims the others.
 */
export const Contributors = forwardRef<HTMLElement, ContributorsProps>(function Contributors(
  { onSelect },
  ref,
) {
  // Phones: the photo fragment above the names glitches in once, when the section is
  // about half in view (index.css, `.gl`). Harmless elsewhere: `.gl` is hidden there.
  useEffect(() => {
    const section = document.getElementById("contributors");
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          section.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Section
      id="contributors"
      ref={ref}
      aria-labelledby="contributors-heading"
      className={`${sectionPad} m-sec m-contrib`}
    >
      {/* Phones only: a foggy fragment of the background photo (6 slices + scanlines) */}
      <div
        className="gl hidden"
        aria-hidden="true"
        style={{ "--photo": `url("${backgroundImage}")` } as CSSProperties}
      >
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <b />
      </div>

      <h2 id="contributors-heading" className={numberLabelClass}>
        03 — Contributors
      </h2>

      <div className={`name-rows ${afterLabel} font-tight font-light text-editorial-strong`}>
        {rows.map((row, r) => (
          <ul key={r}>
            {row.map((contributor) => (
              <li key={contributor.slug}>
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
