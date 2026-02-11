// ===========================
// CALCULATOR — UI
// All DOM reads and result display.
// Reads form inputs → passes to core.js.
// Writes results back to the DOM.
// ===========================

import { byId, show, hide } from "../../utils/dom.js";
import {
  formatCurrency,
  formatNumber,
  safeFloat,
} from "../../utils/helpers.js";
import { CALCULATOR_DEFAULTS } from "../../config/constants.js";

// ===========================
// READ FORM VALUES
// ===========================

/**
 * Collect all building-calculator input values from the DOM.
 * Returns a plain object ready to pass to calcBuilding().
 */
export function readBuildingInputs() {
  return {
    area: safeFloat(byId("area")?.value, 0),
    rate: safeFloat(byId("rate")?.value, 0),
    laborAuto: byId("laborAuto")?.checked ?? true,
    laborPercent: safeFloat(
      byId("laborPercent")?.value,
      CALCULATOR_DEFAULTS.laborPercent,
    ),
    laborManual: safeFloat(byId("laborManual")?.value, 0),
    finishingQuality:
      byId("finishingQuality")?.value ?? CALCULATOR_DEFAULTS.finishingQuality,
    contingency: safeFloat(
      byId("contingency")?.value,
      CALCULATOR_DEFAULTS.contingency,
    ),
    materialRates: {
      cement: byId("cementRate")?.value || "",
      steel: byId("steelRate")?.value || "",
      sand: byId("sandRate")?.value || "",
      aggregate: byId("aggregateRate")?.value || "",
    },
  };
}

/**
 * Collect slab calculator inputs from the DOM.
 */
export function readSlabInputs() {
  return {
    slabArea: safeFloat(byId("slabArea")?.value, 0),
    slabThickness: safeFloat(
      byId("slabThickness")?.value,
      CALCULATOR_DEFAULTS.slabThickness,
    ),
  };
}

// ===========================
// DISPLAY RESULTS
// ===========================

/**
 * Write building estimate results to the DOM.
 * @param {Object} results — returned by calcBuilding()
 */
export function displayBuildingResults(results) {
  _setText("totalCost", formatCurrency(results.totalCost));
  _setText("displayMaterialCost", formatCurrency(results.materialCost));
  _setText("displayLaborCost", formatCurrency(results.laborCost));
  _setText("displayFinishingCost", formatCurrency(results.finishingCost));
  _setText("displayContingency", formatCurrency(results.contingencyCost));

  _setText("cement", `${formatNumber(results.materials.cement, 0)} bags`);
  _setText("steel", `${formatNumber(results.materials.steel, 0)} kg`);
  _setText("sand", `${formatNumber(results.materials.sand, 2)} m³`);
  _setText("aggregate", `${formatNumber(results.materials.aggregate, 2)} m³`);

  _setStatus("buildingStatus", "Calculated");

  // Scroll results into view on mobile
  if (window.innerWidth <= 768) {
    byId("buildingResults")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/**
 * Write slab estimate results to the DOM.
 * @param {Object} results — returned by calcSlab()
 */
export function displaySlabResults(results) {
  _setText("slabConcrete", `${formatNumber(results.concreteVolume, 2)} m³`);
  _setText("slabCement", `${formatNumber(results.cementRequired, 0)} bags`);
  _setText("slabSteel", `${formatNumber(results.steelRequired, 0)} kg`);

  _setStatus("slabStatus", "Calculated");

  if (window.innerWidth <= 768) {
    byId("slabResults")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ===========================
// RESET
// ===========================

/**
 * Reset the entire form and clear all result displays.
 */
export function resetForm() {
  const fields = {
    area: "",
    rate: "",
    laborPercent: CALCULATOR_DEFAULTS.laborPercent,
    laborManual: "",
    finishingQuality: CALCULATOR_DEFAULTS.finishingQuality,
    contingency: CALCULATOR_DEFAULTS.contingency,
    cementRate: "",
    steelRate: "",
    sandRate: "",
    aggregateRate: "",
    slabArea: "",
    slabThickness: CALCULATOR_DEFAULTS.slabThickness,
  };

  Object.entries(fields).forEach(([id, val]) => {
    const el = byId(id);
    if (el) el.value = val;
  });

  // Reset labor toggle
  const laborAuto = byId("laborAuto");
  if (laborAuto) {
    laborAuto.checked = true;
    syncLaborToggle();
  }

  _resetBuildingResults();
  _resetSlabResults();
}

// ===========================
// LABOR TOGGLE SYNC
// ===========================

/**
 * Show/hide the percent vs manual labor input based on checkbox state.
 */
export function syncLaborToggle() {
  const autoChecked = byId("laborAuto")?.checked ?? true;
  const percentInput = byId("laborPercent");
  const manualInput = byId("laborManual");
  const suffix = document.querySelector(".calc-input-suffix");

  if (autoChecked) {
    show(percentInput, "block");
    hide(manualInput);
    if (suffix) show(suffix, "block");
  } else {
    hide(percentInput);
    show(manualInput, "block");
    if (suffix) hide(suffix);
  }
}

// ===========================
// PRIVATE HELPERS
// ===========================

function _setText(id, text) {
  const el = byId(id);
  if (el) el.textContent = text;
}

function _setStatus(id, label) {
  const badge = byId(id);
  if (!badge) return;
  badge.textContent = label;
  badge.classList.add("calculated");
}

function _resetBuildingResults() {
  [
    "totalCost",
    "displayMaterialCost",
    "displayLaborCost",
    "displayFinishingCost",
    "displayContingency",
  ].forEach((id) => _setText(id, "₹ --"));
  ["cement", "steel", "sand", "aggregate"].forEach((id) => _setText(id, "--"));
  _resetStatus("buildingStatus");
}

function _resetSlabResults() {
  ["slabConcrete", "slabCement", "slabSteel"].forEach((id) =>
    _setText(id, "--"),
  );
  _resetStatus("slabStatus");
}

function _resetStatus(id) {
  const badge = byId(id);
  if (!badge) return;
  badge.textContent = "Pending";
  badge.classList.remove("calculated");
}
