import { memo, useEffect, useState } from "react";
import { useGameState } from "@/context/gameStateContext";
import useIsMobile from "@/hooks/useIsMobile";

import { Button } from "@/components/ui/button";
import { formatTime } from "@/hooks/formatTimer";
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
import {
  DndContext,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
  DragOverlay
} from "@dnd-kit/core";
import { defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { useTimer } from "@/hooks/useTimer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

const GameLayout = memo(() => {
  const { gameState, updateState } = useGameState();
  const isMobile = useIsMobile();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
        delay: 100,
        tolerance: 5
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5
      }
    })
  );

  const containers = [1, 2, 3, 4, 5];
  const [ActiveID, setActiveID] = useState(null);
  const [activeDragData, setActiveDragData] = useState<any>(null);

  const time = useTimer(gameState.gameStatus === "in_progress");
  const formatted = formatTime(time);

  useEffect(() => {
    console.log(gameState);
  });

  return (
    <>
      {/* CLUE */}
      <div className="flex justify-between items-center gap-4">
        <Drawer>
          <DrawerTrigger>
            <Button size={"lg"}>View Clues</Button>
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

        <Text as="p" className="bg-secondary px-4 py-2 rounded-lg border">
          Time Taken : <span className="font-semibold">{formatted}</span>
        </Text>
      </div>
      {/* QUESTION GRID */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {isMobile ? (
          <Carousel
            opts={{
              align: "center"
            }}
            className="mt-4 max-w-[80%] mx-auto mb-60"
          >
            <CarouselContent>
              {containers.map((id) => (
                <CarouselItem key={id} className="max-w-[300px]">
                  <div key={id} className="flex flex-col gap-2">
                    <div className="text-center font-semibold mb-2">
                      Position #{id}
                    </div>
                    {[
                      "nationality",
                      "departureTime",
                      "cargo",
                      "chimneyColor",
                      "destination"
                    ].map((attr) => (
                      <Droppable
                        key={`${id}-${attr}`}
                        id={`${id}-${attr}`}
                        accept={attr}
                      >
                        {(() => {
                          const ship = gameState.userAnswer.find(
                            (s) => s.position === id
                          );
                          const value = ship
                            ? ship[attr as keyof ShipAttribute]
                            : "";
                          return value ? (
                            <CardContent className="text-center py-2">
                              <Text as="p" className="font-semibold text-md">
                                {value}
                              </Text>
                            </CardContent>
                          ) : (
                            <CardContent className="text-center py-2 text-muted-foreground text-sm">
                              {attr}
                            </CardContent>
                          );
                        })()}
                      </Droppable>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="grid grid-cols-5 gap-4 mt-4 mb-48">
            {containers.map((id) => (
              <div key={id} className="flex flex-col gap-2">
                <div className="text-center font-semibold mb-2">
                  Position #{id}
                </div>
                {[
                  "nationality",
                  "departureTime",
                  "cargo",
                  "chimneyColor",
                  "destination"
                ].map((attr) => (
                  <Droppable
                    key={`${id}-${attr}`}
                    id={`${id}-${attr}`}
                    accept={attr}
                  >
                    {(() => {
                      const ship = gameState.userAnswer.find(
                        (s) => s.position === id
                      );
                      const value = ship
                        ? ship[attr as keyof ShipAttribute]
                        : "";
                      return value ? (
                        <CardContent className="text-center py-2">
                          <Text as="p" className="font-semibold text-md">
                            {value}
                          </Text>
                        </CardContent>
                      ) : (
                        <CardContent className="text-center py-2 text-muted-foreground text-sm">
                          {attr}
                        </CardContent>
                      );
                    })()}
                  </Droppable>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ANSWER OPTION CONTAINER */}
        <ScrollArea className="w-full max-w-full md:max-w-4xl mx-auto mb-2 rounded-lg border bg-secondary/50">
          <Tabs
            defaultValue="nationality"
            className="border-1 p-2 backdrop-blur-sm left-4 right-4 rounded-lg mt-5 mx-auto fixed bottom-10 w-[calc(100%-32px)] 2xl:left-50 2xl:right-50 lg:max-w-6xl lg:w-auto"
            style={{ minWidth: 0 }}
          >
            <TabsList className="flex-wrap flex h-fit w-full">
              <TabsTrigger value="nationality">Nationality</TabsTrigger>
              <TabsTrigger value="departureTime">Departure Time</TabsTrigger>
              <TabsTrigger value="cargo">Cargo</TabsTrigger>
              <TabsTrigger value="chimneyColor">Chimney Color</TabsTrigger>
              <TabsTrigger value="destination">Destination</TabsTrigger>
            </TabsList>
            <TabsContent value="nationality" className="m-1 rounded-sm">
              <ScrollArea className="w-full max-w-full overflow-x-auto whitespace-nowrap flex gap-4">
                <div className="flex gap-4 mb-6">
                  {ATTRIBUTE.nationality.map((value: any) => {
                    const isAlreadyUsed = gameState.userAnswer.some(
                      (s) => s["nationality" as keyof ShipAttribute] === value
                    );
                    return (
                      <Draggable
                        key={`nat-${value}`}
                        id={`nationality-${value}`}
                        data={{ type: "nationality", value }}
                        className="w-full min-w-[200px]"
                        style={{ touchAction: "none" }}
                      >
                        {value}
                      </Draggable>
                    );
                  })}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="departureTime" className="m-1 rounded-sm">
              <ScrollArea className="w-full max-w-full overflow-x-auto whitespace-nowrap flex gap-4">
                <div className="flex gap-4 p-2">
                  {ATTRIBUTE.departureTime.map((item) => (
                    <Draggable
                      className="w-full min-w-[200px]"
                      key={`dep-${item}`}
                      id={`departureTime-${item}`}
                      data={{ type: "departureTime", value: item }}
                      style={{ touchAction: "none" }}
                    >
                      {item}
                    </Draggable>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="cargo" className="m-1 rounded-sm">
              <ScrollArea className="w-full max-w-full overflow-x-auto whitespace-nowrap flex gap-4">
                <div className="flex gap-4 p-2">
                  {ATTRIBUTE.cargo.map((item) => (
                    <Draggable
                      className="w-full min-w-[200px]"
                      key={`cargo-${item}`}
                      id={`cargo-${item}`}
                      data={{ type: "cargo", value: item }}
                      style={{ touchAction: "none" }}
                    >
                      {item}
                    </Draggable>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="chimneyColor" className="m-1 rounded-sm">
              <ScrollArea className="w-full max-w-full overflow-x-auto whitespace-nowrap flex gap-4">
                <div className="flex gap-4 p-2">
                  {ATTRIBUTE.chimneyColor.map((item) => (
                    <Draggable
                      className="w-full min-w-[200px]"
                      key={`chimneyColor-${item}`}
                      id={`chimneyColor-${item}`}
                      data={{ type: "chimneyColor", value: item }}
                      style={{ touchAction: "none" }}
                    >
                      {item}
                    </Draggable>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="destination" className="m-1 rounded-sm">
              <ScrollArea className="w-full max-w-full overflow-x-auto whitespace-nowrap flex gap-4">
                <div className="flex gap-4 p-2">
                  {ATTRIBUTE.destination.map((item) => (
                    <Draggable
                      className="w-full min-w-[200px]"
                      key={`dest-${item}`}
                      id={`destination-${item}`}
                      data={{ type: "destination", value: item }}
                      style={{ touchAction: "none" }}
                    >
                      {item}
                    </Draggable>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <DragOverlay
          dropAnimation={{
            ...defaultDropAnimationSideEffects(null),
            duration: 300
          }}
        >
          {activeDragData ? (
            <Card className="absolute top-0 w-full h-full border-1 grid place-items-center">
              <span className="font-semibold text-md">
                {activeDragData.value}
              </span>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );

  function handleDragStart(event: any) {
    setActiveID(event.active.id);
    setActiveDragData(event.active.data.current);
  }

  function handleDragEnd(event: any) {
    setActiveID(null);
    setActiveDragData(null);
    const { active, over } = event;

    if (!over || !active) return;

    const [overPosition, overAttr] = over.id.split("-");
    const [attribute, value] = active.id.split("-");
    if (attribute !== overAttr) return;
    const droppedPosition = Number(overPosition);
    const currentAnswer = [...gameState.userAnswer];
    const ship = currentAnswer.find((s) => s.position === droppedPosition);
    if (ship && attribute in ship) {
      (ship as any)[attribute] = value;
    }
    updateState({ userAnswer: currentAnswer });
  }
});

export default GameLayout;
