import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-royal">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50 animate-fade-in-up">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Pre-orders opening soon</span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Find Your
          <span className="block bg-gradient-blue bg-clip-text text-transparent">
            Calm
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Premium calming beverages crafted with science-backed ingredients. 
          Experience relaxation in its purest form with Kalmē.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all group px-8"
          >
            Pre-Order Now
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-border/50 bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 px-8"
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "4", label: "Natural Ingredients" },
            { value: "0g", label: "Added Sugar" },
            { value: "100%", label: "Science-Backed" },
            { value: "1", label: "Free Sachet" },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-4xl md:text-5xl font-serif font-bold bg-gradient-blue bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};
