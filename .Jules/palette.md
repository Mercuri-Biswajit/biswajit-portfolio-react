## 2024-03-20 - Palette Journal initialized

## 2024-03-20 - Focus Outlines on Complex Structural Cards
**Learning:** In complex interactive components like `.project-card` or `.hpc-card` that use structural elements as buttons (with `tabIndex={0}`), default browser focus rings or generic blue outlines either clash visually or wrap awkwardly, cutting into the card content.
**Action:** Use explicit `:focus-visible` styles utilizing the app's accent color (orange: `#FF8C00` / `#FF6B35`) globally, and apply negative `outline-offset` to the inner visual wrappers (like `.project-card-image` and `.project-card-body`) so outlines tightly and cleanly wrap the content instead of the structural parent.
