# Portfolio — AGI / Agent-Era HUD

## Status: REDESIGNED (v2)
Replaced the glassmorphism + parallax design with a dark, HUD-style theme inspired by a long-exposure highway / "agent era" look. Not yet verified in a browser on desktop and phone.

## Design
- **Theme:** Night highway photography, scanline overlay, thin HUD frames and mono labels
- **Palette:** near-black `#0c1117`, fog blue `#1b2a3a`, light-trail red `#ff5a47`, warm orange `#ff9a6b`, text `#e8eef4`
- **Fonts:** Chakra Petch (headings), JetBrains Mono (body/labels) — loaded from Google Fonts
- **Motion:** hero load sequence with name decode, Death Stranding-style scan pulse: bright front sweeps up each photo, revealing white contour lines that wrap around the objects in it (see Changelog), crosshair that follows the cursor (desktop), wipe-in reveals per section with staggered delays, heading decode, metric count-up, parallax on photo bands, scroll progress bar, active nav link, card corner-bracket hover, button shine, pausing ticker. All of it is off under `prefers-reduced-motion`
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
- Replaced the red top-to-bottom `.sweep` line in the hero with a Death Stranding-style scan pulse (script block "scan pulse" near the end of `index.html`, CSS `.scan` / `@keyframes ft, ff`). On load each photo is read from its CSS background, downsampled to ~200px and turned into a height map (50% blurred brightness + 50% blurred edge strength, 98th-percentile normalised, gamma .75). 72 dense contour rows (every 4th brighter, with dots on high points) are drawn once per scene, displaced by that relief so they wrap around towers, light trails, headlights and the road, then sliced into 24 horizontal strips (a faint "trail" set and a bright thick "front" set). Each strip runs an opacity-only CSS animation (2.6s loop) whose `animation-delay` is when an ease-out sweep front reaches it: the bright set flashes at the front (~0.1s), the faint set lingers and fades (~1.1s). The sweep crosses the visible hero in ~0.8s and repeats every 2.6s (about 2 pulses per scene). Lines also get fainter higher up (perspective).
- Why this design: it is compositor-only (opacity), so there is no JS per frame and no per-frame canvas or mask repaint. Contours are drawn once per scene start/resize; a MutationObserver on the scenes keeps a `.scan` wrapper in sync with the scene's `on/out` classes and zoom/pan CSS vars, so the lines move with the photo and fade off with it on each cut. Idle scenes free their canvases (wrapper is `display:none`). Not started under `prefers-reduced-motion`. Measured in headless Chromium (software rendering, so only a relative comparison): previous per-frame canvas version 22.7 fps, this version 29.7 fps, site without scan 39.3 fps. A full-canvas CSS-mask version was tried and rejected (8.5 fps).
- Added background music: `<audio id="bgm">` loading `public/audio/theme.mp3` (looped, fades in to 50%), plus a bottom-left "Sound on/off" button. Playback starts on the first click/tap/key (browser autoplay rule); choice is remembered in localStorage; pauses when the tab is hidden. Button stays hidden until the file exists.

## Known gaps / TODO
- **Music file missing:** add an instrumental (no vocals) `public/audio/theme.mp3`. The video's audio could not be fetched or voice-stripped from here.
- **Video theme not yet matched:** the YouTube page ("SLOPCORE: ESCAPE VELOCITY") could not be viewed from here, so palette/typography/layout still follow the v2 HUD theme. Needs screenshots or a description of the video's look.
- Scan lines use brightness/edges as a stand-in for depth (no depth model), so relief is strongest on bright objects and silhouettes. Tweak the `.15` amplitude in `pts()`, the `.5/.5` weights and gamma in `build()`, `ROWS`, `B` (strip count), `DUR` and the 2.6s loop in the scan script/CSS. Check performance and audio on a real phone
- No project screenshots (user chose not to add them)
- Project list is hand-curated; the old GitHub API auto-update (`projects.js`) is no longer used
- "Open to opportunities" label in hero is placeholder wording; edit or remove as needed
- Decorative HUD labels in the photo bands ("Hwy cam 02", "Skyline cam 01") are not real data
- Check hero and photo bands on mobile widths (detection boxes are hidden under 700px)
- HUD info lines in the detection boxes (IDs, ranges, confidence) are decorative, not real data
- Test effects on real devices: crosshair is hidden on touch, parallax and reveals should be checked on mobile
- Optional: shrink `index.html` by lowering image quality
