import { ModeToggle } from "./mode-toggle";
import { Text } from "./ui/text";

import EndGameForm from "./endgame-form";

import { useGameState } from "@/context/gameStateContext";

import { Link } from "react-router-dom";

const Header = () => {
  const { gameState } = useGameState();

  const gameStatus = gameState.gameStatus;
  let isBeingPlayed = gameStatus === "in_progress";

  return (
    <nav
      className={`fixed z-50 top-5 left-4 right-4 w-[calc(100%-32px)] 2xl:left-50 2xl:right-50 lg:max-w-6xl lg:w-auto mx-auto bg-secondary/50 backdrop-blur-sm py-2 px-4 rounded-lg flex justify-between items-center gap-4`}
    >
      {isBeingPlayed ? (
        <>
          <Text as="h4" className="lg:block hidden">
            Boatly - The Impossible Game
          </Text>

          <Text as="h4" className="lg:hidden block">
            Boatly
          </Text>
        </>
      ) : (
        <>
          <Link to={"/"} className="lg:block hidden">
            <Text as="h4">Boatly - The Impossible Game</Text>
          </Link>
          <Link to={"/"}>
            <Text as="h4" className="lg:hidden block">
              Boatly
            </Text>
          </Link>
        </>
      )}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          {isBeingPlayed ? <EndGameForm /> : null}
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;
