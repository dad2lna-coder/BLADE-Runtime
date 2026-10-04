/**
 * Event constants for BLADE Alpha - use these instead of string literals.
 * All events are CustomEvents dispatched to window.
 *
 * Usage:
 *   import { EVENTS, emitEvent, onEvent } from '.../shared/lib/events.js';
 *
 *   // Emit:
 *   emitEvent(EVENTS.LINES_REQUEST_RENDER, { source: 'generate' });
 *
 *   // Listen (returns a cleanup function):
 *   const off = onEvent(EVENTS.LINES_REQUEST_RENDER, (e) => { ... });
 *   // Later:
 *   off();
 */

/**
 * Emit a custom event to the global scope.
 * @param {string} eventName - The event name (must match EVENTS enum)
 * @param {*} [detail] - Optional payload data
 */
export function emitEvent(eventName, detail = null) {
  const event = new CustomEvent(eventName, { detail });
  window.dispatchEvent(event);
}

/**
 * Register an event listener.
 * @param {string} eventName - The event name to listen for
 * @param {Function} handler - The callback function to execute when event fires
 * @returns {Function} - A function to remove the listener
 */
export function onEvent(eventName, handler) {
  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
}

export const EVENTS = {
  // Core Lines Table Events
  LINES_REQUEST_RENDER: 'lines:request-render',
  LINES_INLINE_EDIT: 'lines:inline-edit',
  LINES_DAY_TOGGLE: 'lines:day-toggle',
  LINES_FILTER_CHANGE: 'lines:filter-change',
  LINES_SORT_CHANGE: 'lines:sort-change',
  LINES_COVERAGE_REFRESH: 'lines:coverage-refresh',
  LINES_SCROLL_INDEX: 'lines:scroll-index',
  LINES_EXPORT_XLSX: 'lines:export-xlsx',
  LINES_TEAM_FORMATION: 'lines:team-formation',
  LINES_TEAM_REBALANCE: 'lines:team-rebalance',

  // Setup Panel Events
  SETUP_GENERATE_START: 'setup:generate-start',
  SETUP_GENERATE_COMPLETE: 'setup:generate-complete',
  SETUP_ISSUES_DETECTED: 'setup:issues-detected',

  // Coverage Events
  COVERAGE_RECALC: 'coverage:recalc',

  // Team Builder Events
  TEAM_FORMATION_START: 'team:formation-start',
  TEAM_FORMATION_COMPLETE: 'team:formation-complete',
  TEAM_REBALANCE: 'team:rebalance',

  // Demand Capacity
  DEMAND_CAPACITY_UPDATE: 'demand:capacity-update',

  // General System Events
  SYSTEM_STATUS_UPDATE: 'system:status-update',
  SYSTEM_CLEAR_ALL: 'system:clear-all',
  SETUP_MOUNTED: 'setup:mounted',
  INSTRUCTIONS_SHOWN: 'instructions:shown'
};