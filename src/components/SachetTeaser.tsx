import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const previewIngredients = [
  "Ashwagandha",
  "Lion's Mane",
  "Chamomile",
  "Reishi",
  "Holy Basil",
];

export const SachetTeaser = () => {
  return (
    <section className="py-32 px-6 relative bg-card/20">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-sm tracking-[0.3em] text-primary uppercase mb-6">
              Coming Soon
            </p>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Build Your Own
              <br />
              <span className="text-gradient-blue">Calming Blend</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Choose up to 3 functional ingredients to create your personalized 
              sachet. Designed for your unique needs.
            </p>
            <Link to="/builder" className="btn-primary inline-flex items-center gap-2">
              Try the Builder
              <span>→</span>
            </Link>
          </div>

          {/* Preview Animation */}
          <div className="relative">
            {/* Sachet visualization */}
            <div className="aspect-square max-w-sm mx-auto relative">
              {/* Central sachet */}
              <div className="absolute inset-1/4 bg-card border border-border/50 rounded-2xl flex items-center justify-center animate-pulse-glow">
                <div className="text-center p-6">
                  <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium">Your Blend</p>
                  <p className="text-xs text-muted-foreground">0/3 selected</p>
                </div>
              </div>

              {/* Orbiting ingredients */}
              {previewIngredients.map((ingredient, index) => {
                const angle = (index / previewIngredients.length) * 360;
                const radius = 140;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                
                return (
                  <div
                    key={ingredient}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      animationDelay: `${index * 0.5}s`,
                    }}
                  >
                    <div className="px-3 py-1.5 bg-card/80 border border-border/50 rounded-full text-xs whitespace-nowrap hover:border-primary/40 transition-colors cursor-pointer">
                      {ingredient}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};