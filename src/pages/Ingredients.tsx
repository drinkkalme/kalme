import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const ingredients = [
  {
    name: "L-Theanine",
    benefit: "Calm Focus",
    description: "An amino acid found naturally in tea leaves. Promotes relaxation without drowsiness by increasing alpha brain wave activity.",
    science: "Studies show L-Theanine increases alpha brain waves, associated with a relaxed but alert mental state."
  },
  {
    name: "Magnesium Glycinate",
    benefit: "Tension Relief",
    description: "A highly bioavailable form of magnesium bound to glycine. Supports muscle relaxation and nervous system calm.",
    science: "Magnesium plays a crucial role in GABA function, the neurotransmitter responsible for calming nervous activity."
  },
  {
    name: "Inulin",
    benefit: "Gut Balance",
    description: "A prebiotic fiber that supports digestive health and the gut-brain connection essential for mood regulation.",
    science: "The gut produces 95% of the body's serotonin. A healthy gut microbiome directly impacts mental wellbeing."
  },
  {
    name: "Monk Fruit",
    benefit: "Clean Sweetness",
    description: "A natural, zero-calorie sweetener that adds pleasant taste without blood sugar spikes or artificial ingredients.",
    science: "Unlike artificial sweeteners, monk fruit contains antioxidant mogrosides with potential anti-inflammatory benefits."
  },
];

const Ingredients = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8 opacity-0 animate-fade-in">
            Science-Backed Formula
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8 opacity-0 animate-fade-in-up delay-100">
            What's Inside
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Every ingredient is chosen for its proven calming and functional benefits.
          </p>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {ingredients.map((ingredient, index) => (
              <div 
                key={ingredient.name}
                className="card-premium p-8 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-serif">{ingredient.name}</h3>
                  <span className="text-xs text-muted-foreground bg-foreground/5 px-3 py-1 rounded-full">
                    {ingredient.benefit}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {ingredient.description}
                </p>
                <div className="pt-4 border-t border-border/30">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground/70">The Science:</span> {ingredient.science}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">
            Experience the formula
          </h2>
          <Link to="/waitlist" className="btn-primary">
            Join the Waitlist
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ingredients;
