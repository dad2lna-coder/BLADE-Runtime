blade-runtime/
  core/           # State store, event bus, module loader, service registry
  services/       # TimeService, DateService, ShiftService, ConfigService, PortService
  ui/             # Base component renderer, CSS var manager, modal manager
  utils/          # Only truly generic helpers (no domain logic)

modules/
  coverage/       # Pure coverage computation + render component (Svelte)
  demand-capacity/# Pure demand parsing + capacity math + charts (Svelte)
  function-coverage/ # Role eligibility engine + pools config (Svelte)
  setup-panel/    # Shift/airport/FTE config UI + validation (Svelte)
  lines/          # Line/team CRUD + schedule grid + export (Svelte, based on dist/lines-table.js)
  team-builder/   # Team composition + phase analysis (Svelte, consumes shift/coverage services)
  intro/          # Boot intro sequence (modular, configurable)
  console-chrome/ # Console chrome (clock, operator, export hooks) (modular)
