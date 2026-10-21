# Samuel Hale — Portfolio

Personal portfolio site built with vanilla HTML, CSS, and JavaScript. Hosted on GitHub Pages.

## Sections

- **Hero** — intro (AI, full stack and backend engineer), call-to-action buttons, education and latest commit
- **Education** — M.S. Computer Science and B.S. Software Engineering
- **Projects** — six featured projects
- **Skills** — categorized skill tags
- **Contact** — email, LinkedIn, GitHub

## Hero effects

- **Per-scene HUD** — a decorative HUD panel whose elements change with each hero photo: lane traffic graphs for the highway, a radar for the headlights, a floor-activity grid and power gauge for the office tower, window/demand gauges for the residential towers, wind and sway for the landmark tower. It glitches and rebuilds on every scene cut. Values are random, not real data. Pauses off-screen, static under reduced-motion, trimmed or hidden on small screens.
- **Background music** — looped instrumental from `public/audio/theme.mp3` with a Sound on/off button. Add your own file (see `public/audio/README.md`); without it the button stays hidden. Audio starts after the first click/tap because browsers block autoplay.

## Global HUD

- Red corner brackets around the viewport, a bottom-right status strip (current section, FPS, scroll %, clock) and a right-edge scroll ruler. Hidden or trimmed on small screens.

- Bottom data tape (scrolling status line), split-flap "days since push" counter, and a typing console in Contact.

## Latest commit

The hero shows your most recent public push, fetched from the GitHub events API (message, repo, short SHA, age). If the request fails, the static fallback in `index.html` is shown. Projects are hand-curated in `index.html`.

## Code layout

- `index.html` — markup
- `styles.css` — all styles
- `public/js/` — `app.js` (single entry point imported by `index.html`) imports `main.js` (page effects), `telemetry.js` (hero HUD panel), `audio.js` (music) and `hud.js` (global HUD, latest commit, console)
- `public/fonts/` — `fonts.css` plus the self-hosted Chakra Petch and JetBrains Mono woff2 files (latin subset)
- `public/images/bg/` — photos referenced from `styles.css`; `public/images/og-preview.jpg` is the social preview image

## Local dev

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. No build step required. Use a local server rather than opening the file directly, because the scripts load as ES modules.

## Redesign note

`index.html` holds the markup only, scripts live in `public/js/` and all CSS lives in `styles.css` (photos are referenced as `--i-*` variables pointing at `public/images/bg/*.webp`). Fonts, images and audio are all served locally; the only runtime network calls are the optional GitHub API fetches for the latest-commit line.
