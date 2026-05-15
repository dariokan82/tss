# True Story Studios - Project Map

This document serves as a guide for the True Story Studios website architecture, tech stack, and conventions.

## Tech Stack
* **Framework:** React (loaded via local scripts, no Node/Webpack build step).
* **Compilation:** Babel Standalone (compiles JSX in the browser).
* **Styling:** Vanilla CSS (all styles are contained within `<style>` blocks in `index.html`).

## File Map
* `/index.html`: The main entry point. It contains all global CSS, CSS variables, font-face declarations, and loads the necessary React/Babel scripts and the `app.jsx` file.
* `/assets/app.jsx`: The core of the application. It contains all React components, hooks, and hardcoded data structures.
* `/assets/`: Directory containing all local fonts (`.woff`, `.woff2`) and images used across the site (logos, posters, founder portraits).
* `/`: Root directory also contains some standalone images (`DarknessIsMyCandle.png`, `david.png`, etc.) that are referenced directly.

## Data Structures (in `assets/app.jsx`)
Data for the site is currently hardcoded at the top of the `app.jsx` file.
* **`HERO_IMAGES`**: Array of image filenames used in the auto-rotating hero carousel.
* **`SLATE`**: Array of objects representing the film/series projects. Modifying this array updates the "Work" section and the modal details.
  * Fields: `id`, `title`, `format` (e.g., "Feature Film", "Series"), `year`, `logline`, `palette` (fallback gradient colors), `image` (poster background), `position` (optional CSS background position).

## React Components (in `assets/app.jsx`)
* `<Nav />`: Sticky navigation bar with scroll state.
* `<Hero />`: Cross-fading image carousel with "Ken Burns" zoom effect and marquee.
* `<Slate />` / `<SlateCard />` / `<SlateDetail />`: Grid of projects and the popup modal for details.
* `<Studio />`: "How we make them" process section.
* `<Founder />`: Bio and portrait of the founder (David Aaron Cohen).
* `<Contact />`: Contact form and email information.
* `<Footer />`: Simple copyright footer.
* `<App />`: Main composition of all sections.

## Design System & Styling (in `index.html`)
The site follows an "A24-style": dark, editorial, and image-forward.
* **Colors:** Dark canvas (`--ts-ink`, `--ts-ash`, `--ts-coal`), contrasted with a bright Ember orange (`--ts-ember`: `#D06028`) and paper/cream text (`--ts-paper`, `--ts-bone`).
* **Typography:**
  * Display: *Bantayog*
  * Body: *DM Sans*
  * Accents (Serif): *IM Fell English*
  * Eyebrows/Captions: *Special Elite*
  * Mono: *JetBrains Mono*
* **Architecture:** CSS is scoped mostly by `ts-` prefixed class names (e.g., `.ts-hero`, `.ts-slate-card`).