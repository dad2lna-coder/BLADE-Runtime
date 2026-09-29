# BLADE_Alpha

**Offline staffing scheduler.**

BLADE Alpha builds airport security bid lines (TSO / LTSO / STSO) in the browser. Core scheduling stays local. Tab panels load as ES modules from `modules/manifest.json`, so use a local server or the GitHub Pages demo rather than a raw `file://` open.

[![GitHub Pages](https://img.shields.io/badge/live-GitHub%20Pages-blue?logo=github)](https://dad2lna-coder.github.io/BLADE_Alpha/)
![Built with](https://img.shields.io/badge/built%20with-HTML%2FJS%2FCSS%20%2B%20modules-orange)

---

## Quick Start

### Run locally

```bash
git clone https://github.com/dad2lna-coder/BLADE_Alpha.git
cd BLADE_Alpha
git checkout bright-garden
npm install
npm run build:modules
python3 -m http.server 8000
# open http://localhost:8000
```

Classic scripts also run if you double-click `index.html`, but tab modules mount from `modules/manifest.json` dist entries and need HTTP.

### Live demo

https://dad2lna-coder.github.io/BLADE_Alpha/

That URL is GitHub Pages from **bright-garden** (see `.github/workflows/pages.yml`). GitHub Actions automatically builds all Vite module bundles via `npm run build:modules` on deploy.

---

## Features

### Tab workflow

| Tab | Purpose |
| --- | --- |
| **[F1] Setup** | Weeks, FTE by role/sex, BAG + DFO pools, shifts, Generate |
| **[F2] Lines** | Virtualized bid-line table (Svelte island); Excel export |
| **[F3] Coverage** | 30-minute headcount matrix, coverage cuts, shift mix |
| **[F4] Reports** | Passenger / bag-DFO / total / pool dashboards & capacity math |
| **[F5] Teams** | Architecture, auto-form by RDO, drag-drop boards |
| **[F6] Capacity** | Checkpoint lane demand & mod-set board |
| **[F7] Demand** | Import flight-volume xlsx vs PAX staffing capacity |

### Core capabilities

- Generate balanced lines from shift force + FTE, with RDO patterns and gender balance
- Function duties (BAG / DFO / PAX) assigned in the same **[GEN] GENERATE** pass
- Team auto-form by RDO; unassigned pool + AM/PM boards
- JSON import/export of the full session; Excel export of lines
- Optional volume vs capacity overlay on Demand
- Airfield modal for airport hours, terminals, checkpoints

---

## Architecture

The host shell (`index.html` + thin `js/` runtime) acts as a renderer that fetches `modules/manifest.json`, mounts DOM panel slots, and dynamically imports Vite ESM bundles into the page. Feature modules interact with a single shared runtime state object (`window.Scheduler`).

For the canonical system architecture map, module inventory, data flow, and runtime contracts, see:
👉 **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**

For technical runtime script inventories and test procedures, see [DEPENDENCY_MAP.md](DEPENDENCY_MAP.md).

---

## Development

### Commands

```bash
npm install
npm run build:modules            # Builds Vite ESM dists for all modules
npm run test:function-coverage  # Run function coverage engine test
npm run test:demand-capacity     # Run demand parser test
node test-task1.js              # Run lines row model test
```

---

## License & Support

https://dad2lna-coder.github.io/BLADE_Alpha/

**v0.2 · bright-garden · docs synced Sep 2026**
