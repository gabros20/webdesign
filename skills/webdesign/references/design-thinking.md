# Design Thinking, Composition & Critique

Purpose: Choose, compose, and self-critique a coherent visual approach instead of accumulating unrelated techniques.

Read when:
- The agent must decide among composition options or explain why a visual move fits the brief.

Skip when:
- The direction and composition are already approved and only mechanical implementation remains.

Inputs:
- Brief, direction, content hierarchy, and candidate ideas.

Produces:
- A justified composition choice, refinement pass, and critique.

## Contents

- Composition process
- Core composition principles
- Templated-design diagnosis
- One bold move and restraint
- Refinement checklist
- Critique framework

How a strong designer *decides what to do* and *judges it*. This is the layer that prevents a pile of
techniques from reading as templated. Pairs with the direction layer — the taste/point-of-view that
sets palette, type, and brand register ([frontend-design-principles.md](frontend-design-principles.md))
and records it as a formal design-system contract ([design-direction.md](design-direction.md)).

---

## B1. How a strong designer composes a section (process)
Order of operations the pros actually follow:
1. **Decide the section's ONE job** (one message, one primary action) before any visuals. Can't name it
   in a sentence → the layout will be mushy.
2. **Establish hierarchy first in grayscale** — set scale/weight/spacing so the eye lands in the right
   order with zero color. Color comes last.
3. **Set a type scale:** headings ~2–3× body (16px body → 32–48px H2). Three levels only: heading /
   subhead / body. Need more emphasis? change weight or color, not size.
4. **Spacing as relationships (proximity):** related items tight, groups separated by clearly larger
   space. Inconsistent gaps read as broken.
5. **Grid + alignment:** snap to a 12-col grid with consistent gutters; one shared left edge does more
   for "intentional" than any decoration.
6. **One bold move + restraint** (B4).
7. **Refinement pass** (B5).

## B2. Core composition principles (apply + heuristic)
- **Contrast** — the eye goes to maximum difference; create it with *size/weight/color/space*, not just
  color. *Heuristic:* one element per section is unambiguously the biggest/boldest. If everything's bold,
  nothing is.
- **Hierarchy** — controls reading order. *Heuristic:* squint; you should still see #1, #2, #3. If they
  flatten, increase scale/weight/space contrast.
- **Rhythm/repetition** — repeated margins, header treatments, card patterns give scannability and a
  "system." *Heuristic:* reuse a small set of spacing/radius/type tokens everywhere; novelty per-section = chaos.
- **Balance** — distribute visual weight; asymmetric is fine if in equilibrium. *Heuristic:* check for a
  "heavy corner"; counterweight it.
- **Proximity** — closeness = relationship. *Heuristic:* gap *between* groups must be visibly larger than
  gap *within* a group.
- **Alignment** — shared edges = order. *Heuristic:* count distinct left edges; fewer is cleaner.
  Center-align headlines yes, long copy no.
- **Whitespace** — generous negative space = perceived premium + focus. *Heuristic:* when in doubt,
  remove an element and add space rather than fill it.

## B3. Why designs read "templated / AI / boring" — and the fixes
**Causes:** models default to the most statistically common pattern — hero + 3 feature cards +
testimonials + pricing + CTA, **Inter** type, **indigo-600 / slate-900**, even spacing, stock everything.
It's the average of a billion tutorials. The model optimizes for coherence/usability, not originality,
and isn't rewarded for risk.

**Fixes (system-level, not per-component):**
- **Kill the default font** — swap Inter for a font with a viewpoint (a distinctive grotesk, or serif
  headline + clean sans body for editorial contrast). See `typography.md`.
- **Kill the default color** — replace indigo/slate with an owned palette; ration ONE accent to the
  single primary action per screen. See `color-and-rhythm.md`.
- **Break the symmetric grid once** — one asymmetric/editorial moment per page (off-center hero,
  oversized number, full-bleed image). See `layout-and-composition.md §3`.
- **Vary section rhythm** — alternate density, alignment, and bleed; not every section is centered-text-
  over-3-cards. See `color-and-rhythm.md §1`.
- **Real content** — specific copy/photography over lorem + stock; generic content is the loudest "AI" tell.
- **Intentional micro-interactions** — one or two considered ones signal craft. See `motion-and-interaction.md`.
- **Feed references, not adjectives** — "make it premium" yields the average; concrete UI references push
  off the default attractor.

## B4. "One bold move + restraint" (the editorial philosophy)
The shared trait of Linear/Stripe/Vercel/Notion is **restraint, not a look**: fewer choices, each
intentional and consistent. The formula — pick **one** memorable, opinionated element per section/page
(a giant type lockup, a single saturated accent, one striking image, one unusual layout break), then make
**everything else quiet and disciplined** so that move lands. Two bold moves compete and cancel; zero =
generic. *Heuristic:* "What is the one thing someone remembers about this section?" If the answer is
"nothing" or "five things," recompose.

## B5. Refinement pass checklist (run before shipping a section)
- **Squint test** — hierarchy survives blur? Primary action still obvious?
- **Grayscale test** — works with color removed? (proves hierarchy isn't propped up by color alone)
- **Alignment audit** — count left edges; collapse strays to the grid.
- **Spacing audit** — within-group gaps < between-group gaps, consistently; values from one scale (4/8px base).
- **Type audit** — ≤3 sizes, ≤2 families, body line length 45–75ch; headings on the scale.
- **Color audit** — one accent, used once for the primary action; WCAG AA contrast (4.5:1 text).
- **Remove-one test** — can any element be deleted without loss? If yes, delete it and add space.
- **Consistency** — radii, shadows, button styles, icon weight all from one token set.

## B6. Critique framework (how to judge it — and give feedback)
- **Separate taste from function.** Ban "I like / I don't like." Anchor every note to a goal: user task,
  hierarchy, readability, conversion, accessibility, brand. "The CTA loses to the image because it has
  less contrast" beats "the button feels off."
- **Structure feedback** with *I like / I wish / What if* — what works, a constructive gap, an
  exploratory option.
- **Dimensions to score** (usable rubric): hierarchy & focal point · spacing & rhythm consistency ·
  alignment/grid discipline · type system · color discipline (accent rationing + contrast) · whitespace ·
  the one bold move (memorability) · motion purposefulness · accessibility (contrast, reduced-motion,
  focus states) · reads intentional vs templated.
- **Order:** section job → hierarchy → system consistency → polish. Don't critique a gradient before the
  reading order is right.

> For a heavier structured pass — Nielsen heuristics scored 0–40, cognitive-load checks, test personas,
> P0–P3 severity — use [design-critique.md](design-critique.md); for the token-level "AI tells" catalog
> (cream/sand OKLCH band, reflex-reject fonts, ghost-card defects) run a draft against
> [anti-default-catalog.md](anti-default-catalog.md). The checklist above (B5) and this critique
> framework (B6) stand on their own when a quick pass is all you need.
