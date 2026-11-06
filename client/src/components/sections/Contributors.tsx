import { forwardRef, type MouseEvent } from "react";
import { Reveal, Section } from "@/components/sections/Section";
import { contributors } from "@/data/contributors";
import { scrollToSection } from "@/lib/scroll";

type ContributorsProps = {
  revealed: boolean;
  onSelect: (slug: string, trigger: HTMLButtonElement) => void;
};

/** In-page link: scroll inside the snap container (and move focus) instead of jumping. */
const toOrder = (e: MouseEvent<HTMLAnchorElement>) => {
  if (scrollToSection("order")) e.preventDefault();
};

// Two lists of (up to) equal length, keeping the alphabetical order: first half | second half
const half = Math.ceil(contributors.length / 2);
const columns = [contributors.slice(0, half), contributors.slice(half)];

/**
 * Editorial split, matching About: a short label on the left, the names large on the
 * right in two top-aligned lists (one list on phones). Each name opens its panel.
 *
 * Legibility: the page's flat overlay is 50% here, and this section adds a vertical
 * gradient on top of it, so the photo sits under roughly 50% black at the top and 82%
 * at the bottom.
 */
export const Contributors = forwardRef<HTMLElement, ContributorsProps>(function Contributors(
  { revealed, onSelect },
  ref,
) {
  return (
    <Section
      id="contributors"
      ref={ref}
      aria-labelledby="contributors-label"
      className="text-left md:pb-[clamp(72px,16vh,150px)] md:pt-[clamp(112px,21vh,190px)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, rgb(8 8 7 / 0), rgb(8 8 7 / 0.64))" }}
      />

      <div className="grid w-full max-w-[1296px] grid-cols-1 gap-y-10 min-[900px]:grid-cols-[260px_minmax(0,1fr)] min-[900px]:gap-x-24">
        <Reveal show={revealed} index={0}>
          <h2
            id="contributors-label"
            className="font-sans text-[13px] font-normal uppercase leading-none tracking-[0.3em] text-editorial-eyebrow"
          >
            Contributors
          </h2>
          <p className="mt-5 font-sans text-[17px] leading-[1.6] text-editorial-eyebrow">
            Artists, poets, writers and creators featured in{" "}
            <em className="font-newsreader text-[19px] italic leading-none text-editorial-body">
              Remnants of a Future
            </em>
          </p>
        </Reveal>

        <div>
          <div className="grid grid-cols-1 items-start gap-x-16 gap-y-5 min-[600px]:grid-cols-2 md:gap-y-7">
            {columns.map((list, col) => (
              <ul key={col} className="flex flex-col gap-5 md:gap-7">
                {list.map((contributor, row) => {
                  const index = col * half + row;
                  return (
                    <li
                      key={contributor.slug}
                      className={`
                        transition-all duration-1000 motion-reduce:transition-none
                        ${revealed ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
                      `}
                      style={{ transitionDelay: revealed ? `${150 + index * 60}ms` : "0ms" }}
                    >
                      <button
                        type="button"
                        onClick={(e) => onSelect(contributor.slug, e.currentTarget)}
                        aria-haspopup="dialog"
                        className="text-left font-newsreader text-[clamp(26px,2.6vw,38px)] font-light leading-[1.15] tracking-[-0.005em] text-editorial-strong transition-colors duration-160 ease-out hover:text-white"
                        data-testid={`button-contributor-${contributor.slug}`}
                      >
                        {contributor.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>

          <Reveal show={revealed} index={4} className="mt-12 md:mt-[72px]">
            <a
              href="#order"
              onClick={toOrder}
              className="inline-block py-2.5 font-sans text-[13px] font-medium uppercase leading-none tracking-[0.24em] text-editorial-strong underline decoration-editorial-link decoration-1 underline-offset-[6px] transition-colors duration-160 ease-out hover:text-white"
              data-testid="link-order"
            >
              Order the publication <span aria-hidden="true">↓</span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
});
