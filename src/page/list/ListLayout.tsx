import { memo, useState } from "react";
import { Text } from "@/components/ui/text";
import { getPastAttempts } from "@/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { Badge } from "@/components/ui/badge";
import useIsMobile from "@/hooks/useIsMobile";
import { Particles } from "@/components/magicui/particles";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
const ListLayout = memo(() => {
  const Attempts = getPastAttempts();
  const isMobile = useIsMobile();
  const [showDetail, setShowDetail] = useState<null | number>(null);
  return (
    <>
      {!isMobile && (
        <div className="fixed left-0 -z-10 overflow-hidden w-full h-full">
          <Particles quantity={200} />
        </div>
      )}
      <BlurFade inView delay={0.1}>
        <Text as="h1" className="text-center">
          Past Attempts
        </Text>
        <Text
          as="p"
          className="text-center text-xs md:text-base text-muted-foreground"
        >
          View your previous games and scores. Try to get all correct for the
          best leaderboard score!
        </Text>
      </BlurFade>
      <div className="grid md:grid-cols-2 gap-2 md:gap-4 my-4 md:my-10">
        {Attempts.map((attempt, index) => (
          <BlurFade inView delay={index * 0.1} key={index}>
            <Card className="text-xs md:text-base">
              <CardHeader className="flex flex-row justify-between items-center gap-2 md:gap-4">
                <Text as="p">Attempt #{index + 1}</Text>
                <Badge variant={attempt.success ? "default" : "destructive"}>
                  {attempt.success ? "Success" : "Failed"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 md:gap-4 items-center">
                  <div className="p-2 md:p-4 w-full rounded-lg dark:bg-green-950 bg-green-200 dark:text-green-300 text-green-700">
                    <Text as="h4">Correctly Answer</Text>
                    <Text as="h2">
                      {25 - attempt.incorrectAttributes.length}
                    </Text>
                  </div>
                  <div className="p-2 md:p-4 w-full rounded-lg dark:bg-red-950 dark:text-red-200 text-red-800 bg-red-300">
                    <Text as="h4">InCorrectly Answer</Text>
                    <Text as="h2">{attempt.incorrectAttributes.length}</Text>
                  </div>
                </div>

                <Dialog
                  open={showDetail === index}
                  onOpenChange={(open) => setShowDetail(open ? index : null)}
                >
                  <DialogTrigger asChild>
                    <Button size="sm" className="mt-2">
                      Show Grid
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="!max-w-6xl w-full">
                    <DialogHeader>
                      <DialogTitle>
                        Attempt #{index + 1} - Answer Grid
                      </DialogTitle>
                      <DialogDescription>
                        Review your answers. Green = correct, Red = incorrect.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                      {isMobile ? (
                        <Carousel className="max-w-[90vw] mx-auto">
                          <CarouselContent>
                            {attempt.userAnswer.map((ans) => {
                              const sol = attempt.solution.find(
                                (s) => s.position === ans.position
                              );
                              const incorrectAttrs =
                                attempt.incorrectAttributes.filter(
                                  (ia) => ia.position === ans.position
                                );
                              return (
                                <CarouselItem
                                  key={ans.position}
                                  className="max-w-[320px]"
                                >
                                  <div className="flex flex-col border rounded-lg">
                                    <div className="text-center font-semibold py-1 border-b bg-secondary">
                                      Position {ans.position}
                                    </div>
                                    {[
                                      "nationality",
                                      "departureTime",
                                      "cargo",
                                      "chimneyColor",
                                      "destination",
                                    ].map((key) => {
                                      const k = key as keyof typeof ans;
                                      const isWrong = incorrectAttrs.some(
                                        (ia) => ia.attribute === key
                                      );
                                      return (
                                        <div
                                          key={key}
                                          className={`p-2 border-b last:border-b-0 text-xs md:text-base text-center ${
                                            isWrong
                                              ? "bg-red-200 dark:bg-red-900"
                                              : "bg-green-200 dark:bg-green-900"
                                          }`}
                                        >
                                          <div className="font-bold capitalize">
                                            {key}
                                          </div>
                                          <div>User: {ans[k]}</div>
                                          {isWrong && sol ? (
                                            <div className="text-xs">
                                              Correct: {sol[k]}
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </CarouselItem>
                              );
                            })}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      ) : (
                        <div className="grid grid-cols-5 gap-2 min-w-[700px]">
                          {attempt.userAnswer.map((ans) => {
                            const sol = attempt.solution.find(
                              (s) => s.position === ans.position
                            );
                            const incorrectAttrs =
                              attempt.incorrectAttributes.filter(
                                (ia) => ia.position === ans.position
                              );
                            return (
                              <div
                                key={ans.position}
                                className="flex flex-col border rounded-lg"
                              >
                                <div className="text-center font-semibold py-1 border-b bg-secondary">
                                  Position {ans.position}
                                </div>
                                {[
                                  "nationality",
                                  "departureTime",
                                  "cargo",
                                  "chimneyColor",
                                  "destination",
                                ].map((key) => {
                                  const k = key as keyof typeof ans;
                                  const isWrong = incorrectAttrs.some(
                                    (ia) => ia.attribute === key
                                  );
                                  return (
                                    <div
                                      key={key}
                                      className={`p-2 border-b last:border-b-0 text-xs md:text-base text-center ${
                                        isWrong
                                          ? "bg-red-200 dark:bg-red-900"
                                          : "bg-green-200 dark:bg-green-900"
                                      }`}
                                    >
                                      <div className="font-bold capitalize">
                                        {key}
                                      </div>
                                      <div>User: {ans[k]}</div>
                                      {isWrong && sol ? (
                                        <div className="text-xs">
                                          Correct: {sol[k]}
                                        </div>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
              <CardFooter className="space-x-1 md:space-x-2">
                <Text as="p" styleVariant="muted">
                  Attempted by {attempt.username}
                </Text>
              </CardFooter>
            </Card>
          </BlurFade>
        ))}
      </div>
    </>
  );
});

export default ListLayout;
