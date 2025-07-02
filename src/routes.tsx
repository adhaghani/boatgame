import { lazy } from "react";
import { Navigate } from "react-router-dom";
import DefaultLayout from "./page/DefaultLayout";

const GameLayout = lazy(() => import("@/page/game/GameLayout"));
const HomeLayout = lazy(() => import("@/page/home/HomeLayout"));
const ListLayout = lazy(() => import("@/page/list/ListLayout"));
const ResultLayout = lazy(() => import("@/page/result/ResultLayout"));

const routes = [
  {
    path: "",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <HomeLayout />
      },
      {
        path: "play",
        element: <GameLayout />
      },
      {
        path: "past-game",
        element: <ListLayout />
      },
      {
        path: "result",
        element: <ResultLayout />
      }
    ]
  }
];

export { routes };
