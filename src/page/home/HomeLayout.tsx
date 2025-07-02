import { memo } from "react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import PreGameForm from "@/components/pregame-form";
const HomeLayout = memo(() => {
  return (
    <>
      <div className=" h-[70vh] min-h-fit py-10 grid place-items-center">
        <div className="space-y-6">
          <Text as="h1" className="text-center">
            Hello, Welcome to <br />
            <AuroraText className="text-8xl">Boatly</AuroraText>
          </Text>
          <div className="grid place-items-center">
            <PreGameForm />
          </div>
        </div>
      </div>
    </>
  );
});

export default HomeLayout;
