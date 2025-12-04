import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

// Simple TikTok icon component
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-border/30 bg-card/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="text-3xl font-serif tracking-wider">
              kalmē
            </Link>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
              A premium evening wellness brand creating calming tools, rituals, 
              and beverages that help you unwind without switching off.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/drinkkalme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://tiktok.com/@drinkkalme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
              >
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm tracking-wider uppercase text-muted-foreground mb-6">
              Explore
            </h4>
            <nav className="space-y-4">
              <Link to="/" className="block text-foreground/80 hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/studio" className="block text-foreground/80 hover:text-foreground transition-colors">
                kalmē Studio
              </Link>
              <Link to="/builder" className="block text-foreground/80 hover:text-foreground transition-colors">
                Custom Blend
              </Link>
              <Link to="/about" className="block text-foreground/80 hover:text-foreground transition-colors">
                About
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm tracking-wider uppercase text-muted-foreground mb-6">
              Connect
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:drinkkalme@gmail.com"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                drinkkalme@gmail.com
              </a>
              <Link to="/contact" className="block text-foreground/80 hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link to="/waitlist" className="block text-foreground/80 hover:text-foreground transition-colors">
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 kalmē. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Made for your evenings. Built with intention.
          </p>
        </div>
      </div>
    </footer>
  );
};