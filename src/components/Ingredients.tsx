import { Card } from "@/components/ui/card";

const ingredients = [
  {
    symbol: "L",
    name: "L-Theanine",
    description: "Reduces stress & improves focus",
    image: "🍃",
  },
  {
    symbol: "Mg",
    name: "Magnesium",
    description: "Calm nervous system & improved sleep",
    image: "⚛️",
  },
  {
    symbol: "In",
    name: "Inulin",
    description: "Supports gut health (Prebiotic)",
    image: "🌿",
  },
  {
    symbol: "Mf",
    name: "Monk Fruit",
    description: "0-calorie sweetener",
    image: "🍈",
  },
];

export const Ingredients = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold inline-flex items-center justify-center gap-3 flex-wrap">
            <span className="whitespace-nowrap">Calm,</span>
            <span className="bg-gradient-blue bg-clip-text text-transparent italic whitespace-nowrap">
              Designed.
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every ingredient in Kalmē is carefully selected for its proven calming and health benefits.
          </p>
        </div>

        {/* Ingredients grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ingredients.map((ingredient, idx) => (
            <Card 
              key={idx}
              className="p-8 bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-premium group relative overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-blue opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Top section with ingredient name and symbol */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl">{ingredient.image}</div>
                      <h3 className="text-2xl font-serif font-semibold text-foreground">
                        {ingredient.name}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Chemical-style symbol */}
                  <div className="w-12 h-12 rounded-full border-2 border-border/50 flex items-center justify-center bg-secondary/50 group-hover:border-primary/50 transition-colors">
                    <span className="text-sm font-mono font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                      {ingredient.symbol}
                    </span>
                  </div>
                </div>

                {/* Description in rounded box */}
                <div className="bg-secondary/30 border border-border/30 rounded-full px-6 py-3 group-hover:border-primary/30 transition-colors">
                  <p className="text-foreground text-center text-sm">
                    {ingredient.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            All ingredients are natural, non-GMO, and carefully sourced for maximum effectiveness.
          </p>
        </div>
      </div>
    </section>
  );
};
