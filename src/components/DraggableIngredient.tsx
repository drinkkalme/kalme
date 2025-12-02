import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DraggableIngredientProps {
  ingredient: string;
  isSelected: boolean;
}

export const DraggableIngredient = ({
  ingredient,
  isSelected,
}: DraggableIngredientProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: ingredient,
      disabled: isSelected,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
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
