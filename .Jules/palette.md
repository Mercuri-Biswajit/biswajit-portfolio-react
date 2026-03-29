## 2026-03-10 - Custom Navigation Menu Accessibility
**Learning:** Custom hamburger menus often neglect to properly associate the toggle button with the menu content it controls, and frequently fail to broadcast their expanded/collapsed state or the currently active page.
**Action:** Always link custom navigation toggles to their menus using `aria-controls`, announce state changes with `aria-expanded`, and dynamically update `aria-label` (e.g., 'Open/Close menu'). Also add `aria-current='page'` to the active nav link to guide screen reader users.
