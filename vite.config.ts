import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Docker Compose 里设 CHOKIDAR_USEPOLLING=true；不依赖 @types/node */
function chokidarUsePolling(): boolean {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env;
  return env?.CHOKIDAR_USEPOLLING === "true";
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: chokidarUsePolling(),
    },
  },
});