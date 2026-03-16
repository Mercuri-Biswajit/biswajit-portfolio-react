## 2024-05-18 - Shift Focus Outline to Inner Visual Wrapper
**Learning:** For complex flex-container interactive elements (like `.project-card`), applying `:focus-visible` styles to the structural parent can result in an outline that does not tightly wrap the content.
**Action:** Apply the `:focus-visible` styles to the inner visual wrapper (e.g., `.project-card-inner`) rather than the structural parent, and remove the outline on the parent using `outline: none;`.
