import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent } from "@/components/ui/card";

export function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
      data: props.data || {}
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging
          ? "none"
          : "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        zIndex: isDragging ? 50 : undefined
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={{ ...style, ...props.style }}
      {...listeners}
      {...attributes}
      className={
        props.className + (isDragging ? " opacity-70" : "") + " cursor-grab"
      }
      tabIndex={0}
    >
      <Card className="w-full h-full border-none shadow-none grid place-items-center">
        <CardContent>{props.children || props.value}</CardContent>
      </Card>
    </button>
  );
}
