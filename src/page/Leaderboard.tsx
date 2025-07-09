import type { attempt } from "@/types";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { getPastAttempts } from "@/constants";
import useIsMobile from "@/hooks/useIsMobile";

function calculateScore(attempt: attempt) {
  // correct carries more weight, then time, then incorrect
  const correct = 25 - attempt.incorrectAttributes.length;
  const incorrect = attempt.incorrectAttributes.length;
  // Example scoring: correct*1000 - timeTaken*2 - incorrect*200
  return correct * 1000 - attempt.timeTaken * 2 - incorrect * 200;
}

export default function Leaderboard() {
  const [scores, setScores] = useState<(attempt & { score: number })[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const attempts = getPastAttempts();
    const scored = attempts.map((a) => ({
      ...a,
      score: calculateScore(a),
    }));
    scored.sort((a, b) => b.score - a.score);
    setScores(scored.slice(0, 10)); // top 10
  }, []);

  return (
    <div className={isMobile ? "px-1" : "max-w-2xl mx-auto px-4"}>
      <Text as="h1" className="text-center text-2xl md:text-4xl mb-4">
        Leaderboard
      </Text>
      <Text
        as="p"
        className="text-center text-xs md:text-base mb-2 text-muted-foreground"
      >
        Score = Correct × 1000 − Time × 2 − Incorrect × 200
      </Text>
      <div className="space-y-1 md:space-y-2">
        {scores.length === 0 && (
          <Card>
            <CardContent>No scores yet.</CardContent>
          </Card>
        )}
        {scores.map((a, i) => (
          <Card
            key={i}
            className="flex flex-col md:flex-row items-center justify-between p-1 md:p-4 text-xs md:text-base"
          >
            <CardHeader className="flex flex-row items-center gap-1 md:gap-4">
              <Text as="p" className="font-bold text-base md:text-2xl">
                #{i + 1}
              </Text>
              <Text as="p" className="font-semibold text-xs md:text-xl">
                {a.username}
              </Text>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-1 md:gap-6 items-center">
              <Text as="p">
                Score: <span className="font-bold">{a.score}</span>
              </Text>
              <Text as="p">Correct: {25 - a.incorrectAttributes.length}</Text>
              <Text as="p">Time: {a.timeTaken}s</Text>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
