import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    exclude: [...configDefaults.exclude, "**/playwright/**"],
    alias: {
      "~/": fileURLToPath(new URL("./src/", import.meta.url)),
    },
    env: dotenv.config({
      path: "./.env.test",
    }).parsed,
    setupFiles: ["./vitest.setup.ts", "dotenv/config"],
  },
});
