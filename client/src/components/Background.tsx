import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import backgroundImage from "@assets/01-greek.webp";

export type OverlayState = {
  /** 0–1: how much of the hero's own gradient + vignette is shown */
  hero: number;
  /** 0–1: alpha of the flat `night` overlay */
  alpha: number;
  /** px blur applied to the photo */
  blur: number;
};

export type BackgroundHandle = {
  setOverlay: (state: OverlayState) => void;
};

type BackgroundProps = {
  /** The VHS glitch only runs while this is true (hero in view). */
  glitchActive: boolean;
};

/**
 * One fixed background layer behind every section: the photo, the VHS glitch,
 * and the legibility overlay ramp. Overlay values are written straight to the
 * DOM on scroll (via the imperative handle) to avoid re-rendering the page.
 */
export const Background = forwardRef<BackgroundHandle, BackgroundProps>(function Background(
  { glitchActive },
  ref,
) {
  const [showGlitch, setShowGlitch] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const nightLayerRef = useRef<HTMLDivElement>(null);
  const firstGlitch = useRef(true);

  useImperativeHandle(ref, () => ({
    setOverlay({ hero, alpha, blur }) {
      if (heroLayerRef.current) heroLayerRef.current.style.opacity = String(hero);
      if (nightLayerRef.current) nightLayerRef.current.style.opacity = String(alpha);
      if (photoRef.current) {
        const px = Math.round(blur * 10) / 10;
        photoRef.current.style.filter = px > 0 ? `blur(${px}px)` : "none";
      }
    },
  }));

  // Occasional glitch effect, only while the hero is in view.
  // First glitch right after load (1.5s), then every 8–15s at random.
  useEffect(() => {
    if (!glitchActive) {
      setShowGlitch(false);
      return;
    }

    let scheduleTimer: ReturnType<typeof setTimeout>;
    let endTimer: ReturnType<typeof setTimeout>;

    const triggerGlitch = () => {
      setShowGlitch(true);
      // Glitch lasts 1.5 seconds - slow distortion
      endTimer = setTimeout(() => setShowGlitch(false), 1500);
      scheduleNext();
    };

    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 7000;
      scheduleTimer = setTimeout(triggerGlitch, delay);
    };

    if (firstGlitch.current) {
      firstGlitch.current = false;
      scheduleTimer = setTimeout(triggerGlitch, 1500);
    } else {
      scheduleNext();
    }

    return () => {
      clearTimeout(scheduleTimer);
      clearTimeout(endTimer);
      setShowGlitch(false);
    };
  }, [glitchActive]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-night" aria-hidden="true">
      {/* Photo + glitch slices (blurred together by the ramp). Slight scale hides blurred edges. */}
      <div ref={photoRef} className="absolute inset-0 scale-[1.04]">
        <img src={backgroundImage} alt="" className="h-full w-full object-cover" data-page-photo="" />

        {/* Glitch: VHS static/snow effect */}
        {showGlitch && (
          <>
            {/* Top slice - shifted right, desaturated */}
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover glitch-animate"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 25%, 0 25%)",
                transform: "translateX(30px) translateY(-5px) rotate(0.5deg)",
                filter: "brightness(1.2) contrast(1.5) saturate(0.3) grayscale(0.4)",
              }}
            />
            {/* Upper-middle slice - shifted left, more desaturated */}
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover glitch-animate"
              style={{
                clipPath: "polygon(0 25%, 100% 25%, 100% 50%, 0 50%)",
                transform: "translateX(-35px) translateY(6px) skewX(-2deg)",
                filter: "brightness(0.9) contrast(1.6) saturate(0.2) grayscale(0.5)",
                animationDelay: "0.05s",
              }}
            />
            {/* Lower-middle slice - shifted right and heavily skewed */}
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover glitch-animate"
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 75%, 0 75%)",
                transform: "translateX(40px) translateY(-4px) skewX(-4deg) rotate(-0.8deg)",
                filter: "brightness(1.1) contrast(1.7) saturate(0.1) grayscale(0.6)",
                animationDelay: "0.03s",
              }}
            />
            {/* Bottom slice - shifted left, most desaturated */}
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover glitch-animate"
              style={{
                clipPath: "polygon(0 75%, 100% 75%, 100% 100%, 0 100%)",
                transform: "translateX(-28px) translateY(8px) rotate(0.6deg)",
                filter: "brightness(1.15) contrast(1.5) saturate(0.2) grayscale(0.5)",
                animationDelay: "0.07s",
              }}
            />

            {/* VHS static overlay - scanlines */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  rgba(255, 255, 255, 0.03) 1px,
                  transparent 2px,
                  transparent 3px
                )`,
              }}
            />

            {/* Noise/grain overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </>
        )}
      </div>

      {/* Hero: original dark gradient + vignette */}
      <div ref={heroLayerRef} className="absolute inset-0" style={{ opacity: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.5) 100%)",
          }}
        />
      </div>

      {/* Content sections: flat night overlay, opacity driven by the scroll ramp */}
      <div ref={nightLayerRef} className="absolute inset-0 bg-night" style={{ opacity: 0 }} />
    </div>
  );
});
