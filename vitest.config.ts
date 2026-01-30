import { resolve } from "path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    root: "./client",
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["lcov", "text"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "client/src"),
      "@shared": resolve(__dirname, "shared"),
      "@assets": resolve(__dirname, "attached_assets"),
    },
  },
});
