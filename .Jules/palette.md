## 2024-05-24 - Interactive Component Focus States
**Learning:** Custom interactive components in this app (like `HomeProjectCard` with `tabIndex={0}`) often lack visible focus indicators for keyboard navigation, relying only on hover states.
**Action:** Always verify `tabIndex` elements have an explicit `:focus-visible` outline mapped to the site's accent color (e.g., `#FF8C00`) to ensure keyboard accessibility without disrupting mouse users.
