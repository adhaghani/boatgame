import { memo, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "@/components/droppable";
import { Draggable } from "@/components/draggable";
import { useState } from "react";
import { useGameState } from "@/context/gameStateContext";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Text } from "@/components/ui/text";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const GameLayout = memo(() => {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;
  const { gameState } = useGameState();

  useEffect(() => {
    console.table(gameState);
  });

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <Button>View Clues</Button>
        </DrawerTrigger>
        <DrawerContent className="min-h-10 h-[70vh] w-full px-14">
          <DrawerHeader>
            <DrawerTitle>All the clues</DrawerTitle>
          </DrawerHeader>
          <Carousel className="w-full max-w-[500px] mx-auto">
            <CarouselContent>
              {gameState.clues.map((clue, index) => (
                <CarouselItem key={index}>
                  <Card className="w-full">
                    <CardContent>
                      <Text as="h3">{clue}</Text>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DrawerContent>
      </Drawer>
      <div>
        <DndContext onDragEnd={handleDragEnd}>
          {parent === null ? draggableMarkup : null}

          {containers.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <Droppable key={id} id={id}>
              {parent === id ? draggableMarkup : "Drop here"}
            </Droppable>
          ))}
        </DndContext>
      </div>
    </>
  );

  function handleDragEnd(event: any) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
});

export default GameLayout;
