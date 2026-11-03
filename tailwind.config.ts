import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem", /* 9px */
        md: ".375rem", /* 6px */
        sm: ".1875rem", /* 3px */
      },
      colors: {
        // Flat / base colors (regular buttons)
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)"
        },
        // Various Degrees design tokens
        ink: {
          DEFAULT: "#F3F0EA",
          muted: "#B9B4AA",
          hover: "#D8D3C9",
        },
        "on-ink": "#121211",
        night: "rgb(8 8 7)",
        surface: "#161614",
        // Contributor panel: "smoked glass" surface
        glass: {
          DEFAULT: "rgba(20, 18, 15, 0.62)",
          fade: "rgba(20, 18, 15, 0.9)",
          clear: "rgba(20, 18, 15, 0)",
          border: "rgba(243, 240, 234, 0.16)",
          divider: "rgba(243, 240, 234, 0.10)",
          text: "#C2BCB1",
        },
        hairline: {
          DEFAULT: "rgba(243, 240, 234, 0.12)",
          soft: "rgba(243, 240, 234, 0.08)",
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
        forum: ["Forum", "Georgia", "serif"],
      },
      // Type scale: `<role>` is desktop (md+), `<role>-m` is mobile.
      fontSize: {
        display: ["clamp(3.5rem, 7.4vw, 6.25rem)", { lineHeight: "1", letterSpacing: "0.03em" }],
        "display-m": ["min(56px, 15.5vw)", { lineHeight: "1", letterSpacing: "0.03em" }],
        subtitle: ["28px", { lineHeight: "1.3", letterSpacing: "0.32em" }],
        "subtitle-m": ["17px", { lineHeight: "1.4", letterSpacing: "0.3em" }],
        heading: ["56px", { lineHeight: "1.1" }],
        "heading-m": ["36px", { lineHeight: "1.1" }],
        statement: ["26px", { lineHeight: "1.5" }],
        "statement-m": ["20px", { lineHeight: "1.5" }],
        order: ["25px", { lineHeight: "1.55" }],
        "order-m": ["19px", { lineHeight: "1.55" }],
        name: ["38px", { lineHeight: "1.2" }],
        "name-m": ["27px", { lineHeight: "1.2" }],
        "panel-name": ["48px", { lineHeight: "1.1" }],
        "panel-name-m": ["34px", { lineHeight: "1.1" }],
        body: ["17px", { lineHeight: "1.65" }],
        "body-m": ["16px", { lineHeight: "1.65" }],
        "panel-bio": ["19px", { lineHeight: "1.75" }],
        "panel-bio-m": ["16px", { lineHeight: "1.65" }],
        label: ["12px", { lineHeight: "1.5", letterSpacing: "0.2em" }],
        "label-m": ["11px", { lineHeight: "1.5", letterSpacing: "0.2em" }],
        button: ["13px", { lineHeight: "1", letterSpacing: "0.14em" }],
        "button-compact": ["12px", { lineHeight: "1", letterSpacing: "0.14em" }],
        "button-compact-m": ["11px", { lineHeight: "1", letterSpacing: "0.14em" }],
        link: ["15px", { lineHeight: "1.4" }],
        note: ["13px", { lineHeight: "1.5" }],
        footer: ["14px", { lineHeight: "1.5" }],
        "footer-m": ["11px", { lineHeight: "1.5" }],
      },
      spacing: {
        topbar: "72px",
        "topbar-m": "56px",
        gutter: "28px",
      },
      maxWidth: {
        body: "600px",
        order: "640px",
        column: "720px",
      },
      transitionDuration: {
        160: "160ms",
        240: "240ms",
      },
      keyframes: {
        "panel-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "panel-in": {
          from: { opacity: "0", transform: "translateY(12px) scale(0.985)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "panel-up": "panel-up 240ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "panel-in": "panel-in 220ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 200ms ease-out both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
