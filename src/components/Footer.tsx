import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-border/50">
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
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm tracking-wider uppercase text-muted-foreground mb-6">
              Navigate
            </h4>
            <nav className="space-y-4">
              <Link
                to="/"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                to="/breathing"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                Breathing Rituals
              </Link>
              <Link
                to="/contact"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                Contact
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
              <Link
                to="/waitlist"
                className="block text-foreground/80 hover:text-foreground transition-colors"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 kalmē. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
};
