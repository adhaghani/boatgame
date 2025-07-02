import { useDroppable } from "@dnd-kit/core";
import { Card, CardContent } from "@/components/ui/card";

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id
  });
  const style = {
    color: isOver ? "green" : undefined
  };

  return (
    <Card ref={setNodeRef} style={style}>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
