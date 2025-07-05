import { memo } from "react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PreGameForm from "@/components/pregame-form";
const HomeLayout = memo(() => {
  return (
    <>
      <div className=" h-[70vh] min-h-fit py-10 grid place-items-center">
        <div className="space-y-10">
          <Text as="h1" className="text-center">
            Hello, Welcome to <br />
            <AuroraText className="text-8xl">Boatly</AuroraText>
          </Text>
          <div className="grid place-items-center">
            <PreGameForm />
          </div>
          <div className="flex gap-4 items-center justify-center">
            <Button asChild size={"lg"} className="flex-1" variant={"default"}>
              <Link to={"/past-game"}>View Past Attempts</Link>
            </Button>

            <Button size={"lg"} className="flex-1" variant={"outline"}>
              Clear All Data
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});

export default HomeLayout;
