import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

export default defineConfig({
  plugins: [svelte()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    target: "es2020",
    module: true,
    outDir: "modules/setup-panel/dist-svelte",
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "modules/setup-panel/svelte/index.js"),
      name: "SetupPanelSvelte",
      formats: ["es"],
      fileName: "setup-panel-svelte",
    },
    rollupOptions: {
      output: {
        entryFileNames: "setup-panel-svelte.js",
        assetFileNames: "setup-panel-svelte.[ext]",
      },
    },
  },
});