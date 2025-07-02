import { useEffect, useState } from "react";

export function useTimer(start: boolean = true): number {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  return seconds;
}
