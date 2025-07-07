import { memo } from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { GridPattern } from "@/components/magicui/grid-pattern";
const DefaultLayout = memo(() => {
  return (
    <>
      <Header />
      <div className="fixed t-0 l-0 w-full h-full -z-10">
        <GridPattern strokeDasharray={"4 2"} />
      </div>
      <div className="lg:max-w-6xl px-2 w-[calc(100%-20px)] lg:w-auto pt-24 top-40 mx-auto">
        <Outlet />
      </div>
      <Toaster richColors expand />
    </>
  );
});

export default DefaultLayout;
