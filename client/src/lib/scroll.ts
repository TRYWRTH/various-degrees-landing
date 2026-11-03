/**
 * Scroll the snap container to a section and move focus there, so keyboard and
 * screen-reader users land in the same place. Instant with prefers-reduced-motion.
 */
export function scrollToSection(id: string): boolean {
  const section = document.getElementById(id);
  if (!section) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  section.focus({ preventScroll: true });
  return true;
}
