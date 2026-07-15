# Typography

Type carries the personality of a section — make it a memorable element, not a neutral delivery vehicle.
Each entry: **why → how → pitfall.** Hard limits that keep it from looking templated: **≤2 families,
≤3 sizes per section, body line length 45–75ch.**

---

## 1. Modular type scale (the backbone)
- **Why:** A consistent ratio between sizes makes hierarchy feel composed, not arbitrary.
- **How:** Pick a ratio and step from a base. Common ratios: **1.2** (minor third, subtle/dense UI),
  **1.25** (major third), **1.333** (perfect fourth — punchy, marketing), **1.5** (perfect fifth — very
  editorial). Expose as tokens.
```css
:root {
  --step-0: 1rem;                          /* body */
  --step-1: calc(var(--step-0) * 1.25);    /* 1.25 ratio */
  --step-2: calc(var(--step-1) * 1.25);
  --step-3: calc(var(--step-2) * 1.25);
}
```
- **Pitfall:** Don't invent a 4th heading size to add emphasis — change **weight or color** instead. Too
  many rungs flattens hierarchy.

## 2. Fluid typography with `clamp()`
- **Why:** Smoothly scales between a min and max across viewports — no breakpoint jumps (which cause CLS
  penalties), and respects browser zoom (mixing `rem` with `vw` satisfies WCAG 1.4.4).
- **How:** `font-size: clamp(MIN, PREFERRED, MAX)` where PREFERRED mixes a `vw` term with a `rem` term.
```css
h1 { font-size: clamp(2.5rem, 1.5rem + 5vw, 5rem); }   /* 40px → 80px */
p  { font-size: clamp(1rem, 0.95rem + 0.4vw, 1.125rem); }
```
- Generate scales without manual math: fluid-type-scale.com, clampgen.com.
- **Pitfall:** A `vw`-only preferred value (no `rem` term) breaks zoom accessibility. Always keep a `rem`
  anchor in the middle term. Set sane MIN so mobile stays readable.

## 3. Oversized / display typography (type as the hero)
- **Why:** Headlines at 8–20vw make the *type itself* the visual — replaces the hero image, weighs a
  fraction of a KB, renders instantly. The dominant 2025/26 hero move.
- **How:** Big size + **negative tracking** + tight leading. Large type needs letter-spacing pulled in;
  body needs it left alone.
```css
.display {
  font-size: clamp(3rem, 8vw, 9rem);
  letter-spacing: -0.03em;     /* -0.02 to -0.04em on big type */
  line-height: 0.95;           /* tight leading on display */
  text-wrap: balance;          /* even line lengths on headings */
  font-weight: 600;
}
```
- **Pitfall:** Negative tracking that's too aggressive collides glyphs; tight leading on multi-line display
  needs testing. Keep high contrast against the background — big moving/over-image type fails fast if low-contrast.

## 4. Font pairing (deliberate contrast)
- **Why:** A characterful display + clean body creates hierarchy and personality. The most common mistake
  is pairing two fonts that are *too similar*.
- **Rules:** Share one quality, contrast another (humanist sans + humanist serif; geometric display +
  geometric body). Safest options:
  - **Superfamily** (serif + sans designed together — guaranteed to harmonize).
  - **One family, many weights** (Inter/Work Sans: Black headings, Regular body, Italic emphasis) — clean
    but be aware Inter-as-default is itself an "AI tell" (B3); give it a viewpoint or swap it.
  - **Grotesque + serif:** Neue Montreal (clean grotesque) + Editorial New (high-contrast serif) =
    modern-meets-classic. **Space Grotesk / Space Mono** for tech/AI/crypto.
  - **Mono accent:** a mono face for captions/labels/data adds a technical register.
- **How:** Body 16–18px, `display=swap` on font URLs, load only the weights you use, prefer variable fonts
  (all weights, one file).
- **Pitfall:** Two display faces fight; two near-identical sans read as a mistake, not a pairing. Pair by
  *role* (display / body / utility), not by vibe.

## 5. Kinetic / variable-font typography (motion in the letters)
- **Why:** Variable fonts let you animate weight/width/optical-size axes in real time — cheap, native,
  expressive. Reads as crafted and alive.
- **How:** animate `font-variation-settings` (e.g. `'wght'`) on hover/scroll; or letter-by-letter reveal;
  or a horizontal marquee of type (`motion-and-interaction.md §A9`).
```css
.kinetic { font-variation-settings: 'wght' 400; transition: font-variation-settings .3s ease; }
.kinetic:hover { font-variation-settings: 'wght' 800; }
```
For scroll-scrubbed weight shifts, drive `--wght` from a scroll-driven animation. Morphing, liquid motion,
and animated collage are the trending kinetic techniques.
- **Pitfall:** Animating `font-variation-settings` can trigger layout (reflow) on width/weight changes —
  keep it to small elements or accept the cost; test perf. Moving type must stay high-contrast to remain
  readable. Honor `prefers-reduced-motion`.

## 6. Watermark / faint enlarged characters (ghost type as depth)
- **Why:** A huge ghosted word, number, or single letter behind content at low opacity adds depth and
  reinforces brand — the "faint enlarged characters" device. Also doubles as a section divider/eyebrow.
- **How:** an absolutely-positioned giant glyph behind the content plane, very low opacity (or an outline
  via `-webkit-text-stroke` with transparent fill).
```css
.ghost {
  position:absolute; inset:auto auto -5% -2%; z-index:0; pointer-events:none;
  font-size: clamp(8rem, 30vw, 24rem); font-weight: 800; line-height: 1;
  color: transparent; -webkit-text-stroke: 1px rgb(255 255 255 / .06);   /* outline ghost */
  /* or: color: rgb(255 255 255 / .04);  for a solid faint fill */
}
```
- **Pitfall:** Keep opacity low (≤8%) or it competes with the foreground; ensure it never reduces contrast
  of real text in front of it. `aria-hidden` it / use a pseudo-element so screen readers skip the decoration.

## 7. Body readability (the unglamorous rule that sells the rest)
- **Why:** All the display drama collapses if the body is hard to read.
- **How:** body 16–18px; **line length 45–75ch** (`max-width: 65ch`); line-height ~1.5–1.65 for body,
  tighter for headings; left-align long copy (never justify or center paragraphs); establish a vertical
  rhythm (consistent spacing multiples).
- **Pitfall:** Full-width body text (>75ch) tanks readability; centered multi-line paragraphs are hard to
  track. Contrast ≥ 4.5:1 for body.

---

## Quick recipe
Display headline (`clamp` + `-0.03em` tracking + `line-height:.95`) · one supporting body face at 16–18px,
65ch · optional mono utility face for labels/data · one ghost watermark glyph behind for depth · variable
font for any motion. That's a complete, distinctive type system in two families.
