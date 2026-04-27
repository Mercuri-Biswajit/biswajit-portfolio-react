## 2025-05-18 - Hamburger Menu Accessibility
**Learning:** Decorative spans inside a mobile hamburger menu button are still visible to screen readers unless explicitly hidden, which can create a confusing readout for visually impaired users. The `aria-expanded` attribute is also crucial for toggleable elements.
**Action:** Always add `aria-hidden="true"` to visual structural elements (like hamburger lines) inside interactive buttons, and ensure toggle buttons communicate their state via `aria-expanded`.
