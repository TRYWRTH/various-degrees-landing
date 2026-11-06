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
      const tops = SECTION_ORDER.map((key) => sectionRefs.current[key]?.offsetTop ?? 0);
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
