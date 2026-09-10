import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";

// Library build: exposes the Svelte component + stores/utils as a normal
// ES module for consumers who compile Svelte themselves (e.g. embedding
// <TeamBuilder> directly inside another Svelte/SvelteKit app).
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "BladeTeamBuilder",
      fileName: () => "blade-team-builder.js",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["svelte", "svelte/internal", "svelte/store"]
    },
    outDir: "dist",
    emptyOutDir: false
  }
});
