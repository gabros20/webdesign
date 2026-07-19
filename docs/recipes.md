# Recipes

Copy-paste scenario prompts. Prefix any example with `Use $webdesign to` in Codex. There's no
invocation grammar to compose here (see
[usage.md](usage.md#there-is-no-invocation-grammar)) — each recipe is a natural-language prompt you
hand to an agent with `webdesign` installed. For what each stage actually does and which references
it draws from, see [stages.md](stages.md); for the full pick-by-job table, see
[usage.md](usage.md#route-by-job).

## Direction

### Author a DESIGN.md for `<brand>`, keeping the existing brand

```
Author a DESIGN.md for <brand> — new layout, composition, components, and motion, but keep the
existing brand identity: reuse the current logo and its core brand colors + type.
```
**Enters**: stage 1 (direction), keep-the-brand path. **Loads**: `design-direction.md` (the format
+ the two-path fork) → `frontend-design-principles.md` (register, anti-default direction) →
`anti-default-catalog.md` (check the draft against current tells).

### Full rebrand direction

```
Author a complete new visual identity for <brand> — palette, type, voice, iconography, a signature
element — from the brand strategy/positioning, as a DESIGN.md.
```
**Enters**: stage 1 (direction), full-rebrand path. **Loads**: `design-direction.md` ·
`frontend-design-principles.md` · `anti-default-catalog.md`; pull `niche-and-vertical-design.md` too
if the rebrand needs to set the premium↔information dial for a specific vertical.

## Structure

### Structure a marketing site for `<vertical>`

```
Structure a marketing site for a <vertical> business — sitemap, nav, footer, and a deduplicated
section catalog, sequenced the way this vertical actually converts.
```
**Enters**: stage 2 (structure). **Loads**: `section-archetypes.md` (the IA procedure + the
archetype library) · `niche-and-vertical-design.md` (which vertical playbook, and where the
premium↔information dial sits).

## Per-section craft

### Design a hero section that doesn't look AI-generated

```
Design a hero section for this page. One bold move, real depth, no default look — check it against
the AI-slop tells before you ship it.
```
**Enters**: stage 3 (per-section craft). **Loads**: `section-design-workflow.md` (the craft router
+ device map) → `layout-and-composition.md` + `typography.md` + `depth-and-texture.md` (the usual
hero devices) → `anti-default-catalog.md` (the tell check).

### Make this page look premium

```
Make this page read as premium — set the premium↔information dial for this business, then apply
the depth/decoration moves that signal it without burying the proof.
```
**Enters**: stage 3 (per-section craft), with the dial set from stage 2's vertical playbook.
**Loads**: `niche-and-vertical-design.md` (the premium↔info dial) → `depth-and-texture.md` +
`decoration.md` (the moves that signal premium) → `trust-proof-and-structure.md` (so proof doesn't
get sacrificed for restraint).

## Build

### Map these design tokens into a Tailwind v4 theme

```
Take this DESIGN.md and produce a collision-free Tailwind v4 @theme — export what design.md can
emit, hand-author the rest, and make sure max-w-* still resolves correctly.
```
**Enters**: stage 4 (build). **Loads**: `tailwind-v4-theme.md` (the namespace map, the `max-w`
collision mechanics, the two-`@theme`-block recipe) · `design-direction.md` (the token source and
the `design.md export` command).

## Review

### Art-review this build against DESIGN.md

```
Art-review this build section by section against its DESIGN.md — full-resolution captures, desktop
and mobile, and hand back a punch-list.
```
**Enters**: stage 5 (art review). **Loads**: `art-review.md` (the capture procedure, per-section
walk, A0–A3 severity model, the no-first-pass rule).

### Run a scored design critique / go-no-go

```
Run a scored design critique on this build — Nielsen heuristics, cognitive load, the five test
personas, mechanical checks — and give me a go/no-go.
```
**Enters**: stage 6 (critique/QA gate). **Loads**: `design-critique.md` (the scored rubric, P0–P3
severity routing, the coverage/build-health/screenshot ship gates) · `anti-default-catalog.md` (the
tell reference the mechanical checks draw on).
