import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-serif font-bold bg-gradient-gold bg-clip-text text-transparent">
            Kalmē
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#ingredients" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ingredients
          </a>
          <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Benefits
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </div>

        {/* CTA Button */}
        <Button className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
          Pre-Order
        </Button>
      </div>
    </nav>
  );
};
