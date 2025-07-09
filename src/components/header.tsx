import { ModeToggle } from "./mode-toggle";
import { Text } from "./ui/text";

import EndGameForm from "./endgame-form";

import { useGameState } from "@/context/gameStateContext";
import { BlurFade } from "./magicui/blur-fade";
import { Link } from "react-router-dom";
import { VisualModeToggle } from "./visual-mode-toggle";

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
          <BlurFade inView delay={0.1}>
            {" "}
            <Text as="h4" className="lg:block hidden">
              Boatly - The Impossible Game
            </Text>
          </BlurFade>

          <BlurFade inView delay={0.1}>
            {" "}
            <Text as="h4" className="lg:hidden block">
              Boatly
            </Text>
          </BlurFade>
        </>
      ) : (
        <>
          <BlurFade inView delay={0.1}>
            {" "}
            <Link to={"/"} className="lg:block hidden">
              <Text as="h4">Boatly - The Impossible Game</Text>
            </Link>
          </BlurFade>

          <BlurFade inView delay={0.1}>
            {" "}
            <Link to={"/"}>
              <Text as="h4" className="lg:hidden block">
                Boatly
              </Text>
            </Link>
          </BlurFade>
        </>
      )}
      <div className="flex items-center gap-2">
        <BlurFade inView delay={0.15}>
          <div className="flex items-center gap-2">
            {isBeingPlayed ? <EndGameForm /> : null}
          </div>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <ModeToggle />
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <VisualModeToggle />
        </BlurFade>
      </div>
    </nav>
  );
};

export default Header;
