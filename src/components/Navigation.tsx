import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Studio", path: "/studio" },
    { name: "Custom Blend", path: "/builder" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-strong py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-serif tracking-wider text-foreground hover:text-foreground/80 transition-colors duration-300"
          >
            kalmē
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-all duration-300 hover:text-foreground relative group ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-px bg-foreground/50 transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/waitlist"
              className="px-5 py-2 text-sm tracking-wide bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02]"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2 hover:bg-foreground/5 transition-colors rounded-full"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${
        isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="glass-strong mt-3 mx-4 rounded-2xl">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-base font-serif tracking-wide transition-all duration-300 animate-slide-in ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border/30">
              <Link
                to="/waitlist"
                className="block w-full text-center px-6 py-3 text-sm tracking-wide bg-foreground text-background rounded-full"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
