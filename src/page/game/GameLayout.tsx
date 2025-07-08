import { memo, useEffect, useState } from "react";
import { useGameState } from "@/context/gameStateContext";
import useIsMobile from "@/hooks/useIsMobile";
import NumberFlow from "@number-flow/react";

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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { BlurFade } from "@/components/magicui/blur-fade";
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
import { Particles } from "@/components/magicui/particles";
import { useNavigate } from "react-router-dom";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
const GameLayout = memo(() => {
  const { gameState, updateState } = useGameState();
  const isMobile = useIsMobile();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
        delay: 50,
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
  const [, setActiveID] = useState(null);
  const [activeDragData, setActiveDragData] = useState<any>(null);

  const time = useTimer(gameState.gameStatus === "in_progress");
  const formatted = formatTime(time);
  const gameStatus = gameState.gameStatus;

  const hasGameEnded = () => {
    return gameStatus === "completed" ? true : false;
  };

  useEffect(() => {
    console.log(gameState);
  });

  const Navigate = useNavigate();

  const NavigateToHome = () => {
    Navigate("/");
  };

  return (
    <>
      {!isMobile && (
        <div className="fixed left-0 -z-10 overflow-hidden w-full h-1/2">
          <Particles quantity={200} />
        </div>
      )}
      {/* CLUE */}
      <BlurFade inView delay={0.1}>
        <div className="flex  items-center gap-2">
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
            <span className="font-semibold">
              <NumberFlow
                format={{ minimumIntegerDigits: 2 }}
                value={formatted.min}
              />
              :
              <NumberFlow
                format={{ minimumIntegerDigits: 2 }}
                value={formatted.sec}
              />
            </span>
          </Text>
        </div>
      </BlurFade>
      {/* QUESTION GRID */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {isMobile ? (
          <BlurFade inView delay={0.2}>
            <Carousel
              opts={{
                align: "center"
              }}
              className="mt-4 max-w-[80%] mx-auto mb-80"
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
          </BlurFade>
        ) : (
          <div className="grid grid-cols-5 gap-4 mt-4 mb-48">
            {containers.map((id) => (
              <div key={id} className="flex flex-col gap-2">
                <BlurFade inView delay={0.2}>
                  <div className="text-center font-semibold mb-2">
                    Position #{id}
                  </div>
                </BlurFade>
                {[
                  "nationality",
                  "departureTime",
                  "cargo",
                  "chimneyColor",
                  "destination"
                ].map((attr) => (
                  <BlurFade inView delay={0.2}>
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
                          <CardContent className="text-center py-2 ">
                            <Text as="p" className="font-semibold text-md">
                              {value}
                            </Text>
                          </CardContent>
                        ) : (
                          <CardContent className="text-center py-2 text-muted-foreground text-sm">
                            {attr === "departureTime"
                              ? "departure time"
                              : attr === "chimneyColor"
                              ? "chimney color"
                              : attr}
                          </CardContent>
                        );
                      })()}
                    </Droppable>
                  </BlurFade>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ANSWER OPTION CONTAINER */}
        <ScrollArea className="w-full max-w-full md:max-w-4xl mx-auto mb-2">
          <Tabs
            defaultValue="nationality"
            className="backdrop-blur-sm left-4 right-4 rounded-lg mt-5 mx-auto fixed bottom-4 w-[calc(100%-32px)] 2xl:left-50 2xl:right-50 lg:max-w-6xl lg:w-auto"
            style={{ minWidth: 0 }}
          >
            <BlurFade delay={0.3} inView>
              <NeonGradientCard>
                <TabsList className="flex-wrap flex mb-4 h-fit w-full">
                  <TabsTrigger value="nationality">Nationality</TabsTrigger>
                  <TabsTrigger value="departureTime">
                    Departure Time
                  </TabsTrigger>
                  <TabsTrigger value="cargo">Cargo</TabsTrigger>
                  <TabsTrigger value="chimneyColor">Chimney Color</TabsTrigger>
                  <TabsTrigger value="destination">Destination</TabsTrigger>
                </TabsList>
                <TabsContent value="nationality" className="m-1 rounded-sm">
                  <ScrollArea className="w-full max-w-full overflow-x-auto whitespace-nowrap flex gap-4">
                    <div className="flex gap-4 mb-6">
                      {ATTRIBUTE.nationality.map((value: any) => {
                        const isAlreadyUsed = gameState.userAnswer.some(
                          (s) =>
                            s["nationality" as keyof ShipAttribute] === value
                        );
                        return (
                          <Draggable
                            key={`nat-${value}`}
                            id={`nationality-${value}`}
                            data={{ type: "nationality", value }}
                            className={
                              "w-full min-w-[200px] " +
                              (isAlreadyUsed
                                ? " opacity-50  rounded-2xl border-dashed border-red-400 border-2"
                                : " border rounded-2xl border-2")
                            }
                            style={{ touchAction: "none" }}
                            disabled={isAlreadyUsed}
                          >
                            <span className="flex items-center justify-center font-semibold">
                              {value}
                              {isAlreadyUsed && (
                                <span className="ml-2  text-foreground text-xs font-bold flex items-center gap-1">
                                  <svg
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Used
                                </span>
                              )}
                            </span>
                          </Draggable>
                        );
                      })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="departureTime" className="m-1 rounded-sm">
                  <ScrollArea className="w-full max-w-full overflow-x-auto whitespace-nowrap flex gap-4">
                    <div className="flex gap-4 mb-6">
                      {ATTRIBUTE.departureTime.map((item) => {
                        const isAlreadyUsed = gameState.userAnswer.some(
                          (s) =>
                            s["departureTime" as keyof ShipAttribute] === item
                        );

                        return (
                          <Draggable
                            className={
                              "w-full min-w-[200px]" +
                              (isAlreadyUsed
                                ? " opacity-50  rounded-2xl border-dashed border-red-400 border-2"
                                : " border rounded-2xl border-2")
                            }
                            key={`dep-${item}`}
                            id={`departureTime-${item}`}
                            data={{ type: "departureTime", value: item }}
                            style={{ touchAction: "none" }}
                            disabled={isAlreadyUsed}
                          >
                            <span className="flex items-center justify-center font-semibold">
                              {item}
                              {isAlreadyUsed && (
                                <span className="ml-2  text-foreground text-xs font-bold flex items-center gap-1">
                                  <svg
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Used
                                </span>
                              )}
                            </span>
                          </Draggable>
                        );
                      })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="cargo" className="m-1 rounded-sm">
                  <ScrollArea className="w-full max-w-full overflow-x-auto whitespace-nowrap flex gap-4">
                    <div className="flex gap-4 mb-6">
                      {ATTRIBUTE.cargo.map((item) => {
                        const isAlreadyUsed = gameState.userAnswer.some(
                          (s) => s["cargo" as keyof ShipAttribute] === item
                        );
                        return (
                          <Draggable
                            className={
                              "w-full min-w-[200px]" +
                              (isAlreadyUsed
                                ? " opacity-50  rounded-2xl border-dashed border-red-400 border-2"
                                : " border rounded-2xl border-2")
                            }
                            key={`cargo-${item}`}
                            id={`cargo-${item}`}
                            data={{ type: "cargo", value: item }}
                            style={{ touchAction: "none" }}
                            disabled={isAlreadyUsed}
                          >
                            <span className="flex items-center justify-center font-semibold">
                              {item}
                              {isAlreadyUsed && (
                                <span className="ml-2  text-foreground text-xs font-bold flex items-center gap-1">
                                  <svg
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Used
                                </span>
                              )}
                            </span>
                          </Draggable>
                        );
                      })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="chimneyColor" className="m-1 rounded-sm">
                  <ScrollArea className="w-full max-w-full overflow-x-auto whitespace-nowrap flex gap-4">
                    <div className="flex gap-4 mb-6">
                      {ATTRIBUTE.chimneyColor.map((item) => {
                        const isAlreadyUsed = gameState.userAnswer.some(
                          (s) =>
                            s["chimneyColor" as keyof ShipAttribute] === item
                        );
                        return (
                          <Draggable
                            className={
                              "w-full min-w-[200px]" +
                              (isAlreadyUsed
                                ? " opacity-50  rounded-2xl border-dashed border-red-400 border-2"
                                : " border rounded-2xl border-2")
                            }
                            key={`chimneyColor-${item}`}
                            id={`chimneyColor-${item}`}
                            data={{ type: "chimneyColor", value: item }}
                            style={{ touchAction: "none" }}
                            disabled={isAlreadyUsed}
                          >
                            <span className="flex items-center justify-center font-semibold">
                              {item}
                              {isAlreadyUsed && (
                                <span className="ml-2  text-foreground text-xs font-bold flex items-center gap-1">
                                  <svg
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Used
                                </span>
                              )}
                            </span>
                          </Draggable>
                        );
                      })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="destination" className="m-1 rounded-sm">
                  <ScrollArea className="w-full max-w-full overflow-x-auto whitespace-nowrap flex gap-4">
                    <div className="flex gap-4 mb-6">
                      {ATTRIBUTE.destination.map((item) => {
                        const isAlreadyUsed = gameState.userAnswer.some(
                          (s) =>
                            s["destination" as keyof ShipAttribute] === item
                        );

                        return (
                          <Draggable
                            className={
                              "w-full min-w-[200px]" +
                              (isAlreadyUsed
                                ? " opacity-50  rounded-2xl border-dashed border-red-400 border-2"
                                : " border rounded-2xl border-2")
                            }
                            key={`dest-${item}`}
                            id={`destination-${item}`}
                            data={{ type: "destination", value: item }}
                            style={{ touchAction: "none" }}
                            disabled={isAlreadyUsed}
                          >
                            <span className="flex items-center justify-center font-semibold">
                              {item}
                              {isAlreadyUsed && (
                                <span className="ml-2  text-foreground text-xs font-bold flex items-center gap-1">
                                  <svg
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Used
                                </span>
                              )}
                            </span>
                          </Draggable>
                        );
                      })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </TabsContent>
              </NeonGradientCard>
            </BlurFade>
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
      {hasGameEnded()
        ? (() => {
            // Calculate correct and incorrect answers
            const correct = gameState.userAnswer.reduce((acc, userShip) => {
              const solShip = gameState.solution.find(
                (s) => s.position === userShip.position
              );
              if (!solShip) return acc;
              let shipCorrect = 0;
              [
                "nationality",
                "departureTime",
                "cargo",
                "chimneyColor",
                "destination"
              ].forEach((attr) => {
                if (
                  userShip[attr as keyof ShipAttribute] ===
                  solShip[attr as keyof ShipAttribute]
                )
                  shipCorrect++;
              });
              return acc + shipCorrect;
            }, 0);
            const total = gameState.userAnswer.length * 5;
            const incorrect = total - correct;
            return (
              <div className="bg-black/50 grid place-items-center backdrop-blur-xs fixed left-0 top-0 w-full h-full z-[100]">
                <Card className="w-full max-w-lg">
                  <CardHeader>
                    <CardTitle>Your Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 items-center">
                      <div className="p-4 w-full rounded-lg border dark:bg-green-950 bg-green-200 dark:text-green-300 text-green-700 dark:border-green-300 border-green-800">
                        <Text as="p" className="font-semibold">
                          Correctly Answer
                        </Text>
                        <Text as="h1">
                          <NumberFlow
                            format={{ minimumIntegerDigits: 2 }}
                            value={correct}
                          />
                        </Text>
                      </div>
                      <div className="p-4 w-full rounded-lg border dark:bg-red-950 dark:text-red-200 text-red-800 bg-red-300 dark:border-red-300 border-red-800">
                        <Text as="p" className="font-semibold">
                          InCorrectly Answer
                        </Text>
                        <Text as="h1">
                          <NumberFlow
                            format={{ minimumIntegerDigits: 2 }}
                            value={incorrect}
                          />
                        </Text>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end flex items-center gap-4">
                    <Button onClick={NavigateToHome}>
                      Return to Main Menu
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })()
        : null}
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
