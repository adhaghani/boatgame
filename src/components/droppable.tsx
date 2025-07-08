import { useDroppable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";

export function Droppable(props: any) {
  const { isOver, setNodeRef, active } = useDroppable({
    id: props.id
  });
  // Only highlight if the dragged item matches the attribute (accept)
  const isAccepting = isOver && active?.data?.current?.type === props.accept;

  return (
    <Card
      ref={setNodeRef}
      className={
        (isAccepting
          ? "bg-secondary scale-105 transition-transform duration-200"
          : "") + " transition-all"
      }
    >
      {props.children}
    </Card>
  );
}
