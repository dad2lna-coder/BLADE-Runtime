/**
 * Makes `node` draggable by a handle element inside it (matched by
 * `handleSelector`), using the Pointer Events API so one implementation
 * covers mouse, touch and pen. Replaces the old mousedown/touchstart pair
 * of listeners with manual clientX/clientY math.
 *
 * Usage: <div use:floatPanel={{ handleSelector: '[data-drag-handle]' }}>
 */
export interface FloatPanelOptions {
  handleSelector: string;
  /** Initial offset from the top-right corner, applied once on mount if the panel hasn't been moved yet. */
  initialRight?: string;
  initialTop?: string;
}

export function floatPanel(node: HTMLElement, options: FloatPanelOptions) {
  let opts = options;

  node.style.position = "fixed";
  if (!node.style.left && !node.style.right) {
    node.style.right = opts.initialRight ?? "0.75rem";
    node.style.top = opts.initialTop ?? "7.5rem";
  }

  let handle: HTMLElement | null = null;
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  function onPointerDown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    if (e.button !== undefined && e.button !== 0) return;

    const rect = node.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    node.style.width = `${rect.width}px`;
    node.style.height = `${rect.height}px`;
    node.style.left = `${rect.left}px`;
    node.style.top = `${rect.top}px`;
    node.style.right = "auto";
    node.classList.add("is-dragging");
    dragging = true;

    handle?.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging) return;
    const x = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - offsetX));
    const y = Math.max(0, Math.min(window.innerHeight - 40, e.clientY - offsetY));
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
  }

  function onPointerUp() {
    dragging = false;
    node.classList.remove("is-dragging");
  }

  function attach() {
    handle = node.querySelector<HTMLElement>(opts.handleSelector);
    handle?.addEventListener("pointerdown", onPointerDown);
    handle?.addEventListener("pointermove", onPointerMove);
    handle?.addEventListener("pointerup", onPointerUp);
    handle?.addEventListener("pointercancel", onPointerUp);
  }

  function detach() {
    handle?.removeEventListener("pointerdown", onPointerDown);
    handle?.removeEventListener("pointermove", onPointerMove);
    handle?.removeEventListener("pointerup", onPointerUp);
    handle?.removeEventListener("pointercancel", onPointerUp);
  }

  attach();

  return {
    update(next: FloatPanelOptions) {
      detach();
      opts = next;
      attach();
    },
    destroy() {
      detach();
    }
  };
}
