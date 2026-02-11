// ===========================
// DOM UTILITIES
// 13 helpers for DOM querying,
// manipulation & rendering
// ===========================

/**
 * 1. Shorthand for document.querySelector.
 * @param {string}    selector
 * @param {Element}   [ctx=document]
 * @returns {Element|null}
 */
export function qs(selector, ctx = document) {
  return ctx.querySelector(selector);
}

/**
 * 2. Shorthand for document.querySelectorAll → Array.
 * @param {string}    selector
 * @param {Element}   [ctx=document]
 * @returns {Element[]}
 */
export function qsa(selector, ctx = document) {
  return Array.from(ctx.querySelectorAll(selector));
}

/**
 * 3. Get element by id.
 * @param {string} id
 * @returns {Element|null}
 */
export function byId(id) {
  return document.getElementById(id);
}

/**
 * 4. Create an element with optional attributes and inner HTML.
 * @param {string} tag
 * @param {Object} [attrs={}]
 * @param {string} [html='']
 * @returns {Element}
 */
export function createElement(tag, attrs = {}, html = "") {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (html) el.innerHTML = html;
  return el;
}

/**
 * 5. Set multiple attributes on an element at once.
 * @param {Element} el
 * @param {Object}  attrs
 */
export function setAttrs(el, attrs = {}) {
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

/**
 * 6. Add one or more classes.
 * @param {Element}    el
 * @param {...string}  classes
 */
export function addClass(el, ...classes) {
  el.classList.add(...classes);
}

/**
 * 7. Remove one or more classes.
 * @param {Element}    el
 * @param {...string}  classes
 */
export function removeClass(el, ...classes) {
  el.classList.remove(...classes);
}

/**
 * 8. Toggle a class; returns new state.
 * @param {Element} el
 * @param {string}  cls
 * @returns {boolean}
 */
export function toggleClass(el, cls) {
  return el.classList.toggle(cls);
}

/**
 * 9. Safely set innerHTML on an element (no-op if el is null).
 * @param {Element|null} el
 * @param {string}       html
 */
export function setHTML(el, html) {
  if (el) el.innerHTML = html;
}

/**
 * 10. Safely set textContent on an element.
 * @param {Element|null} el
 * @param {string}       text
 */
export function setText(el, text) {
  if (el) el.textContent = text;
}

/**
 * 11. Show an element (removes 'hidden', sets display).
 * @param {Element} el
 * @param {string}  [display='block']
 */
export function show(el, display = "block") {
  if (!el) return;
  el.style.display = display;
  el.classList.remove("hidden");
}

/**
 * 12. Hide an element.
 * @param {Element} el
 */
export function hide(el) {
  if (!el) return;
  el.style.display = "none";
}

/**
 * 13. Smooth-scroll to an element with optional offset.
 * @param {Element|string} target  element or CSS selector
 * @param {number}         [offset=80]  px offset from top (e.g. navbar height)
 */
export function scrollTo(target, offset = 80) {
  const el = typeof target === "string" ? qs(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
