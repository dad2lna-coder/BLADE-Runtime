/**
 * Minimal native drag-and-drop actions. These replace the SortableJS
 * dependency the old vanilla-JS module pulled in — Svelte's own action
 * mechanism plus the browser's HTML5 DnD API is enough for "drag a line
 * card into a team board (or back to the pool)", and it keeps the plugin
 * dependency-free.
 *
 * Usage:
 *   <div use:draggableCard={{ id: p.id }}>...</div>
 *   <div use:dropZone={{ onDrop: (id) => store.moveMember(id, team.id) }}>...</div>
 */

export interface DraggableCardOptions {
  id: number;
}

export function draggableCard(node: HTMLElement, options: DraggableCardOptions) {
  let current = options;
  node.draggable = true;

  function onDragStart(e: DragEvent) {
    e.dataTransfer?.setData("text/plain", String(current.id));
    e.dataTransfer!.effectAllowed = "move";
    node.classList.add("is-dragging");
  }
  function onDragEnd() {
    node.classList.remove("is-dragging");
  }

  node.addEventListener("dragstart", onDragStart);
  node.addEventListener("dragend", onDragEnd);

  return {
    update(next: DraggableCardOptions) {
      current = next;
    },
    destroy() {
      node.removeEventListener("dragstart", onDragStart);
      node.removeEventListener("dragend", onDragEnd);
    }
  };
}

export interface DropZoneOptions {
  onDrop: (poolId: number) => void;
  /** Extra class applied while something is being dragged over the zone. Defaults to "is-drop-hover". */
  hoverClass?: string;
}

export function dropZone(node: HTMLElement, options: DropZoneOptions) {
  let current = options;

  function onDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    node.classList.add(current.hoverClass ?? "is-drop-hover");
  }
  function onDragLeave() {
    node.classList.remove(current.hoverClass ?? "is-drop-hover");
  }
  function onDrop(e: DragEvent) {
    e.preventDefault();
    node.classList.remove(current.hoverClass ?? "is-drop-hover");
    const raw = e.dataTransfer?.getData("text/plain");
    const id = Number(raw);
    if (!Number.isNaN(id)) current.onDrop(id);
  }

  node.addEventListener("dragover", onDragOver);
  node.addEventListener("dragleave", onDragLeave);
  node.addEventListener("drop", onDrop);

  return {
    update(next: DropZoneOptions) {
      current = next;
    },
    destroy() {
      node.removeEventListener("dragover", onDragOver);
      node.removeEventListener("dragleave", onDragLeave);
      node.removeEventListener("drop", onDrop);
    }
  };
}
