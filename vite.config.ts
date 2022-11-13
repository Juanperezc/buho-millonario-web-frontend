import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
const env = loadEnv("mock", process.cwd(), "");

export default defineConfig({
  server: {
    port: 3000,
  },
  define: {
    "process.env": Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val,
        }
      },
      {},
    ),
  },
  plugins: [react(), tsconfigPaths()],
});
