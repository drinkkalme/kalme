import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Sparkles, X, Check } from "lucide-react";
import { CursorHalo } from "@/components/CursorHalo";

type Ingredient = {
  name: string;
  benefit: string;
  flavorNote: string;
  useCase: string;
};

const availableIngredients: Ingredient[] = [
  { name: "Ashwagandha", benefit: "Stress Reduction", flavorNote: "Earthy, slightly bitter", useCase: "Daily stress management" },
  { name: "Rhodiola Rosea", benefit: "Mental Clarity", flavorNote: "Slightly sweet, floral", useCase: "Focus & endurance" },
  { name: "Valeriana Extract", benefit: "Deep Relaxation", flavorNote: "Herbal, woody", useCase: "Evening wind-down" },
  { name: "Lion's Mane", benefit: "Cognitive Support", flavorNote: "Mild, mushroom-like", useCase: "Mental performance" },
  { name: "Reishi Mushroom", benefit: "Immune & Calm", flavorNote: "Earthy, subtle", useCase: "Overall wellness" },
  { name: "Lemon Balm", benefit: "Gentle Calm", flavorNote: "Citrusy, fresh", useCase: "Mild anxiety relief" },
  { name: "Guayusa", benefit: "Smooth Energy", flavorNote: "Green, slightly sweet", useCase: "Alertness without jitters" },
  { name: "Chamomile", benefit: "Sleep Support", flavorNote: "Floral, honey-like", useCase: "Better sleep quality" },
  { name: "Holy Basil", benefit: "Adaptogenic", flavorNote: "Peppery, clove-like", useCase: "Stress resilience" },
];

const Builder = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const toggleIngredient = (name: string) => {
    if (selectedIngredients.includes(name)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== name));
    } else if (selectedIngredients.length < 3) {
      setSelectedIngredients([...selectedIngredients, name]);
    }
  };

  const removeIngredient = (name: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== name));
  };

  const getBlendProfile = () => {
    if (selectedIngredients.length === 0) return null;
    
    const selected = availableIngredients.filter(i => selectedIngredients.includes(i.name));
    const benefits = selected.map(i => i.benefit).join(" + ");
    const flavors = selected.map(i => i.flavorNote).join(", ");
    const useCases = selected.map(i => i.useCase);
    
    return { benefits, flavors, useCases };
  };

  const profile = getBlendProfile();

  return (
    <div className="min-h-screen">
      <CursorHalo />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 opacity-0 animate-fade-in">
            Custom Sachet Builder
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4 opacity-0 animate-fade-in-up delay-100">
            Build Your Perfect Blend
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto opacity-0 animate-fade-in-up delay-200">
            Choose up to 3 functional ingredients.
          </p>
        </div>
      </section>

      {/* Builder */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Available Ingredients */}
            <div>
              <h3 className="text-lg font-serif mb-5">Select Ingredients</h3>
              <div className="flex flex-wrap gap-3">
                {availableIngredients.map((ingredient) => {
                  const isSelected = selectedIngredients.includes(ingredient.name);
                  const isDisabled = !isSelected && selectedIngredients.length >= 3;
                  
                  return (
                    <button
                      key={ingredient.name}
                      onClick={() => !isDisabled && toggleIngredient(ingredient.name)}
                      disabled={isDisabled}
                      className={`ingredient-pill flex items-center gap-2 ${
                        isSelected ? 'selected' : ''
                      } ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {isSelected && <Check size={14} />}
                      <span>{ingredient.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selection Box with glow */}
            <div className="selection-box-glow">
              <h3 className="text-lg font-serif mb-5">Your Blend</h3>
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-foreground/50" />
                    <span className="font-medium text-sm">Selected</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{selectedIngredients.length}/3</span>
                </div>

                {selectedIngredients.length === 0 ? (
                  <p className="text-muted-foreground text-center py-6 text-sm">
                    Click ingredients to add them
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedIngredients.map((name) => {
                      const ing = availableIngredients.find(i => i.name === name);
                      return (
                        <div
                          key={name}
                          className="flex items-center justify-between p-3 bg-foreground/5 border border-foreground/10 rounded-xl"
                        >
                          <div>
                            <p className="font-medium text-sm">{name}</p>
                            <p className="text-xs text-muted-foreground">{ing?.benefit}</p>
                          </div>
                          <button
                            onClick={() => removeIngredient(name)}
                            className="w-7 h-7 rounded-full bg-card flex items-center justify-center hover:bg-destructive/20 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Blend Profile */}
                {profile && (
                  <div className="mt-5 pt-5 border-t border-border/30 animate-fade-in">
                    <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <Sparkles size={12} className="text-foreground/50" />
                      Your Calm Profile
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Benefits</p>
                        <p className="text-foreground text-sm">{profile.benefits}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Flavor Notes</p>
                        <p className="text-foreground text-sm">{profile.flavors}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Best For</p>
                        <ul className="text-foreground text-sm">
                          {profile.useCases.map((use, i) => (
                            <li key={i}>• {use}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-5 pt-5 border-t border-border/30">
                  <Link to="/waitlist" className="btn-primary w-full text-center block text-sm py-3">
                    Join Waitlist for Sachets
                  </Link>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Custom blends launching soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Builder;
