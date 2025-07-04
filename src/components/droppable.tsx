import { useDroppable } from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id
  });

  return (
    <Card ref={setNodeRef} className={isOver ? "bg-secondary" : ""}>
      <CardHeader>
        <CardTitle className="text-center">Position #{props.id}</CardTitle>
      </CardHeader>
      <CardContent className="grid w-full h-full place-items-center text-muted-foreground gap-4">
        {props.children}
      </CardContent>
    </Card>
  );
}
