import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Prompt } from "../../types/prompt";
import { PromptCard } from "./PromptCard";

interface PromptGridProps {
  prompts: Prompt[];
  onEdit: (prompt: Prompt) => void;
  onDelete: (prompt: Prompt) => void;
  onReorder: (activeId: string, overId: string) => void;
}

interface SortablePromptCardProps extends Omit<
  PromptGridProps,
  "prompts" | "onReorder"
> {
  prompt: Prompt;
}

function SortablePromptCard({
  prompt,
  onEdit,
  onDelete,
}: SortablePromptCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: prompt._id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={
        isDragging ? "sortable-card sortable-card-dragging" : "sortable-card"
      }
    >
      <PromptCard prompt={prompt} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

export function PromptGrid({
  prompts,
  onEdit,
  onDelete,
  onReorder,
}: PromptGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id)
      onReorder(String(active.id), String(over.id));
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={prompts.map((prompt) => prompt._id)}
        strategy={rectSortingStrategy}
      >
        <div
          className="prompt-grid"
          aria-label="Prompts. Drag a card to reorder it."
        >
          {prompts.map((prompt) => (
            <SortablePromptCard
              key={prompt._id}
              prompt={prompt}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
