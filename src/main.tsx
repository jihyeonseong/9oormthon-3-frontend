import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Toast } from "@vapor-ui/core";

const queryClient = new QueryClient();
const toastManager = Toast.createToastManager();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toast.Provider toastManager={toastManager}>
        <RouterProvider router={router} />
      </Toast.Provider>
    </QueryClientProvider>
  </StrictMode>
);
