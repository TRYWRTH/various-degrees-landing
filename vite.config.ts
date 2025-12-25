import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/various-degrees-landing/", // <-- Repo name with leading/trailing slashes
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"), // Assumes your source/index.html is here
  build: {
    outDir: path.resolve(__dirname, "dist"), // <-- Output to dist, NOT dist/public
    emptyOutDir: true, // Clean dist before build
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
