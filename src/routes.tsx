import { lazy } from "react";
import DefaultLayout from "./page/DefaultLayout";

const GameLayout = lazy(() => import("@/page/game/GameLayout"));
const HomeLayout = lazy(() => import("@/page/home/HomeLayout"));
const ListLayout = lazy(() => import("@/page/list/ListLayout"));
const ResultLayout = lazy(() => import("@/page/result/ResultLayout"));
const Leaderboard = lazy(() => import("@/page/Leaderboard"));

const routes = [
  {
    path: "",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <HomeLayout />,
      },
      {
        path: "play",
        element: <GameLayout />,
      },
      {
        path: "past-game",
        element: <ListLayout />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "result",
        element: <ResultLayout />,
      },
    ],
  },
];

export { routes };
