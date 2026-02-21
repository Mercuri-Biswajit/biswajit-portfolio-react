// ===========================
// HOMEPAGE — LOCAL HELPERS
// Only the 3 utility functions used by the
// Quick Calculator section of HomePage.
// NOT a global file — do not import from elsewhere.
// ===========================

/**
 * Format a number as Indian Rupee currency string.
 * @param {number} amount
 * @returns {string}  e.g. "₹1,23,456"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number with fixed decimal places, using Indian locale.
 * @param {number} number
 * @param {number} decimals
 * @returns {string}
 */
export function formatNumber(number, decimals = 2) {
  return number.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Return a safe float from an input value, falling back to `fallback`.
 * @param {*}      value
 * @param {number} fallback
 * @returns {number}
 */
export function safeFloat(value, fallback = 0) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}
