import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  id: string;
  children: ReactNode;
};

/** One full screen per section, snapped, with the centre vignette behind the column. */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, className, children, ...rest },
  ref,
) {
  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "section-pad relative isolate flex min-h-[100svh] snap-start snap-always flex-col items-center justify-center text-center",
        className,
      )}
      {...rest}
    >
      <div className="section-vignette" aria-hidden="true" />
      {children}
    </section>
  );
});

export const labelClass =
  "font-sans text-label-m font-medium uppercase text-ink-muted md:text-label";

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn(labelClass, className)}>
      {children}
    </p>
  );
}

/** Section heading: the small-caps style, used for every section. */
export function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-balance font-sans text-title-m font-medium uppercase text-heading md:text-title"
    >
      {children}
    </h2>
  );
}

/**
 * Gentle fade-up once the section has scrolled into view. Children reveal one after
 * another, `step` ms apart (pass each item's `index`).
 */
export function Reveal({
  show,
  index = 0,
  step = 150,
  className,
  children,
}: {
  show: boolean;
  index?: number;
  step?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "transition-all duration-1000 motion-reduce:transition-none",
        show ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${index * step}ms` }}
    >
      {children}
    </div>
  );
}
