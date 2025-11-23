import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import backgroundImage from "@assets/01 Greek_1763915893499.png";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
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

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 md:px-12">
        {/* Headline */}
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

        {/* Artist Names */}
        <div
          className={`
            mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 transition-all duration-1000
            md:mt-16 md:gap-x-6
            ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
          `}
          style={{
            transitionDelay: "600ms",
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
          }}
        >
          {artists.map((artist, index) => (
            <span key={artist} className="flex items-center gap-x-4 md:gap-x-6">
              <span
                className="font-serif text-lg font-light italic text-white/90 md:text-xl lg:text-2xl"
                data-testid={`text-artist-${index}`}
              >
                {artist}
              </span>
              {index < artists.length - 1 && (
                <span className="text-white/40">|</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Floating Contact Bubble */}
      <div
        className={`
          fixed right-6 top-6 z-20 transition-all duration-1000 md:right-8 md:top-8
          ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
        `}
        style={{ transitionDelay: "1600ms" }}
      >
        <button
          onClick={() => setShowContact(!showContact)}
          className="group relative flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/20 active:scale-95"
          data-testid="button-contact"
          aria-label="Contact information"
        >
          <Mail className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-12" />
          <span
            className={`
              overflow-hidden text-sm font-medium text-white transition-all duration-300
              ${showContact ? "max-w-xs opacity-100" : "max-w-0 opacity-0"}
            `}
            data-testid="text-email"
          >
            variousdegrees@gmail.com
          </span>
        </button>

        {/* Tooltip on Hover (Desktop) */}
        {!showContact && (
          <div className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
            Click for contact
          </div>
        )}
      </div>
    </div>
  );
}
