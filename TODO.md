# BLADE Runtime Migration

## Current Phase

### Phase 1: Verification
- [x] Perform read-only architecture audit
- [x] Review audit findings
- [x] Identify confirmed architectural defects
- [x] Fix only confirmed defects
- [x] Rebuild all modules
- [x] Run available tests
- [x] Perform runtime smoke test

### Phase 2: Runtime Separation
- [x] Verify Runtime is the sole module orchestrator
- [x] Verify dependency initialization order
- [x] Verify runtime contracts
- [x] Reduce hidden window.Scheduler dependencies
- [x] Verify runtime-driven tabs
- [x] Verify runtime-driven F-keys
- [x] Verify optional module loading
- [x] Verify modules can be added or removed without Runtime source changes

### Phase 3: Compatibility Reduction
- [x] Identify remaining legacy Scheduler consumers
- [x] Migrate consumers through runtime contracts or adapters
- [x] Remove obsolete compatibility paths only after verification
- [x] Confirm Runtime contains no BLADE business logic

## Known Areas To Verify

- [x] Runtime and index.html may both be loading/initializing modules
- [x] Runtime contracts may duplicate existing Scheduler state
- [x] Dependency sorting may not actually enforce initialization order
- [x] Tabs may still be generated outside Runtime
- [x] F-key registration may not be connected to actual behavior
- [x] window.Scheduler may still be a hidden shared-state dependency
- [x] ThemeState may not preserve existing theme behavior

## Operating Rules

- Runtime must remain generic.
- Business logic belongs in modules.
- Do not modify BLADE_Alpha from this repository.
- One architectural change at a time.
- Do not refactor without evidence.
- Preserve working legacy behavior during migration.
- Do not remove compatibility layers until their consumers are migrated.
- Do not mark an item complete merely because code was written.
- Verification requires evidence.
- Do not automatically advance to the next phase.

## Agent Rules

After completing a requested task:
1. Update this TODO.md.
2. Check off only work that was actually completed and verified.
3. Print the remaining unchecked items.
4. Stop.

## Active Tasks

- [x] Make Runtime self-contained by ensuring S is always initialized (completed)
- [x] Review and clean up irrelevant files from context (completed)
- [x] Run verification tests for Runtime changes (completed)

## Completed Changes

- `js/runtime.js`: Added `initCoreSchedulerAPIs()` to ensure `S.switchTab`, `S.renderAll`, `S.switchReportSub`, and `S.state` exist before any module loads.
- `index.html`: Removed module loading loop from the inline module script; it now only builds tab/report UI from manifest. Module loading is exclusively handled by `js/runtime.js`.

# Discord Watcher Test
