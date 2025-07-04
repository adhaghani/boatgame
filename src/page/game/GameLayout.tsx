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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ATTRIBUTE, type ShipAttribute } from "@/types";
import { Droppable } from "@/components/droppable";
import { Draggable } from "@/components/draggable";
import { DndContext } from "@dnd-kit/core";

const GameLayout = memo(() => {
  const { gameState, updateState } = useGameState();

  const containers = [1, 2, 3, 4, 5];
  useEffect(() => {
    // console.log the current state
    console.table(gameState);
  });

  return (
    <>
      {/* CLUE */}
      <Drawer>
        <DrawerTrigger>
          <Button>View Clues</Button>
        </DrawerTrigger>
        <DrawerContent className="min-h-fit pb-10 h-[60vh] w-full px-14">
          <DrawerHeader>
            <DrawerTitle>All the clues</DrawerTitle>
          </DrawerHeader>
          <Tabs
            defaultValue="carousel"
            className="w-full max-w-[500px] mx-auto"
          >
            <TabsList>
              <TabsTrigger value="carousel">carousel</TabsTrigger>
              <TabsTrigger value="list">list</TabsTrigger>
            </TabsList>
            <TabsContent value="carousel">
              <Carousel>
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
            </TabsContent>
            <TabsContent value="list">
              <ul>
                {gameState.clues.map((clue, index) => (
                  <li className="ml-2 list-disc" key={index}>
                    <Text as="p" className="font-semibold">
                      {clue}
                    </Text>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </DrawerContent>
      </Drawer>
      {/* QUESTION GRID */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-4 mt-4 ">
          {containers.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            // TODO: CREATE ALTERNATIVE FOR MOBILE APPROACH
            // TODO: CREATE ALTERNATIVE ANSWER OPTION FOR MOBILE APPROACH
            <Droppable key={id} id={id}>
              {[
                "nationality",
                "departureTime",
                "cargo",
                "chimneyColor",
                "destination"
              ].map((attr) => (
                <Card
                  key={`${id}-${attr}`}
                  className="border text-sm text-center w-full shadow-none"
                >
                  {(() => {
                    const ship = gameState.userAnswer.find(
                      (s) => s.position === id
                    );
                    const value = ship ? ship[attr as keyof ShipAttribute] : "";

                    return value ? (
                      <CardContent className="text-center py-2">
                        <Text as="p" className="font-semibold text-md">
                          {value}
                        </Text>
                      </CardContent>
                    ) : (
                      <CardContent className="text-center py-2 text-muted-foreground text-sm">
                        Available
                      </CardContent>
                    );
                  })()}
                </Card>
              ))}
            </Droppable>
          ))}
        </div>

        {/* ANSWER OPTION CONTAINER */}
        <Tabs
          defaultValue="nationality"
          className="border-1 p-2 bg-secondary/50 backdrop-blur-sm left-4 right-4 rounded-lg mt-5 mx-auto fixed bottom-10 w-[calc(100%-32px)] 2xl:left-50 2xl:right-50 lg:max-w-6xl lg:w-auto"
        >
          <TabsList>
            <TabsTrigger value="nationality">Nationality</TabsTrigger>
            <TabsTrigger value="departureTime">Departure Time</TabsTrigger>
            <TabsTrigger value="cargo">Cargo</TabsTrigger>
            <TabsTrigger value="chimneyColor">Chimney Color</TabsTrigger>
            <TabsTrigger value="destination">Destination</TabsTrigger>
          </TabsList>
          <TabsContent
            value="nationality"
            className="m-1 rounded-sm flex gap-4"
          >
            {ATTRIBUTE.nationality.map((value: any) => {
              const isAlreadyUsed = gameState.userAnswer.some(
                (s) => s["nationality" as keyof ShipAttribute] === value
              );

              return (
                <Draggable
                  key={`nat-${value}`}
                  id={`nationality-${value}`}
                  data={{ type: "nationality", value }}
                  className="w-full"
                >
                  {value}
                </Draggable>
              );
            })}
          </TabsContent>
          <TabsContent
            value="departureTime"
            className="m-1 rounded-sm flex gap-4"
          >
            {ATTRIBUTE.departureTime.map((item) => (
              <Draggable
                className="w-full"
                key={`dep-${item}`}
                id={`departureTime-${item}`}
                data={{ type: "departureTime", value: item }}
              >
                {item}
              </Draggable>
            ))}
          </TabsContent>
          <TabsContent value="cargo" className="m-1 rounded-sm flex gap-4">
            {ATTRIBUTE.cargo.map((item) => (
              <Draggable
                className="w-full"
                key={`cargo-${item}`}
                id={`cargo-${item}`}
                data={{ type: "cargo", value: item }}
              >
                {item}
              </Draggable>
            ))}
          </TabsContent>
          <TabsContent
            value="chimneyColor"
            className="m-1 rounded-sm flex gap-4"
          >
            {ATTRIBUTE.chimneyColor.map((item) => (
              <Draggable
                className="w-full"
                key={`chimneyColor-${item}`}
                id={`chimneyColor-${item}`}
                data={{ type: "chimneyColor", value: item }}
              >
                {item}
              </Draggable>
            ))}
          </TabsContent>
          <TabsContent
            value="destination"
            className="m-1 rounded-sm flex gap-4"
          >
            {ATTRIBUTE.destination.map((item) => (
              <Draggable
                className="w-full"
                key={`dest-${item}`}
                id={`destination-${item}`}
                data={{ type: "destination", value: item }}
              >
                {item}
              </Draggable>
            ))}
          </TabsContent>
        </Tabs>
      </DndContext>
    </>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over || !active) return;

    const droppedPosition = Number(over.id); // e.g., 1–5
    const [attribute, value] = active.id.split("-"); // e.g., "nationality", "Greek"

    // Get current answer state
    const currentAnswer = [...gameState.userAnswer];
    const ship = currentAnswer.find((s) => s.position === droppedPosition);

    if (ship && attribute in ship) {
      (ship as any)[attribute] = value;
    }

    updateState({ userAnswer: currentAnswer });

    console.log(gameState.userAnswer);
  }
});

export default GameLayout;
