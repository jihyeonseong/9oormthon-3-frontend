import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/busInfo": {
        target: "https://bus.jeju.go.kr",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/busInfo/, "/api/searchArrivalInfoList.do"),
        secure: false,
        ws: true,
      },
    },
    port: 3000,
  },
});
