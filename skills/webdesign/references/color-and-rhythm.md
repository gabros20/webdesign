# Color & Section Rhythm

Purpose: Choose and implement a disciplined palette and value rhythm across website sections.

Read when:
- The selected section or page needs palette roles, contrast, or light-dark cadence.

Skip when:
- Color is already approved and the task does not change visual color behavior.

Inputs:
- Brand constraints, content sequence, background roles, and accessibility needs.

Produces:
- Palette roles, section cadence, contrast checks, and implementation guidance.

Color does two jobs: **set the palette** (one accent, disciplined neutrals) and **create
rhythm down the page** (alternating value). Each entry: **why → how → pitfall.**

---

## 1. Inverted / alternating light↔dark sections (the rhythm device)
- **Why:** Alternating value (light → dark → light) as you scroll creates a regular cadence and chapter breaks — the single biggest move for long pages to feel *composed*. A dark section reads premium and signals a shift; it's where the CTA/hero often lives.
- **How:** define paired surface tokens and flip them per section; the dark section gets the depth
  treatment (aurora/grain/glass) and the one accent on its CTA.
```css
:root { --bg:#ffffff; --fg:#0a0a0f; --bg-invert:#0a0a0f; --fg-invert:#f4f4f5; }
.section            { background: var(--bg);        color: var(--fg); }
.section--invert    { background: var(--bg-invert); color: var(--fg-invert); isolation:isolate; }
```
- Don't alternate sections mechanically — cluster (light, light, **dark**, light) so the dark
  one lands as an event. Pair with varied *layout* rhythm too (`layout-and-composition.md §5`).
- **Pitfall:** Mechanical zebra striping is a template tell — vary the *interval*. Re-check contrast/accent legibility on both surfaces; an accent tuned for light bg may wash out on dark.

## 2. OKLCH palettes (the modern, perceptually-uniform way)
- **Why:** OKLCH is *perceptually uniform* — equal numeric changes = equal perceived changes, keeping palettes harmonious and contrast predictable. W3C Design Tokens default (Oct 2025); all modern browsers support it.
- **Syntax & ranges:** `oklch(L C H / a)` — **L** 0→1 (black→white), **C** 0→~0.37 (gray→saturated),
  **H** 0–360° (red 20, yellow 90, green 140, blue 220, purple 320).
- **How — build a palette by varying L, holding C/H:**
```css
:root {
  /* neutrals: chroma 0, vary lightness */
  --surface-0: oklch(0.96 0.005 300);
  --surface-1: oklch(1 0 0);
  --text-primary:   oklch(0 0 0);
  --text-secondary: oklch(0.54 0 0);
  /* accents: mid-to-high L + meaningful C + hue */
  --accent: oklch(0.57 0.18 286);
  --danger: oklch(0.59 0.23 7);
}
@media (prefers-color-scheme: dark) {
  :root { --surface-0: oklch(0 0 0); --surface-1: oklch(0.29 0.01 300); --text-primary: oklch(1 0 0); }
}
/* relative-color tweaks keep identity: */
.btn:hover { background: oklch(from var(--accent) calc(l + 0.1) c h); }
```
- **Accessibility shortcut:** Backgrounds with **L ≥ 0.87** generally pair safely with black text; keep the same L across hues so all buttons share contrast.
- **Pitfall:** High chroma can fall outside a screen's gamut — verify at oklch.com. Don't let saturation
  changes drift the hue (OKLCH avoids HSL's hue shift, but only if you change C, not H).

## 3. One accent + disciplined neutrals (60-30-10)
- **Why:** Restraint reads as confidence. A monochrome base + a single accent used *for meaning* (primary
  action, success, danger) — never decoration — is the Linear/Stripe/Vercel signature.
- **How:** **60%** dominant (neutral bg), **30%** secondary (surfaces/text), **10%** accent (CTAs, key
  marks). Build a 5–7 step neutral ramp in OKLCH (vary L, chroma 0 or near-0) + one or two accent hues.
- **Pitfall:** Multiple accents competing = the "AI gradient" look. Keep one accent per screen; everything else neutral. Replacing default indigo-600/slate-900 with an *owned* palette is a top fix for the templated look (`design-thinking.md §B3`).

## 4. Duotone / monochrome imagery
- **Why:** Tinting photography to the palette stops images fighting the design — unifies a section and reads art-directed.
- **How:** CSS blend approach (quick) or SVG `feColorMatrix`/`feComponentTransfer` (precise two-color map).
```css
/* quick duotone: grayscale base + accent multiply + highlight screen */
.duotone { position: relative; filter: grayscale(1) contrast(1.1); }
.duotone::before { content:""; position:absolute; inset:0; mix-blend-mode:multiply;
  background: var(--accent); }   /* shadows take the accent hue */
.duotone::after  { content:""; position:absolute; inset:0; mix-blend-mode:lighten;
  background: #0a0a0f; }
```
- **Pitfall:** Heavy duotone hurts product/detail clarity — reserve it for atmospheric/brand imagery, not
  screenshots that must read. Keep enough luminance range or faces go muddy.

## 5. Gradient meshes & glows (not hard linear gradients)
- **Why:** Soft, desaturated, multi-point radial glows read premium; a hard 2-stop linear gradient reads cheap. Full technique = aurora in `depth-and-texture.md §3`.
- **How:** stacked blurred `radial-gradient`s, big `blur()`, moderate opacity over a dark base. Add a grain layer to kill banding.
- **Pitfall:** Saturated diagonal linear gradients (especially purple→pink) are the canonical AI tell —
  avoid unless the brief demands it.

## 6. Contrast & accessibility (non-negotiable floor)
- Body text ≥ **4.5:1**, large text (≥18pt / 14pt bold) ≥ **3:1** (WCAG AA). Verify on *both* surfaces if
  you alternate (§1) and on the *brightest* image area if text sits over a photo (`imagery.md §3`).
- Never carry meaning by color alone (accent + an icon/label).

---

## Quick recipe
Neutral ramp + ONE accent in OKLCH (vary L, hold C/H) · alternate light↔dark for rhythm, dark sections carrying the CTA + depth treatment · tint imagery to the accent if atmospheric · soft radial glow (never hard linear gradient) + grain on the dark sections · AA contrast on every surface.
