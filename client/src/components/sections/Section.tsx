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

export function SectionHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-balance font-forum text-heading-m text-ink md:text-heading", className)}>
      {children}
    </h2>
  );
}
