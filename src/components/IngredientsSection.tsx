import { Sparkles, Leaf, Heart, Zap } from "lucide-react";

const ingredients = [
  {
    icon: Sparkles,
    name: "L-Theanine",
    benefit: "Calm Focus",
    description: "Promotes relaxation without drowsiness. Found naturally in tea leaves.",
  },
  {
    icon: Heart,
    name: "Magnesium",
    benefit: "Muscle Relaxation",
    description: "Supports nervous system function and helps ease physical tension.",
  },
  {
    icon: Leaf,
    name: "Inulin",
    benefit: "Gut Health",
    description: "Prebiotic fiber that supports digestive wellness and balance.",
  },
  {
    icon: Zap,
    name: "Monk Fruit",
    benefit: "Natural Sweetness",
    description: "Zero-calorie sweetener with no impact on blood sugar levels.",
  },
];

export const IngredientsSection = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <p className="text-sm tracking-[0.3em] text-primary uppercase mb-6">
            Science-Backed Ingredients
          </p>
          <h2 className="text-4xl md:text-6xl font-serif">
            <span className="text-gradient">Calm, Designed.</span>
          </h2>
        </div>
        
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16">
          Every ingredient is chosen for its proven calming and functional benefits.
        </p>

        {/* Ingredients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="card-premium p-8 rounded-lg group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <ingredient.icon size={24} className="text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif mb-2">{ingredient.name}</h3>
              <p className="text-sm text-primary mb-3">{ingredient.benefit}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {ingredient.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {["Natural Ingredients", "No Added Sugar", "Science-Backed", "Free Sachet Sample"].map((badge, i) => (
            <div key={i} className="px-5 py-2.5 bg-card/50 border border-border/50 rounded-full text-sm text-muted-foreground">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};