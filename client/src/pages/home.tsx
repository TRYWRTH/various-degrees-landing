import { useCallback, useEffect, useRef, useState } from "react";
import { Background, type BackgroundHandle } from "@/components/Background";
import { TopBar } from "@/components/TopBar";
import { ContributorPanel } from "@/components/ContributorPanel";
import { Hero } from "@/components/sections/Hero";
import { Launch } from "@/components/sections/Launch";
import { About } from "@/components/sections/About";
import { Contributors } from "@/components/sections/Contributors";
import { Order } from "@/components/sections/Order";
import { Footer } from "@/components/sections/Footer";
import { contributors } from "@/data/contributors";

type SectionKey = "hero" | "launch" | "about" | "contributors" | "order";

const SECTION_ORDER: SectionKey[] = ["hero", "launch", "about", "contributors", "order"];

/**
 * Flat dark layer per section, a little darker further down the page. The background
 * adds a fixed top-to-bottom gradient on top, so each screen reads roughly 40% black at
 * the top and 80% at the bottom.
 */
const DARKNESS: Record<SectionKey, number> = {
  hero: 0.4,
  launch: 0.43,
  about: 0.46,
  contributors: 0.5,
  order: 0.53,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A section's position on the page. */
function docTop(section: HTMLElement | null | undefined): number {
  if (!section) return 0;
  return section.getBoundingClientRect().top + window.scrollY;
}

/** Phones: the sections that signal "centred", with their names. */
const CENTRED: { id: SectionKey; n: number; name: string }[] = [
  { id: "launch", n: 1, name: "Event" },
  { id: "about", n: 2, name: "About" },
  { id: "contributors", n: 3, name: "Contributors" },
  { id: "order", n: 4, name: "Get a copy" },
];

const PANEL_STATE_KEY = "vdContributor";


export default function Home() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const backgroundRef = useRef<BackgroundHandle>(null);
  const sectionRefs = useRef<Partial<Record<SectionKey, HTMLElement | null>>>({});
  const panelTriggerRef = useRef<HTMLButtonElement | null>(null);

  const setSectionRef = (key: SectionKey) => (el: HTMLElement | null) => {
    sectionRefs.current[key] = el;
  };

  useEffect(() => {
    // A reload keeps history.state; drop a stale panel marker so Close doesn't navigate back.
    if (window.history.state?.[PANEL_STATE_KEY]) {
      const { [PANEL_STATE_KEY]: _stale, ...rest } = window.history.state;
      window.history.replaceState(rest, "");
    }
  }, []);

  // Darkness ramp: interpolate between neighbouring sections as each one scrolls in
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY + window.innerHeight * 0.5;
      const tops = SECTION_ORDER.map((key) => docTop(sectionRefs.current[key]));
      let alpha = DARKNESS.hero;
      for (let i = 0; i < SECTION_ORDER.length; i++) {
        const next = tops[i + 1];
        if (next === undefined || y < next) {
          const a = DARKNESS[SECTION_ORDER[i]];
          if (next === undefined || i === 0) {
            alpha = i === 0 ? lerp(a, DARKNESS.launch, Math.max(0, Math.min(1, y / next))) : a;
          } else {
            const t = Math.max(0, Math.min(1, (y - tops[i]) / (next - tops[i])));
            alpha = lerp(a, DARKNESS[SECTION_ORDER[i + 1]], t);
          }
          break;
        }
      }
      backgroundRef.current?.setDarkness(alpha);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Phones: one-way side entries. Each element slides in from off-screen as its section
  // rises: it starts the moment the section appears at the bottom (progress 0) and is
  // in place when the section is centred (progress 1). The furthest progress reached is
  // remembered, so scrolling back up never moves anything back; scrolling down again
  // carries on from there. Off on desktop and with reduced motion (elements just sit
  // in place).
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 760px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ENTRIES: { sel: string; from: -1 | 1 }[] = [
      { sel: ".m-row-date", from: -1 },
      { sel: ".m-row-place", from: 1 },
      { sel: ".m-about-h", from: 1 },
      { sel: ".m-cover", from: -1 },
      { sel: ".m-order-p", from: -1 },
    ];
    const items = ENTRIES.flatMap(({ sel, from }) => {
      const el = document.querySelector<HTMLElement>(sel);
      const section = el?.closest<HTMLElement>("section");
      return el && section ? [{ el, section, from, reached: 0 }] : [];
    });
    let frame = 0;

    const update = () => {
      frame = 0;
      const active = phone.matches && !reduce.matches;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      for (const item of items) {
        if (!active) {
          item.el.style.translate = "";
          continue;
        }
        if (item.reached >= 1) continue;
        // From the section appearing at the bottom (start) to it being centred, or to the
        // end of the page if it can never be centred (the last section) (end)
        const r = item.section.getBoundingClientRect();
        const y = window.scrollY;
        const top = r.top + y;
        const start = top - vh;
        const maxScroll = document.documentElement.scrollHeight - vh;
        const end = Math.min(top + r.height / 2 - vh / 2, maxScroll);
        const progress = end > start ? (y - start) / (end - start) : 1;
        item.reached = Math.min(1, Math.max(item.reached, progress));
        item.el.style.translate =
          item.reached >= 1 ? "" : `${item.from * (1 - Math.max(0, item.reached)) * vw}px 0`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onModeChange = () => {
      if (!phone.matches || reduce.matches) for (const item of items) item.reached = 0;
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    phone.addEventListener?.("change", onModeChange);
    reduce.addEventListener?.("change", onModeChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      phone.removeEventListener?.("change", onModeChange);
      reduce.removeEventListener?.("change", onModeChange);
      for (const item of items) item.el.style.translate = "";
    };
  }, []);

  // Phones: "right position" signal. A section is centred while it crosses the middle
  // band of the screen (IntersectionObserver, rootMargin -45% top and bottom). On
  // entering, in the same callback: class is-center (dash + label + thud in CSS), a 10ms
  // vibration (after the first interaction, where supported) and a polite announcement
  // (not on first load, not repeated for the same section twice in a row).
  const liveRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 760px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;

    let interacted = false;
    let ready = false; // the observer's first report describes the page on load
    let lastAnnounced: string | null = null;
    const byId = new Map(CENTRED.map((c) => [c.id as string, c]));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = entry.target as HTMLElement;
          const info = byId.get(section.id);
          if (!info) continue;
          const isCentre = phone.matches && entry.isIntersecting;
          const was = section.classList.contains("is-center");
          if (isCentre && !was) {
            section.classList.add("is-center");
            if (ready) {
              if (interacted && !reduce.matches) {
                try {
                  navigator.vibrate?.(10);
                } catch {
                  /* unsupported: stay silent */
                }
              }
              if (lastAnnounced !== info.id && liveRef.current) {
                liveRef.current.textContent = `Section ${info.n} of 4: ${info.name}`;
                lastAnnounced = info.id;
              }
            }
          } else if (!isCentre && was) {
            section.classList.remove("is-center");
          }
        }
        ready = true;
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const c of CENTRED) {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    }

    const onInteract = () => {
      interacted = true;
    };
    const onPhoneChange = () => {
      if (!phone.matches) {
        for (const c of CENTRED) document.getElementById(c.id)?.classList.remove("is-center");
      }
    };
    window.addEventListener("touchstart", onInteract, { passive: true });
    window.addEventListener("scroll", onInteract, { passive: true });
    phone.addEventListener?.("change", onPhoneChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
      phone.removeEventListener?.("change", onPhoneChange);
    };
  }, []);

  // Contributor panel: history entry so the back gesture closes it
  const openContributor = useCallback((slug: string, trigger: HTMLButtonElement) => {
    panelTriggerRef.current = trigger;
    setActiveSlug(slug);
    window.history.pushState({ ...(window.history.state ?? {}), [PANEL_STATE_KEY]: slug }, "");
  }, []);

  // Previous / next inside the panel: swap the artist without a new history entry, and
  // return focus to this artist's name on close
  const browseContributor = useCallback((slug: string) => {
    setActiveSlug(slug);
    panelTriggerRef.current = document.querySelector<HTMLButtonElement>(
      `[data-testid="button-contributor-${slug}"]`,
    );
    window.history.replaceState({ ...(window.history.state ?? {}), [PANEL_STATE_KEY]: slug }, "");
  }, []);

  const closeContributor = useCallback(() => {
    if (window.history.state?.[PANEL_STATE_KEY]) {
      window.history.back(); // popstate handler clears the panel
    } else {
      setActiveSlug(null);
    }
  }, []);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      setActiveSlug(e.state?.[PANEL_STATE_KEY] ?? null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Lock page scroll while the panel is open; restore focus on close
  const panelOpen = activeSlug !== null;
  useEffect(() => {
    const root = document.documentElement;
    if (panelOpen) {
      root.style.overflow = "hidden";
    } else {
      root.style.overflow = "";
      panelTriggerRef.current?.focus({ preventScroll: true });
    }
  }, [panelOpen]);

  const activeIndex = contributors.findIndex((c) => c.slug === activeSlug);
  const activeContributor = activeIndex >= 0 ? contributors[activeIndex] : null;
  const neighbour = (step: number) =>
    contributors[(activeIndex + step + contributors.length) % contributors.length];

  return (
    <div className="relative w-full overflow-x-clip">
      <Background ref={backgroundRef} />

      <div className="relative z-10" aria-hidden={panelOpen || undefined}>
        <TopBar />
        <main>
          <Hero ref={setSectionRef("hero")} />
          <Launch ref={setSectionRef("launch")} />
          <About ref={setSectionRef("about")} />
          <Contributors ref={setSectionRef("contributors")} onSelect={openContributor} />
          <Order ref={setSectionRef("order")} />
        </main>
        <Footer />
        {/* Phones: announces the section that just reached the centre */}
        <div ref={liveRef} className="sr-only" role="status" aria-live="polite" aria-atomic="true" />
      </div>

      {activeContributor && (
        <ContributorPanel
          contributor={activeContributor}
          previous={neighbour(-1)}
          next={neighbour(1)}
          onNavigate={browseContributor}
          onClose={closeContributor}
        />
      )}
    </div>
  );
}
