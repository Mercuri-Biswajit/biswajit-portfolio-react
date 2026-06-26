## 2024-05-19 - Inner Element Focus Patterns
**Learning:** For interactive flex-container cards (like `.project-card` and `.hpc-card`) using `tabIndex={0}`, default focus states can get cut off due to `overflow: hidden` on the outer container.
**Action:** Apply `:focus-visible` outline styles to the inner visual wrapper (e.g. `.project-card-inner`) using negative `outline-offset`, and explicitly set `outline: none;` on the outer container's `:focus-visible` state to prevent double outlines and ensure visibility.
