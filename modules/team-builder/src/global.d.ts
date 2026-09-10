/// <reference types="svelte" />

declare module "*.svelte" {
  import type { ComponentType, SvelteComponentTyped } from "svelte";
  const component: ComponentType<SvelteComponentTyped<any, any, any>>;
  export default component;
}
