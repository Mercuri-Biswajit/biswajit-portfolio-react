// ===========================
// HOMEPAGE — CALCULATOR LOGIC
// Pure functions for the Quick Calculator section.
// All state management stays in HomePage.jsx —
// these are stateless calculation helpers only.
// NOT a global file — do not import from elsewhere.
// ===========================

import { MATERIAL_CONSTANTS, DEFAULT_MATERIAL_RATES } from "../utils/constants";
import { safeFloat } from "../utils/helpres";

/**
 * Validate and compute the total construction cost.
 * Returns { total, error } — error is null on success.
 *
 * @param {string|number} area   - Built-up area (sq.ft)
 * @param {string|number} rate   - Construction rate (₹/sq.ft)
 * @returns {{ total: number|null, error: string|null }}
 */
export function computeTotal(area, rate) {
  const a = safeFloat(area, 0);
  const r = safeFloat(rate, 0);

  if (a <= 0 || r <= 0) {
    return {
      total: null,
      error: "Please enter valid area and rate values.",
    };
  }

  return { total: a * r, error: null };
}

/**
 * Compute material quantities and costs for a given built-up area.
 * Assumes standard RCC framed construction.
 *
 * @param {string|number} area - Built-up area (sq.ft)
 * @returns {{
 *   cement:              number,   // bags
 *   cementCost:          number,   // ₹
 *   steel:               number,   // kg
 *   steelCost:           number,   // ₹
 *   sand:                number,   // m³
 *   sandCost:            number,   // ₹
 *   aggregate:           number,   // m³
 *   aggregateCost:       number,   // ₹
 *   bricks:              number,   // nos (wall)
 *   bricksCost:          number,   // ₹
 *   pcc:                 number,   // m³ — PCC bed (50 mm thick, M10)
 *   pccCost:             number,   // ₹
 *   footing:             number,   // m³ — RCC isolated footing concrete
 *   footingCost:         number,   // ₹
 *   foundationBricks:    number,   // nos — stepped brick masonry footing/plinth
 *   foundationBrickCost: number,   // ₹
 * }}
 */
export function computeMaterials(area) {
  const a = safeFloat(area, 0);

  const cement           = a * (MATERIAL_CONSTANTS.cement            ?? 0.4);
  const steel            = a * (MATERIAL_CONSTANTS.steel             ?? 4.0);
  const sand             = a * (MATERIAL_CONSTANTS.sand              ?? 0.044);
  const aggregate        = a * (MATERIAL_CONSTANTS.aggregate         ?? 0.088);
  const bricks           = a * (MATERIAL_CONSTANTS.bricks            ?? 9);
  const pcc              = a * (MATERIAL_CONSTANTS.pcc               ?? 0.0046);
  const footing          = a * (MATERIAL_CONSTANTS.footing           ?? 0.0074);
  const foundationBricks = a * (MATERIAL_CONSTANTS.foundationBricks  ?? 13);

  // Unit rates
  const rCement    = DEFAULT_MATERIAL_RATES.cement          ?? 420;   // ₹/bag
  const rSteel     = DEFAULT_MATERIAL_RATES.steel           ?? 65;    // ₹/kg
  const rSand      = DEFAULT_MATERIAL_RATES.sand            ?? 1500;  // ₹/m³
  const rAggregate = DEFAULT_MATERIAL_RATES.aggregate       ?? 1400;  // ₹/m³
  const rBrick     = DEFAULT_MATERIAL_RATES.brick           ?? 9;     // ₹/brick (wall)
  const rPCC       = DEFAULT_MATERIAL_RATES.pcc             ?? 4500;  // ₹/m³ (M10 labour+material)
  const rFooting   = DEFAULT_MATERIAL_RATES.footing         ?? 5500;  // ₹/m³ (M20 RCC)
  const rFndBrick  = DEFAULT_MATERIAL_RATES.foundationBrick ?? 12;    // ₹/brick (premium)

  return {
    cement,       cementCost:          cement           * rCement,
    steel,        steelCost:           steel            * rSteel,
    sand,         sandCost:            sand             * rSand,
    aggregate,    aggregateCost:       aggregate        * rAggregate,
    bricks,       bricksCost:          bricks           * rBrick,
    pcc,          pccCost:             pcc              * rPCC,
    footing,      footingCost:         footing          * rFooting,
    foundationBricks,
    foundationBrickCost: foundationBricks * rFndBrick,
  };
}