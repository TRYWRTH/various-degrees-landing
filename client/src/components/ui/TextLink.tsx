import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  arrow?: boolean;
  /** Opens in a new tab with rel="noopener". Defaults to true unless `download` is set. */
  external?: boolean;
};

export function TextLink({
  href,
  arrow = false,
  external,
  className,
  children,
  download,
  ...rest
}: TextLinkProps) {
  const isExternal = external ?? download === undefined;
  return (
    <a
      href={href}
      download={download}
      {...(isExternal ? { target: "_blank", rel: "noopener" } : {})}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 font-sans text-link text-ink-muted",
        "transition-colors duration-160 ease-out hover:text-ink",
        className,
      )}
      {...rest}
    >
      <span className="underline decoration-ink-muted/60 decoration-1 underline-offset-[6px]">
        {children}
      </span>
      {arrow && (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-160 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
        >
          →
        </span>
      )}
    </a>
  );
}
