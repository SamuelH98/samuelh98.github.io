# Portfolio — Glassmorphism + Parallax

## Status: IN PROGRESS

## Design
- **Theme:** Glassmorphism (frosted glass panels, blur, translucent layers)
- **Motion:** Parallax scrolling on decorative PNG cutouts
- **Stack:** Vanilla HTML/CSS/JS — zero dependencies
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono (code/tags)

## Files
```
index.html              — Single page, all sections
styles.css              — Glass system, parallax, animations (~530 lines)
public/js/main.js       — Parallax engine, scroll reveals, nav tracking
public/images/cutouts/  — 17 transparent PNG cutouts (5.7MB total)
```

## Sections
1. **Nav** — Fixed glassmorphic bar with {SH} logo
2. **Hero** — Name, role, glass code card, parallax cutouts
3. **About** — Bio + 4 stat cards in glass panels
4. **Projects** — Bento grid of 8 GitHub project cards
5. **Skills** — 8 categorized glass panels with tags
6. **Education** — 2 glass degree cards
7. **Contact** — Glass CTA with glow effect

## Image Inventory (cutouts/)
All images have transparent backgrounds (background removal applied via Python/Pillow BFS flood fill).
- neon-ring.png (272KB) — Glowing neon circle ring
- fluid-blobs.png (631KB) — Neon gradient watercolor blobs
- neon-triangles.png (234KB) — Neon gradient triangles frame
- wireframe-3d.png (371KB) — 3D wireframe shapes
- gradient-blobs.png (404KB) — Gradient abstract blobs
- tech-dots.png (95KB) — Tech dotted lines/nodes
- neon-circle.png (234KB) — White neon circle
- glass-panel.png (291KB) — Glass transparency shapes
- vivid-3d-circles.png (329KB) — 3D gradient circles
- neon-pink-blue.png (245KB) — Pink/blue neon glow
- overlapping-triangles.png (958KB) — Bold overlapping neon triangles
- neon-fluid.png (628KB) — Abstract fluid neon shapes
- retro-neon-grid.png (545KB) — Retro 80s neon grid
- purple-splatter.png (204KB) — Purple paint splatter
- pink-blue-gradient.png (234KB) — Pink/blue gradient
- geo-gradient.png (103KB) — Geometric gradient blocks
- abstract-blob.png (17KB) — Abstract blob shape
