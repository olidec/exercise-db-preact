import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { signal } from "@preact/signals";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: "../docs",
  },
  base: "/exercise-db-preact/",
});
