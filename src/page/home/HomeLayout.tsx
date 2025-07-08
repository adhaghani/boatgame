import { memo, useEffect } from "react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PreGameForm from "@/components/pregame-form";
import {
  Dialog,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { BlurFade } from "@/components/magicui/blur-fade";
import useIsMobile from "@/hooks/useIsMobile";
import { clearPastAttempts } from "@/constants";
import { getPastAttempts } from "@/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGameState } from "@/context/gameStateContext";
import { Particles } from "@/components/magicui/particles";
const HomeLayout = memo(() => {
  const Attempt = getPastAttempts();
  const Navigate = useNavigate();
  const { gameState } = useGameState();
  const isMobile = useIsMobile();
  useEffect(() => {
    if (gameState.gameStatus === "in_progress") {
      Navigate("/play");
    } else {
      Navigate("/");
    }
  }, [gameState.gameStatus]);

  const ClearAttempt = () => {
    clearPastAttempts();
    toast.success("All data cleared");
  };

  return (
    <>
      {!isMobile && (
        <div className="fixed left-0 top0 -z-10 overflow-hidden w-full h-1/2">
          <Particles quantity={200} />
        </div>
      )}
      <div className=" h-[70vh] min-h-fit py-10 grid place-items-center">
        <div className="space-y-10">
          <BlurFade inView delay={0.2}>
            <Text as="h1" className="text-center">
              Hello, Welcome to <br />
              <BlurFade inView delay={0.25}>
                <AuroraText className="text-8xl">Boatly</AuroraText>
              </BlurFade>
            </Text>
          </BlurFade>
          <BlurFade inView delay={0.3}>
            <div className="grid place-items-center">
              <PreGameForm />
            </div>
          </BlurFade>
          {Attempt.length > 0 && (
            <div className="flex gap-4 items-center justify-center">
              <BlurFade inView delay={0.35}>
                <Button
                  asChild
                  size={"lg"}
                  className="flex-1"
                  variant={"default"}
                >
                  <Link to={"/past-game"}>View Past Attempts</Link>
                </Button>
              </BlurFade>
              <BlurFade inView delay={0.4}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size={"lg"}
                      className="flex-1"
                      variant={"secondary"}
                    >
                      Clear All Data
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm delete all data?</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      Deleting all data will remove all previously attempt
                      records.
                    </DialogDescription>
                    <DialogFooter>
                      <DialogClose>
                        <Button variant={"secondary"}>Cancel</Button>
                      </DialogClose>
                      <DialogClose>
                        <Button onClick={ClearAttempt} variant={"destructive"}>
                          Delete
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </BlurFade>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default HomeLayout;
