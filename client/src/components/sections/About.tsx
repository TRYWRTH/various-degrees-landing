import { forwardRef, type MouseEvent } from "react";
import { Reveal, Section } from "@/components/sections/Section";
import { scrollToSection } from "@/lib/scroll";

type AboutProps = {
  revealed: boolean;
};

const keyword = "font-medium text-editorial-strong";

/** In-page link: scroll inside the snap container (and move focus) instead of jumping. */
const toContributors = (e: MouseEvent<HTMLAnchorElement>) => {
  if (scrollToSection("contributors")) e.preventDefault();
};

/**
 * Editorial split: the statement large on the left, the two supporting paragraphs on
 * the right. Wraps to one column below 900px.
 *
 * Legibility: the page's flat overlay is 60% here, and this section adds a vertical
 * gradient on top of it, so the photo sits under roughly 60% black at the top and 80%
 * at the bottom. (45% or 55% at the top let the light sky behind the eyebrow drop below
 * 4.5:1 on phones.)
 */
export const About = forwardRef<HTMLElement, AboutProps>(function About({ revealed }, ref) {
  return (
    <Section id="about" ref={ref} aria-labelledby="about-label" className="text-left">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, rgb(8 8 7 / 0), rgb(8 8 7 / 0.5))" }}
      />

      <div className="grid w-full max-w-[1296px] grid-cols-1 gap-y-10 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,520px)] min-[900px]:gap-x-24">
        <div>
          <Reveal show={revealed} index={0}>
            <p
              id="about-label"
              className="font-sans text-[13px] font-medium uppercase leading-none tracking-[0.3em] text-editorial-eyebrow"
            >
              About
            </p>
          </Reveal>
          <Reveal show={revealed} index={1} className="mt-6 md:mt-8">
            <h1
              className="font-newsreader text-[clamp(38px,4.6vw,68px)] font-light leading-[1.1] tracking-[-0.012em] text-editorial-strong"
              data-testid="text-description-1"
            >
              A publication contemplating what happens when the future we imagined feels
              increasingly far away
            </h1>
          </Reveal>
        </div>

        {/* Starts a little below the headline's first line on wide screens */}
        <div className="w-full max-w-[520px] min-[900px]:pt-[72px]">
          <Reveal show={revealed} index={2}>
            <p className="font-sans text-[19px] leading-[1.7] text-editorial-body" data-testid="text-description-2">
              <em className="font-newsreader text-[22px] italic leading-none text-editorial-strong">
                Remnants of a Future
              </em>{" "}
              brings together a carefully curated group of artists, poets, writers and creators, who
              each offer their individual exploration of the theme.
            </p>
          </Reveal>
          <Reveal show={revealed} index={3} className="mt-6">
            <p className="font-sans text-[19px] leading-[1.7] text-editorial-body" data-testid="text-description-3">
              It is a collection about <strong className={keyword}>dreams</strong>, about{" "}
              <strong className={keyword}>loss</strong>, about{" "}
              <strong className={keyword}>mourning</strong>, about{" "}
              <strong className={keyword}>hope</strong>. And about how, in the face of a crumbling
              world, we can find pieces that help us take another step towards the future.
            </p>
          </Reveal>
          <Reveal show={revealed} index={4} className="mt-10">
            <a
              href="#contributors"
              onClick={toContributors}
              className="inline-flex min-h-11 items-center font-sans text-[13px] font-medium uppercase tracking-[0.24em] text-editorial-strong underline decoration-editorial-link decoration-1 underline-offset-[6px] transition-colors duration-160 ease-out hover:text-editorial-body"
              data-testid="link-contributors"
            >
              Meet the contributors
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
});
