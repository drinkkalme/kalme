import { Card } from "@/components/ui/card";
import { Droplet, Brain, Leaf, Heart } from "lucide-react";

const ingredients = [
  {
    icon: Droplet,
    name: "Magnesium",
    description: "Essential mineral that supports muscle relaxation, reduces stress, and promotes better sleep quality.",
    benefits: ["Reduces stress", "Improves sleep", "Muscle relaxation"],
  },
  {
    icon: Brain,
    name: "L-Theanine",
    description: "Amino acid found in tea leaves that promotes relaxation without drowsiness and enhances focus.",
    benefits: ["Promotes calm", "Enhances focus", "Reduces anxiety"],
  },
  {
    icon: Leaf,
    name: "Monk Fruit",
    description: "Natural zero-calorie sweetener that provides sweetness without the sugar crash or artificial aftertaste.",
    benefits: ["Zero calories", "Natural sweetness", "No sugar crash"],
  },
  {
    icon: Heart,
    name: "Inulin",
    description: "Prebiotic fiber that supports gut health, aids digestion, and helps maintain a healthy microbiome.",
    benefits: ["Gut health", "Digestive support", "Prebiotic fiber"],
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
          <h2 className="text-5xl md:text-6xl font-serif font-bold">
            Science-Backed
            <span className="block bg-gradient-gold bg-clip-text text-transparent">
              Ingredients
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every ingredient in Kalmē is carefully selected for its proven calming and health benefits.
          </p>
        </div>

        {/* Ingredients grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {ingredients.map((ingredient, idx) => (
            <Card 
              key={idx}
              className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-premium group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ingredient.icon className="w-7 h-7 text-foreground" />
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-serif font-semibold text-foreground">
                    {ingredient.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {ingredient.description}
                  </p>
                  
                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {ingredient.benefits.map((benefit, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 rounded-full text-xs bg-secondary/50 text-foreground border border-border/50"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            All ingredients are natural, non-GMO, and carefully sourced for maximum effectiveness.
          </p>
        </div>
      </div>
    </section>
  );
};
