# Blade Team Builder

A standalone Svelte plugin that replaces Blade's old team-forming stack
(`js/teams.js`, `js/team-build.js`, `js/team-form-smart.js`,
`js/team-flags.js`, `js/team-close.js`) with one clean, typed, dependency-free
component. It ships two ways:

- **As a Svelte component** (`import { TeamBuilder } from "@blade/team-builder"`)
  for embedding inside another Svelte/SvelteKit app.
- **As a self-contained custom element** (`<blade-team-builder>`) for
  dropping straight into Blade's existing vanilla-JS/HTML page — no build
  step, no shared globals, no SortableJS.

## Why this exists

The source docs (`Blade.docx`, `Team_Builder.docx`) turned out to contain
**four overlapping copies** of the team-forming module pasted at different
revision points, plus three small patch files layered on top. Reconciling
them required figuring out which code actually wins at runtime. Blade's
`index.html` loads scripts in this order:

```
js/teams.js          <- oldest branch (AM/PM lock groups)
js/team-build.js     <- overwrites nearly every function above with the
                         "Follow Me" floating-dock + drag/drop branch
...
js/team-form-smart.js <- overwrites autoFormTeams() again, with a smarter
                          start-window + partial-RDO + opposite-sex algorithm
js/team-flags.js      <- adds the oddity banner, wraps renderTeams()
js/team-close.js      <- adds a global click handler to close the docks
```

Because later `<script>` tags overwrite same-named functions on the shared
`window.Scheduler` object, **`team-build.js`'s "Follow Me" branch is what
actually runs in production today**, not `teams.js`'s AM/PM-lock branch
(that code is dead — fully shadowed). This plugin implements the
`team-build.js` branch, with `team-form-smart.js`'s algorithm as the one and
only auto-form implementation, plus the oddity banner and RDO rebalancer.
The AM/PM-lock/"details" grouping and the old exact-match auto-form were
**not** ported — they were unreachable dead code in the source.

## What changed vs. the original

- No `window.Scheduler` global, no DOM `querySelector` hacks, no
  monkey-patching `S.renderAll`/`S.generate`. The plugin takes `lines` and
  `shifts` as props and emits `teamschange` / `status` / `rdoswap` events —
  see **Integration** below.
- No SortableJS dependency. Drag-and-drop is native HTML5 DnD (`src/lib/actions/dnd.ts`).
- No manual mousedown/touchmove math for the floating docks. Dragging them
  is one small Pointer Events action (`src/lib/actions/floatPanel.ts`).
- The four duplicated copies of the module collapse into one set of pure,
  unit-testable functions in `src/lib/utils/`, backing a single Svelte store
  (`src/lib/stores/teamBuilderStore.ts`) instead of ~15 mutable globals.
- The "Assignment" stats panel is always visible in the main layout (not
  only inside the Follow-Me dock, which is where the original hid it) — it
  also still docks when you pin a team, matching the original's intent.

## File structure

```
blade-team-builder/
  package.json
  tsconfig.json
  vite.config.js            # library build (plain Svelte component + utils)
  vite.element.config.js    # custom-element build (<blade-team-builder>)
  index.html                # dev harness
  src/
    main.ts                 # dev harness entry (sample data)
    lib/
      index.ts              # public library exports
      element.ts            # custom-element registration entry
      types.ts               # Line, Shift, Team, PoolEntry, etc.
      utils/
        time.ts             # timeToMin / minToLabel / padNum
        phase.ts            # Opening/AM/PM/Closing dynamic-anchor logic
        pool.ts             # Line[] -> PoolEntry[], filtering, grouping
        team.ts             # team CRUD, member counts, oddity flags
        autoForm.ts         # smart auto-form + RDO sex-rebalancer
      stores/
        teamBuilderStore.ts # the one reactive store everything reads from
      actions/
        dnd.ts              # draggableCard / dropZone (native HTML5 DnD)
        floatPanel.ts       # drag-to-move floating panel (Pointer Events)
      components/
        TeamBuilder.svelte      # root component / custom element
        TeamFilters.svelte
        UnassignedPool.svelte
        LineCard.svelte
        TeamBoard.svelte
        TeamBoards.svelte
        TeamStats.svelte
        OddityBanner.svelte
        AutoFormControls.svelte
        FollowMeDock.svelte
      styles/
        team-builder.css    # all shared visual primitives, themeable via CSS vars
```

## Build

```bash
npm install
npm run build
```

Produces in `dist/`:

- `blade-team-builder.js` (+`.css`) — the plain library build.
- `blade-team-builder-element.js` — the custom-element bundle (Svelte
  runtime included, nothing external required).

## Integration into Blade (custom element)

```html
<!-- index.html, in place of the old teams.js / team-build.js / etc. script tags -->
<link rel="stylesheet" href="js/plugins/blade-team-builder-element.css" />
<script type="module" src="js/plugins/blade-team-builder-element.js"></script>

<!-- in place of <section class="panel" id="tab-teams">...</section> -->
<section class="panel" id="tab-teams">
  <blade-team-builder id="team-builder"></blade-team-builder>
</section>
```

```js
// wherever Blade currently calls S.initTeams() / S.renderTeams()
const el = document.getElementById("team-builder");

function syncTeamBuilder() {
  el.lines = S.state.lines;
  el.shifts = S.state.shifts;
  el.weekCount = S.state.weekCount;
  el.phaseThresholdMin = (S.state.functionCoverage && S.state.functionCoverage.phaseThresholdMin) || 15;
}
syncTeamBuilder();

// call syncTeamBuilder() again after S.generate() / S.readShiftsFromDom()

el.addEventListener("teamschange", (e) => {
  S.teamsSnapshot = e.detail.teams; // persist however Blade currently persists teams
});
el.addEventListener("status", (e) => S.updateStatus && S.updateStatus(e.detail.message));
el.addEventListener("rdoswap", (e) => {
  // e.detail.swaps: { lineIdA, lineIdB, rdoDaysA, rdoDaysB }[]
  e.detail.swaps.forEach(({ lineIdA, lineIdB, rdoDaysA, rdoDaysB }) => {
    const a = S.state.lines.find((l) => l.id === lineIdA);
    const b = S.state.lines.find((l) => l.id === lineIdB);
    if (a) a.rdoDays = rdoDaysA;
    if (b) b.rdoDays = rdoDaysB;
    const days = S.state.weekCount * 7;
    if (a) S.state.schedule[a.id] = S.buildScheduleForLine(a, days);
    if (b) S.state.schedule[b.id] = S.buildScheduleForLine(b, days);
  });
  S.renderAll && S.renderAll();
});
```

Theming: set any of the CSS variables from `styles/team-builder.css`
(`--tb-amber`, `--tb-card-bg`, `--tb-border`, ...) on `blade-team-builder`
or an ancestor to match Blade's console skin.

## Integration as a Svelte component

```svelte
<script>
  import { TeamBuilder } from "@blade/team-builder";
  import "@blade/team-builder/style.css";
  let lines = [...];
  let shifts = [...];
</script>

<TeamBuilder
  {lines}
  {shifts}
  weekCount={1}
  on:teamschange={(e) => console.log(e.detail.teams)}
  on:status={(e) => console.log(e.detail.message)}
  on:rdoswap={(e) => applySwaps(e.detail.swaps)}
/>
```

## Notes / open items

- `rebalanceRdoBySex` only decides *which* two lines should swap RDO
  patterns and returns that as data (`RdoSwap[]`). It intentionally does not
  regenerate `WORK`/`RDO` calendars itself, since that requires Blade's
  `dayjs`-based `buildScheduleForLine`, which lives outside this plugin's
  scope. The host applies the swap and rebuilds those two lines' schedules
  (see the event handler above).
- Team **locking** and the AM/PM `<details>` grouping from the shadowed
  `teams.js` branch were left out as dead code (see "Why this exists"). If
  you actually want either of those revived on top of the Follow-Me branch,
  say so and they're a small addition to `Team.ts` / `TeamBoard.svelte`.
