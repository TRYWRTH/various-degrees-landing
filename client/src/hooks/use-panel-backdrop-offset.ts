import { useLayoutEffect, type RefObject } from "react";

/** How long to keep re-measuring after open (the entrance animation is 220–240ms). */
const ANIMATION_MS = 320;

/**
 * Lines a panel's own copy of the background photo up with the page background,
 * pixel for pixel, so the panel reads as a window onto the photo.
 *
 * Reads the page photo (`[data-page-photo]`, an object-fit: cover <img>) and works out
 * the photo's full drawn size, which overhangs the viewport on one axis. That size goes
 * to `--bw`/`--bh` (so the blur has real photo to sample past the panel edges instead of
 * darkening them) and the offset from the panel's padding box to `--bx`/`--by`.
 *
 * Compensates for the panel's own entrance transform (slide and slight scale).
 * Updates on open, resize, orientationchange, visualViewport resize (iOS toolbar,
 * Instagram in-app browser) and on every frame while the entrance animation runs, so
 * the photo stays still while the panel slides. With prefers-reduced-motion there is
 * no animation, so it measures once.
 */
export function usePanelBackdropOffset(
  panelRef: RefObject<HTMLElement>,
  photoRef: RefObject<HTMLImageElement>,
) {
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const photo = photoRef.current;
    if (!panel || !photo) return;

    const update = () => {
      const pagePhoto = document.querySelector<HTMLImageElement>("[data-page-photo]");
      if (!pagePhoto) return;
      const box = pagePhoto.getBoundingClientRect();
      const iw = pagePhoto.naturalWidth || photo.naturalWidth;
      const ih = pagePhoto.naturalHeight || photo.naturalHeight;
      if (!iw || !ih || !box.width || !box.height) return;

      // object-fit: cover — scale to fill the box, centred
      const scale = Math.max(box.width / iw, box.height / ih);
      const w = iw * scale;
      const h = ih * scale;
      const photoLeft = box.left + (box.width - w) / 2;
      const photoTop = box.top + (box.height - h) / 2;

      // Absolute children are positioned from the padding box (inside the 1px border).
      // The desktop entrance also scales the panel, so undo its current scale too.
      const rect = panel.getBoundingClientRect();
      const k = panel.offsetWidth ? rect.width / panel.offsetWidth : 1;
      const originX = rect.left + panel.clientLeft * k;
      const originY = rect.top + panel.clientTop * k;

      panel.style.setProperty("--bw", `${w / k}px`);
      panel.style.setProperty("--bh", `${h / k}px`);
      panel.style.setProperty("--bx", `${(photoLeft - originX) / k}px`);
      panel.style.setProperty("--by", `${(photoTop - originY) / k}px`);
    };

    update();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    if (!reduceMotion) {
      const start = performance.now();
      const tick = (now: number) => {
        update();
        if (now - start < ANIMATION_MS) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    const vv = window.visualViewport;
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    vv?.addEventListener("resize", update);
    photo.addEventListener("load", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      vv?.removeEventListener("resize", update);
      photo.removeEventListener("load", update);
    };
  }, [panelRef, photoRef]);
}
