# Section Design Workflow

Purpose: Select one bold visual move and the smallest craft-device set needed to design a distinctive section.

Read when:
- The request designs, composes, or builds one landing or marketing section.

Skip when:
- The request covers full-site information architecture or only final review.

Inputs:
- Section job, content hierarchy, direction, assets, and technical constraints.

Produces:
- A section concept, selected device routes, implementation plan, and anti-boring check.

## Contents

- The one idea everything serves
- The device map — what to reach for, and where it's documented
- Quick recipes (composite moves that reliably land)
- The anti-boring checklist (run on every section before shipping)
- Working method

This is the craft layer for designing distinctive, non-templated webpage sections — the layered,
intentional kind trending on Godly/Awwwards/Linear/Stripe/Vercel — plus the strategy layer for designing
for a specific business niche (architect, law firm, SaaS, luxury, healthcare…). Use it when designing,
composing, or building any landing/marketing section (hero, features, CTA, gallery, etc.) and you want
concrete, copy-pasteable craft: layout systems, typography, depth/layering, decorative devices, color
rhythm, image presentation, motion, experimental WebGL — plus per-vertical playbooks, the
premium↔information dial, trust/proof/E-E-A-T + SEO structure, and ethical persuasion/conversion.

This craft complements the direction layer that sets palette, type, and brand register
([frontend-design-principles.md](frontend-design-principles.md), recorded as a
[design-direction.md](design-direction.md) contract) — this file is about the concrete *moves* within
that direction: the layout system, the layered depth, the decorative device, the way an image is
presented, the motion — and the CSS to ship them.

## The one idea everything serves

> **A boring section is one flat plane: text + an image-square on a solid fill.**
> A great section has **depth** (layers in Z), **tension** (asymmetry / scale contrast), and **one
> deliberate move** no template would make — executed with restraint everywhere else.

Three laws follow from this, and they govern every technique in the references:

1. **Depth over flatness.** Resolve a section into ≥2 planes (background field → mid subject →
   foreground accents). A single shared grain layer, a glow behind, a card floating on layered
   shadow — any of these turns a panel into a space. → `depth-and-texture.md`
2. **Contrast creates interest.** Manufacture difference in *scale* (huge type vs tiny label),
   *weight*, *color* (light vs inverted), *and depth*. Even spacing + even weight = forgettable.
   One element per section is unambiguously the biggest/boldest. → `design-thinking.md`
3. **One bold move + restraint.** Spend boldness in ONE place (a giant type lockup, a single
   saturated accent, one unusual layout break, one striking image, one experimental interaction),
   keep everything else quiet so that move lands. Two bold moves compete and cancel; zero = generic.
   This is also the Awwwards rule — every Site-of-the-Day has *one* signature moment, not twenty
   effects; custom-built beats template; performance is part of the design. → `design-thinking.md`,
   `experimental-and-creative.md`

**The cardinal rule of this whole workflow: use one or two devices per section, executed precisely —
never all of them at once.** A pile of effects is as templated as no effects.

### The fourth law — design for the *business*, not "a website"

A section doesn't exist in the abstract; it serves a **specific niche, audience, and goal**. The same hero
is wrong for a wealth manager and a creative agency. So before the moves, set the **premium↔information
dial**:

> A niche site must be **premium** (noticed, remembered, trusted as high-quality) *and* deliver
> **information + proof** (answer questions, prove competence, reduce risk). Premium is signaled by what
> you leave OUT (whitespace, restraint, one idea, craft story); proof by structured DENSITY (scannable
> IA, credentials/E-E-A-T, case results, social proof by the CTA). **Don't blend them — sequence them:**
> a restrained emotional hero → progressively denser proof as the visitor scrolls and self-qualifies → a
> low-friction action. **Where you set the dial is decided by stakes & emotion**, not taste: higher
> money/health/legal risk → proof leads, register goes conservative (finance, healthcare, law);
> lifestyle/prestige-driven → premium can lead (luxury, high-end real estate) — but proof always carries
> equal final weight. Never let aesthetics bury the phone number, the credentials, or the next step.

Pick the vertical playbook + dial from `niche-and-vertical-design.md`; pull proof mechanics from
`trust-proof-and-structure.md` and conversion mechanics from `persuasion-and-conversion.md`.

## The device map — what to reach for, and where it's documented

| You want to… | Reach for | Reference |
|---|---|---|
| Lay out the section / break the obvious grid | breakout grid, bento, asymmetry, overlap, hierarchy, Gestalt | `layout-and-composition.md` |
| Make type the hero | modular/fluid scale, oversized display, pairing, kinetic, watermark type | `typography.md` |
| Make it feel 3D / premium / not flat | Z-planes, grain/noise, aurora glow, layered shadows, glass, 3D tilt, parallax | `depth-and-texture.md` |
| Add clever decoration | SVG patterns, wave/blob dividers, lines/connectors, PNG cutouts, logo-as-texture | `decoration.md` |
| Set color & section rhythm | inverted light↔dark cadence, OKLCH palette, one-accent discipline, duotone | `color-and-rhythm.md` |
| Present images as more than squares | clip-path/mask shapes, scrims, masonry, mockups, collage, Ken Burns, bleed | `imagery.md` |
| Add motion / interaction | scroll-driven reveals, pinned scrollytelling, magnetic buttons, marquee, GSAP/Lenis | `motion-and-interaction.md` |
| Go Awwwards-tier / experimental | WebGL/shader bg, canvas particles, custom cursors, View Transitions, generative accents | `experimental-and-creative.md` |
| Design for a *specific business/niche* | per-vertical playbooks (architect, law, SaaS, luxury…), the premium↔info dial | `niche-and-vertical-design.md` |
| Build credibility / proof / findability | E-E-A-T, social proof, info architecture, SEO/semantic structure, case-study anatomy | `trust-proof-and-structure.md` |
| Drive & convert the user (ethically) | Cialdini, cognitive biases, conversion-centered design, copy↔design, pricing psychology | `persuasion-and-conversion.md` |
| Decide *what* to do & judge it | composition process, the "AI-slop" tells + fixes, critique checklist | `design-thinking.md` |

**Load the reference(s) for the move you're making** — don't load all eight. Designing a hero?
Likely `layout` + `typography` + `depth`. A logo strip? `motion` (marquee) + `decoration`. A gallery?
`imagery` + `layout`. Always finish against the checklist below.

## Quick recipes (composite moves that reliably land)

- **Premium dark hero:** dark canvas + `isolation:isolate` → aurora glow behind (`depth §3`) →
  tilted product screenshot mid-plane (`depth §6`) → one glass chip floating in foreground
  (`depth §5`) → one shared grain layer at ~5% overlay (`depth §2`) → oversized tight headline
  (`typography`). One accent on the CTA only.
- **Editorial feature:** named-line breakout grid (`layout §1`) → full-bleed image breaking the
  measure → arch- or angle-masked secondary image (`imagery §1`) → serif display + clean body
  pairing (`typography`).
- **"Look how much we do" section:** bento grid with `grid-auto-flow:dense` (`layout §2`), each tile
  a different content type, one hero tile 2× the rest. Container-query the tile internals.
- **Section rhythm across a page:** alternate light → inverted dark → light (`color §1`); the dark
  section is the CTA/"chapter break" and reads premium.
- **Brand/about warmth:** scattered pinned-photo collage (`imagery §7`) + a faint oversized
  watermark word behind (`typography` + `decoration`).
- **Awwwards hero (one signature):** a single lazy-loaded WebGL shader gradient OR cursor-reactive
  particle field (`experimental §1–2`) + a custom lerping cursor (`experimental §3`) — then keep the
  rest of the page disciplined CSS. Static grain/gradient fallback for reduced-motion.
- **Architect / premium-creative homepage (premium↔proof sequenced):** restrained image-led hero (large
  architectural photography, whitespace, `layout §1` breakout + `typography` display) → curated portfolio
  grid (`imagery` masonry/bento) → per-project case study (challenge→solution→outcome with process
  artifacts, `trust-proof §6`) → Team page block (real headshots + credentials) → proof strip (awards/
  press/testimonials, `trust-proof §3`) → low-friction "book a consult" CTA. Dial: balanced, tilting to
  proof (`niche-and-vertical-design`).

## The anti-boring checklist (run on every section before shipping)

Section fails if you answer "no" to the top block or "yes" to the bottom block.

**Must be YES:**
- [ ] **Depth:** are there ≥2 visual planes, or at least one unifying texture/glow/shadow? (not one flat fill)
- [ ] **One focal point:** squint — is it obvious what's #1? Exactly one element is biggest/boldest.
- [ ] **Contrast move:** is there a real jump in scale OR weight OR color OR depth somewhere?
- [ ] **One signature:** what's the one thing someone remembers here? (if "nothing" → recompose)
- [ ] **Grayscale test:** hierarchy still reads with color removed? (proves it's not propped up by color)
- [ ] **Spacing system:** gaps come from one scale (4/8px base); within-group gap < between-group gap.
- [ ] **Quality floor:** responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected.

**Must be NO (the "AI-slop" tells — any one is a hit):**
- [ ] Centered-everything with even spacing throughout.
- [ ] Three identical equal-width feature cards as the only idea.
- [ ] Every section the same rhythm (centered text over a uniform card grid).
- [ ] Weak heading↔body contrast; default Inter + indigo-600/slate-900; purple/gradient decoration for its own sake.
- [ ] Emoji used as icons; predictable 01/02/03 markers on content that isn't actually a sequence.
- [ ] More than two "bold moves" fighting in one section.

Full rationale and fixes for each tell: `design-thinking.md` (§B3–B5).

## Working method

1. Name the **niche, ideal client, and the section's one job** (one message, one action). Set the
   **premium↔info dial** for the surface from `niche-and-vertical-design.md` (the vertical playbook +
   brand↔info axis table).
2. Pick the **register** — is this section *the product* (distinctiveness is the bar) or does it
   *serve* the product (earned familiarity is the bar)? This can invert choices; the full doctrine
   is in
   [frontend-design-principles.md](frontend-design-principles.md#register-is-the-design-the-product-or-does-it-serve-it).
3. Choose **one bold move** for the section and the **1–2 devices** that deliver it. Load those refs;
   add the proof/conversion mechanics (`trust-proof-and-structure.md`, `persuasion-and-conversion.md`)
   where the section's job is credibility or action.
4. Build hierarchy in **grayscale first**; add color last (one accent).
5. Run the **anti-boring checklist**. Remove one accessory (Chanel rule) before you ship.
