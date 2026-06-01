## 2026-06-01 - Better Focus Visible for Complex Cards
**Learning:** Default `:focus-visible` outlines on complex flex-container interactive elements (like cards with hidden overflow) can be obscured or misaligned. Providing explicit, high-contrast outlines using the brand's accent color improves visibility.
**Action:** Apply explicit outline and outline-offset to inner wrappers (like `.project-card-inner`) or directly adjust offsets for standalone cards to ensure accessibility is prominent.
