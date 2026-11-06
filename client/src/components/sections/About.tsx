import { forwardRef } from "react";
import {
  afterLabel,
  headlineSize,
  NumLabel,
  numberLabelClass,
  paragraphClass,
  rightColumn,
  Section,
  sectionPad,
} from "@/components/sections/Section";

/** Italic inside the 400 paragraphs: Inter Tight's light italic is the one loaded. */
const italic = "font-light italic";

/** The statement set large, then the two supporting paragraphs in the narrow right column. */
export const About = forwardRef<HTMLElement>(function About(_props, ref) {
  return (
    <Section id="about" ref={ref} pinClassName="pin-about" aria-labelledby="about-heading" className={`${sectionPad} m-sec`}>
      <p className={`${numberLabelClass} m-numlabel`}>
        <NumLabel n="02" name="About" />
      </p>

      <h1
        id="about-heading"
        className={`${afterLabel} m-h40 m-about-h m-head font-tight ${headlineSize} font-light leading-[1.05] tracking-[-0.035em] text-editorial-strong`}
        data-testid="text-description-1"
      >
        A publication contemplating what happens when the future we imagined feels increasingly far
        away
      </h1>


      <div className={`${rightColumn} m-indent mt-[clamp(56px,7.8vw,112px)] fit:mt-[clamp(28px,6vh,112px)] flex flex-col gap-7 fit:gap-[clamp(16px,3vh,28px)]`}>
        <p className={`${paragraphClass} m-text`} data-testid="text-description-2">
          <em className={italic}>Remnants of a Future</em> brings together a carefully curated group
          of artists, poets, writers and creators, who each offer their individual exploration of the
          theme.
        </p>
        <p className={`${paragraphClass} m-text`} data-testid="text-description-3">
          It is a collection about <em className={italic}>dreams</em>, about{" "}
          <em className={italic}>loss</em>, about <em className={italic}>mourning</em>, about{" "}
          <em className={italic}>hope</em>. And about how, in the face of a crumbling world, we can
          find pieces that help us take another step towards the future.
        </p>
      </div>
    </Section>
  );
});
