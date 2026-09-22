import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    // Mirror tsconfig "@/*" -> "src/*" so test imports resolve.
    alias: { "@": path.resolve(process.cwd(), "src") },
  },
  test: {
    environment: "jsdom", // cart store persists to localStorage
    globals: true,
    // Unit tests only. e2e/*.spec.ts are Playwright and must NOT be run here.
    include: ["tests/unit/**/*.test.ts"],
    exclude: ["node_modules", ".next", "e2e"],
  },
});
