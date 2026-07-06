# USG Pyrotechnics & FX — Website

Marketing site for USG Pyrotechnics & FX, a licensed display-fireworks company
in Manor, TX. Built with **Vite + React** (migrated from the original Create
React App scaffold).

Dark, cinematic visual direction derived from the company logo (black / white /
brand green `#3DB54E`), with a canvas firework engine, a featured-shows
carousel, a filterable gallery, and an interactive "Build Your Show"
configurator.

## Stack

- **Vite 6** — dev server and build
- **React 18**
- **react-router-dom 7** (HashRouter, so it works on any static host)
- No CSS framework — a single hand-authored token-based stylesheet in
  `src/styles/global.css`

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run deploy    # build + publish dist/ to GitHub Pages (gh-pages branch)
```

## Structure

```
index.html                 Vite entry (viewport + <div id="root">)
src/
  main.jsx                 React root + HashRouter
  App.jsx                  Layout + routes
  styles/global.css        Design tokens + all component styles
  data/shows.js            Palettes, featured shows, gallery, services, copy
  hooks/useReducedMotion.js
  components/
    FireworksBackground.jsx  Fixed-canvas particle engine (respects reduced motion)
    Nav.jsx / Footer.jsx     Layout chrome (+ mobile drawer)
    Carousel.jsx             Auto-advancing, swipeable featured-shows carousel
    Gallery.jsx / Lightbox.jsx
    Configurator.jsx         "Build Your Show" live preview canvas
    Burst.jsx                CSS firework-burst placeholder art
    Icons.jsx
  pages/
    Home.jsx  GalleryPage.jsx  Services.jsx  About.jsx  Contact.jsx
  assets/logo.jpg
prototype/homepage.html    Standalone single-file concept prototype (self-contained,
                           opens in any browser — kept for reference / quick preview)
```

## Notes

- **Placeholder content.** Company copy, gallery imagery (CSS-generated bursts),
  and all licensing / insurance figures are illustrative. Verify credentials with
  ATF, TDLR, and the local fire marshal before publishing.
- **Accessibility.** Motion respects `prefers-reduced-motion`; the gallery
  lightbox is keyboard-operable (Escape to close).
