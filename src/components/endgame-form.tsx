import { useGameState } from "@/context/gameStateContext";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "./ui/dialog";

import { useNavigate } from "react-router-dom";
import { submitAnswer } from "@/puzzle";

const EndGameForm = () => {
  const { gameState, updateState } = useGameState();

  const Navigate = useNavigate();

  const onEndGame = () => {
    const now = new Date();
    const start = new Date(gameState.startTime);
    const timeTaken = Math.floor((now.getTime() - start.getTime()) / 1000);

    if (gameState.timeTaken < 60) {
    } else {
      const result = submitAnswer({
        userAnswer: gameState.userAnswer,
        solution: gameState.solution,
        difficulty: gameState.difficulty,
        username: gameState.username,
        timeTaken: timeTaken
      });
    }

    updateState({
      ...gameState,
      gameStatus: "completed"
    });
    Navigate("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>End the Game</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>End the game now?</DialogTitle>
          <DialogDescription>
            Are you sure you want to end the game now?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onEndGame}>End Now</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EndGameForm;
