import { Sparkles, Leaf, Heart, Zap } from "lucide-react";

const ingredients = [
  {
    icon: Sparkles,
    name: "L-Theanine",
    benefit: "Supports calm focus",
  },
  {
    icon: Heart,
    name: "Magnesium Glycinate",
    benefit: "Eases tension",
  },
  {
    icon: Leaf,
    name: "Inulin",
    benefit: "Supports gut balance",
  },
  {
    icon: Zap,
    name: "Monk Fruit",
    benefit: "Clean sweetness",
  },
];

export const IngredientsSection = () => {
  return (
    <section id="ingredients" className="py-24 px-6 relative">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-grey-aurora/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 -z-10 blur-2xl bg-grey-glow/20 scale-150" />
            <h2 className="text-4xl md:text-5xl font-serif">
              Calm, Designed.
            </h2>
          </div>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Every ingredient chosen for proven calming benefits.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="card-premium p-6 rounded-2xl group text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-4 mx-auto group-hover:bg-foreground/10 transition-colors">
                <ingredient.icon size={20} className="text-foreground/60" />
              </div>
              <h3 className="text-lg font-serif mb-1">{ingredient.name}</h3>
              <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
