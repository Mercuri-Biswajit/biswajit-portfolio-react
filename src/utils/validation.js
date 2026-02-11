// ===========================
// VALIDATION
// 12 input-validation functions
// primarily used by the calculator
// ===========================

import { isPositiveNumber } from "./helpers.js";

// ===========================
// GENERIC VALIDATORS
// ===========================

/**
 * 1. Check that a value is a non-empty string.
 * @param {*} value
 * @returns {boolean}
 */
export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * 2. Check that a numeric value is within an inclusive range.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function isInRange(value, min, max) {
  const n = parseFloat(value);
  return Number.isFinite(n) && n >= min && n <= max;
}

/**
 * 3. Check that a value is a non-negative number (≥ 0).
 * @param {*} value
 * @returns {boolean}
 */
export function isNonNegative(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) && n >= 0;
}

/**
 * 4. Check that a value is a positive integer (> 0, no decimals).
 * @param {*} value
 * @returns {boolean}
 */
export function isPositiveInteger(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

/**
 * 5. Validate an email address format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

/**
 * 6. Validate an Indian phone number (10 digits, optional +91).
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidIndianPhone(phone) {
  return /^(\+91[\s-]?)?[6-9]\d{9}$/.test(String(phone).trim());
}

// ===========================
// CALCULATOR-SPECIFIC VALIDATORS
// ===========================

/**
 * 7. Validate the main building inputs (area & rate).
 *    Shows alert messages on failure.
 * @param {*} area   built-up area in sq.ft
 * @param {*} rate   rate per sq.ft in ₹
 * @returns {boolean}
 */
export function validateBuildingInputs(area, rate) {
  if (!isPositiveNumber(area)) {
    alert("Please enter a valid built-up area (must be greater than 0).");
    return false;
  }
  if (!isPositiveNumber(rate)) {
    alert("Please enter a valid rate per sq.ft (must be greater than 0).");
    return false;
  }
  return true;
}

/**
 * 8. Validate the RCC slab inputs (area & thickness).
 *    Shows alert messages on failure.
 * @param {*} slabArea
 * @param {*} slabThickness
 * @returns {boolean}
 */
export function validateSlabInputs(slabArea, slabThickness) {
  if (!isPositiveNumber(slabArea)) {
    alert("Please enter a valid slab area (must be greater than 0).");
    return false;
  }
  if (!isPositiveNumber(slabThickness)) {
    alert("Please enter a valid slab thickness (must be greater than 0).");
    return false;
  }
  return true;
}

/**
 * 9. Validate a labor percentage value (0–100).
 * @param {*} value
 * @returns {boolean}
 */
export function isValidLaborPercent(value) {
  return isInRange(value, 0, 100);
}

/**
 * 10. Validate a contingency percentage value (0–20).
 * @param {*} value
 * @returns {boolean}
 */
export function isValidContingency(value) {
  return isInRange(value, 0, 20);
}

/**
 * 11. Validate a material rate (must be a positive number or zero).
 * @param {*} value
 * @returns {boolean}
 */
export function isValidMaterialRate(value) {
  // Allow empty string (will use default) or a non-negative number
  if (value === "" || value === null || value === undefined) return true;
  return isNonNegative(value);
}

/**
 * 12. Validate a slab thickness is within structural limits (0.15–1.5 ft).
 * @param {*} value
 * @returns {boolean}
 */
export function isValidSlabThickness(value) {
  return isInRange(value, 0.15, 1.5);
}
