import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";

// Element build: compiles <TeamBuilderElement> with Svelte's customElement
// output so the whole plugin — Svelte runtime included — is a single
// dependency-free script. Drop it into Blade's index.html as:
//   <script type="module" src="js/plugins/blade-team-builder-element.js"></script>
//   <blade-team-builder></blade-team-builder>
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { customElement: true }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/element.ts"),
      name: "BladeTeamBuilderElement",
      fileName: () => "blade-team-builder-element.js",
      formats: ["es"]
    },
    outDir: "dist",
    emptyOutDir: false
  }
});
