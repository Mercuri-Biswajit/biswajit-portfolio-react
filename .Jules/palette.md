## 2024-05-31 - Mobile Menu ARIA Expansion Update
**Learning:** Adding `aria-expanded` and `aria-controls` directly to a toggle button like a hamburger menu explicitly surfaces state to screen readers and is essential for good keyboard navigation on mobile viewports.
**Action:** When adding these attributes, remember to also explicitly link the container to the controls ID (`aria-controls="nav-menu"` on the button maps to `id="nav-menu"` on the menu container).
