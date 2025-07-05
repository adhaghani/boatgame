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
      <div className="grid grid-cols-3 gap-4 mt-4">
        {Attempts.map((attempt, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row justify-between items-center gap-4">
              <Text as="p">Attempt #{index + 1}</Text>
              <Badge variant={attempt.success ? "default" : "destructive"}>
                {attempt.success ? "Success" : "Failed"}
              </Badge>
            </CardHeader>
            <CardContent>test</CardContent>
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
