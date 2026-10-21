# Portfolio — AGI / Agent-Era HUD

## Status: REDESIGNED (v2)
Replaced the glassmorphism + parallax design with a dark, HUD-style theme inspired by a long-exposure highway / "agent era" look. Not yet verified in a browser on desktop and phone.

## Design
- **Theme:** Night highway photography, scanline overlay, thin HUD frames and mono labels
- **Palette:** near-black `#0c1117`, fog blue `#1b2a3a`, light-trail red `#ff5a47`, warm orange `#ff9a6b`, text `#e8eef4`
- **Fonts:** Chakra Petch (headings), JetBrains Mono (body/labels) — loaded from Google Fonts
- **Motion:** hero load sequence with name decode, per-scene HUD panel whose widgets change with each photo (see Changelog), crosshair that follows the cursor (desktop), wipe-in reveals per section with staggered delays, heading decode, metric count-up, parallax on photo bands, scroll progress bar, active nav link, card corner-bracket hover, button shine, pausing ticker. All of it is off under `prefers-reduced-motion`
- **Stack:** Vanilla HTML/CSS plus one small inline script for the effects (no libraries, no build step). Content stays visible if JS is off
- **Copy:** plain language for recruiters (About, Projects, Skills, Education, Contact)

## Files
```
index.html                      — Entire site: inline CSS, embedded photos (~1.1MB)
public/images/og-preview.jpg    — 1200x630 social preview image
public/audio/theme.mp3          — background instrumental (YOU supply this; not in repo yet)
public/audio/README.md          — how the audio file is used
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

## Changelog (latest)
- Removed the red top-to-bottom `.sweep` line from the hero. Several scanner/scan-line experiments (contour lines, Death Stranding-style ring, LiDAR point cloud with MiDaS depth maps) were built and then removed at the owner's request; none of that code or the embedded depth maps remains.
- Added a decorative per-scene HUD panel in the hero (`.tele` CSS + "telemetry HUD" script block). Each of the 5 photos has its own set of HUD elements, and the panel glitches (`@keyframes tswap`) and rebuilds when the scene cuts (a MutationObserver on the `.scene` `on` class picks the profile by scene index):
  1. Tail lights: "Traffic · Lane 02" — speed line graph, lane-density bars; headway, veh/min, range, conf.
  2. Headlights: "Target · ID 0427" — radar with sweep, drifting blips and an approaching target (range/bearing), closing-speed line graph; intensity, conf, track age, drift.
  3. Office tower: "Structure · Office Tower" — floors-lit grid (12x4, flickering), power-load gauge; occupancy, HVAC, lifts, uplink.
  4. Towers x2: "Residential · Towers x2" — windows-lit gauge, demand A/B bars; noise, wind, units, visibility.
  5. Landmark tower: "Landmark · Beacon" — wind gauge, sway line graph; beacon Hz, altitude, facade temp, cloud base.
  Widgets are built by the `WID` factories (`line, bars, gauge, radar, grid`); profiles live in the `P` array (add or edit entries there). All values are random walks, not real data. Updates ~7x/s only while the hero is visible and the tab is active; static under `prefers-reduced-motion`. Positioned top-left under "open to opportunities" (left:20px, top:104px, 236px wide). Responsive: measurements row hidden below 765px viewport height, whole panel hidden below 700px height or 820px width, so it never collides with the title or lock-on boxes.
- Added background music: `<audio id="bgm">` loading `public/audio/theme.mp3` (looped, fades in to 50%), plus a bottom-left "Sound on/off" button. Playback starts on the first click/tap/key (browser autoplay rule); choice is remembered in localStorage; pauses when the tab is hidden. Button stays hidden until the file exists.

## Known gaps / TODO
- **Music file missing:** add an instrumental (no vocals) `public/audio/theme.mp3`. The video's audio could not be fetched or voice-stripped from here.
- **Video theme not yet matched:** the YouTube page ("SLOPCORE: ESCAPE VELOCITY") could not be viewed from here, so palette/typography/layout still follow the v2 HUD theme. Needs screenshots or a description of the video's look.
- HUD values are random; tune ranges/step sizes in the `P` profiles. Only checked in a desktop browser (1280x800, 1366x740). Check performance and audio on a real phone
- No project screenshots (user chose not to add them)
- Project list is hand-curated; the old GitHub API auto-update (`projects.js`) is no longer used
- "Open to opportunities" label in hero is placeholder wording; edit or remove as needed
- Decorative HUD labels in the photo bands ("Hwy cam 02", "Skyline cam 01") are not real data
- Check hero and photo bands on mobile widths (detection boxes are hidden under 700px)
- HUD info lines in the detection boxes (IDs, ranges, confidence) are decorative, not real data
- Test effects on real devices: crosshair is hidden on touch, parallax and reveals should be checked on mobile
- Optional: shrink `index.html` by lowering image quality
