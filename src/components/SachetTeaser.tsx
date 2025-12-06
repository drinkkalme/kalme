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
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
              Coming Soon
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Build Your Own Blend
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Choose up to 3 functional ingredients for your personalized sachet.
            </p>
            <Link to="/builder" className="btn-primary inline-flex items-center gap-2">
              Try the Builder
              <span>→</span>
            </Link>
          </div>

          {/* Preview Animation */}
          <div className="relative">
            <div className="aspect-square max-w-xs mx-auto relative">
              {/* Background glow behind selection area */}
              <div className="absolute inset-1/4 bg-grey-aurora/30 rounded-full blur-[60px]" />
              
              {/* Central sachet */}
              <div className="absolute inset-1/4 bg-card/80 border border-border/50 rounded-2xl flex items-center justify-center animate-pulse-glow">
                <div className="text-center p-4">
                  <Sparkles className="w-7 h-7 text-foreground/50 mx-auto mb-2" />
                  <p className="text-sm font-medium">Your Blend</p>
                  <p className="text-xs text-muted-foreground">0/3 selected</p>
                </div>
              </div>

              {/* Orbiting ingredients */}
              {previewIngredients.map((ingredient, index) => {
                const angle = (index / previewIngredients.length) * 360;
                const radius = 120;
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
                    <div className="px-3 py-1.5 bg-card/80 border border-border/50 rounded-full text-xs whitespace-nowrap hover:border-foreground/30 transition-colors cursor-pointer">
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
