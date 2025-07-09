import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import type { attempt } from "@/types";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const attempt: attempt | undefined = location.state?.attempt;

  if (!attempt) {
    return (
      <div className="text-center mt-10">
        <Text as="h2">No result to show.</Text>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  // Build a grid of answers
  const grid = attempt.userAnswer.map((ans) => {
    const sol = attempt.solution.find((s) => s.position === ans.position);
    const incorrectAttrs = attempt.incorrectAttributes.filter(
      (ia) => ia.position === ans.position
    );
    return (
      <Card key={ans.position} className="mb-2">
        <CardHeader className="flex flex-row gap-2 items-center">
          <Text as="h4">Position {ans.position}</Text>
          {incorrectAttrs.length === 0 ? (
            <span className="text-green-600">✔</span>
          ) : (
            <span className="text-red-600">✘</span>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {(Object.keys(ans) as (keyof typeof ans)[])
              .filter((k) => k !== "position")
              .map((key) => {
                const isWrong = incorrectAttrs.some(
                  (ia) => ia.attribute === key
                );
                return (
                  <div
                    key={key}
                    className={`p-2 rounded border text-xs md:text-base ${
                      isWrong
                        ? "bg-red-200 dark:bg-red-900"
                        : "bg-green-200 dark:bg-green-900"
                    }`}
                  >
                    <div className="font-bold">{key}</div>
                    <div>User: {ans[key]}</div>
                    {isWrong && sol ? <div>Correct: {sol[key]}</div> : null}
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    );
  });

  return (
    <div className="max-w-2xl mx-auto px-2 py-4">
      <Text as="h1" className="text-center text-2xl md:text-4xl mb-4">
        Result
      </Text>
      <div className="space-y-2">{grid}</div>
      <div className="flex justify-center mt-4">
        <Button onClick={() => navigate("/leaderboard")}>
          View Leaderboard
        </Button>
      </div>
    </div>
  );
}
