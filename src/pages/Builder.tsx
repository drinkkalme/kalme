import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Sparkles, X, Info } from "lucide-react";

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

const DraggableIngredient = ({ ingredient, isSelected }: { ingredient: Ingredient; isSelected: boolean }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: ingredient.name,
    disabled: isSelected,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`ingredient-card ${isSelected ? 'selected opacity-50' : ''} ${isDragging ? 'opacity-50' : ''}`}
    >
      <p className="font-medium text-sm">{ingredient.name}</p>
      <p className="text-xs text-primary mt-1">{ingredient.benefit}</p>
    </div>
  );
};

const DroppableBox = ({ 
  ingredients, 
  onRemove,
  allIngredients
}: { 
  ingredients: string[]; 
  onRemove: (name: string) => void;
  allIngredients: Ingredient[];
}) => {
  const { isOver, setNodeRef } = useDroppable({ id: "sachet-box" });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[300px] rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col ${
        isOver 
          ? "border-primary bg-primary/10" 
          : "border-border/50 bg-card/30"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-medium">Your Blend</span>
          </div>
          <span className="text-sm text-muted-foreground">{ingredients.length}/3</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {ingredients.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">
              Drag ingredients here to build your blend
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {ingredients.map((name) => {
              const ing = allIngredients.find(i => i.name === name);
              return (
                <div
                  key={name}
                  className="flex items-center justify-between p-3 bg-primary/10 border border-primary/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">{ing?.benefit}</p>
                  </div>
                  <button
                    onClick={() => onRemove(name)}
                    className="w-6 h-6 rounded-full bg-card/50 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const Builder = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && over.id === "sachet-box") {
      const ingredient = active.id as string;
      if (!selectedIngredients.includes(ingredient) && selectedIngredients.length < 3) {
        setSelectedIngredients([...selectedIngredients, ingredient]);
      }
    }
    
    setActiveId(null);
  };

  const removeIngredient = (name: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== name));
  };

  // Generate blend profile
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
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] text-primary uppercase mb-6 opacity-0 animate-fade-in">
            Custom Sachet Builder
          </p>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 opacity-0 animate-fade-in-up delay-100">
            Build Your
            <br />
            <span className="text-gradient-blue">Perfect Blend</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Choose up to 3 functional ingredients to create your personalized calming sachet.
          </p>
        </div>
      </section>

      {/* Builder */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
              {/* Available Ingredients */}
              <div>
                <h3 className="text-xl font-serif mb-6">Available Ingredients</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableIngredients.map((ingredient) => (
                    <div key={ingredient.name} className="relative">
                      <DraggableIngredient
                        ingredient={ingredient}
                        isSelected={selectedIngredients.includes(ingredient.name)}
                      />
                      <button
                        onClick={() => setShowInfo(showInfo === ingredient.name ? null : ingredient.name)}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-card/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Info size={12} />
                      </button>
                      
                      {/* Info Tooltip */}
                      {showInfo === ingredient.name && (
                        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-card border border-border rounded-lg z-10 shadow-xl animate-fade-in">
                          <p className="text-sm font-medium mb-2">{ingredient.name}</p>
                          <p className="text-xs text-muted-foreground mb-1">
                            <span className="text-primary">Flavor:</span> {ingredient.flavorNote}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <span className="text-primary">Best for:</span> {ingredient.useCase}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sachet Box */}
              <div>
                <h3 className="text-xl font-serif mb-6">Your Custom Sachet</h3>
                <DroppableBox
                  ingredients={selectedIngredients}
                  onRemove={removeIngredient}
                  allIngredients={availableIngredients}
                />

                {/* Blend Profile */}
                {profile && (
                  <div className="mt-6 p-6 bg-card/50 border border-border/50 rounded-lg animate-fade-in">
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                      <Sparkles size={16} className="text-primary" />
                      Your Calm Profile
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Benefits</p>
                        <p className="text-foreground">{profile.benefits}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Flavor Notes</p>
                        <p className="text-foreground">{profile.flavors}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Best For</p>
                        <ul className="text-foreground">
                          {profile.useCases.map((use, i) => (
                            <li key={i}>• {use}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-6">
                  <Link to="/waitlist" className="btn-primary w-full text-center block">
                    Join Waitlist for Custom Sachets
                  </Link>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Custom blends launching soon
                  </p>
                </div>
              </div>
            </div>

            <DragOverlay>
              {activeId ? (
                <div className="bg-primary/20 border border-primary/50 rounded-lg p-4 shadow-xl cursor-grabbing">
                  <p className="text-sm font-medium">{activeId}</p>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Builder;