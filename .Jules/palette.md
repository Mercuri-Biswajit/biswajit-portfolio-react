
## 2023-10-24 - Focus Visible on Complex Flex-Containers
**Learning:** Standard outlines often clip or wrap poorly on complex flex-container interactive elements like `.project-card` or `.hpc-card` that use custom inner padding or overlays.
**Action:** Applied `:focus-visible` with a negative `outline-offset` (e.g., `-4px`) to the inner visual wrappers (`.project-card-inner`, `.hpc-card`) and disabled the default outline on the flex container itself to ensure outlines tightly wrap the content and are not cut off. Used `var(--color-accent)` to make the focus ring visible and matching the theme.
