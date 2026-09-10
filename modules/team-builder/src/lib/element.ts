/**
 * Side-effect entry point for the standalone custom-element build.
 *
 * Importing this file registers `<blade-team-builder>` with
 * `customElements.define(...)`. Drop the built bundle into Blade's
 * index.html:
 *
 *   <script type="module" src="js/plugins/blade-team-builder-element.js"></script>
 *   <blade-team-builder id="team-builder"></blade-team-builder>
 *
 * Then feed it data and listen for changes from plain JS/DOM code:
 *
 *   const el = document.getElementById("team-builder");
 *   el.lines = currentLines;      // Line[]
 *   el.shifts = currentShifts;    // Shift[]
 *   el.weekCount = state.weekCount;
 *   el.addEventListener("teamschange", (e) => saveTeams(e.detail.teams));
 *   el.addEventListener("status", (e) => S.updateStatus(e.detail.message));
 *   el.addEventListener("rdoswap", (e) => applyRdoSwaps(e.detail.swaps));
 *
 * No other script tags, globals, or stylesheets are required - the CSS is
 * bundled into this same file's companion .css output.
 */
import TeamBuilder from "./components/TeamBuilder.svelte";

// Re-exported so a host that imports this module directly (rather than via
// a bare <script> tag) can still get at the underlying custom-element class
// if it ever needs to, e.g. `customElements.get("blade-team-builder")`.
export default TeamBuilder;
