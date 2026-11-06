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

/** Intro: how long the title screen stays, then how long the glide to Launch takes. */
const INTRO_HOLD_MS = 3000;
const INTRO_GLIDE_MS = 1400;

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

  // Intro: show the title screen, then glide on to the first section by itself.
  // Skipped with reduced motion or when the page opens anywhere but the top (a #link,
  // a restored scroll position), and cancelled by any input from the visitor,
  // before or during the glide. Scrolls only: focus stays where it is.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.location.hash || window.scrollY > 0) return;

    let timer = 0;
    let frame = 0;
    const inputs = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    const cancel = () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      inputs.forEach((type) => window.removeEventListener(type, cancel));
      window.removeEventListener("scroll", onEarlyScroll);
    };
    // Someone scrolled before the glide started (scrollbar drag, find-in-page, ...)
    const onEarlyScroll = () => {
      if (!frame && window.scrollY > 0) cancel();
    };

    const glide = () => {
      window.removeEventListener("scroll", onEarlyScroll);
      const target = sectionRefs.current.launch;
      if (!target || window.scrollY > 0) return cancel();
      const from = window.scrollY;
      const distance = target.offsetTop - from;
      const start = performance.now();
      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / INTRO_GLIDE_MS);
        window.scrollTo({ top: from + distance * ease(t), behavior: "instant" });
        if (t < 1) frame = requestAnimationFrame(step);
        else cancel();
      };
      frame = requestAnimationFrame(step);
    };

    inputs.forEach((type) => window.addEventListener(type, cancel, { passive: true }));
    window.addEventListener("scroll", onEarlyScroll, { passive: true });
    timer = window.setTimeout(glide, INTRO_HOLD_MS);
    return cancel;
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

  const activeContributor = contributors.find((c) => c.slug === activeSlug) ?? null;

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
        <ContributorPanel contributor={activeContributor} onClose={closeContributor} />
      )}
    </div>
  );
}
