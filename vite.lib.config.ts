import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: "src/index.ts",
      name: "AdhkarToaster",
      formats: ["es", "cjs"],
      fileName: (format) =>
        format === "es" ? "adhkar-toaster.js" : "adhkar-toaster.cjs",
      cssFileName: "style",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "sonner"],
    },
  },
});
