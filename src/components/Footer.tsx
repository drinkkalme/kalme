import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-primary/10">
      {/* Footer glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(210 80% 55% / 0.1) 0%, hsl(0 0% 25% / 0.05) 50%, transparent 70%)'
        }}
      />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-serif tracking-wider hover:text-primary transition-colors">
              kalmē
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Calming beverages and digital tools for your evenings.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm tracking-wider uppercase text-muted-foreground mb-4">
              Explore
            </h4>
            <nav className="space-y-2 text-sm">
              <Link to="/studio" className="block text-foreground/70 hover:text-primary transition-colors">
                kalmē Studio
              </Link>
              <Link to="/builder" className="block text-foreground/70 hover:text-primary transition-colors">
                Custom Blend
              </Link>
              <Link to="/about" className="block text-foreground/70 hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/waitlist" className="block text-foreground/70 hover:text-primary transition-colors">
                Join Waitlist
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm tracking-wider uppercase text-muted-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/drinkkalme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-glow transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://tiktok.com/@drinkkalme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-glow transition-all"
              >
                <TikTokIcon size={16} />
              </a>
              <a
                href="https://twitter.com/drinkkalme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-glow transition-all"
              >
                <XIcon size={16} />
              </a>
              <a
                href="mailto:drinkkalme@gmail.com"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-glow transition-all"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © 2025 kalmē. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground italic">
            Made for your evenings.
          </p>
        </div>
      </div>
    </footer>
  );
};
