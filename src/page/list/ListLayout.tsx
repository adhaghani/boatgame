import { memo } from "react";
import { Text } from "@/components/ui/text";
import { getPastAttempts } from "@/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { formatTime } from "@/hooks/formatTimer";
import { Badge } from "@/components/ui/badge";

const ListLayout = memo(() => {
  const Attempts = getPastAttempts();
  return (
    <div>
      <Text as="h1" className="text-center">
        Past Attempts
      </Text>
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        {Attempts.map((attempt, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row justify-between items-center gap-4">
              <Text as="p">Attempt #{index + 1}</Text>
              <Badge variant={attempt.success ? "default" : "destructive"}>
                {attempt.success ? "Success" : "Failed"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                <div className="p-4 w-full rounded-lg dark:bg-green-950 bg-green-200 dark:text-green-300 text-green-700">
                  <Text as="h4">Correctly Answer</Text>
                  <Text as="h2">{24 - attempt.incorrectAttributes.length}</Text>
                </div>
                <div className="p-4 w-full rounded-lg dark:bg-red-950 dark:text-red-200 text-red-800 bg-red-300">
                  <Text as="h4">InCorrectly Answer</Text>
                  <Text as="h2">{attempt.incorrectAttributes.length}</Text>
                </div>
              </div>
            </CardContent>
            <CardFooter className="space-x-2">
              <Text as="p" styleVariant="muted">
                Attempted by {attempt.username} | Time Taken :{" "}
                {formatTime(attempt.timeTaken)}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
});

export default ListLayout;
