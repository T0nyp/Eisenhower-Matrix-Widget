import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Tailwind 4 works out-of-the-box; its PostCSS plugin is auto-detected.
// If you later add other PostCSS plugins, you can extend the css.postcss section.

export default defineConfig({
  plugins: [react()],

  // Optional tweaks you may want:
  // build: { outDir: "dist" },      // default is "dist" already
  // server: { port: 5173, open: true } // dev server behaviour
});
