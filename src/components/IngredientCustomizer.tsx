import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const availableIngredients = [
  "Ashwagandha",
  "Rhodiola Rosea",
  "Valeriana wallichii extract",
  "Lion's Mane",
  "Reishi mushroom",
  "Lemon balm",
  "Guayusa",
  "Chamomile",
  "Holy Basil",
];

export const IngredientCustomizer = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

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

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold">
            Customize Your
            <span className="block bg-gradient-blue bg-clip-text text-transparent">
              Perfect Blend
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Drag and drop up to 3 additional ingredients to personalize your sachet.
          </p>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Available ingredients */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Available Ingredients
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {availableIngredients.map((ingredient) => (
                  <DraggableIngredient
                    key={ingredient}
                    ingredient={ingredient}
                    isSelected={selectedIngredients.includes(ingredient)}
                  />
                ))}
              </div>
            </div>

            {/* Sachet Box */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Your Custom Sachet ({selectedIngredients.length}/3)
              </h3>
              <DroppableBox
                id="sachet-box"
                ingredients={selectedIngredients}
                onRemove={removeIngredient}
              />
            </div>
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="bg-card/90 backdrop-blur-sm border-2 border-primary/50 rounded-lg p-4 shadow-premium cursor-grabbing">
                <p className="text-sm font-medium text-foreground">{activeId}</p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
};

// Draggable ingredient component
const DraggableIngredient = ({
  ingredient,
  isSelected,
}: {
  ingredient: string;
  isSelected: boolean;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      draggable={!isSelected}
      onDragStart={(e) => {
        if (!isSelected) {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", ingredient);
          setIsDragging(true);
        } else {
          e.preventDefault();
        }
      }}
      onDragEnd={() => setIsDragging(false)}
      className={`
        bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 
        transition-all duration-300
        ${
          isSelected
            ? "opacity-40 cursor-not-allowed"
            : "hover:border-primary/50 hover:shadow-lg cursor-grab active:cursor-grabbing"
        }
        ${isDragging ? "opacity-50" : ""}
      `}
    >
      <p className="text-sm font-medium text-foreground text-center">
        {ingredient}
      </p>
    </div>
  );
};

// Droppable box component
const DroppableBox = ({
  id,
  ingredients,
  onRemove,
}: {
  id: string;
  ingredients: string[];
  onRemove: (ingredient: string) => void;
}) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <Card
      id={id}
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        const ingredient = e.dataTransfer.getData("text/plain");
        if (!ingredients.includes(ingredient) && ingredients.length < 3) {
          // This will be handled by DndContext
        }
        setIsOver(false);
      }}
      className={`
        min-h-[400px] p-8 bg-gradient-accent backdrop-blur-sm
        border-2 border-dashed transition-all duration-300
        ${
          isOver
            ? "border-primary bg-accent/30 shadow-glow"
            : "border-border/50"
        }
      `}
    >
      {ingredients.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center">
            Drag ingredients here
            <br />
            <span className="text-sm">(up to 3)</span>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient}
              className="bg-card/80 border border-primary/30 rounded-lg p-4 flex items-center justify-between group hover:border-primary/60 transition-all"
            >
              <p className="text-sm font-medium text-foreground">
                {ingredient}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(ingredient)}
                className="h-6 w-6 opacity-60 group-hover:opacity-100 hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {ingredients.length < 3 && (
            <div className="text-sm text-muted-foreground text-center pt-4">
              Add {3 - ingredients.length} more ingredient{ingredients.length !== 2 ? "s" : ""}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
