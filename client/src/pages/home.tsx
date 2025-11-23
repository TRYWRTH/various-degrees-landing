import { useState, useEffect, useRef } from "react";
import { Mail, Instagram, Copy, Check, ChevronDown } from "lucide-react";
import backgroundImage from "@assets/01 Greek_1763915893499.png";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [showArtists, setShowArtists] = useState(false);
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fadeStart = windowHeight * 0.3;
      const fadeEnd = windowHeight * 0.8;
      
      if (scrollY < fadeStart) {
        setScrollOpacity(1);
      } else if (scrollY > fadeEnd) {
        setScrollOpacity(0);
      } else {
        const opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setScrollOpacity(opacity);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
            
            // When title section becomes visible, show artists after a delay
            if (entry.target.id === "title") {
              setTimeout(() => {
                setShowArtists(true);
              }, 400);
            }
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
      await navigator.clipboard.writeText("info@amenogroup.co");
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

      {/* Snap Container - Only for the first two sections */}
      <div className="relative z-10 h-screen overflow-y-auto snap-y snap-proximity">
        {/* Section 1: Coming Soon */}
        <section
          id="coming-soon"
          ref={(el) => (sectionRefs.current["coming-soon"] = el)}
          className="relative flex min-h-screen items-center justify-center px-6 py-16 snap-start snap-always"
          style={{
            opacity: scrollOpacity,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <h1
            className={`
              text-center font-serif text-4xl font-light tracking-widest text-white transition-all duration-1000
              sm:text-5xl md:text-7xl lg:text-8xl
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

        {/* Section 2: Publication Title & Artists Combined */}
        <section
          id="title"
          ref={(el) => (sectionRefs.current["title"] = el)}
          className="flex min-h-screen flex-col items-center justify-center px-6 py-12 snap-start snap-always"
        >
          {/* Title */}
          <div className="flex flex-col items-center gap-3 mb-10 md:gap-4 md:mb-12">
            <h2
              className={`
                text-center font-serif text-4xl font-light tracking-wider text-white transition-all duration-1000
                sm:text-5xl md:text-7xl lg:text-8xl
                ${isVisible("title") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
              `}
              style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)" }}
              data-testid="text-title"
            >
              VARIOUS DEGREES
            </h2>
            <p
              className={`
                text-center font-serif text-lg font-light italic tracking-widest text-white/90 transition-all duration-1000
                sm:text-xl md:text-2xl lg:text-3xl
                ${isVisible("title") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
              `}
              style={{ 
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
                transitionDelay: "200ms",
                letterSpacing: "0.2em"
              }}
              data-testid="text-subtitle"
            >
              Remnants of a future
            </p>
          </div>

          {/* Artists - appear automatically after delay */}
          <div className="flex max-w-4xl flex-col items-center gap-3 md:gap-4">
            {artists.map((artist, index) => (
              <div
                key={artist}
                className={`
                  transition-all duration-1000
                  ${showArtists ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
                `}
                style={{
                  transitionDelay: showArtists ? `${index * 60}ms` : "0ms",
                }}
              >
                <p
                  className="text-center font-serif text-xl font-light italic text-white/95 sm:text-2xl md:text-3xl lg:text-4xl"
                  style={{ textShadow: "0 2px 12px rgba(0, 0, 0, 0.5)" }}
                  data-testid={`text-artist-${index}`}
                >
                  {artist}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 flex flex-col items-center gap-2 px-6 py-12 text-center">
          <p className="text-xs text-white/50 md:text-sm" data-testid="text-copyright">
            © 2025 Various Degrees. All rights reserved.
          </p>
          <p className="text-xs text-white/40 md:text-sm" data-testid="text-credit">
            Designed by YRT
          </p>
        </footer>
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
                  href="mailto:info@amenogroup.co"
                  className="group/link flex flex-1 items-center gap-3 text-white transition-all hover:text-white/80"
                  data-testid="link-email"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 transition-transform group-hover/link:scale-110" />
                  <span className="text-sm font-medium">info@amenogroup.co</span>
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
