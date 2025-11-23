import { useState, useEffect } from "react";
import { Mail, Instagram, Copy, Check } from "lucide-react";
import backgroundImage from "@assets/01 Greek_1763915893499.png";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
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
