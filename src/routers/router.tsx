import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import RootLayout from "./RootLayout";
import { MapPage } from "../pages/MapPage";
import { MissionPage } from "../pages/MissionPage";
import { MyPage } from "../pages/MyPage";
import { SplashPage } from "../pages/SplashPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SplashPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
  { path: "/map", element: <MapPage /> },
  { path: "/mission", element: <MissionPage /> },
  { path: "/my", element: <MyPage /> },
]);
