import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge about the custom type-scale tokens in tailwind.config.ts,
// otherwise it mistakes e.g. `text-title` for a colour and drops `text-ink`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display", "display-m", "subtitle", "subtitle-m", "title", "title-m",
            "panel-name", "panel-name-m", "body", "body-m", "panel-bio", "panel-bio-m",
            "nav", "nav-m", "wordmark", "wordmark-m", "detail", "detail-m", "label", "label-m", "button", "button-compact", "button-compact-m",
            "link", "note", "footer", "footer-m",
            "eyebrow", "eyebrow-m", "lead", "lead-m", "name", "name-m",
            "date", "date-m", "venue", "venue-m", "address", "address-m",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
