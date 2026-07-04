## 2024-07-04 - Project Card Focus Visibility
**Learning:** Default `:focus-visible` states for complex flex-container interactive elements (like `.project-card` and `.hpc-card`) using `tabIndex={0}` are cut off due to `overflow: hidden` on child elements or strict padding/margin constraints.
**Action:** Apply `:focus-visible` styles to inner visual wrappers (like `.project-card-inner`) or use a negative `outline-offset` (e.g., `-2px`) to ensure the focus ring remains fully visible inset.
