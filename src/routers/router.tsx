import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import RootLayout from "./RootLayout";
import { MapPage } from "../pages/MapPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
  { path: "/map", element: <MapPage /> },
]);
