import { useState, useEffect, useRef } from "react";
import { Mail, Instagram, Copy, Check, ChevronDown } from "lucide-react";
import backgroundImage from "@assets/01 Greek_1763915893499.png";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("variousdegrees@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const artists = [
    "Andrea Mikyska",
    "Asmaa Azaizeh",
    "Julio Clavijo",
    "Kevin Junk",
    "Nicola Sebastian",
    "Sharlene Durfey",
    "Theresa Weber",
    "Tomer Rosenthal",
  ];

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="relative w-full bg-background">
      {/* Background Image with Fixed Position */}
      <div className="fixed inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="h-full w-full object-cover"
        />
        {/* Dark Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        {/* Vignette Effect */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.5) 100%)",
          }}
        />
      </div>

      {/* Scrolling Content */}
      <div className="relative z-10">
        {/* Section 1: Coming Soon */}
        <section
          id="coming-soon"
          ref={(el) => (sectionRefs.current["coming-soon"] = el)}
          className="relative flex min-h-screen items-center justify-center px-6 py-16"
        >
          <h1
            className={`
              font-serif text-5xl font-light tracking-widest text-white transition-all duration-1000
              md:text-7xl lg:text-8xl
              ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
            `}
            style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)" }}
            data-testid="text-headline"
          >
            COMING SOON...
          </h1>

          {/* Scroll Indicator */}
          <div
            className={`
              absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-all duration-1000
              ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
            `}
            style={{ transitionDelay: "1200ms" }}
            data-testid="scroll-indicator"
          >
            <p className="text-xs uppercase tracking-widest text-white/70 md:text-sm">
              Scroll
            </p>
            <div className="animate-bounce">
              <ChevronDown className="h-6 w-6 text-white/70 md:h-8 md:w-8" />
            </div>
          </div>
        </section>

        {/* Section 2: Publication Title */}
        <section
          id="title"
          ref={(el) => (sectionRefs.current["title"] = el)}
          className="flex min-h-[60vh] items-center justify-center px-6 py-16"
        >
          <h2
            className={`
              font-serif text-6xl font-light tracking-wider text-white transition-all duration-1000
              md:text-8xl lg:text-9xl
              ${isVisible("title") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
            `}
            style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)" }}
            data-testid="text-title"
          >
            Various Degrees
          </h2>
        </section>

        {/* Section 3: Artists */}
        <section
          id="artists"
          ref={(el) => (sectionRefs.current["artists"] = el)}
          className="flex min-h-screen items-start justify-center px-6 py-24 md:py-32"
        >
          <div className="flex max-w-4xl flex-col items-center gap-12 md:gap-16">
            {artists.map((artist, index) => (
              <div
                key={artist}
                id={`artist-${index}`}
                ref={(el) => (sectionRefs.current[`artist-${index}`] = el)}
                className={`
                  transition-all duration-1000
                  ${isVisible(`artist-${index}`) ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
                `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <p
                  className="font-serif text-4xl font-light italic text-white/95 md:text-5xl lg:text-6xl"
                  style={{ textShadow: "0 2px 12px rgba(0, 0, 0, 0.5)" }}
                  data-testid={`text-artist-${index}`}
                >
                  {artist}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Spacing */}
        <div className="h-32" />
      </div>

      {/* Floating Contact Bubble */}
      <div
        className={`
          fixed bottom-6 right-6 z-20 transition-all duration-1000 md:bottom-8 md:right-8
          ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
        `}
        style={{ transitionDelay: "1600ms" }}
      >
        {/* Expanded Contact Info */}
        {showContact && (
          <div
            className="mb-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg"
            data-testid="contact-info"
          >
            <div className="flex flex-col gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/various.degrees/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-3 text-white transition-all hover:text-white/80"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5 flex-shrink-0 transition-transform group-hover/link:scale-110" />
                <span className="text-sm font-medium">@various.degrees</span>
              </a>

              {/* Email */}
              <div className="flex items-center gap-2">
                <a
                  href="mailto:variousdegrees@gmail.com"
                  className="group/link flex flex-1 items-center gap-3 text-white transition-all hover:text-white/80"
                  data-testid="link-email"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 transition-transform group-hover/link:scale-110" />
                  <span className="text-sm font-medium">variousdegrees@gmail.com</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="rounded-lg border border-white/20 bg-white/10 p-2 text-white transition-all hover:bg-white/20 active:scale-95"
                  data-testid="button-copy-email"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setShowContact(!showContact)}
          className="group ml-auto flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/20 active:scale-95"
          data-testid="button-contact"
          aria-label={showContact ? "Hide contact information" : "Show contact information"}
        >
          <Mail className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-sm font-medium text-white">
            {showContact ? "Close" : "Contact"}
          </span>
        </button>
      </div>
    </div>
  );
}
