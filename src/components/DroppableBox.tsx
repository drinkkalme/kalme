import { useDroppable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DroppableBoxProps {
  id: string;
  ingredients: string[];
  onRemove: (ingredient: string) => void;
}

export const DroppableBox = ({
  id,
  ingredients,
  onRemove,
}: DroppableBoxProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <Card
      ref={setNodeRef}
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
              Add {3 - ingredients.length} more ingredient
              {ingredients.length !== 2 ? "s" : ""}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
