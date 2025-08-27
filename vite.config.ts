import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), enhancedImages(), , sveltekit()],
  server: {
    port: 5173,
    host: "0.0.0.0",
    strictPort: false,
  },

  preview: {
    port: 5173,
    host: "0.0.0.0",
    strictPort: false,
  },
});
