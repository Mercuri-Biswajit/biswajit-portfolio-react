## 2024-05-24 - Improve Keyboard Focus Visibility
**Learning:** Default browser focus rings often blend into complex UI components. Setting a bright accent color (like `--color-accent`) for `:focus-visible` globally, and adding specific `outline` and `outline-offset` values to complex flex-containers (like `TimelineCard` and `HomeProjectCard`) ensures keyboard focus is highly visible and accessible.
**Action:** Always verify keyboard accessibility on interactive elements and use a high-contrast outline instead of relying on defaults.
