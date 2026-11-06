import { forwardRef } from "react";
import { Reveal, Section } from "@/components/sections/Section";
import { Footer } from "@/components/sections/Footer";
import { ORDER_URL } from "@/lib/links";

type OrderProps = {
  revealed: boolean;
};

/**
 * Only values the site already states. Format is not stated anywhere yet.
 * TODO: fill in Format (e.g. page count, size, binding) before launch.
 */
const meta: { label: string; value: string; todo?: boolean }[] = [
  { label: "Release", value: "18 November" },
  { label: "Format", value: "TODO", todo: true },
  { label: "Price", value: "From €15" },
];

/**
 * The publication and how to order it. Last screen; a flat, slightly lighter surface
 * that covers the photo, with the footer pinned near the bottom edge.
 */
export const Order = forwardRef<HTMLElement, OrderProps>(function Order({ revealed }, ref) {
  return (
    <Section
      id="order"
      ref={ref}
      aria-labelledby="order-heading"
      tabIndex={-1}
      vignette={false}
      className="border-t border-editorial-rule bg-editorial-surface text-left outline-none md:pt-[120px]"
      style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
    >
      <div className="grid w-full max-w-[1296px] flex-1 grid-cols-1 content-center items-center gap-y-12 pb-12 min-[900px]:grid-cols-[minmax(0,380px)_minmax(0,1fr)] min-[900px]:gap-x-24 md:pb-[120px]">
        <Reveal show={revealed} index={0} className="w-full max-w-[240px] min-[900px]:max-w-[380px]">
          {/* TODO: replace with the real cover image once there is one in the repo */}
          <div
            role="img"
            aria-label="Cover image placeholder"
            className="flex aspect-[3/4] w-full items-center justify-center border border-dashed border-editorial-link/60 bg-night/40 p-6 text-center"
            data-testid="img-cover-placeholder"
          >
            <span className="font-sans text-[12px] font-medium uppercase tracking-[0.24em] text-editorial-eyebrow">
              Cover image
              <br />
              placeholder
            </span>
          </div>
        </Reveal>

        <div className="w-full">
          <Reveal show={revealed} index={1}>
            <p className="font-sans text-[13px] font-medium uppercase leading-none tracking-[0.3em] text-editorial-eyebrow">
              The publication
            </p>
          </Reveal>
          <Reveal show={revealed} index={2} className="mt-6">
            <h2
              id="order-heading"
              className="font-newsreader text-[clamp(44px,5.4vw,84px)] font-light italic leading-[1.05] tracking-[-0.012em] text-editorial-strong"
            >
              Remnants of a Future
            </h2>
          </Reveal>

          <Reveal show={revealed} index={3} className="mt-10">
            <dl className="grid grid-cols-3 border-y border-hairline">
              {meta.map(({ label, value, todo }) => (
                <div key={label} className="py-5 pr-3 md:pr-4">
                  <dt className="font-sans text-[12px] font-medium uppercase tracking-[0.24em] text-editorial-eyebrow">
                    {label}
                  </dt>
                  <dd
                    className={
                      todo
                        ? "mt-2 font-sans text-[15px] font-medium text-editorial-strong underline decoration-heading decoration-dashed decoration-2 underline-offset-4 md:text-[17px]"
                        : "mt-2 font-sans text-[15px] text-editorial-strong md:text-[17px]"
                    }
                    data-testid={`text-meta-${label.toLowerCase()}`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal show={revealed} index={4} className="mt-8">
            <p className="max-w-[560px] font-sans text-[17px] leading-[1.7] text-editorial-body md:text-[19px]">
              Copies are available from €15. Any extra support goes directly toward funding the project
              and the artists involved. Contributions of €150 or more include a copy of the publication
              plus an original, limited artwork from our artists.
            </p>
          </Reveal>

          <Reveal show={revealed} index={5} className="mt-10">
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-full bg-editorial-strong px-10 py-[18px] font-sans text-[13px] font-medium uppercase leading-none tracking-[0.24em] text-editorial-on-strong transition-colors duration-160 ease-out hover:bg-ink-hover max-[480px]:w-full"
              data-testid="button-order"
            >
              Pre-order
            </a>
          </Reveal>
        </div>
      </div>

      <Footer />
    </Section>
  );
});
