import { ModeToggle } from "./mode-toggle";
import { Text } from "./ui/text";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import EndGameForm from "./endgame-form";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent
} from "./ui/dropdown-menu";
import { useGameState } from "@/context/gameStateContext";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

const Header = () => {
  const { gameState } = useGameState();

  const gameStatus = gameState.gameStatus;
  let isBeingPlayed = gameStatus === "in_progress";
  return (
    <nav className="fixed top-5 left-4 right-4 w-[calc(100%-32px)] 2xl:left-50 2xl:right-50 lg:max-w-6xl lg:w-auto mx-auto bg-secondary/50 backdrop-blur-sm py-2 px-4 rounded-lg flex justify-between items-center gap-4">
      <Text as="h4" className="lg:block hidden">
        Boatly - Ultimate Boat Puzzle Game
      </Text>
      <Text as="h4" className="lg:hidden block">
        Boatly
      </Text>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          {isBeingPlayed ? <EndGameForm /> : null}
        </div>
        {isBeingPlayed ? null : (
          <DropdownMenu>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button size={"icon"} variant={"outline"}>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>More Option</TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
              <DropdownMenuLabel>All Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Past Attempt</DropdownMenuItem>
              <DropdownMenuItem>Change Username</DropdownMenuItem>
              <DropdownMenuItem>Clear All Data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;
