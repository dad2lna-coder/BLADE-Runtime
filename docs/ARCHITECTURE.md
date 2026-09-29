# BLADE Alpha — System Architecture & Component Map

BLADE (Browser-based Local Airport Duty Engine) Alpha is an offline-first browser and desktop application designed for airport security staffing scheduling (TSO, LTSO, STSO bid lines). Running entirely client-side without external server dependencies, BLADE generates balanced work shift schedules, assigns operational function duties (Baggage, Passenger, DFO), builds RDO-matched team structures, and provides demand-versus-capacity analytics while keeping session data strictly local.

---

## 1. Locked Architecture Paradigm

BLADE uses a **manifest-driven feature-modular monolith** architecture based on vertical slices:

*   **App Style:** Manifest-driven feature-modular monolith with vertical feature slices (not microfrontends).
*   **Host Shell:** A thin host (`index.html` + `js/` shell runtime) that acts as a renderer/loader. It mounts DOM panels defined in `modules/manifest.json` and dynamically imports Vite-compiled single-file ESM bundles into tab slots.
*   **Modular Storage:** Feature code resides in isolated feature folders under `modules/<feature>/`.
*   **Shared State:** A single runtime store (`window.Scheduler`) holds active schedule state, state mutation methods, event hooks, and session import/export capabilities (`js/io.js`).

---

## 2. Core Functional Relationships (Brains · Action · Report)

BLADE's features fall into three functional roles:

```
                  ┌─────────────────────────────────────────┐
                  │                 BRAINS                  │
                  │   Schedule Builder (Setup & FC Engine)  │
                  │   - FTE, Certs, Shifts, Allocation      │
                  │   - Function Duty Coverage Engine       │
                  └────────────────────┬────────────────────┘
                                       │
                                       ▼ (Generates state)
                  ┌─────────────────────────────────────────┐
                  │                 ACTION                  │
                  │              Lines Surface              │
                  │   - Virtualized Bid Lines               │
                  │   - Schedule Edits & Excel Export       │
                  └────────────────────┬────────────────────┘
                                       │
                                       ▼ (Reads state)
                  ┌─────────────────────────────────────────┐
                  │                 REPORT                  │
                  │           Coverage & Reports            │
                  │   - Headcount Heatmaps & Shift Mix      │
                  │   - Management & Team Dashboards        │
                  │   - Flight Demand vs Capacity           │
                  └─────────────────────────────────────────┘
```

*   **Brains (Schedule Builder & Engine):** Today represented by `setup-panel` (Setup tab) and `function-coverage`. Computes staffing allocation, classed FTE, function duty coverage (BAG / DFO / PAX), shift forces, and certifications.
*   **Action (Lines):** Represented by `lines-table`. Functions as the interactive, editable schedule surface displaying lines, duty assignments, and RDO patterns.
*   **Report (Visualization & Analytics):** Represented by `coverage`, `reports`, `team-builder`, and `demand-capacity`. Renders 30-minute headcount heatmaps, management dashboards, team cohesion metrics, and flight volume overlays.

---

## 3. High-Level Architecture & Boot Flow

```
+-------------------------------------------------------------------------------+
|                               HOST SHELL                                      |
|  index.html  +  js/main.js  +  js/io.js  +  js/constants.js  +  js/utils.js    |
+--------------------------------------┬----------------------------------------+
                                       |
                   Reads Manifest      v
                       +-------------------------------+
                       |    modules/manifest.json      |
                       +---------------+---------------+
                                       |
                   Mounts HTML &       v
                Imports ESM Bundles    |
      +--------------------------------+--------------------------------+
      |                                |                                |
      v                                v                                v
+--------------------------+ +--------------------------+ +--------------------------+
|  modules/setup-panel/    | |  modules/lines-table/    | |    modules/coverage/     |
|   dist/setup-panel.js    | |   dist/lines-table.js    | |     dist/coverage.js     |
+------------+-------------+ +------------+-------------+ +------------+-------------+
             |                            |                            |
             +----------------------------+----------------------------+
                                          |
                               Mutates & Reads State
                                          v
                         +---------------------------------+
                         |     SHARED RUNTIME STATE        |
                         |       window.Scheduler          |
                         +---------------------------------+
```

### System Boot Lifecycle

1. **Shell Initialization:** `index.html` loads vendor libraries (`Sortable`, `luxon`, `ExcelJS`) and thin host shell scripts (`js/constants.js`, `js/utils.js`, `js/io.js`, `js/main.js`).
2. **Manifest Loading:** Host shell fetches `modules/manifest.json`.
3. **DOM Mounting:** Host injects panel HTML templates into target `#tab-*` and `#report-sub-*` DOM elements.
4. **Module Bundle Execution:** Host dynamically imports each module's Vite-built ESM entry point (`modules/<name>/dist/<name>.js`).
5. **Runtime Registration:** Each module calls its initializer (`init*(Scheduler)`), connecting event hooks to the single shared `window.Scheduler` state store.

---

## 4. Complete Module Inventory

Every feature module lives under `modules/<feature>/` and is listed in `modules/manifest.json`:

| Module Folder | Tab / Mount Target | Role | One-Line Purpose |
| :--- | :--- | :--- | :--- |
| `modules/shared/` | Shared host infrastructure | Other (Shared Utilities) | Provides shared date, DOM, line row model helpers, and shell chrome utilities. |
| `modules/setup-panel/` | `#tab-setup`<br>`[F1] SETUP` | **Brains** (Schedule Builder) | Manages staffing FTE, shift forces, function pools, and executes schedule generation. |
| `modules/function-coverage/` | Engine service (Setup hook) | **Brains** (Setup Submodule) | Engine that assigns operational function duties (BAG/DFO/PAX) across shifts during line generation. |
| `modules/lines-table/` | `#tab-lines`<br>`[F2] LINES` | **Action** (Lines) | Renders virtualized bid line table (Svelte 4 island) with filtering, cell toggles, and Excel export. |
| `modules/coverage/` | `#tab-coverage`<br>`[F3] COVERAGE` | **Report** (Coverage) | Renders 30-minute headcount heatmaps, shift mix distributions, and weekday coverage cuts. |
| `modules/reports/` | `#tab-reports`<br>`#report-sub-management` | **Report** (Reports) | Displays management dashboards, gender equity ratios, and checkpoint capacity calculations. |
| `modules/team-builder/` | `#tab-teams`<br>`#report-sub-cohesion` | **Action / Report** (Teams) | Groups bid lines into balanced teams by RDO, with drag-and-drop boards and cohesion analysis. |
| `modules/demand-capacity/` | `#report-sub-demand` | **Report** (Demand) | Parses flight volume `.xlsx` schedules and overlays passenger demand against staffing capacity. |
| `modules/bid-planner/` | `#tab-bid-planner`<br>`BID PLANNER` | **Action / Other** (Bid Planning) | Calculates deterministic leave/shift bid milestone date schedules based on rules and calendar constraints. |

---

## 5. End-to-End Data Flow

```
[ Setup / Schedule Builder ]
        │
        │ 1. Configure FTE, shifts, BAG/DFO function pools
        ▼
[ [GEN] GENERATE Pass ] ──► Calls Function Coverage Engine
        │
        │ 2. Populates window.Scheduler.state (lines, schedule, duties)
        ▼
[ Shared State: window.Scheduler ]
        │
        ├───────────────────────┼───────────────────────┐
        │ 3. Fetch Row Models   │ 4. Read Schedule      │ 5. Read Lines & RDOs
        ▼                       ▼                       ▼
[ Lines Table (Action) ]  [ Coverage Heatmap ]    [ Team Builder ]
  - Virtualized view        - 30-min headcount      - RDO auto-form
  - Inline edits / toggles  - Shift mix & cuts      - Drag-drop boards
  - Export Excel (.xlsx)    - Demand overlay        - Cohesion report
```

1. **Setup Configuration:** User configures operating period, staffing FTE by role/sex, BAG/DFO function pools, and shift definitions in `setup-panel`.
2. **Generation Pass:** Clicking `[GEN] GENERATE` invokes the schedule generation engine and `function-coverage` module, carving BAG and DFO duties while assigning remaining operational shifts to PAX. Resulting lines and schedule grids are written directly to `window.Scheduler.state`.
3. **Action Surface:** `lines-table` calls `S.getLineRowModels()` to obtain filtered/sorted rows and renders the virtualized bid grid. Edits and cell toggles update `window.Scheduler.state` and trigger refresh events.
4. **Reports & Analytics:** `coverage`, `reports`, `team-builder`, and `demand-capacity` read updated state from `window.Scheduler.state` to render headcount heatmaps, executive metrics, team structures, and flight capacity charts.
5. **Session Persistence:** Full session state is exported/imported as JSON via `js/io.js`.

---

## 6. Build & Deployment Pipeline

*   **Vite Module Builds:** Each module possesses a dedicated Vite configuration (`vite.<module-name>.config.mjs`). Executing `npm run build:modules` compiles each module source into a standalone, single-file ESM dist bundle (`modules/<module-name>/dist/<module-name>.js`).
*   **Git Tracking:** Built distribution artifacts (`dist/*.js`) are git-ignored to keep commits clean.
*   **GitHub Pages Deployment:** The deployment workflow (`.github/workflows/pages.yml`) runs on pushes to `bright-garden`. It executes `npm install` and `npm run build:modules` to compile all Vite bundles before deploying the site to GitHub Pages.

---

## 7. Current vs. Desired Architecture Summary

| Architectural Area | Current State (BLADE v0.2) | Desired Target State |
| :--- | :--- | :--- |
| **Schedule Builder Title** | Module directory and UI tab named **Setup** (`setup-panel`). | Rename UI tab and module concept to **Schedule Builder**. |
| **Function Coverage Position** | Lives in a top-level folder (`modules/function-coverage/`). | Integrate directly as a **Setup submodule** inside Schedule Builder (`modules/setup-panel/submodules/function-coverage/`). |
| **Staffing & FTE Modeling** | Basic headcount by FT/PT TSO, LTSO, and STSO. | Full **classed FTE** modeling with position-based certifications and skills tracking. |
| **Lines Interface** | Virtualized table (Svelte island) with basic cell toggles. | Fully **editable schedule surface** with rich inline editing, bulk cell operations, and real-time validation. |
| **Coverage View Alignment** | Operates as a top-level tab (`[F3] COVERAGE`). | Re-align Coverage visualization as a dedicated **Report sub-tab** within the Reports dashboard. |
