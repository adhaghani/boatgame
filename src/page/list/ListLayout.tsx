import { memo } from "react";
import { Text } from "@/components/ui/text";
import { getPastAttempts } from "@/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import useIsMobile from "@/hooks/useIsMobile";
import { Particles } from "@/components/magicui/particles";

import { BlurFade } from "@/components/magicui/blur-fade";
const ListLayout = memo(() => {
  const Attempts = getPastAttempts();
  const isMobile = useIsMobile();
  return (
    <>
      {!isMobile && (
        <div className="fixed left-0 -z-10 overflow-hidden w-full h-full">
          <Particles quantity={200} />
        </div>
      )}
      <BlurFade inView delay={0.1}>
        <Text as="h1" className="text-center">
          Past Attempts
        </Text>
      </BlurFade>
      <div className="grid md:grid-cols-2 gap-4 my-10">
        {Attempts.map((attempt, index) => (
          <BlurFade inView delay={index * 0.1}>
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
                    <Text as="h2">
                      {25 - attempt.incorrectAttributes.length}
                    </Text>
                  </div>
                  <div className="p-4 w-full rounded-lg dark:bg-red-950 dark:text-red-200 text-red-800 bg-red-300">
                    <Text as="h4">InCorrectly Answer</Text>
                    <Text as="h2">{attempt.incorrectAttributes.length}</Text>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Text as="p" styleVariant="muted">
                  Attempted by {attempt.username}
                </Text>
              </CardFooter>
            </Card>
          </BlurFade>
        ))}
      </div>
    </>
  );
});

export default ListLayout;
