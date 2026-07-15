# Stages

The six-stage arc in full, one section per stage: what it's for, which reference file(s) it loads,
what it produces, and how you know it's done. See [usage.md](usage.md#the-six-stage-arc) for the
one-line summary and the enter-at-any-stage rule; for copy-paste prompts into each stage, see
[recipes.md](recipes.md).

## 1. Direction

**For**: deciding the taste/point-of-view — palette, type pairing, register, the one signature move
— and recording it as a formal contract instead of leaving it implicit.

**Loads**: `frontend-design-principles.md` (the taste layer — anti-default direction, the
is-the-product/serves-the-product register doctrine, restraint and self-critique) →
`design-direction.md` (the format + tooling layer — the `DESIGN.md` YAML-front-matter-plus-prose
shape, the `design.md` CLI, the keep-the-brand vs. full-rebrand fork).

**Produces**: a `DESIGN.md` file — YAML front-matter tokens (colors, typography, rounded, spacing,
components) plus prose in canonical section order (Overview, Colors, Typography, Layout, Elevation
& Depth, Shapes, Components, Do's and Don'ts).

**Gate/acceptance**: `design.md lint` passes with no `broken-ref` errors; the file covers at least
`colors` and `typography`, carries a Do's-and-Don'ts section, and no choice matches an unexamined
entry in `anti-default-catalog.md`.

## 2. Structure

**For**: turning a content plan into the site's information architecture — sitemap, nav, footer,
per-page section order, and (the centerpiece) a deduplicated section catalog that becomes the
schema bridge between content modeling and component building.

**Loads**: `section-archetypes.md` — the IA procedure (target sitemap, section catalog, per-page
blueprints, nav/footer) plus a library of prebuilt section-type shapes (hero, feature-cards,
cta-band, faq, testimonial, …) to map onto instead of inventing schemas from scratch.

**Produces**: a target sitemap with `page_type`s, a section catalog (stable keys, typed fields,
`repeatable`/`global`/`interactive` flags), per-page ordered section blueprints with copy-fidelity
decisions (verbatim / preserve-tighten / rewrite), and a nav/footer plan with a resolved logo field.

**Gate/acceptance**: every section key in the catalog is unique; every field's type is from the
fixed content-type vocabulary; every repeatable section is marked a collection candidate and every
shared-value section is marked global; the sitemap references only catalog keys and includes home;
every internal link either resolves to a sitemap page or is a kept nav/footer link routed to a
"not part of the demo" fallback — links are never pruned down to the built set.

## 3. Per-section craft

**For**: designing and shipping one distinctive, non-templated section at a time — the actual CSS
moves, not the plan around them.

**Loads**: `section-design-workflow.md` as the **craft router** — it states the one idea (depth,
tension, one deliberate move) and the device map, then you load only the specific device
reference(s) the chosen move needs: `layout-and-composition.md` · `typography.md` ·
`color-and-rhythm.md` · `depth-and-texture.md` · `decoration.md` · `imagery.md` ·
`motion-and-interaction.md` · `experimental-and-creative.md`, plus the strategy layer —
`niche-and-vertical-design.md` (the premium↔info dial, per-vertical playbooks) ·
`trust-proof-and-structure.md` · `persuasion-and-conversion.md` — when the section's job is
credibility or conversion.

**Produces**: shipped markup/CSS for the section, composed from one bold move + 1–2 supporting
devices, built in grayscale first with color added last.

**Gate/acceptance**: the anti-boring checklist in `section-design-workflow.md` — must be YES on
depth (≥2 planes or a unifying texture), one focal point, a real contrast move, one memorable
signature, the grayscale test, one spacing scale, and the quality floor (responsive, visible
keyboard focus, `prefers-reduced-motion` respected); must be NO on every named AI-slop tell
(centered-everything, three identical feature cards, emoji-as-icons, predictable 01/02/03 markers,
more than two bold moves fighting each other).

## 4. Build

**For**: turning the design spec and section catalog into a runnable, good-looking Next.js app.

**Loads**: `frontend-build-patterns.md` (scaffold conventions, the one-client-component-per-section
discipline, the component-registry pattern, content/data wiring, craft gotchas, the HTML/CSS/JS
guidelines) · `tailwind-v4-theme.md` (mapping `DESIGN.md` tokens onto Tailwind v4's `@theme`
namespaces without the `max-w-*` collision).

**Produces**: a scaffolded Next.js app; one `'use client'` component per catalog section key; a
fail-loud `sectionMap` registry; a Tailwind v4 theme built from the generated `design.md` export
plus a hand-authored companion `@theme` block for the namespaces the export can't emit (container
widths, shadows, ease/animate curves, aspect ratios).

**Gate/acceptance**: a component exists for every section key with no registry gaps (fails loud on
a miss, never silent); the build is green **and** desktop + mobile screenshots show no unresolved
layout/visual defect; routes match the target sitemap; unresolved media falls back to a logged
placeholder, never silently; every kept nav/footer link resolves to a real page or the fallback
notice; every redirect-map entry (if routes were restructured) returns a permanent redirect.

## 5. Art review

**For**: the eye that set the direction judging the *built* site section by section — design taste,
not a test runner — and handing back a punch-list the builder can act on without the reviewer
present.

**Loads**: `art-review.md` — capture-at-full-resolution procedure, the per-section walk (direction
fidelity, composition, rhythm, iconography, micro-typography, anti-slop tells,
desktop↔mobile), and the severity model.

**Produces**: a structured review record per round — `verdict` (`approve`/`revise`), a per-section
`direction_fidelity` read, a `blocking` list of A0/A1 findings each with a concrete fix, a separate
`notes` list of advisory A2/A3 items.

**Gate/acceptance**: severities are **A0** (direction violation — blocks), **A1** (composition/
rhythm failure or a real detail defect — blocks), **A2** (refinement — advisory), **A3** (delight —
advisory). **Round 1 never signs off** — even with zero A0/A1, it promotes the 1–3 highest-value
refinements into the blocking list so at least one build→review→fix cycle happens. From round 2 on,
`approve` the moment A0/A1 are clear; cap the loop at a hard round limit (default 3) and proceed
with the findings recorded if blockers remain at the cap.

## 6. Critique / QA gate

**For**: a scored, severity-routed correctness-and-usability pass that turns "looks good" into a
go/no-go — the mechanical counterpart to art review's taste judgment.

**Loads**: `design-critique.md` (Nielsen's 10 heuristics scored 0–4 each, cognitive-load
classification, the five test personas, mechanical checks, the P0–P3 severity router, the
coverage/build-health/screenshot gates that turn this into a ship gate) ·
`anti-default-catalog.md` (the named-tell reference the mechanical checks and the review both
check drafts against).

**Produces**: a Nielsen score out of 40 (with per-heuristic breakdown, not just the total), a
cognitive-load read, persona-walk notes, mechanical-check results, and a P0–P3 severity-routed
finding list with an explicit go/no-go.

**Gate/acceptance**: **any P0, or a P1 you can't immediately fix, is a NO-GO** — a broken core flow
or a missing rendered section is a blocker regardless of how good the visual polish is elsewhere.
Honesty calibration: most real, shipped interfaces score 20–32/40 on the Nielsen pass; a 38 means
you aren't looking hard enough.

## Standalone stages

Stages 1, 3, 5, and 6 don't require running the full arc: set a direction without building, run the
craft router for a single section, critique a page you didn't build, or art-review a build against
a `DESIGN.md` someone else wrote.
