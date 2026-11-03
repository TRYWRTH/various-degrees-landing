import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge about the custom type-scale tokens in tailwind.config.ts,
// otherwise it mistakes e.g. `text-heading` for a colour and drops `text-ink`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display", "display-m", "subtitle", "subtitle-m", "heading", "heading-m",
            "name", "name-m",
            "panel-name", "panel-name-m", "body", "body-m", "panel-bio", "panel-bio-m",
            "label", "label-m", "button", "button-compact", "button-compact-m",
            "link", "note", "footer", "footer-m",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
