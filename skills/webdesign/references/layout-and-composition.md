# Layout & Composition

Purpose: Choose and implement a distinctive responsive composition for one website section.

Read when:
- A section needs grid structure, asymmetry, hierarchy, overlap, bleed, or whitespace decisions.

Skip when:
- The layout is approved and the task concerns a different device such as imagery or motion.

Inputs:
- Content hierarchy, viewport range, focal element, and surrounding section rhythm.

Produces:
- A selected layout pattern, responsive CSS mechanism, and known pitfalls.

## Contents

- 1. STRUCTURAL GRID TECHNIQUES
- 2. BENTO GRID (the trending mixed-size card pattern)
- 3. ASYMMETRY & BROKEN GRID
- 4. OVERLAP, BLEED & OVERFLOW
- 5. WHITESPACE & VISUAL RHYTHM
- 6. VISUAL HIERARCHY & EYE-FLOW
- 7. GESTALT PRINCIPLES FOR LAYOUT
- 8. THE "PREMIUM SAAS" SYSTEM (Linear / Stripe / Vercel)
- QUICK DECISION HEURISTICS

Techniques for distinctive, non-templated section layout (Linear / Stripe / Vercel / Awwwards / Godly
tier). Each entry: **why → how → example → pitfall.** Use one structural idea per section; break ~20%
of a grid, not 100%.

---

## 1. STRUCTURAL GRID TECHNIQUES

### Full-Bleed Breakout Grid (the foundational pattern)
- **Why:** Solves the core tension — constrained text for readability (~65ch) vs full-width media for
  impact — in ONE layout system, no nested wrappers.
- **How:** Three-column grid; everything defaults to the center column, breakout elements span all.
```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr min(42rem, 100%) 1fr;
}
.wrapper > * { grid-column: 2; }        /* centered, readable */
.full-bleed { grid-column: 1 / -1; }    /* edge-to-edge */
```
- `grid-column: 1 / -1` (count-from-end) is future-proof vs hardcoded line numbers.
- **Example:** Josh Comeau's blog; standard on editorial/SaaS sites.
- **Pitfall:** Avoid `100vw` for full-bleed — it ignores scrollbar width → horizontal scroll. The grid
  approach sidesteps it. If you must use vw, add `overflow-x: hidden` on `html`.

### Multi-Tier Breakout Grid (content → popout → feature → full)
- **Why:** Four graduated widths from one grid, so a section can step content out in deliberate
  increments (quote pops out, image goes feature-width, hero goes full).
- **How:** Named-line grid with concentric zones; `clamp()`/`minmax()` make gutters responsive.
```css
.content {
  --gap: clamp(1rem, 6vw, 3rem);
  --full: minmax(var(--gap), 1fr);
  --content: min(50ch, 100% - var(--gap) * 2);
  --popout: minmax(0, 2rem);
  --feature: minmax(0, 5rem);
  display: grid;
  grid-template-columns:
    [full-start] var(--full)
    [feature-start] var(--feature)
    [popout-start] var(--popout)
    [content-start] var(--content) [content-end]
    var(--popout) [popout-end]
    var(--feature) [feature-end]
    var(--full) [full-end];
}
.content > * { grid-column: content; }
.popout  { grid-column: popout; }
.feature { grid-column: feature; }
.full    { grid-column: full; }
```
- **Example:** Ryan Mulligan's layout-breakouts; long-form editorial templates.
- **Pitfall:** Over-stepping every element defeats it — breakouts work by contrast against a stable
  content column. Use sparingly.

### Named-Line Editorial Grid + Subgrid
- **Why:** Components self-place by *name* (`content`, `center`, `full`) without knowing line numbers;
  subgrid lets nested components align to the master grid at any depth — key to scalable editorial.
- **How:** Name lines with `-start`/`-end`; Grid auto-creates a named area from the pair.
```css
.grid {
  display: grid;
  grid-template-columns:
    [full-start] 1fr [content-start] 2fr [center-start] 1fr [center-end] 2fr [content-end] 1fr [full-end];
}
.item { grid-column: content; }
.full { grid-column: full; }
.content { grid-column: content; display: grid; grid-template-columns: subgrid; } /* child inherits tracks+names */
```
- **Pitfall:** Subgrid requires the child to be a grid *item* of the named-line parent; names only pass
  through actual subgrid, not regular nested grids.

### 12-Column Base with Named Repeats
- **How:** `grid-template-columns: repeat(12, [col-start] minmax(0,1fr));` → place via
  `grid-column: col-start 2 / span 7`.
- **Pitfall:** Use `minmax(0, 1fr)` not bare `1fr` — bare `1fr` won't shrink below content min-size, so
  long content/images blow out the grid.

---

## 2. BENTO GRID (the trending mixed-size card pattern)

- **Why:** Size contrast (wide cards next to compact ones) creates instant hierarchy and guides the eye
  to the priority cell; reads as "organized but lively."
- **How:** 12-col grid + `grid-auto-flow: dense` (the critical line — backfills gaps). Cards span via `span`:
```css
.bento {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-flow: dense;
  gap: 1rem;
}
.primary   { grid-column: span 6; grid-row: span 4; }  /* hero cell */
.secondary { grid-column: span 3; grid-row: span 4; }
.tertiary  { grid-column: span 3; grid-row: span 2; }
@media (min-width: 1280px) { .bento { grid-auto-rows: 1fr; } } /* equal heights desktop only */
```
- Container-query card internals so images adapt to the *card's* width, not the viewport:
  `.card { container-type: inline-size }` then `@container (min-width:…)`. Use `flex-1` on text blocks
  so images bottom-align regardless of copy length. Limit to **6–12 blocks**.
- **Example:** Apple product pages, Linear, Vercel feature sections.
- **Pitfalls:** (1) `grid-auto-rows: 1fr` on mobile creates huge empty gaps — restrict equal-height
  rows to desktop. (2) Prefer cropping (`object-position`) over squashing images to fit cells.
  (3) `dense` can reorder tiles away from DOM order — don't rely on visual order for meaning/tab order.

---

## 3. ASYMMETRY & BROKEN GRID

### Broken Grid
- **Why:** Breaking a rigid grid adds surprise/movement, draws the eye to CTAs, reads bespoke not templated.
- **How:** Start from a real 12-col grid, then *deliberately* let chosen elements offset/overlap/span
  oddly via explicit line placement. Keep ~80% on-grid, break ~20%.
```css
.feature { grid-column: 1 / 7; grid-row: 1 / 3; }
.intro   { grid-column: 5 / 13; grid-row: 2 / 4; } /* overlaps columns 5-6 */
```
- **Pitfall:** Without retained alignment anchors it reads as chaos. Keep ≥1 consistent edge/baseline.

### Asymmetric Balance (visual weight, not equal halves)
- **How:** One dominant element (big image/headline) on one side; counterweight with a cluster of
  smaller items + whitespace on the other. Negative space *is* a counterweight.
- **Pitfall:** Balance by visual *weight*, not pixel count — a small high-contrast element outweighs a
  large pale one. Squint-test; if it tips, redistribute.

### 60/40 Split
- **Why:** 60% dominant leads the eye; 40% gives breathing room (≈ golden ratio). More interesting than 50/50.
- **How:** `grid-template-columns: 3fr 2fr;`. Focal media/headline in the 60, supporting copy/CTA in the 40.
- **Pitfall:** Don't center the focal point — place it at a rule-of-thirds intersection.

---

## 4. OVERLAP, BLEED & OVERFLOW

### Breakout / Bleed
- **How:** See §1 (`grid-column: 1 / -1`). Background-only trick: `section::before { content:'';
  position:absolute; inset:0 -50vw; background:… }`.
- **Pitfall:** Sticky + full-bleed conflict — a full-bleed element inside a transformed/sticky ancestor
  clips; isolate them or use the grid method.

### Intentional Overlap
- **Why:** Overlapping a card onto an image, or a heading bleeding over a section boundary, creates
  depth and signals craft.
- **How:** Negative margins (`margin-top:-4rem`) or grid cell overlap (two items sharing a `grid-row`/
  `grid-column` range) + `z-index`. Grid overlap stays responsive better than negative margins.
```css
.card { grid-column: 2 / 8; grid-row: 1; z-index: 2; }
.img  { grid-column: 6 / 13; grid-row: 1; z-index: 1; } /* overlaps cols 6-7 */
```
- **Pitfall:** Test at every breakpoint — desktop overlaps become unreadable collisions on mobile;
  often collapse to a clean stack on small screens.

---

## 5. WHITESPACE & VISUAL RHYTHM

### Whitespace as a Tool
- **Why:** Empty space isolates and elevates — surrounding a key element with space makes it read as
  important and premium.
- **How:** Two scales — **micro** (line-height, padding, gaps within components) and **macro** (space
  between major sections). Linear/Stripe/Vercel rule: *"take the spacing that feels like enough, then
  double it."* Section vertical padding often `clamp(4rem, 10vw, 10rem)`.
- **Pitfall:** Inconsistent spacing reads as broken, not airy. Whitespace must be *systematic*.

### Visual Rhythm via a Spacing Scale
- **How:** 8px base unit (or 4px). All margins/paddings/gaps are multiples: 8/16/24/32/48/64/96. Expose
  as tokens `--space-1 … --space-8`. Alternate dense/open sections to create cadence.
- **Pitfall:** Too many steps (every 4px) defeats the purpose — pick ~6–8 rungs and stick to them.

---

## 6. VISUAL HIERARCHY & EYE-FLOW

- **F-Pattern (text-heavy pages):** eye scans across top, down left, with horizontal sweeps. Put
  headline + keywords + primary CTA along top and left edge. *Pitfall:* right-side/lower content gets
  ignored — never put the only CTA bottom-right of a text block.
- **Z-Pattern (sparse/hero pages):** top-left → top-right → diagonal → bottom-right. Logo top-left,
  nav/secondary-CTA top-right, headline center-left, primary CTA bottom-right (the Z terminus).
  *Pitfall:* only holds when the page is sparse; density reverts it toward F.
- **Hierarchy levers:** scale (biggest = first read), color/contrast, weight, whitespace/isolation,
  position on the scan path. Establish exactly ONE primary focal point per section. *Pitfall:* if
  everything is emphasized, nothing is.
- **Rule of Thirds / Focal Point:** off-center focal (at a 3×3 intersection) reads dynamic; dead-center
  reads static. Counterbalance with whitespace opposite. *Pitfall:* off-center ≠ misaligned — still
  snap to the grid.

---

## 7. GESTALT PRINCIPLES FOR LAYOUT

- **Proximity** — near elements read as one group; tighten gaps within a group, widen between groups.
  *Pitfall:* equal spacing everywhere destroys grouping.
- **Similarity** — shared color/shape/size = perceived set; make all clickable elements visually
  consistent. *Pitfall:* styling a non-link like a button misleads.
- **Common Region / Enclosure** — group by a shared container/background card.
- **Continuation & Closure** — the eye follows lines/alignment and completes partial shapes; use aligned
  edges to lead between sections.
- **Figure/Ground** — strong subject-vs-background separation (high contrast) makes the focal element pop.
- *General pitfall:* Gestalt cues can fight each other — resolve so one clear grouping wins.

---

## 8. THE "PREMIUM SAAS" SYSTEM (Linear / Stripe / Vercel)

Four reinforcing principles — remove one and the system weakens:
1. **High contrast** — aggressive black-on-white / white-on-black; no muddy mid-tones.
2. **Generous whitespace** — "double the spacing that feels enough." Contrast *needs* whitespace.
3. **Monochrome base + ONE accent** — used for *meaning* (primary action, success, danger), never decoration.
4. **Sharp typography** — geometric, tight faces (Geist) communicate precision.

Plus: faint **blueprint/dot-grid texture** background for depth without clutter; **premium microstates**
(hover/focus/active/disabled/loading/empty each distinct). Anti-pattern ("AI slop"): centered-everything,
three equal feature cards, purple gradient, friendly rounded font, even spacing.

---

## QUICK DECISION HEURISTICS

- Long-form/editorial → named-line breakout grid (§1).
- Feature showcase / "look how much we do" → bento (§2).
- Hero with one goal → Z-pattern + 60/40 split + off-center focal (§3, §6).
- Feel bespoke → break ~20% of a real grid + intentional overlap (§3, §4).
- Feel premium → high contrast + double whitespace + monochrome+1 accent + sharp type (§8).
- Always: 8px spacing scale, one focal point per section, `minmax(0,1fr)` columns, squint-test for balance.
