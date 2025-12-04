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
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-strong py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-serif tracking-wider text-foreground hover:text-primary transition-colors duration-300"
          >
            kalmē
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-all duration-300 hover:text-primary relative group ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/waitlist"
              className="px-5 py-2.5 text-sm tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              Pre-order
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2 hover:bg-foreground/5 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${
        isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="glass-strong mt-3 mx-4 rounded-lg">
          <div className="px-6 py-8 space-y-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-lg font-serif tracking-wide transition-all duration-300 animate-slide-in ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border/30 space-y-3">
              <Link
                to="/waitlist"
                className="block w-full text-center px-6 py-3 text-sm tracking-wide bg-primary text-primary-foreground"
              >
                Pre-order Now
              </Link>
              <Link
                to="/studio"
                className="block w-full text-center px-6 py-3 text-sm tracking-wide border border-border text-foreground hover:bg-foreground/5 transition-colors"
              >
                Explore Studio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};