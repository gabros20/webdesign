# Decorative Devices

Decoration that **elevates, not clutters**. The test: does it add depth/brand/eye-guidance, or is it noise? Use sparingly — one or two per section. Each entry: **why → how (+ tool) → pitfall (how it looks cheap).**

---

## 1. SVG background patterns (dot grid, blueprint grid, hairlines)
- **Why:** A faint repeating pattern adds texture/depth to a flat fill without competing with content —
  the Vercel/Linear "blueprint" feel.
- **How:** inline an SVG `background-image` (cheaper than a raster, scales crisp). Dot grid via
  `radial-gradient` needs no asset at all:
```css
.dotgrid {
  background-image: radial-gradient(rgb(255 255 255 / .08) 1px, transparent 1px);
  background-size: 24px 24px;
}
.bluelines {  /* graph-paper grid */
  background-image:
    linear-gradient(rgb(255 255 255 / .05) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / .05) 1px, transparent 1px);
  background-size: 40px 40px;
}
```
- Fade edges with a `mask-image: radial-gradient(...)` so it doesn't hit the section border
  hard. Tools: heropatterns.com, fffuel.co, magicpattern.design.
- **Pitfall:** opacity too high turns texture into noise (keep ~3–8%); a hard pattern edge at the section
  boundary looks unfinished — always mask/fade it.

## 2. SVG noise / grain
The highest-ROI texture device; see `depth-and-texture.md §2` (feTurbulence + mix-blend) to unify gradients and kill banding. Cross-reference rather than duplicating.

## 3. Section dividers — waves, slants, curves (clip-path / SVG)
- **Why:** Break the hard horizontal seam between two sections; signal a transition; add organic softness
  or kinetic angle.
- **How:** **Diagonal/slant** with `clip-path` (cheap); **waves/curves** with an inline SVG (clip-path
  polygons can't do smooth curves well).
```css
.slant { clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%); }  /* angled bottom edge */
```
```html
<!-- wave divider: an SVG sitting at the section boundary -->
<svg viewBox="0 0 1440 80" preserveAspectRatio="none" style="display:block;width:100%;height:80px">
  <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#0a0a0f"/>
</svg>
```
- Tools: getwaves.io, haikei.app (layered/stacked waves, blobs, grids), softr SVG wave generator.
- **Pitfall:** Loud rainbow waves read as 2017 Bootstrap. Keep dividers subtle and color-matched to the
  adjacent section; `preserveAspectRatio="none"` so the wave stretches full-width without gaps.

## 4. Organic blobs / shapes as color accents
- **Why:** A soft blob of color behind content adds an accent and organic counterpoint to rectangular layout.
- **How:** an SVG/`clip-path: shape()` blob, or a big blurred radial gradient (see aurora,
  `depth-and-texture.md §3`). Tools: blobmaker.app, css-generators.com/blob, haikei.app.
- **Pitfall:** Hard-edged, saturated blobs look dated; blur or keep them low-saturation and partly off-canvas. One anchored accent only.

## 5. Decorative lines & connectors (lead the eye)
- **Why:** Thin rules guide the eye, connect related elements (cards in a process), or add a hand-made
  underline accent. They should encode something true (a real sequence/connection), not just decorate.
- **How:** hairline borders/pseudo-elements for rules; an inline SVG `path` (optionally
  `stroke-dasharray` animated) for connectors between cards; an SVG squiggle as a headline underline.
```css
.hand-underline { position:relative; }
.hand-underline::after {
  content:""; position:absolute; left:0; right:0; bottom:-.15em; height:.4em;
  background: url("data:image/svg+xml,...squiggle...") no-repeat; background-size:100% 100%;
}
```
- Animate a connector drawing in on scroll via `stroke-dashoffset` + scroll-driven animation.
- **Pitfall:** Connectors implying a false relationship mislead; keep line weights consistent
  with the type's hairline weight or they look bolted on.

## 6. PNG / 3D cutout objects as relevant decorations (Stripe-style)
- **Why:** Small, *relevant* objects/stickers/3D bits at the margins add playful depth and reinforce the subject (a lock for security, a coin for payments, a tiny UI chip) — the Stripe/Linear "scattered relevant objects" look.
- **How:** absolutely-positioned PNGs/SVGs at the foreground plane with `drop-shadow`, slight rotation, and
  a subtle float animation; some breaking the section edge for depth.
```css
.float-obj { position:absolute; filter: drop-shadow(0 12px 24px rgb(0 0 0 / .35));
  animation: bob 6s ease-in-out infinite alternate; }
@keyframes bob { to { transform: translateY(-10px) rotate(-3deg); } }
```
- **Pitfall:** *Relevant* only — random floating shapes read as filler. Keep 2–4 max, vary depth
  (size/blur), `pointer-events:none`, `aria-hidden`, and gate the float on `prefers-reduced-motion`.

## 7. Logo / brand mark as background texture
- **Why:** The brand mark blown up and ghosted, or tiled as a faint watermark, brands the section
  without a literal logo slap.
- **How:** one giant low-opacity mark behind content (like the ghost type in `typography.md §6`), or a
  tiled SVG pattern at ~4% opacity, edge-masked.
- **Pitfall:** Too visible = tacky letterhead; keep ≤6% opacity and behind a clear content plane.

## 8. Gradient mesh / glow decoration
Covered as "aurora" in `depth-and-texture.md §3` — soft desaturated radial glows behind dark sections, far better than a hard linear gradient (the cheap default). Cross-reference.

---

## Generator toolbox (fast, free)
- **Waves/blobs/layered scenes:** haikei.app · getwaves.io · blobmaker.app
- **Patterns:** heropatterns.com · fffuel.co · magicpattern.design
- **Noise:** fffuel.co/nnnoise · (or hand-rolled feTurbulence, `depth-and-texture.md §2`)
- **clip-path shapes:** bennettfeely.com/clippy · 10015.io/tools/css-clip-path-generator

## The discipline
Every decoration must justify itself: **depth, brand, or eye-guidance.** If none of those, cut it
(Chanel rule — remove one accessory before shipping). Loud, saturated, hard-edged decoration is the cheap
tell; faint, color-matched, edge-faded, *relevant* decoration is the premium one.
