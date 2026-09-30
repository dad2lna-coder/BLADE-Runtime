# BLADE Runtime Migration

## Current Phase

### Phase 1: Verification
- [ ] Perform read-only architecture audit
- [ ] Review audit findings
- [ ] Identify confirmed architectural defects
- [ ] Fix only confirmed defects
- [ ] Rebuild all modules
- [ ] Run available tests
- [ ] Perform runtime smoke test

### Phase 2: Runtime Separation
- [ ] Verify Runtime is the sole module orchestrator
- [ ] Verify dependency initialization order
- [ ] Verify runtime contracts
- [ ] Reduce hidden window.Scheduler dependencies
- [ ] Verify runtime-driven tabs
- [ ] Verify runtime-driven F-keys
- [ ] Verify optional module loading
- [ ] Verify modules can be added or removed without Runtime source changes

### Phase 3: Compatibility Reduction
- [ ] Identify remaining legacy Scheduler consumers
- [ ] Migrate consumers through runtime contracts or adapters
- [ ] Remove obsolete compatibility paths only after verification
- [ ] Confirm Runtime contains no BLADE business logic

## Known Areas To Verify

- [ ] Runtime and index.html may both be loading/initializing modules
- [ ] Runtime contracts may duplicate existing Scheduler state
- [ ] Dependency sorting may not actually enforce initialization order
- [ ] Tabs may still be generated outside Runtime
- [ ] F-key registration may not be connected to actual behavior
- [ ] window.Scheduler may still be a hidden shared-state dependency
- [ ] ThemeState may not preserve existing theme behavior

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

# Discord Watcher Test
