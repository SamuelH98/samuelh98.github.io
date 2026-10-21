# Samuel Hale — Portfolio

Personal portfolio site built with vanilla HTML, CSS, and JavaScript. Hosted on GitHub Pages.

## Sections

- **Hero** — intro with degree, title, and call-to-action buttons
- **Education** — MS Computer Science (4.0 GPA) and BS Software Engineering
- **Experience** — Ultimate SWE project and Senior Capstone
- **Skills** — categorized skill tags
- **Contact** — email, LinkedIn, GitHub

## Hero effects

- **Per-scene HUD** — a decorative HUD panel whose elements change with each hero photo: lane traffic graphs for the highway, a radar for the headlights, a floor-activity grid and power gauge for the office tower, window/demand gauges for the residential towers, wind and sway for the landmark tower. It glitches and rebuilds on every scene cut. Values are random, not real data. Pauses off-screen, static under reduced-motion, trimmed or hidden on small screens.
- **Background music** — looped instrumental from `public/audio/theme.mp3` with a Sound on/off button. Add your own file (see `public/audio/README.md`); without it the button stays hidden. Audio starts after the first click/tap because browsers block autoplay.

## Projects auto-update

The projects section is generated client-side by `public/js/projects.js`. On load
it fetches your public repos from the GitHub API and renders a card per project:

- Coursework, boilerplate, and fork repos are filtered out via the `EXCLUDE`
  list in `projects.js` — edit that list to hide or reveal repos.
- Repos tagged with a **`portfolio`** GitHub topic are pinned to the top and
  marked "Featured" (add/remove the topic on GitHub to reorder without code).
- Cards link to the repo (or its GitHub Pages site when a homepage is set).

If the API is unreachable, the static cards baked into `index.html` remain.

## Local dev

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. No build step required.


## Redesign note

`index.html` is now a self-contained page (inline CSS/JS, embedded photos, Google Fonts). `styles.css`, `public/js/*`, `public/videos/*` and `public/fonts/*` are no longer referenced and can be deleted. `public/images/og-preview.jpg` is the social preview image.
