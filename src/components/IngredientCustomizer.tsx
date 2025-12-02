import { useState } from "react";
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
import { DraggableIngredient } from "./DraggableIngredient";
import { DroppableBox } from "./DroppableBox";

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
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
          sensors={sensors}
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
