import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    port: 8080,
    strictPort: true,
    host: "0.0.0.0",
    origin: "http://0.0.0.0:8080",
  },
  base: "/",
});
