# BLADE Alpha — System Architecture & Repository Map

This document is the canonical map of BLADE Alpha as implemented in code on the `bright-garden` branch. It documents existing file structures, runtime contracts, module inventories, data flow, and build pipelines.

---

## 1. System Overview

BLADE (Browser-based Local Airport Duty Engine) Alpha is an offline-first browser application for airport security staffing scheduling (TSO, LTSO, STSO bid lines). Core scheduling runs client-side in the browser. Feature tab panels load as ES modules from `modules/manifest.json`, interacting with a single shared runtime state object (`window.Scheduler`).

---

## 2. Host Shell & Module Loader (`index.html`)

The host shell consists of `index.html` and supporting host scripts in `js/`. `index.html` acts as the runtime host and module renderer:

1. **Host Script Loading:** `index.html` (lines 56–66) loads vendor libraries (`lib/luxon.min.js`, `lib/Sortable.min.js`, `lib/exceljs.min.js`) and host runtime scripts (`js/constants.js`, `js/utils.js`, `js/utils/theme.js`, `js/io.js`, `js/instructions.js`, `js/main.js`, `js/console-chrome.js`, `js/intro.js`).
2. **Manifest Fetching:** In the inline `<script type="module">` block (lines 68–258), the shell fetches `modules/manifest.json`.
3. **Tab & Panel Mounting:**
   - `tabModules()` and `buildNav()` parse top-level `tab` definitions in `modules/manifest.json` and generate `<button class="tab-btn">` navigation items inside `#blade-tabs` and `<section class="panel">` elements inside `#blade-panels`.
   - `reportSubModules()` and `buildReportHost()` parse `reportsSubTab` definitions and construct sub-tab buttons and `#report-sub-*` containers inside `#tab-reports`.
4. **Module Bundle Execution:** For each entry in `modules/manifest.json`:
   - Injects stylesheets listed in `cfg.css` into `<head>`.
   - Fetches HTML templates (`cfg.panel`, `cfg.reportsPanel`, `cfg.docks`) and mounts them into target selectors (`cfg.mount`, `cfg.reportsMount`).
   - Dynamically imports the compiled Vite ESM bundle (`import(cfg.entry)`).
   - Executes the module's initializer function (`mod[cfg.init](Scheduler)`).

---

## 3. Complete Module Inventory

Every module directory in `modules/` is registered in `modules/manifest.json`:

| Manifest Key | Folder Path | Mount Target | Source Entry File | Factual Purpose in Code |
| :--- | :--- | :--- | :--- | :--- |
| `shared-utils`<br>`shared-chrome`<br>`shared-lines` | `modules/shared/` | Shared Host Runtime (No Tab Mount) | `modules/shared/index.js`<br>`modules/shared/lib/chrome.js`<br>`modules/shared/lib/lines.js` | Shared date/DOM primitives (`initSharedUtils`), console header status updates (`initSharedChrome`), and line row model extraction (`initLineHelpers`). |
| `setup-panel` | `modules/setup-panel/` | `#tab-setup`<br>`[F1] SETUP` | `modules/setup-panel/index.js`<br>`modules/setup-panel/panel.html`<br>`modules/setup-panel/lib/generate.js` | Renders Setup tab UI for start date, week count, FTE headcount by role/sex, shifts table, and executes shift generation (`S.generate()`). |
| `function-coverage` | `modules/function-coverage/` | Engine Service (No Tab Mount) | `modules/function-coverage/index.js`<br>`modules/function-coverage/lib/assign.js`<br>`modules/function-coverage/lib/pools.js` | Standalone engine (`generateFunctionAssignments`) for carving BAG/DFO pools and assigning operational duties during line generation. |
| `lines-table` | `modules/lines-table/` | `#tab-lines`<br>`[F2] LINES` | `modules/lines-table/index.js`<br>`modules/lines-table/panel.html`<br>`modules/lines-table/src/LinesTable.svelte` | Renders virtualized bid-line table (Svelte 4 island using TanStack Virtual) with filtering, cell toggles, and Excel export. |
| `coverage` | `modules/coverage/` | `#tab-coverage`<br>`[F3] COVERAGE` | `modules/coverage/index.js`<br>`modules/coverage/panel.html`<br>`modules/coverage/components/cuts.js` | Renders 30-minute headcount heatmap matrix, shift mix summary, and manages weekday coverage cut rules. |
| `reports` | `modules/reports/` | `#tab-reports`<br>`#report-sub-management` | `modules/reports/index.js`<br>`modules/reports/management.html`<br>`modules/reports/lib/mgmt.js` | Renders Reports tab shell, executive management summary dashboard, gender mix metrics, and checkpoint capacity math. |
| `team-builder` | `modules/team-builder/` | `#tab-teams`<br>`#report-sub-cohesion` | `modules/team-builder/index.js`<br>`modules/team-builder/panel.html`<br>`modules/team-builder/docks.html` | Groups bid lines into balanced teams by RDO pattern, provides drag-and-drop team boards, and renders Team Cohesion report sub-tab. |
| `demand-capacity` | `modules/demand-capacity/` | `#report-sub-demand` | `modules/demand-capacity/index.js`<br>`modules/demand-capacity/panel.html`<br>`modules/demand-capacity/parse.js` | Parses flight volume `.xlsx` schedules and renders passenger demand vs TSO/LTSO staffing capacity chart. |
| `bid-planner` | `modules/bid-planner/` | `#tab-bid-planner`<br>`BID PLANNER` | `modules/bid-planner/index.js`<br>`modules/bid-planner/panel.html`<br>`modules/bid-planner/js/engine.js` | Calculates deterministic bid milestone date schedules (Leave Bids / Shift Bids) based on rules and calendar constraints. |

---

## 4. Host Script Inventory (`js/`)

Host scripts in `js/` provide core runtime primitives and chrome functionality:

| File Path | Active Status | Code Purpose |
| :--- | :--- | :--- |
| `js/constants.js` | **Active** | Defines global enums (`window.Scheduler.ROLES`, `DAYS`, `SEXES`, `SLOT_MINUTES`). |
| `js/utils.js` | **Active** | Provides cross-module utility functions (`S.$`, `S.timeToMin`, `S.slotLabel`). |
| `js/utils/theme.js` | **Active** | Handles theme switching (Dark / Presentation mode). |
| `js/io.js` | **Active** | Implements session JSON import/export (`S.exportState`, `S.importState`) and Excel export (`S.exportExcel`). |
| `js/instructions.js` | **Active** | Contains Markdown text content for user help modal. |
| `js/main.js` | **Active** | Initializes `window.Scheduler` runtime state object, manages tab switching (`S.switchTab`), and attaches help modal listeners. |
| `js/console-chrome.js` | **Active** | Updates console status bar headers and footers. |
| `js/intro.js` | **Active** | Controls retro splash overlay animation on initial boot. |

**Absorbed / Removed Legacy Feature Scripts:** Legacy feature scripts (`allocation.js`, `capacity.js`, `export-board.js`, `line-colors.js`, `lines-row-model.js`, `modset-board.js`, `reports.js`, `rotation-join.js`, `schedule.js`, `shifts.js`, `functions.js`) were removed from `js/` and absorbed into their respective owner modules under `modules/`.

---

## 5. End-to-End Implemented Data Flow

```
[ Setup Panel UI ] ──► Click [GEN] GENERATE ──► S.generate() (setup-panel/lib/generate.js)
                                                      │
                                                      ▼
                              S.generateFunctionAssignments() (function-coverage/lib/assign.js)
                                                      │
                                                      ▼
                                   window.Scheduler.state (Shared Store)
                                                      │
         ┌────────────────────────────────────────────┼────────────────────────────────────────────┐
         ▼                                            ▼                                            ▼
S.getLineRowModels()                       S.renderCoverageBars()                        Team Builder
(shared/lib/lines.js)                      (coverage/index.js)                          (team-builder/index.js)
         │                                            │                                            │
         ▼                                            ▼                                            ▼
LinesTable.svelte                          30-min Heatmap Matrix                       RDO Auto-Formation &
(lines-table/src/LinesTable.svelte)        & Shift Mix                                 Drag-Drop Boards
```

1. **Schedule Generation:** User triggers generation in Setup panel (`modules/setup-panel/panel.html`). `modules/setup-panel/lib/generate.js` executes `S.generate()`, populating `window.Scheduler.state.lines` and `window.Scheduler.state.schedule`.
2. **Function Duty Pass:** `S.generate()` calls `S.generateFunctionAssignments()` (`modules/function-coverage/lib/assign.js`), populating `window.Scheduler.state.functionRotation` with BAG/DFO/PAX duty assignments.
3. **Row Model Extraction:** `modules/lines-table/row-model.js` calls `S.getLineRowModels()` (`modules/shared/lib/lines.js`) to produce sorted and filtered line row models from `window.Scheduler.state`.
4. **Lines Grid Rendering:** `modules/lines-table/index.js` listens for `lines:request-render` CustomEvents and updates the Svelte virtual table (`modules/lines-table/src/LinesTable.svelte`). Day toggles dispatch `lines:day-toggle`, mutating `window.Scheduler.state.schedule`.
5. **Coverage & Analytics:**
   - `modules/coverage/index.js` calls `S.renderCoverageBars()` to render the 30-minute headcount heatmap matrix from `window.Scheduler.state`.
   - `modules/reports/lib/mgmt.js` reads `window.Scheduler.state` to render management metrics and gender mix charts.
   - `modules/team-builder/index.js` reads `window.Scheduler.state` lines to group schedule lines by RDO pattern into team boards.
6. **Session File I/O:** `js/io.js` serializes `window.Scheduler.state` into JSON for export (`S.exportState`) or imports state (`S.importState`).

---

## 6. Build & Deployment Pipeline

*   **Vite Module Build Script:** `package.json` defines `"build:modules"`, which executes per-module Vite configurations (`vite.<module-name>.config.mjs`) for all 9 modules (`shared`, `setup-panel`, `coverage`, `team-builder`, `reports`, `demand-capacity`, `lines-table`, `function-coverage`, `bid-planner`).
*   **Distribution Output:** Each build produces a single-file ESM bundle in `modules/<module-name>/dist/<module-name>.js`. Compiled `dist/` directories are git-ignored (`.gitignore`).
*   **GitHub Actions Workflow:** `.github/workflows/pages.yml` triggers on pushes to `bright-garden`. It executes `npm install` and `npm run build:modules`, assembling and deploying the site artifact to GitHub Pages.

---

## 7. Documentation Cleanup Note

All speculative architecture terminology ("Schedule Builder" tab rename, "brains / action / report" categorization, "classed FTE framework", "FC as Setup submodule", "desired Lines editable table", "manifest-driven feature-modular monolith") has been removed or quarantined. This document reflects **only** current file paths, actual code structures, and implemented behaviors on `bright-garden`.
