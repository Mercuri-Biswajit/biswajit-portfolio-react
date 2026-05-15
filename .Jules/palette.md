## 2025-02-23 - Improve Header Menu Screen Reader Support
**Learning:** Screen readers may not intuitively know that a hamburger menu controls an off-canvas navigation or what its expanded state is without `aria-expanded` and `aria-controls`. Same with active links (`aria-current`).
**Action:** Always pair hamburger menus with `aria-expanded` and `aria-controls` targeting the menu container. Use `aria-current="page"` to indicate the active navigation link.
