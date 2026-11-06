import { useCallback, useEffect, useRef, useState } from "react";
import { Background, type BackgroundHandle, type OverlayState } from "@/components/Background";
import { TopBar } from "@/components/TopBar";
import { ContributorPanel } from "@/components/ContributorPanel";
import { Hero } from "@/components/sections/Hero";
import { Launch } from "@/components/sections/Launch";
import { About } from "@/components/sections/About";
import { Contributors } from "@/components/sections/Contributors";
import { Order } from "@/components/sections/Order";
import { contributors } from "@/data/contributors";

type SectionKey = "hero" | "launch" | "about" | "contributors" | "order";

const SECTION_ORDER: SectionKey[] = ["hero", "launch", "about", "contributors", "order"];

/** Legibility overlay ramp: the value each section settles on. */
const OVERLAY: Record<SectionKey, OverlayState> = {
  hero: { hero: 1, alpha: 0, blur: 0 },
  launch: { hero: 0, alpha: 0.72, blur: 4 },
  about: { hero: 0, alpha: 0.6, blur: 8 },
  contributors: { hero: 0, alpha: 0.78, blur: 8 },
  "order": { hero: 0, alpha: 0.84, blur: 10 },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const PANEL_STATE_KEY = "vdContributor";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroActive, setHeroActive] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [showTopOrder, setShowTopOrder] = useState(false);
  const [revealed, setRevealed] = useState<ReadonlySet<SectionKey>>(new Set());
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<BackgroundHandle>(null);
  const sectionRefs = useRef<Partial<Record<SectionKey, HTMLElement | null>>>({});
  const panelTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useRef(false);

  const setSectionRef = (key: SectionKey) => (el: HTMLElement | null) => {
    sectionRefs.current[key] = el;
  };

  useEffect(() => {
    scrollerRef.current?.scrollTo(0, 0);
    // A reload keeps history.state; drop a stale panel marker so Close doesn't navigate back.
    if (window.history.state?.[PANEL_STATE_KEY]) {
      const { [PANEL_STATE_KEY]: _stale, ...rest } = window.history.state;
      window.history.replaceState(rest, "");
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => (reducedMotion.current = mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Scroll-driven state: hero fade (scrollOpacity), overlay ramp, glitch + top-bar visibility.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = scroller.scrollTop;
      const windowHeight = scroller.clientHeight;
      const maxScroll = scroller.scrollHeight - windowHeight;

      // Hero fades out on scroll (unchanged thresholds)
      const fadeStart = windowHeight * 0.3;
      const fadeEnd = windowHeight * 0.8;
      let scrollOpacity = 1;
      if (scrollY > fadeEnd) scrollOpacity = 0;
      else if (scrollY > fadeStart) scrollOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      const hero = sectionRefs.current.hero;
      if (hero) hero.style.opacity = String(scrollOpacity);

      // Overlay ramp: interpolate between the snap positions of neighbouring sections
      const anchors = SECTION_ORDER.map((key) => {
        const el = sectionRefs.current[key];
        return { key, top: el ? Math.min(el.offsetTop, maxScroll) : 0 };
      });
      let state = OVERLAY.hero;
      for (let i = 0; i < anchors.length; i++) {
        const current = anchors[i];
        const next = anchors[i + 1];
        if (!next || scrollY < next.top) {
          if (!next || next.top <= current.top) {
            state = OVERLAY[current.key];
          } else {
            let t = Math.min(1, Math.max(0, (scrollY - current.top) / (next.top - current.top)));
            if (reducedMotion.current) t = t < 0.5 ? 0 : 1;
            const a = OVERLAY[current.key];
            const b = OVERLAY[next.key];
            state = {
              hero: lerp(a.hero, b.hero, t),
              alpha: lerp(a.alpha, b.alpha, t),
              blur: lerp(a.blur, b.blur, t),
            };
          }
          break;
        }
      }
      backgroundRef.current?.setOverlay(state);

      // Glitch only while the hero is in view
      setHeroActive(scrollY < windowHeight * 0.8);

      // Top-bar Order: visible everywhere (hero included) except while the Order section is in view
      const pre = sectionRefs.current["order"];
      let orderInView = false;
      if (pre) {
        const top = pre.offsetTop;
        const bottom = top + pre.offsetHeight;
        const overlap = Math.min(bottom, scrollY + windowHeight) - Math.max(top, scrollY);
        orderInView = overlap > windowHeight * 0.25;
      }
      setPastHero(scrollY > windowHeight * 0.8);
      setShowTopOrder(!orderInView);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Staggered reveal-on-view for the content sections
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.id as SectionKey;
          timers.push(setTimeout(() => setRevealed((prev) => new Set(prev).add(key)), 400));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" },
    );
    (["launch", "about", "contributors", "order"] as const).forEach((key) => {
      const el = sectionRefs.current[key];
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
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

  // Lock page scroll + snapping while the panel is open; restore focus on close
  const panelOpen = activeSlug !== null;
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (panelOpen) {
      scroller.style.overflowY = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      scroller.style.overflowY = "";
      document.body.style.overflow = "";
      panelTriggerRef.current?.focus({ preventScroll: true });
    }
  }, [panelOpen]);

  const activeContributor = contributors.find((c) => c.slug === activeSlug) ?? null;

  return (
    <div className="relative w-full bg-night">
      <Background ref={backgroundRef} glitchActive={heroActive && !panelOpen} />

      <div aria-hidden={panelOpen || undefined}>
        <TopBar isLoaded={isLoaded} showWordmark={pastHero} showOrder={showTopOrder} />
      </div>

      <main
        ref={scrollerRef}
        aria-hidden={panelOpen || undefined}
        className="snap-scroller relative z-10 h-[100svh] snap-y snap-mandatory overflow-y-auto overflow-x-hidden"
      >
        <Hero ref={setSectionRef("hero")} isLoaded={isLoaded} />
        <Launch ref={setSectionRef("launch")} revealed={revealed.has("launch")} />
        <About ref={setSectionRef("about")} revealed={revealed.has("about")} />
        <Contributors
          ref={setSectionRef("contributors")}
          revealed={revealed.has("contributors")}
          onSelect={openContributor}
        />
        <Order ref={setSectionRef("order")} revealed={revealed.has("order")} />
      </main>

      {activeContributor && (
        <ContributorPanel contributor={activeContributor} onClose={closeContributor} />
      )}
    </div>
  );
}
