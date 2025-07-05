import { useEffect, useState } from "react";
import { useGameState } from "@/context/gameStateContext";

export function useTimer(start: boolean = true): number {
  const { gameState } = useGameState();

  const startTime = new Date(gameState.startTime);
  const [seconds, setSeconds] = useState(() => {
    const now = new Date();
    return Math.floor((now.getTime() - startTime.getTime()) / 1000);
  });

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [start, gameState.startTime]);

  return seconds;
}
