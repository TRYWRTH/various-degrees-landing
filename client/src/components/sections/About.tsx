import { forwardRef, type ReactNode } from "react";
import { Section, SectionTitle } from "@/components/sections/Section";

type AboutProps = {
  revealed: boolean;
};

const paragraphs: ReactNode[] = [
  "A publication contemplating what happens when the future we imagined feels increasingly far away.",
  <>
    <em>Remnants of a Future</em> brings together a carefully curated group of artists, poets,
    writers and creators, who each offer their individual exploration of the theme.
  </>,
  "It is a collection about dreams, about loss, about mourning, about hope. And about how, in the face of a crumbling world, we can find pieces that help us take another step towards the future.",
];

export const About = forwardRef<HTMLElement, AboutProps>(function About({ revealed }, ref) {
  return (
    <Section id="about" ref={ref} aria-labelledby="about-label">
      <div className="flex w-full max-w-body flex-col items-center">
        <SectionTitle id="about-label">About</SectionTitle>

        <div className="mt-6 flex flex-col gap-4 md:mt-8 md:gap-5">
          {paragraphs.map((text, index) => (
            <p
              key={index}
              className={`
                font-sans text-body-m text-ink-muted transition-all duration-1000 motion-reduce:transition-none
                md:text-body
                ${revealed ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
              data-testid={`text-description-${index + 1}`}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
});
