// ===========================
// HELPERS
// 8 general-purpose utility functions
// ===========================

/**
 * 1. Debounce: delay fn execution until after `wait` ms have elapsed
 *    since the last call.
 * @param {Function} fn
 * @param {number}   wait  ms
 * @returns {Function}
 */
export function debounce(fn, wait = 250) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

/**
 * 2. Throttle via requestAnimationFrame — ensures fn runs at most
 *    once per animation frame.
 * @param {Function} fn
 * @returns {Function}
 */
export function rafThrottle(fn) {
  let raf;
  return function (...args) {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => fn.apply(this, args));
  };
}

/**
 * 3. Clamp a number between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * 4. Linear interpolation between two values.
 * @param {number} a  start
 * @param {number} b  end
 * @param {number} t  0..1
 * @returns {number}
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * 5. Capitalize the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * 6. Check whether a value is a finite, positive number.
 * @param {*} value
 * @returns {boolean}
 */
export function isPositiveNumber(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) && n > 0;
}

/**
 * 7. Return a safe float from an input value, falling back to `fallback`.
 * @param {*}      value
 * @param {number} fallback
 * @returns {number}
 */
export function safeFloat(value, fallback = 0) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * 8. Generate a simple unique id string (for dynamic elements).
 * @param {string} prefix
 * @returns {string}  e.g. "uid-1a2b3c"
 */
export function uid(prefix = "uid") {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}