# Portfolio — AGI / Agent-Era HUD

## Status: REDESIGNED (v2)
Replaced the glassmorphism + parallax design with a dark, HUD-style theme inspired by a long-exposure highway / "agent era" look. Not yet verified in a browser on desktop and phone.

## Design
- **Theme:** Night highway photography, scanline overlay, thin HUD frames and mono labels
- **Palette:** near-black `#0c1117`, fog blue `#1b2a3a`, light-trail red `#ff5a47`, warm orange `#ff9a6b`, text `#e8eef4`
- **Fonts:** Chakra Petch (headings), JetBrains Mono (body/labels) — loaded from Google Fonts
- **Motion:** hero load sequence with name decode, sweeping scan line, crosshair that follows the cursor (desktop), wipe-in reveals per section with staggered delays, heading decode, metric count-up, parallax on photo bands, scroll progress bar, active nav link, card corner-bracket hover, button shine, pausing ticker. All of it is off under `prefers-reduced-motion`
- **Stack:** Vanilla HTML/CSS plus one small inline script for the effects (no libraries, no build step). Content stays visible if JS is off
- **Copy:** plain language for recruiters (About, Projects, Skills, Education, Contact)

## Files
```
index.html                      — Entire site: inline CSS, embedded photos (~1.1MB)
public/images/og-preview.jpg    — 1200x630 social preview image
README.md                       — Project overview
```
Legacy files from v1 are still in the repo but no longer referenced by `index.html`:
`styles.css`, `public/js/` (main.js, projects.js), `public/fonts/`, `public/videos/`,
`public/images/sections/`, `public/images/cutouts/`. Safe to delete (videos are most of the repo size).
`public/vendor/typst/` was not touched; unclear if anything else uses it.

## Sections
1. **Top bar** — fixed, name/title and nav links
2. **Hero** — video-style stage: 5 scenes crossfade every 6.5s, each with its own slow zoom/pan, a brief flash on each cut, each scene zooms toward a tracked object with a lock-on square, label tag and info lines (target data in the `T` array in the script: image fractions, zoom, label; boxes hidden under 700px wide so text stays readable), mouse parallax, REC timecode and scene progress ticks (photos are CSS variables `--i-*` defined once at the end of the stylesheet and reused). Content: name, title (M.S. CS, 4.0 GPA), one-line summary, 4 buttons (projects, email, GitHub, LinkedIn), 3-column facts strip (education, strengths, recent work)
3. **Ticker** — scrolling highlights
4. **About** — bio + 4 metrics, night-road photo background
5. **Projects** — photo band, then 6 featured projects (Orange, unstuck-mcp, Ultimate SWE, Resume Tailor, MoveDex, c-raytracer) + link to all repos
6. **Skills** — 8 categories as plain text lists, no photo
7. **Education** — skyline photo band, then 4 entries as a log
8. **Contact** — city-canyon photo behind the CTA block

## Image Inventory (all embedded as base64 in index.html)
- Hero scenes (in order): long-exposure highway (also source of og-preview.jpg), starry-sky highway, city canyon, curving road with city lights, skyline at dusk
- About background: curving road with city lights
- Projects band: starry-sky highway (Akin Cakiner, Unsplash)
- Education band: skyline at dusk over a bridge, darkened and desaturated
- Contact background: city canyon with red trails (likely Sean Pollock, Unsplash)

## Known gaps / TODO
- No project screenshots (user chose not to add them)
- Project list is hand-curated; the old GitHub API auto-update (`projects.js`) is no longer used
- "Open to opportunities" label in hero is placeholder wording; edit or remove as needed
- Decorative HUD labels in the photo bands ("Hwy cam 02", "Skyline cam 01") are not real data
- Check hero and photo bands on mobile widths (detection boxes are hidden under 700px)
- HUD info lines in the detection boxes (IDs, ranges, confidence) are decorative, not real data
- Test effects on real devices: crosshair is hidden on touch, parallax and reveals should be checked on mobile
- Optional: shrink `index.html` by lowering image quality
