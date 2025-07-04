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
      <CardContent className="grid w-full h-full place-items-center text-muted-foreground gap-4">
        {props.children}
      </CardContent>
    </Card>
  );
}
