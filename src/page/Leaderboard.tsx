import type { attempt } from "@/types";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { getPastAttempts } from "@/constants";
import useIsMobile from "@/hooks/useIsMobile";
import { BlurFade } from "@/components/magicui/blur-fade";

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
      <BlurFade inView delay={0.1}>
        <Text as="h1" className="text-center text-2xl md:text-4xl mb-4">
          Leaderboard
        </Text>
      </BlurFade>
      <BlurFade delay={0.1}>
        <Text
          as="p"
          className="text-center text-xs md:text-base mb-2 text-muted-foreground"
        >
          Score = Correct × 1000 − Time × 2 − Incorrect × 200
        </Text>
      </BlurFade>
      <div className="space-y-1 md:space-y-2">
        {scores.length === 0 && (
          <BlurFade delay={0.2}>
            <Card>
              <CardContent>No scores yet.</CardContent>
            </Card>
          </BlurFade>
        )}
        {scores.map((a, i) => (
          <BlurFade delay={(i + 1) * 0.1} key={i}>
            <Card className="flex flex-col md:flex-row items-center justify-between p-1 md:p-4 text-xs md:text-base">
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
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
