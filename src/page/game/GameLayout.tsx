import { memo, useEffect } from "react";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Droppable } from "@/components/droppable";
import { Draggable } from "@/components/draggable";
import { DndContext } from "@dnd-kit/core";
const GameLayout = memo(() => {
  const { gameState } = useGameState();

  const containers = [1, 2, 3, 4, 5];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  useEffect(() => {
    console.table(gameState);
  });

  return (
    <>
      {/* CLUE */}
      <Drawer>
        <DrawerTrigger>
          <Button>View Clues</Button>
        </DrawerTrigger>
        <DrawerContent className="min-h-10 h-[60vh] w-full px-14">
          <DrawerHeader>
            <DrawerTitle>All the clues</DrawerTitle>
          </DrawerHeader>
          <Carousel className="w-full max-w-[500px] mx-auto">
            <CarouselContent>
              {gameState.clues.map((clue, index) => (
                <CarouselItem key={index}>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Clues #{index + 1}</CardTitle>
                    </CardHeader>
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
      {/* QUESTION GRID */}
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}
        <div className="grid grid-cols-5 gap-4 mt-4 ">
          {containers.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <Droppable key={id} id={id}>
              <Text as="h4">Position #{id + 1}</Text>
              {parent === id ? (
                draggableMarkup
              ) : (
                <Card className="border-0 text-center w-full h-full aspect-square grid place-items-center">
                  <CardContent className="text-muted-foreground">
                    Drop Here
                  </CardContent>
                </Card>
              )}
            </Droppable>
          ))}
        </div>
      </DndContext>
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
