# Image Presentation (beyond plain rectangles)

Purpose: Art-direct and implement image framing, treatment, and responsive presentation beyond plain rectangles.

Read when:
- Images are a primary visual device or their current presentation feels generic.

Skip when:
- The request only sources or generates image content; use the appropriate asset-generation capability.

Inputs:
- Available imagery, content role, crop constraints, layout, and performance requirements.

Produces:
- An image-treatment system with framing, responsive behavior, and implementation details.

## Contents

- 1. Masked / clipped image shapes (arch, circle, blob, angle)
- 2. SVG masks & reveal-on-scroll masks
- 3. Text over image — readable scrim / overlay
- 4. Masonry & mixed-aspect galleries
- 5. Breakout / full-bleed / overlap
- 6. Device / browser mockups & tilted 3D screenshots
- 7. Collage / scattered / pinned-photo
- 8. Ken Burns / slow zoom & parallax
- 9. Foundations: object-fit · aspect-ratio · art direction
- Cheat sheet (goal → primary lever)

Images that read as *designed, layered, intentional* (Godly / Awwwards / Apple). Each: **why → how →
example → pitfall.** Default crime is "stock photo in a box."

---

## 1. Masked / clipped image shapes (arch, circle, blob, angle)
- **Why:** A non-rectangular silhouette instantly signals art direction. Arches = editorial; circles =
  human/portrait; blobs = soft/organic; angles = kinetic/tech.
```css
.arch { border-radius: 50% 50% 0 0 / 35% 35% 0 0; overflow: hidden; }
.arch img { width: 100%; height: 100%; object-fit: cover; }

.angled { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }            /* slanted crop */
.hex    { clip-path: polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%); }

.blob {  /* new shape() — Chrome/Edge/Safari; Firefox shipped Feb 2026 */
  clip-path: shape(from 50% 0,
    curve to 100% 50% with 85% 5%, curve to 50% 100% with 95% 95%,
    curve to 0 50% with 5% 95%,   curve to 50% 0 with 15% 5%);
}
```
- `clip-path` is GPU-accelerated and animatable; two shapes with the **same number of curve commands**
  can `transition`/morph (blob wobble on hover). For deep curves / soft alpha edges, use `mask-image`
  (respects partial alpha; clip-path is hard-edged).
- **Pitfall:** Hard clip-path edges alias on curves — prefer `mask-image` for smooth organic edges.
  Clipping crops content: combine with `object-fit: cover` + `object-position` and test the focal point
  per breakpoint. Generators: bennettfeely.com/clippy, css-generators.com/blob.

---

## 2. SVG masks & reveal-on-scroll masks
- **Why:** A mask reveal turns a static image into a *moment* — content wipes/irises in as it enters view.
```css
@keyframes reveal {
  from { opacity: 0; clip-path: inset(0% 60% 0% 50%); }
  to   { opacity: 1; clip-path: inset(0% 0% 0% 0%); }
}
.revealing-image {
  animation: auto linear reveal both;
  animation-timeline: view();            /* timeline = this element entering viewport */
  animation-range: entry 25% cover 50%;
}
```
For complex blinds/iris wipes use a responsive SVG `viewBox="0 0 100 100"` `<mask>` (black base rect +
white shapes that grow), driven by GSAP ScrollTrigger with `scrub` + small `stagger`; add `+0.01`
overlap and `shape-rendering="crispEdges"` to kill subpixel gaps.
- **Pitfall:** `clip-path: inset()` is cheap/composited; animating mask rect `width/height` is not.
  `animation-timeline: view()` is modern-only — ship as **progressive enhancement** (image visible by
  default) so unsupported browsers don't get blank boxes.

---

## 3. Text over image — readable scrim / overlay
- **Why:** A scrim buys contrast *without* tinting the whole photo flat. The #1 pro solution to text-on-image.
```css
.media { position: relative; }
.media::after {              /* scrim only where the text sits */
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(to top, rgb(0 0 0 / .7) 0%, rgb(0 0 0 / 0) 55%);
}
.media .caption { position: relative; z-index: 1; color: #fff; }
```
Levers, least→most damage to the image: **strip/highlight** behind text only → **copy space** (crop so
text sits where the image is quiet) → **backdrop-blur chip** (`backdrop-filter:blur(8px); background:rgb(0
0 0 /.25)`) → **full tint** (last resort). Add `text-shadow: 0 1px 3px rgb(0 0 0 /.6)` for stray bright
pixels. **WCAG:** body ≥ 4.5:1, large text ≥ 3:1.
- **Pitfall:** A fixed scrim fails on light images — make scrim strength/direction respond, or use a
  darkened variant. Test the *brightest* worst-case photo (CMS images vary).

---

## 4. Masonry & mixed-aspect galleries
- **Why:** Lets images keep **native aspect ratios** — no forced uniform crop — so a gallery feels curated.
```css
/* native (emerging): */
.gallery { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
           grid-template-rows: masonry; gap:1rem; }

/* works today, zero-JS, aspect-driven row span: */
.gallery { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
           grid-auto-rows:8px; gap:1rem; }
.item { grid-row: span var(--span); }   /* --span set per item from its aspect ratio */
.item img { width:100%; height:100%; object-fit:cover; display:block; }
```
CSS columns (`columns:3; break-inside:avoid`) is a no-JS alt but orders top-to-bottom per column.
- **Pitfall:** Native `grid-template-rows: masonry` isn't universally shipped — `@supports` feature-detect
  + fall back to the row-span trick. Masonry reading order can confuse keyboard/SR flow; keep DOM order
  logical. Don't masonry < ~6 items (looks accidental).

---

## 5. Breakout / full-bleed / overlap
- **Why:** Text stays at a readable measure while images **break the column to the edges** — the
  contained→full→contained rhythm is the core of editorial layout. (Full grid in `layout-and-composition.md §1`.)
- **Overlap depth:** negative margin or `transform: translateY()` to pull an image up over the section
  above; pair with `z-index` + soft shadow.
- **Pitfall:** `width:100vw; margin-left:calc(50% - 50vw)` causes horizontal scroll with a scrollbar present — the grid-breakout method avoids it. Reset overlaps to a clean stack on mobile.

---

## 6. Device / browser mockups & tilted 3D screenshots
- **Why:** A raw screenshot reads flat/dev-ish; a framed, slightly tilted device gives physicality and
  "real product" credibility.
```css
.scene { perspective: 1200px; }
.device {
  transform: rotateX(8deg) rotateY(-18deg) rotateZ(-2deg);
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 40px 80px -20px rgb(0 0 0 / .45);
  transition: transform .5s ease;
}
.scene:hover .device { transform: rotateX(2deg) rotateY(-6deg); } /* settle on hover */
```
Layered "real glass" look: stack ~6 composited layers (bezel/glass/screen/glare/shadow) pushed apart on
Z (`translateZ`). Browser chrome: a thin top bar + three dots signals "web app."
- **Pitfall:** Steep tilts murder UI legibility — keep ≤20° if the screenshot must be readable. Bake at 2× and `object-fit: cover`; CSS-scaling a small PNG looks cheap.

---

## 7. Collage / scattered / pinned-photo
- **Why:** Slight rotations, overlap, varied sizes read as hand-arranged (pinboard/polaroid) — warm,
  human, anti-template. Strong for about/brand/lifestyle.
```css
.collage { position: relative; }
.collage .photo { position: absolute; border: 10px solid #fff; box-shadow: 0 12px 24px rgb(0 0 0 / .18); }
.photo:nth-child(1){ rotate:-6deg; inset:0 auto auto 4%;  z-index:2; }
.photo:nth-child(2){ rotate: 4deg; inset:12% 6% auto auto; z-index:1; }
.photo:nth-child(3){ rotate:-2deg; inset:auto auto 0 28%;  z-index:3; }
.photo:hover { rotate:0deg; z-index:9; transition:rotate .3s; } /* straighten on hover */
```
Add a "pin"/"tape" `::before` for the corkboard look.
- **Pitfall:** Absolute positioning doesn't reflow — provide a stacked/grid fallback under mobile, keep
  DOM order meaningful (SR reads it).

---

## 8. Ken Burns / slow zoom & parallax
- **Why:** Subtle continuous motion (12–20s pan-zoom, or bg drifting slower than fg) makes a static hero
  feel cinematic without video weight.
```css
.kb { overflow: hidden; }
.kb img { width:100%; height:100%; object-fit:cover;
  animation: kb 18s ease-in-out infinite alternate; will-change: transform; }
@keyframes kb { from { transform: scale(1) translate3d(0,0,0); }
                to   { transform: scale(1.12) translate3d(-2%, -2%, 0); } }
```
Use `translate3d`/`scale3d` (GPU) over `background-position`/`margin`. Native scroll parallax:
`animation: drift auto linear both; animation-timeline: scroll();`.
- **Pitfall:** Honor `prefers-reduced-motion` (vestibular safety). Keep zoom ≤1.15 or faces distort;
  container needs `overflow:hidden`.

---

## 9. Foundations: object-fit · aspect-ratio · art direction
- **Why:** `aspect-ratio` reserves space (kills CLS); `object-fit: cover` fills any box without squishing; `<picture>` swaps the *crop* per viewport — keeping every technique above responsive and shift-free.
```css
.card-media { aspect-ratio: 4 / 3; }
.card-media img { width:100%; height:100%; object-fit:cover; object-position:50% 35%; }
```
```html
<picture> <!-- different CROP per viewport, not just size -->
  <source media="(max-width:640px)" srcset="hero-portrait.jpg">
  <source media="(min-width:641px)" srcset="hero-wide.jpg">
  <img src="hero-wide.jpg" alt="…" width="1600" height="900" style="object-fit:cover; aspect-ratio:16/9;">
</picture>
```
- **Pitfall:** `object-fit: cover` silently crops faces/products on extreme ratios — set `object-position`
  and verify. Always ship `width`/`height` attrs **or** `aspect-ratio` to reserve space.
  Use `<picture>` only when the *crop* must change; for mere resolution use `srcset`/`sizes`.

---

## Cheat sheet (goal → primary lever)
| Goal | Lever |
|---|---|
| Hard non-rect shape | `clip-path: polygon()/shape()` |
| Soft/alpha-edged shape | `mask-image` (SVG/gradient) |
| Arch | `border-radius: 50% 50% 0 0 / 35% 35% 0 0` |
| Text legible on photo | `::after` gradient scrim + `text-shadow` |
| Edge-to-edge image | named-line breakout grid `grid-column: full` |
| Depth / overlap | negative margin / `translateY` + `z-index` |
| Tilted screenshot | `perspective` + `rotateX/Y/Z` |
| Reveal on scroll | `animation-timeline: view()` + `clip-path: inset()` |
| Ken Burns | `@keyframes` `scale3d/translate3d` |
| Mixed-aspect gallery | `grid-template-rows: masonry` / aspect row-span |
| No-CLS responsive media | `aspect-ratio` + `object-fit: cover` |
| Per-viewport crop | `<picture>` + `media` |
