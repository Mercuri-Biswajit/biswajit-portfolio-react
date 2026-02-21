// ===========================
// CALCULATOR CORE LOGIC
// Building and slab calculation functions
// Used by the Advanced Calculator page.
//
// NOTE: safeFloat is imported from HomePage/helpers.js
// since the 3 calculator helpers live there now.
// If core.js ever needs to be fully decoupled, copy
// safeFloat inline or create a shared math-utils file.
// ===========================

import {
  DEFAULT_MATERIAL_RATES,
  FINISHING_RATES,
  SLAB_CONSTANTS,
  CONVERSIONS,
} from "../config/constants.js";

// Calculator-specific constants now live in HomePage
import { MATERIAL_CONSTANTS } from "../pages/HomePage/constants.js";

// safeFloat moved to HomePage helpers
import { safeFloat } from "../pages/HomePage/helpers.js";

/**
 * Calculate building construction estimate
 * @param {Object} params - Calculation parameters
 * @returns {Object} - Detailed cost breakdown
 */
export function calcBuilding({
  area,
  rate,
  laborAuto,
  laborPercent,
  laborManual,
  finishingQuality,
  contingency,
  materialRates,
}) {
  // Material quantities
  const cement = area * MATERIAL_CONSTANTS.cement;
  const steel = area * MATERIAL_CONSTANTS.steel;
  const sand = area * MATERIAL_CONSTANTS.sand;
  const aggregate = area * MATERIAL_CONSTANTS.aggregate;

  // Material rates (use custom or default)
  const cementRate = safeFloat(
    materialRates.cement,
    DEFAULT_MATERIAL_RATES.cement,
  );
  const steelRate = safeFloat(
    materialRates.steel,
    DEFAULT_MATERIAL_RATES.steel,
  );
  const sandRate = safeFloat(materialRates.sand, DEFAULT_MATERIAL_RATES.sand);
  const aggregateRate = safeFloat(
    materialRates.aggregate,
    DEFAULT_MATERIAL_RATES.aggregate,
  );

  // Material cost
  const materialCost =
    cement * cementRate +
    steel * steelRate +
    sand * sandRate +
    aggregate * aggregateRate;

  // Labor cost
  const laborCost = laborAuto
    ? materialCost * (laborPercent / 100)
    : safeFloat(laborManual, 0);

  // Finishing cost
  const finishingCost = area * FINISHING_RATES[finishingQuality];

  // Subtotal
  const subtotal = materialCost + laborCost + finishingCost;

  // Contingency
  const contingencyCost = subtotal * (contingency / 100);

  // Total
  const totalCost = subtotal + contingencyCost;

  return {
    materials: { cement, steel, sand, aggregate },
    materialCost,
    laborCost,
    finishingCost,
    contingencyCost,
    totalCost,
  };
}

/**
 * Calculate RCC slab requirements
 * @param {number} slabArea      - Slab area in sq.ft
 * @param {number} slabThickness - Slab thickness in feet
 * @returns {Object} - Slab material requirements
 */
export function calcSlab(slabArea, slabThickness) {
  // Convert to metric
  const areaM2 = slabArea * CONVERSIONS.sqftToSqm;
  const thicknessM = slabThickness * CONVERSIONS.ftToM;

  // Concrete volume
  const concreteVolume = areaM2 * thicknessM;

  // Cement required (bags)
  const cementRequired = concreteVolume * SLAB_CONSTANTS.cementPerCubicMeter;

  // Steel required (kg)
  const steelVolume = concreteVolume * SLAB_CONSTANTS.steelPercent;
  const steelRequired = steelVolume * SLAB_CONSTANTS.steelDensity;

  return {
    concreteVolume,
    cementRequired,
    steelRequired,
  };
}
