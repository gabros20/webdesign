# Usage reference

The full control surface: how the skill triggers, the six-stage arc it routes into, the pick-by-job
table, the non-negotiable laws every technique answers to, and what artifacts each stage produces.
This is the reference doc — for what each stage actually *does*, see [stages.md](stages.md); for
ready-to-paste prompts, see [recipes.md](recipes.md).

## There is no invocation grammar

Unlike a dispatch-style skill, `webdesign` takes no flags, dimensions, or config file — there's
nothing to memorize before using it. It triggers one of two ways:

- **Explicit**: `/webdesign` (or your host's slash-command equivalent).
- **Implicit**: natural design-task phrasing — "design a hero section", "art direction for this
  landing page", "author a DESIGN.md", "make this look premium / not generic / not
  AI-generated", "design review this build", "run a scored critique / go-no-go" — matched against
  the frontmatter `description` in `skills/webdesign/SKILL.md`.

Either way, `SKILL.md` is a **router, not a workflow engine**: it never executes a fixed sequence
of scripts. It states the six-stage arc and a pick-by-job table, then the agent reads only the
specific `references/*.md` file(s) its current job needs — out of 22 total. **That "read only what
you need" discipline is the whole point**; nothing about this skill is served by loading all 22
references for a one-section job.

## The six-stage arc

Six stages, each with a distinct job, a set of references it loads, and an output. **You can enter
at any stage** — "critique this page" jumps straight to 5–6; "build this from a design spec" starts
at 4; a greenfield brand site runs 1→6 in order. Stages 1, 3, 5, and 6 also stand alone: set a
direction without building, critique a page you didn't build, or run the craft router for a single
section. Full per-stage detail (references loaded, output, gate): [stages.md](stages.md).

| # | Stage | One-line job |
|---|---|---|
| 1 | **Direction** | Decide the taste/point-of-view (palette, type, register, the one signature) and record it as a `DESIGN.md` contract. |
| 2 | **Structure** | Turn the plan into a sitemap, navigation, footer, per-page section blueprints, and a deduplicated section catalog keyed to reusable archetypes. |
| 3 | **Per-section craft** | For each section, pick one bold move and the 1–2 devices that deliver it, then ship the CSS. |
| 4 | **Build** | Scaffold Next.js, one client component per section key in a fail-loud registry, apply the `DESIGN.md` tokens as a Tailwind v4 theme. |
| 5 | **Art review** | The eye that set the direction judges the build section by section, at full resolution, and hands back an A0–A3 punch-list (or signs off). |
| 6 | **Critique / QA gate** | A scored, severity-routed pass (Nielsen 0–40, cognitive load, personas, mechanical checks) that turns "looks good" into a go/no-go. |

## Pick by job

Read only what the job requires — this table is the fast path from "what am I trying to do" to
"which reference file(s)", independent of which stage you're nominally in.

| I need to… | Read |
|---|---|
| **Decide a visual direction / take a point of view / avoid generic** | `frontend-design-principles.md` |
| **Record the direction as a DESIGN.md (format, tokens, CLI, lint)** | `design-direction.md` |
| **Map DESIGN.md tokens → a Tailwind v4 theme (no `max-w` collapse)** | `tailwind-v4-theme.md` |
| **Check a draft against the current named AI tells** | `anti-default-catalog.md` |
| **Plan a site's pages, nav, footer, section catalog + archetypes** | `section-archetypes.md` |
| **Design/compose/build one distinctive section** | `section-design-workflow.md` → its device map |
| **Lay out a section / break the grid** | `layout-and-composition.md` |
| **Make type the hero** | `typography.md` |
| **Set palette + section rhythm (light↔dark cadence, one accent)** | `color-and-rhythm.md` |
| **Make it feel 3D / premium / not flat** | `depth-and-texture.md` |
| **Add decoration (patterns, dividers, cutouts) without noise** | `decoration.md` |
| **Present images as more than rectangles** | `imagery.md` |
| **Add motion / scroll interaction** | `motion-and-interaction.md` |
| **Go Awwwards-tier (WebGL, shaders, particles, custom cursor)** | `experimental-and-creative.md` |
| **Design for a specific business/vertical + set the premium↔info dial** | `niche-and-vertical-design.md` |
| **Build credibility / E-E-A-T / SEO structure / case studies** | `trust-proof-and-structure.md` |
| **Drive & convert the user ethically (Cialdini, CCD, copy↔design)** | `persuasion-and-conversion.md` |
| **Decide what to do & judge it (composition process, AI-slop tells)** | `design-thinking.md` |
| **Build the Next.js frontend from a design** | `frontend-build-patterns.md` |
| **Review a finished build against its direction (punch-list)** | `art-review.md` |
| **Run a scored review / go-no-go QA gate** | `design-critique.md` |
| **Trace a technique to its source** | `SOURCES.md` |

## The non-negotiable laws

These govern every technique in the references — quoted, not paraphrased:

1. **Depth over flatness.** A boring section is one flat plane (text + an image-square on a solid
   fill). Resolve every section into ≥2 planes, or at least one unifying texture/glow/shadow.
2. **Contrast creates interest.** Manufacture a real jump in *scale*, *weight*, *color*, or *depth*.
   Exactly one element per section is unambiguously the biggest/boldest. Even spacing + even weight
   = forgettable.
3. **One bold move + restraint.** Spend boldness in ONE place — a giant type lockup, a single
   saturated accent, one striking image, one experimental interaction — and keep everything else
   quiet so that move lands. Two bold moves compete and cancel; zero = generic. **Use one or two
   devices per section, executed precisely — never all of them at once.**
4. **Design for the *business*, not "a website."** Before the moves, set the **premium↔information
   dial**: a niche site must be premium (noticed, remembered, trusted) *and* deliver proof (answer
   questions, prove competence). Don't blend them — *sequence* them (restrained emotional hero →
   progressively denser proof → low-friction action). Where you set the dial is decided by stakes &
   emotion, not taste.
5. **Register first — is the design the product, or does it serve it?** Brand sites / landing
   pages / marketing = design **is** the product, distinctiveness is the bar, take the risk.
   Dashboards / app shells / dense daily tools = design **serves** the product, earned familiarity
   is the bar — this inverts several defaults. Name the register **per surface**.
6. **Refuse the named defaults.** Models default to the same look regardless of subject (cream+
   serif+terracotta; near-black+acid accent; broadsheet mono; Inter; indigo-600/slate-900; eyebrow
   chips; 01/02/03 markers; three identical feature cards). Run every draft against
   `anti-default-catalog.md` — and avoid the *predictable anti-default rebound* too.
7. **Real content, real assets.** Specific copy and real asset libraries (a proper icon set held to
   one weight, real flag/logo/pattern libraries) over lorem, stock, emoji-as-icons, and hand-rolled
   SVG. Generic content is the loudest AI tell; a wrong-for-meaning or mixed-weight icon is a real
   defect at review, not a nitpick.

The always-run gate on any section: the **anti-boring checklist** in `section-design-workflow.md`
(depth · one focal point · a contrast move · one signature · grayscale test · one spacing scale ·
quality floor). And Chanel's rule — before shipping, remove one accessory.

## What the skill produces

There's no fixed run directory or ledger — each stage's output is a normal project artifact, kept
wherever your project convention puts it:

| Stage | Artifact |
|---|---|
| Direction | A `DESIGN.md` file (YAML front-matter tokens + prose), typically at the repo root or `docs/DESIGN.md`. |
| Structure | A sitemap, nav/footer plan, and a deduplicated section catalog (usually a plan document or the content model itself). |
| Per-section craft | Shipped CSS/markup for the section, checked against the anti-boring checklist. |
| Build | A running Next.js app: one client component per section key, a fail-loud `sectionMap` registry, a Tailwind v4 `@theme` sourced from `DESIGN.md`. |
| Art review | A structured review record per round — verdict (`approve`/`revise`), per-section findings, an A0–A3 blocking/notes split. |
| Critique / QA gate | A scored critique (Nielsen 0–40 + cognitive load + personas) with P0–P3 severity-routed findings and an explicit go/no-go. |

## Complementary global skills (don't duplicate these)

`webdesign` owns web design *direction, craft, build, and review*. Hand off to these for adjacent
jobs:

- **generate-image** / **generate-video** — actually generating the images/video/backgrounds a
  direction calls for. This skill decides *what asset a slot needs*; those skills produce it.
- **building-components** — engineering a reusable component's API, composability, and a11y
  internals, where this skill covers composing *sections* from them.
- **extract-design-system** — mining tokens/primitives from an existing public site to seed a
  project (a good input to stage 1's direction).
- **accessibility** — a full WCAG 2.2 audit. Stage 6 here does a design-level contrast/focus pass;
  that skill goes deep.
- **scroll-driven-video** · **transparent-web-video** · **safari-mobile-optimization** —
  specialist web techniques for scroll-scrubbed video, alpha/transparent hero video, and iOS/Safari
  browser-chrome hardening, when a section's signature move needs them.
- **prototype** — throwaway exploration of several radically different UI variations before
  committing to one direction.
