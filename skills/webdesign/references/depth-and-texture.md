# Depth, Layering & Texture

Purpose: Create premium spatial depth through planes, light, texture, shadow, and optional motion.

Read when:
- A section feels visually flat or needs deliberate foreground, midground, and background separation.

Skip when:
- The surface is a dense utility UI where added depth would reduce clarity.

Inputs:
- Section hierarchy, background, focal element, and performance constraints.

Produces:
- A layered depth treatment with CSS mechanisms and fallback behavior.

## Contents

- 1. Z-AXIS PLANE COMPOSITION (the foundation)
- 2. NOISE / FILM-GRAIN TEXTURE (the unifier — highest ROI)
- 3. AURORA / GRADIENT-MESH GLOW (midground light)
- 4. LAYERED SHADOWS / ELEVATION (the "floating" feel)
- 5. GLASSMORPHISM / FROSTED GLASS (foreground cards, tastefully)
- 6. 3D TILT / PERSPECTIVE ON PRODUCT UI (midground hero)
- 7. PARALLAX / DEPTH-ON-SCROLL (motion as the closer)
- 8. NEUMORPHISM — know it, mostly avoid it
- QUICK STACK ("make this section feel premium")

The premium "Linear/Stripe/Vercel" feel is **stacked planes + soft light + a faint grain that unifies
them**. Build depth in order: (1) establish a canvas, (2) glow a midground behind it (aurora), (3) float
foreground cards on layered shadows / glass, (4) lay one shared grain layer over the whole section to
fuse it, (5) add motion (parallax/tilt) only as the final 10%.

---

## 1. Z-AXIS PLANE COMPOSITION (the foundation)
- **Why:** The eye reads *foreground → midground → background* as physical distance, so a section stops
  being a flat panel. Cool/dark recede; warm/bright/high-contrast advance.
- **How:** assign explicit stacking + scale per plane; advancing planes get contrast + shadow + slight
  scale-up; receding planes get blur, lower opacity, desaturation.
```css
.section { position: relative; isolation: isolate; background:#0a0a0f; }
.plane-bg  { position:absolute; inset:0; z-index:0; filter:blur(40px); opacity:.6; } /* glow */
.plane-mid { position:relative; z-index:1; transform:scale(1); }                      /* product */
.plane-fg  { position:absolute; z-index:2; filter:drop-shadow(0 20px 40px #0008); }   /* chips */
```
- **Example:** Stripe/Linear hero — dark canvas, aurora bloom behind, tilted screenshot mid, small UI
  tooltips/avatars escaping the frame in front.
- **Pitfall:** without `isolation:isolate` (or a z-index context), `mix-blend-mode` grain and
  `backdrop-filter` glass leak across sections. Always scope the stacking context to the section.

---

## 2. NOISE / FILM-GRAIN TEXTURE (the unifier — highest ROI)
- **Why:** A single faint grain over a section knits gradients, glass and shadows into one material and
  **kills gradient banding**. The most-overlooked reason flat designs look cheap. Pure SVG, no asset.
```css
.grain::after {
  content:""; position:absolute; inset:0; z-index:10; pointer-events:none;
  opacity:.06;                 /* 0.03–0.08 is the tasteful band */
  mix-blend-mode: overlay;     /* or soft-light (subtler) / multiply (darker) */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```
- **Levers:** `baseFrequency` = grain size — **0.6–0.9 = fine film grain**, ~0.2 = blotchy clouds.
  `type='fractalNoise'` = soft/cloudy, `type='turbulence'` = rippled/liquid. `numOctaves` = detail (2–4).
  `stitchTiles='stitch'` tiles seamlessly.
- **Grainy gradient (banding fix):** put grain *over* a gradient and crush it with
  `filter: contrast(170%) brightness(1000%)` to turn it into pure speckle, then blend.
- **Pitfall:** opacity > 0.1 looks like a broken TV; keep the grain layer static (animating
  `feTurbulence` per frame is expensive). Always `pointer-events:none`.

---

## 3. AURORA / GRADIENT-MESH GLOW (midground light)
- **Why:** Soft colored light bleeding from behind a dark section → background reads as *deep space* not
  a flat fill. Signature of 2025–26 AI/SaaS landing pages.
```css
.aurora { position:absolute; inset:0; z-index:0; overflow:hidden; background:#08080c; }
.aurora::before {
  content:""; position:absolute; inset:-20%;
  background:
    radial-gradient(40% 50% at 20% 30%, #6d28d9 0%, transparent 60%),
    radial-gradient(35% 45% at 75% 25%, #2563eb 0%, transparent 60%),
    radial-gradient(45% 40% at 60% 80%, #db2777 0%, transparent 60%);
  filter: blur(80px);          /* THE key line — turns hard circles into light */
  opacity:.55;
  animation: drift 24s ease-in-out infinite alternate;
}
@keyframes drift { to { transform: translate3d(6%, -4%, 0) rotate(8deg); } }
```
- **Levers:** big `blur()` (60–100px) sells it; animate slowly (15–30s) via `transform` (compositor-cheap).
- **Example:** Aceternity "Aurora Background", Linear's purple/blue bloom.
- **Pitfall:** animate `transform`, never `filter`/`background` (stutters). Keep opacity moderate over
  dark bg or text contrast dies. Add a `prefers-reduced-motion` off-switch.

---

## 4. LAYERED SHADOWS / ELEVATION (the "floating" feel)
- **Why:** Real shadows = a tight dark *contact* shadow + a soft wide *ambient* one. A single
  `box-shadow` is a flat blurred silhouette and reads fake. Stack 3–6 shadows with doubling offset+blur
  and decaying opacity → genuine penumbra.
```css
.e1 { box-shadow: 0 1px 1px hsl(220 40% 2% / .08), 0 2px 2px hsl(220 40% 2% / .08); }
.e3 {
  box-shadow:
    0 1px 2px  hsl(220 40% 2% / .2),
    0 2px 4px  hsl(220 40% 2% / .2),
    0 4px 8px  hsl(220 40% 2% / .2),
    0 8px 16px hsl(220 40% 2% / .2),
    0 16px 32px hsl(220 40% 2% / .2);
}
```
**Rules that signal quality:**
- **One light source:** every shadow shares the same offset ratio (convention: vertical offset = 2×
  horizontal, light from top-left).
- **Elevation ramp:** as things rise, offset ↑, blur ↑, **opacity ↓**. Bake a 3–5 step token scale (`--e0…--e4`).
- **Tint the shadow, never pure black:** `hsl()` matched to bg hue (low sat/light). Pure `#000` looks dead grey.
- `filter: drop-shadow()` instead of `box-shadow` for transparent/odd-shaped elements (contours the alpha).
- **Pitfall:** layered shadows are render-expensive — don't animate them on large elements (animate a
  pseudo-element's `opacity` instead). On dark themes shadows nearly vanish → use **inset rim-light +
  border** for elevation.

---

## 5. GLASSMORPHISM / FROSTED GLASS (foreground cards, tastefully)
- **Why:** `backdrop-filter` blurs *what's behind*, so a card literally sits on a plane in front of the
  aurora/product — the strongest single cue that two planes are separated.
```css
.glass {
  background: rgba(255,255,255,.08);              /* dark UI: keep low, 6–12% */
  backdrop-filter: blur(12px) saturate(160%);     /* saturate revives washed colors */
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  border: 1px solid rgba(255,255,255,.14);        /* 1px low-opacity white = the "edge" */
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25),
              inset 0 1px 0 rgba(255,255,255,.18); /* inset top = glass highlight */
}
```
- **Levers:** blur **8–15px**; bg opacity **8–30%**; the `saturate()` and the **inset top highlight** are
  what separate premium glass from a grey blur.
- **Example:** Apple "Liquid Glass", macOS sidebars, floating nav over hero media.
- **Pitfall:** GPU-heavy — **max 2–3 glass elements per viewport**, never animate `backdrop-filter`, drop
  blur to 6–8px on mobile. Needs a busy/colorful backdrop to read as glass. Ship `-webkit-` prefix + a
  solid fallback (`@supports not (backdrop-filter: blur())`).

---

## 6. 3D TILT / PERSPECTIVE ON PRODUCT UI (midground hero)
- **Why:** A perspective-tilted screenshot turns a flat PNG into an object in space — the canonical SaaS hero.
```css
.stage { perspective: 1200px; }                 /* on the parent */
.ui {
  transform: rotateX(12deg) rotateY(-16deg) rotateZ(2deg) scale(.96);
  transform-style: preserve-3d;
  box-shadow: -40px 40px 80px rgba(0,0,0,.5);   /* shadow follows the tilt direction */
  transition: transform .4s ease;
}
.ui.interactive { transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry)); }
```
JS for mouse-track: `rx = (0.5 - mouseY/h) * MAX_DEG; ry = (mouseX/w - 0.5) * MAX_DEG;`. Add a **glare**
(radial-gradient following cursor) and `translateZ` child elements for parallax-within-the-card.
- **Pitfall:** keep angles subtle (8–16°) — over-rotation looks like a 2010 app-store mockup. Tilt
  distorts text; pair with a 2× asset. Throttle mouse-move with rAF; disable on touch.

---

## 7. PARALLAX / DEPTH-ON-SCROLL (motion as the closer)
- **Why:** Planes moving at different rates on scroll is the most literal depth cue. 2026 way is
  **pure-CSS scroll-driven animations** (compositor thread, 60fps, no main-thread JS).
```css
.hero { animation: parallax-bg linear; animation-timeline: scroll(); }
@keyframes parallax-bg { to { background-position: bottom -400px center; } }

.hero-content {
  animation: rise linear;
  animation-timeline: view(-100px);   /* negative inset = start slightly before visible */
  animation-range: 0% 120%;
}
@keyframes rise { from { translate: 0 60px; } to { translate: 0 -40px; } }
@media (prefers-reduced-motion: reduce){ *{ animation:none !important; } }
```
Legacy broad-support: `perspective:1px` on the scroll container + `translateZ(-2px) scale(3)` on far
layers, `translateZ(0)` near — farther = slower.
- **Pitfall:** parallax that janks scroll feels cheap — keep displacement small (≤ a few hundred px).
  `background-attachment: fixed` is broken on iOS — prefer scroll-timeline/transforms. Always ship the
  `prefers-reduced-motion` kill-switch.

---

## 8. NEUMORPHISM — know it, mostly avoid it
- **Why dated:** dual light/dark inset-shadow "extruded plastic" (peaked ~2020) fails WCAG contrast
  (buttons don't look clickable), breaks in dark mode, can't reuse native components.
- **Where it still works:** sparingly — one toggle/slider thumb/subtle card — *with* a real border for
  affordance. The premium 2026 "soft tactile" equivalent is **glass + layered shadow + grain**, not this.
```css
.neu { background:#e0e5ec; border-radius:20px;
  box-shadow: 8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff; } /* reference only */
```

---

## QUICK STACK ("make this section feel premium")
1. `background:#0a0a0f` dark canvas, `isolation:isolate` on the section.
2. Aurora `::before` (blurred radial spotlights, slow `transform` drift) at `z-index:0`.
3. Product screenshot mid-plane on `perspective:1200px`, ~12° tilt + long directional shadow.
4. Foreground glass cards/chips on a 5-step layered-shadow elevation token scale.
5. One `::after` grain layer, `opacity:.05`, `mix-blend-mode:overlay`, `pointer-events:none`, over everything.
6. Scroll-driven `animation-timeline: scroll()/view()` to move planes at different rates + reduced-motion off-switch.

Tokenize `--canvas`, `--glow-*`, `--e0…--e4`, `--glass-bg/-border/-blur`, `--grain-opacity`. Consistency
across sections is what reads as "designed," not the individual effects.
