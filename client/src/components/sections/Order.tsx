import { forwardRef } from "react";
import { Reveal, Section } from "@/components/sections/Section";
import { Footer } from "@/components/sections/Footer";
import { ORDER_URL } from "@/lib/links";

type OrderProps = {
  revealed: boolean;
};

/**
 * Only values the site already states.
 * TODO: Format is not stated anywhere yet; replace "TODO" once it is known.
 */
const meta = [
  { label: "Release", value: "18 November" },
  { label: "Format", value: "TODO" },
  { label: "Price", value: "From €15" },
];

/**
 * The publication and how to order it. Last screen, with the footer pinned near the
 * bottom edge. Matches About and Contributors: the same photo, with the page's flat
 * overlay at 60% here plus a vertical gradient, so roughly 60% black at the top and
 * 85% at the bottom.
 */
export const Order = forwardRef<HTMLElement, OrderProps>(function Order({ revealed }, ref) {
  return (
    <Section
      id="order"
      ref={ref}
      aria-labelledby="order-heading"
      tabIndex={-1}
      className="text-left outline-none md:pt-[clamp(112px,16vh,140px)]"
      style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, rgb(8 8 7 / 0), rgb(8 8 7 / 0.63))" }}
      />

      <div className="grid w-full max-w-[1296px] flex-1 grid-cols-1 content-center gap-y-10 pb-12 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,520px)] min-[900px]:gap-x-24 md:pb-[clamp(72px,16vh,150px)]">
        <div>
          <Reveal show={revealed} index={0}>
            <p className="font-sans text-[13px] font-medium uppercase leading-none tracking-[0.3em] text-editorial-eyebrow">
              The publication
            </p>
          </Reveal>
          <Reveal show={revealed} index={1} className="mt-6">
            <h2
              id="order-heading"
              className="font-newsreader text-[clamp(44px,5.4vw,84px)] font-light italic leading-[1.04] tracking-[-0.015em] text-editorial-strong"
            >
              Remnants of a Future
            </h2>
          </Reveal>
        </div>

        {/* Top padding lines the meta row up with the title on wide screens */}
        <div className="w-full max-w-[520px] min-[900px]:pt-[52px]">
          <Reveal show={revealed} index={2}>
            <dl className="grid grid-cols-3 gap-6 max-[359px]:grid-cols-1">
              {meta.map(({ label, value }) => (
                <div key={label}>
                  <dt className="font-sans text-[12px] font-medium uppercase leading-none tracking-[0.22em] text-editorial-eyebrow">
                    {label}
                  </dt>
                  <dd
                    className="mt-3 font-sans text-[17px] leading-snug text-editorial-strong"
                    data-testid={`text-meta-${label.toLowerCase()}`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal show={revealed} index={3} className="mt-10">
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-full bg-editorial-strong px-10 py-[18px] font-sans text-[13px] font-medium uppercase leading-none tracking-[0.24em] text-editorial-on-strong transition-colors duration-160 ease-out hover:bg-white max-[480px]:w-full"
              data-testid="button-order"
            >
              Pre-order
            </a>
          </Reveal>

          {/* The tiers are chosen in the order form; this is where the site describes them */}
          <Reveal show={revealed} index={4} className="mt-10">
            <p className="font-sans text-[17px] leading-[1.7] text-editorial-body">
              Copies are available from €15. Any extra support goes directly toward funding the project
              and the artists involved. Contributions of €150 or more include a copy of the publication
              plus an original, limited artwork from our artists.
            </p>
          </Reveal>
        </div>
      </div>

      <Footer />
    </Section>
  );
});
