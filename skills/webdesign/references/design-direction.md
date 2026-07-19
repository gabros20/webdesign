# Design direction — authoring a project's DESIGN.md

Purpose: Define a website's visual direction as a concrete, reusable DESIGN.md contract.

Read when:
- A project needs visual principles, tokens, typography, layout, motion, or asset direction before build.

Skip when:
- The approved direction already exists and the task only implements it.

Inputs:
- Brand evidence, audience, business goal, content, assets, and technical constraints.

Produces:
- A lintable DESIGN.md with decisions, tokens, signature move, and handoff notes.

## Contents

- The tool: `design.md`
- Authoring procedure
- Acceptance criterion
- What to hand off

How to decide a project's visual direction and record it as a `DESIGN.md` — the design-system
**contract** between "what the design should look like" and "the code that builds it." Author it
once (the look), then export its tokens straight into a Tailwind theme (see
[tailwind-v4-theme.md](tailwind-v4-theme.md)) and build against it. Put the file at the project's
convention for a design-system doc — typically the repo root or `docs/DESIGN.md` — so it's easy
for both humans and coding agents to find.

This pairs two disciplines: the *format + tooling* (this file, `design.md`) and the *taste /
point-of-view* that decides what the tokens and prose should actually say
([frontend-design-principles.md](frontend-design-principles.md) — register, anti-default
direction, critique).

## The tool: `design.md`

`design.md` (npm `@google/design.md`, Apache-2.0, status **alpha**) is a plain-Markdown format for
handing a design system to a coding agent.

**Pin the version — it's alpha and the schema churns.** Run `npx @google/design.md@<pinned>` (or
install `@google/design.md` as a dev dependency at a fixed version). Before authoring, run
`design.md spec` and work against *that* output, not memory — verify the API, don't recall it.

### The format — one file, two layers

A `DESIGN.md` is a single Markdown file:

1. **YAML front-matter** = machine-readable **tokens** (the normative values).
2. **Markdown body** = human-readable **prose** (intent + application rules).

Philosophy: **prose is primary, tokens are secondary context.** A specific reference ("a 1970s
university lecture handout") steers generation better than a list of adjectives or values, and
negative constraints ("Do's and Don'ts") fall out of a specific-enough reference. Author the prose
to carry intent; let tokens pin the exact values.

### Token front-matter

```yaml
version: alpha
name: <required — the only effectively-required field>
description: <optional>
colors:
  <token>: <CSS color — hex #RRGGBB recommended; rgb()/hsl()/oklch()/color-mix() allowed>
typography:
  <token>: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, fontFeature, fontVariation }
rounded:
  <scale>: <Dimension — number + px|em|rem>
spacing:
  <scale>: <Dimension | number>
components:
  <component>:                     # e.g. button-primary
    <prop>: <value | "{token.ref}">
  <component>-hover: { ... }        # variants are SIBLING entries by naming convention
```

- **Token reference**: `{path.to.token}` (e.g. `{colors.primary}`). Must point at a primitive,
  except inside `components` where composite refs (`{typography.label-md}`) are allowed.
- **Component props** (the valid set): `backgroundColor`, `textColor`, `typography`, `rounded`,
  `padding`, `size`, `height`, `width`. Variants/states are separate entries (`button-primary`,
  `button-primary-hover`, `button-primary-active`).
- **Colors** are converted to sRGB for WCAG contrast checking; `#RRGGBB` is the recommended
  default. For perceptual control, author palette values in **OKLCH** instead
  (`oklch(L C H)` — vary L, hold C/H for a harmonious ramp; one accent) and AA-check both surfaces
  when the page alternates light↔dark.

### Prose body — canonical section order

All optional, but present sections **must appear in this order** (out-of-order → `section-order`
warning; duplicate heading → hard error). All `##`:

`Overview` (brand/personality/audience) · `Colors` · `Typography` · `Layout` · `Elevation & Depth`
· `Shapes` · `Components` · `Do's and Don'ts`.

### Extensibility — unknown keys are accepted, not errored

The format takes **any key, any section**. Add `## Motion` (durations/easing for a motion
library), `## Iconography`, custom token groups — they pass validation untouched. Standardize only
the universal groups (colors/typography/spacing/rounded/components); express everything else as
custom sections.

### The CLI

| Command | Use |
|---|---|
| `design.md spec [--rules]` | Print the spec (or just the rules table) — inject into the authoring prompt so you work against the installed version. |
| `design.md lint <file>` | Validate: resolves token refs, checks **WCAG contrast** (AA < 4.5:1 warns), structure. Emits JSON findings. **The QA gate.** |
| `design.md export <file> --format <fmt>` | Export tokens. `json-tailwind` (Tailwind v3 config), `css-tailwind` (Tailwind v4 `@theme` CSS), `dtcg` (W3C `tokens.json`). **The bridge into the build.** |
| `design.md diff <a> <b>` | Token + prose regression detection between versions; nonzero exit on regression. Gate design iterations. |

**Lint rules** (9): `broken-ref` (error) · `missing-primary` (warn) · `contrast-ratio` (warn,
<4.5:1) · `orphaned-tokens` (warn) · `token-summary` (info) · `missing-sections` (info) ·
`missing-typography` (warn) · `section-order` (warn) · `unknown-key` (warn — typo detection, e.g.
`colours:` → `colors:`).

### What `design.md` does and does NOT cover

- **Covers:** the *look* — color, type, spacing, radii, component styling, motion (as a custom
  section), and the prose rationale + Do's/Don'ts.
- **Does NOT cover:** information architecture (sitemap/nav/templates), content modeling
  (entities/copy), or component behavior/props. Keep those in their own documents — `DESIGN.md`
  sits *beside* the IA plan and the content model, not instead of them.

## Authoring procedure

### 1. Decide the register per surface — before choosing any direction

This choice sets the bar for everything else, and can **invert** the principles below. Full
doctrine, including how it inverts specific defaults, is in
[frontend-design-principles.md](frontend-design-principles.md#register-is-the-design-the-product-or-does-it-serve-it).
In short:

- **Design IS the product** (brand sites, landing pages, marketing, launch microsites) —
  distinctiveness is the bar; take the aesthetic risk.
- **Design SERVES the product** (dashboards, app shells, dense daily tools) — earned familiarity
  is the bar; a fixed rem scale, full interactive-state coverage, and boring proven patterns beat
  novelty.

Name the register **per surface, not per project** — most products are mostly-serve with a few
is-the-product surfaces (e.g. a marketing home sitting over an app).

### 2. Choose the path: keep the existing brand, or author a full rebrand

When the job is to redesign an *existing* product or site, there are two distinct paths — decide
which one applies before drafting tokens:

- **Keep the brand.** Author a new look/UX — deliberate layout, composition, components, motion +
  a Do's and Don'ts section — but **keep the brand identity**: reuse the existing logo and its
  **core brand colors + type** (extract those from the current site/brand assets). No rebrand; the
  visual system changes, the brand doesn't. Run the draft against
  [anti-default-catalog.md](anti-default-catalog.md) and revise anything that matches a current
  tell.
- **Full rebrand.** Author a complete new identity from the brand strategy/positioning work (new
  palette/type/voice/iconography + a signature element + a Do's and Don'ts section). Run the same
  anti-default check.

If there's no existing product at all (greenfield), this collapses to the rebrand path — there's
no brand to preserve.

### 3. Write it in `design.md` format

Start from a lint-clean skeleton in canonical section order if you have one, or build the file
directly. You author the token *values* and prose (the creative work); the shape is mechanical.
Token front-matter (`colors`, `typography`, `rounded`, `components` + variant entries) + prose
sections in canonical order (Overview, Colors, Typography, Layout, Elevation & Depth, Shapes,
Components, Do's and Don'ts). Add a custom `## Motion` section for animation timing/easing if
motion matters to the direction.

**Author the scales against Tailwind v4's theme namespaces** so the exported theme reconfigures
Tailwind cleanly and with full coverage — see [tailwind-v4-theme.md](tailwind-v4-theme.md) for the
namespace map, default scales, and the two-`@theme` full-coverage recipe. The single most
important rule from that file: **don't author a t-shirt `spacing:` scale** (`xs…4xl`) in the
front-matter — it exports to `--spacing-2xl` etc. and silently shadows Tailwind's `max-w-*` sizing
scale, collapsing text columns. Record the spacing rhythm in the *Layout* prose instead (Tailwind's
native numeric spacing carries it: `6rem → py-24`, `9rem → py-36`). Make *Elevation & Depth* →
shadows, *Motion* → ease/animate curves, and the reading-measure/shell widths → container widths
explicit in the prose, since the `design.md` export doesn't emit those namespaces — the build
hand-authors a companion `@theme` from these sections.

### 4. Validate

Run `design.md lint <file>`; fix every `broken-ref` (always) and resolve contrast warnings before
handing the file to a build.

### 5. On iteration, diff

`design.md diff <old> <new>` to catch regressions between direction iterations.

## Acceptance criterion

`design.md lint` passes with **no `broken-ref` errors**; the `DESIGN.md` covers at least `colors`
and `typography`, carries a Do's-and-Don'ts section, and no choice matches an unexamined entry in
[anti-default-catalog.md](anti-default-catalog.md).

## What to hand off

When you finish authoring, the useful summary is: the register decision(s), the visual direction
in one line, the lint result, and the file path. If this is a supervised project, that's the
natural point to show the direction for approval before a build consumes it.
