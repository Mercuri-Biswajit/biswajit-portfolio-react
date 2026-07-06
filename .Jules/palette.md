
## 2024-05-23 - Focus Rings Obscured by overflow:hidden
**Learning:** For complex flex-container interactive elements (like `.project-card` and `.hpc-card`) using `tabIndex={0}`, default focus states might be cut off due to `overflow: hidden`.
**Action:** Apply `:focus-visible` styles with a negative `outline-offset` (e.g., `-2px` for an inset) or apply it to the inner visual wrapper to ensure visibility. Explicitly setting `outline: none;` on the outer container's `:focus-visible` state prevents double outlines.
