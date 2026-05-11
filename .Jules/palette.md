## 2024-05-11 - Add Focus-Visible Styles to Project Cards
**Learning:** Component-scoped styles are sometimes implemented as inline `<style>` tags in the JSX (e.g., `HomeProjectCard.jsx`). When improving global focus visibility, these dynamically injected styles must be manually targeted alongside standard CSS files.
**Action:** Always search (`grep`) for the CSS class names within JSX files to ensure dynamically injected style strings are not missed when auditing or improving CSS patterns.
