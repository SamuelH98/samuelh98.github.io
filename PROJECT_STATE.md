# Portfolio — AGI / Agent-Era HUD

## Status: REDESIGNED (v2)
Replaced the glassmorphism + parallax design with a dark, HUD-style theme inspired by a long-exposure highway / "agent era" look. Not yet verified in a browser on desktop and phone.

## Design
- **Theme:** Night highway photography, scanline overlay, thin HUD frames and mono labels
- **Palette:** near-black `#0c1117`, fog blue `#1b2a3a`, light-trail red `#ff5a47`, warm orange `#ff9a6b`, text `#e8eef4`
- **Fonts:** Chakra Petch (headings), JetBrains Mono (body/labels) — loaded from Google Fonts
- **Motion:** hero load sequence with name decode, per-scene HUD panel whose widgets change with each photo (see Changelog), crosshair that follows the cursor (desktop), wipe-in reveals per section with staggered delays, heading decode, metric count-up, parallax on photo bands, scroll progress bar, active nav link, card corner-bracket hover, button shine, pausing ticker. All of it is off under `prefers-reduced-motion`
- **Stack:** Vanilla HTML plus `styles.css` and `javascript/*.js` for the effects (no libraries, no build step). Content stays visible if JS is off
- **Copy:** plain language for recruiters (About, Projects, Skills, Education, Contact)

## Files
```
index.html                      — Markup only (~14 KB); links styles.css and public/js/app.js
public/js/*.js                  — app.js entry point plus main.js, telemetry.js, audio.js, hud.js (see changelog)
styles.css                      — ALL styles (~24 KB). Photos are `--i-*` CSS variables at the end of the file pointing to public/images/bg/*.webp
public/images/bg/*.webp         — hero, band, sky, road, canyon, star, skyline photos (WebP, max 1600px wide, ~520 KB total)
public/images/og-preview.jpg    — 1200x630 social preview image
public/audio/theme.mp3          — background instrumental (YOU supply this; not in repo yet)
public/audio/README.md          — how the audio file is used
public/fonts/fonts.css           — @font-face rules for the self-hosted fonts (latin subset)
public/fonts/*.woff2             — Chakra Petch 500/600 and JetBrains Mono (variable), downloaded from Google Fonts
README.md                       — Project overview
```
No legacy v1 asset folders remain: the unused `public/js/projects.js` updater and the unused Inter/Space Grotesk font files were deleted, and every font, image and audio file left in `public/` is referenced by the page.

## Sections
1. **Top bar** — fixed, name/title and nav links
2. **Hero** — video-style stage: 5 scenes crossfade every 6.5s, each with its own slow zoom/pan, a brief flash on each cut, each scene zooms toward a tracked object with a lock-on square, label tag and info lines (target data in the `T` array in the script: image fractions, zoom, label; boxes hidden under 700px wide so text stays readable), mouse parallax, REC timecode and scene progress ticks (photos are CSS variables `--i-*` defined once at the end of the stylesheet and reused). Content: name, title (AI / full stack / backend, M.S. CS), one-line summary, 4 buttons (projects, email, GitHub, LinkedIn), 2-column facts strip (education, latest commit)
3. **Ticker** — scrolling highlights
4. **About** — bio + 4 metrics, night-road photo background
5. **Projects** — photo band, then 6 featured projects (Orange, unstuck-mcp, Ultimate SWE, Resume Tailor, MoveDex, c-raytracer) + link to all repos
6. **Skills** — 8 categories as plain text lists, no photo
7. **Education** — skyline photo band, then 4 entries as a log
8. **Contact** — city-canyon photo behind the CTA block

## Image Inventory (WebP files in public/images/bg/, referenced from styles.css)
- Hero scenes (in order): long-exposure highway (also source of og-preview.jpg), starry-sky highway, city canyon, curving road with city lights, skyline at dusk
- About background: curving road with city lights
- Projects band: starry-sky highway (Akin Cakiner, Unsplash)
- Education band: skyline at dusk over a bridge, darkened and desaturated
- Contact background: city canyon with red trails (likely Sean Pollock, Unsplash)

## Changelog (latest)
- **Self-hosted fonts, dead assets removed:** Chakra Petch 500/600 and JetBrains Mono (variable) are now served from `public/fonts/*.woff2` via `public/fonts/fonts.css`; the Google Fonts `<link>`s and preconnects are gone. Deleted the unused `public/js/projects.js` GitHub auto-updater and the unused Inter and Space Grotesk font files. No page asset depends on an external URL now (the GitHub API calls for latest-commit data remain dynamic by design).
- **JavaScript entry point:** `index.html` now loads a single tag (`<script type="module" src="public/js/app.js"></script>`). `public/js/app.js` imports `main.js`, `telemetry.js`, `audio.js` and `hud.js` in that order, so the browser still runs them after parsing (modules are deferred by default). Only the one-line `js` class script stays inline in `<head>` so reveals don't flash. `index.html` is now ~14 KB of markup.
- **Roles broadened:** title, meta/OG text, header bar, hero role line ("AI engineer · Full stack · Backend · M.S. Computer Science"), summary, About paragraph and console now say AI / backend / full stack instead of only "full stack engineer".
- **GPA shown once:** removed 4.0 from the hero, tape and About metrics (metric is now "3 Focus areas"). It remains only as the tag on the M.S. entry in Education.
- **Performance pass.** Page weight excluding audio went from ~2.3 MB to ~580 KB, and the render-blocking stylesheet from 1.1 MB to 24 KB.
  - Base64 photos moved out of the CSS into `public/images/bg/*.webp` (smaller, cacheable, no longer block first paint). Hero image is preloaded.
  - Google Fonts load non-blocking (`media="print"` swap with a `<noscript>` fallback).
  - Both scroll handlers are throttled to one run per frame; band parallax skips bands that are off-screen.
  - FPS readout samples 0.5 s every ~4.5 s instead of a permanent per-frame loop.
  - Crosshair animation loop stops when it settles and restarts on mouse move.
  - Scene rotation, REC timecode and all hero CSS animations pause when the hero is off-screen (`hero-off` class on `<html>`) or the tab is hidden.
  - Below-hero sections use `content-visibility:auto`; fixed HUD pieces use `contain`.
  - **Not changed:** `public/audio/theme.mp3` is 7.3 MB (192 kbps stereo), by far the heaviest file. It only fetches metadata until playback, but re-encoding at ~96 kbps would cut it to ~3.5 MB.
- **Styles moved to `styles.css`.** The inline `<style>` block is gone; `index.html` now has `<link rel="stylesheet" href="styles.css">`. The old v1 stylesheet was replaced (not needed). Edit CSS only in `styles.css`; if the site looks unstyled after deploying, `styles.css` was not uploaded. Browsers cache it, so hard-refresh after pushing.
- **HUD v4, taken from the reference video's HUD language (the video was reviewed from frames; no people, text, brand names or footage are used):**
  - **Data tape** (`.tape`): fixed 20px mono strip along the bottom edge scrolling status, base, coordinates, education, GPA, project count and last push. Duplicate content for a seamless loop; static under reduced motion. Sound button and status strip sit above it.
  - **Split-flap counter** (`#fl`, `.flaps`): "days since push" digits in the Latest commit cell, flips when the value changes. Driven by the commit fetch via `setFlap()`. Hidden under 860px.
  - **Section index** in the status strip: now reads `01/06 · HERO` through `06/06 · CONTACT`.
  - **Console** (`#term`, `.term`) in Contact: types `whoami`, `status`, `contact --best` when scrolled into view; plain text under reduced motion.
  - The tape's "last push" item updates from the same commit fetch (`.tp`).
- **Bug fix:** scroll reveals never fired in Chrome (About, Projects, Skills, Education, Contact stayed invisible) because `clip-path: inset(0 100% 0 0)` gives the observer zero area. Hidden state is now `inset(0 99.9% 0 0)` and the observer uses `threshold:0` with a `-10%` bottom root margin.
- Hero bottom padding set to 60px so the facts row clears the Sound button, status strip and tape.
- **Removed the "Strengths" cell** from the hero facts strip; the strip is now 2 columns (Education, Latest commit).
- **"Recent work" is now "Latest commit".** A small script calls `https://api.github.com/users/SamuelH98/events/public` and shows the message, repo, short SHA and age of the newest push (links to the commit). The static fallback in the HTML (`samuelh98.github.io · 70ab3ca "updates"`) stays if the API is blocked or rate-limited (60 requests/hour per visitor IP). Elements: `#lc`, `#lc-msg`, `#lc-meta`.
- **More HUD elements (v3), all global and fixed:** red viewport corner brackets (`.vf`); bottom-right status strip (`.stat`: current section, FPS, scroll %, local clock); right-edge scroll ruler with a red marker and pixel readout (`.ruler`). Status strip hides below 520px, ruler and FPS/scroll hide below 820px. Marker transition is off under `prefers-reduced-motion`. Code is the last `<script>` block in `index.html` ("HUD v3 + latest commit").
- The YouTube video still could not be downloaded or viewed here (YouTube blocks the sandbox), so no ideas were taken from it. The new HUD pieces are original. No people or characters from the video are used.
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
- **Music file missing:** add an instrumental (no vocals) `public/audio/theme.mp3` that you have the rights to use.
- **Video reference:** reviewed. Further ideas not yet built: halftone dot texture over photos, paper-style data cards with small charts, barcode/label tags, a large flip-board heading for the hero. Palette stays the v2 dark theme.
- Test the new HUD (brackets, status strip, ruler) on a real phone; verify the latest-commit fetch on the live site.
- HUD values are random; tune ranges/step sizes in the `P` profiles. Only checked in a desktop browser (1280x800, 1366x740). Check performance and audio on a real phone
- No project screenshots (user chose not to add them)
- Project list is hand-curated; the old GitHub API auto-update (`projects.js`) is no longer used
- "Open to opportunities" label in hero is placeholder wording; edit or remove as needed
- Decorative HUD labels in the photo bands ("Hwy cam 02", "Skyline cam 01") are not real data
- Check hero and photo bands on mobile widths (detection boxes are hidden under 700px)
- HUD info lines in the detection boxes (IDs, ranges, confidence) are decorative, not real data
- Test effects on real devices: crosshair is hidden on touch, parallax and reveals should be checked on mobile
- Optional: shrink `index.html` by lowering image quality
