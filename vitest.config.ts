import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Use describe, it, expect without imports
    environment: "jsdom", // Use jsdom for DOM APIs
    setupFiles: "./src/setupTests.ts",
  },
});
