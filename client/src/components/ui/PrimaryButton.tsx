import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  size?: "default" | "compact";
};

/**
 * Filled `ink` pill. Every primary action on the site is an external link,
 * so this renders an anchor that opens in a new tab.
 * Max one visible per screen.
 */
export function PrimaryButton({
  href,
  size = "default",
  className,
  children,
  ...rest
}: PrimaryButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={cn(
        "relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-full",
        "bg-ink font-sans font-medium uppercase text-on-ink",
        "transition-colors duration-160 ease-out hover:bg-ink-hover",
        size === "default" && "h-12 w-full px-10 text-button md:w-auto",
        size === "compact" &&
          "hit-area h-[34px] px-5 text-button-compact-m md:h-9 md:px-6 md:text-button-compact",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
