// ===========================
// CALCULATOR — INIT
// DOM event binding & orchestration.
// Wires UI reads → core logic → UI writes.
// ===========================

import { calcBuilding, calcSlab } from "./core.js";
import {
  readBuildingInputs,
  readSlabInputs,
  displayBuildingResults,
  displaySlabResults,
  resetForm,
  syncLaborToggle,
} from "./ui.js";
import {
  validateBuildingInputs,
  validateSlabInputs,
} from "../../utils/validation.js";
import { byId } from "../../utils/dom.js";

// ===========================
// PUBLIC ACTIONS
// (called from HTML onclick attrs or event listeners)
// ===========================

/**
 * Read inputs → validate → calculate → display building estimate.
 */
export function runBuildingCalc() {
  const inputs = readBuildingInputs();
  if (!validateBuildingInputs(inputs.area, inputs.rate)) return;

  const results = calcBuilding(inputs);
  displayBuildingResults(results);
}

/**
 * Read inputs → validate → calculate → display slab estimate.
 */
export function runSlabCalc() {
  const { slabArea, slabThickness } = readSlabInputs();
  if (!validateSlabInputs(slabArea, slabThickness)) return;

  const results = calcSlab(slabArea, slabThickness);
  displaySlabResults(results);
}

/**
 * Reset the entire form (proxies ui.resetForm).
 */
export { resetForm };

/**
 * Sync labor toggle visibility (proxies ui.syncLaborToggle).
 * Called by the HTML onchange attribute on the checkbox.
 */
export { syncLaborToggle };

// ===========================
// INITIALISATION
// ===========================

/**
 * Boot the calculator page.
 * Called once when the DOM is ready.
 */
export function initCalculator() {
  // Guard — only run on the calculator page
  if (!document.querySelector(".calc-page")) return;

  // Initial toggle sync
  syncLaborToggle();

  // Enter-key shortcuts for main inputs
  ["area", "rate"].forEach((id) => {
    byId(id)?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") runBuildingCalc();
    });
  });

  // Enter-key shortcuts for slab inputs
  ["slabArea", "slabThickness"].forEach((id) => {
    byId(id)?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") runSlabCalc();
    });
  });

  // Expose to global scope for HTML onclick attributes
  window.calculateBuilding = runBuildingCalc;
  window.calculateSlab = runSlabCalc;
  window.resetForm = resetForm;
  window.toggleLaborInput = syncLaborToggle;
  window.updateFinishingCost = () => {}; // no-op kept for HTML compat

  console.log(
    "%c🧮 Calculator Ready",
    "color: #1a3a52; font-size: 13px; font-weight: bold;",
  );
}
