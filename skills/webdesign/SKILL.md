---
name: webdesign
version: 1.0.0
description: >-
  End-to-end web design, art-direction, and frontend-build system for websites, landing pages,
  marketing sites, and UI. This skill should be used whenever an agent designs, art-directs,
  critiques, or builds a web page or interface — "design a website / section / landing page / hero",
  "art direction" or "design direction", author or lint a "DESIGN.md" design system, "make it look
  premium / not generic / not templated / not AI-generated", "design review / critique / QA a build",
  pick a palette / typography / layout, add depth / motion / decoration to a section, structure a
  site's sections and IA, map design tokens into a Tailwind v4 theme, or "build the frontend from a
  design". Covers direction-setting, per-section craft (layout, type, color, depth, imagery, motion,
  experimental WebGL), per-vertical strategy, trust/proof/conversion, the Next.js build, and the
  art-review + scored-critique gates.
license: MIT
metadata:
  source: https://github.com/gabros20/webdesign
  guide: https://webdesign-skill.vercel.app
---

# Web Design Pro

**Version 1.0.0** — if asked which version of webdesign is installed, answer from this line.
(History: `CHANGELOG.md` in the source repo, github.com/gabros20/webdesign.)

An end-to-end web design + art-direction + build system, distilled from a production website-rebuild
pipeline. It takes a page from **creative direction → structure → per-section craft → build →
art review → scored critique**, and every reference is copy-pasteable rather than abstract.

This SKILL.md is a **router**. Load only the reference(s) your current job needs — the whole point is
that you never read all 22 at once. Everything lives in [`references/`](references/).

## The workflow arc

Six stages. You can **enter at any stage** — "critique this page" jumps straight to 5–6; "build this
from a design spec" starts at 4; a greenfield brand site runs 1→6.

1. **Direction** — decide the taste/point-of-view (palette, type, register, the one signature) and
   record it as a formal design-system contract.
   → [frontend-design-principles.md](references/frontend-design-principles.md) ·
   [design-direction.md](references/design-direction.md)
2. **Structure** — turn the plan into a sitemap, navigation, footer, per-page section blueprints, and
   a deduplicated section catalog keyed to reusable archetypes.
   → [section-archetypes.md](references/section-archetypes.md)
3. **Per-section craft** — for each section, pick one bold move and the 1–2 devices that deliver it,
   then ship the CSS. Start from the craft router, load the specific device references it points to.
   → [section-design-workflow.md](references/section-design-workflow.md) (the craft router) →
   `layout-and-composition` · `typography` · `color-and-rhythm` · `depth-and-texture` · `decoration` ·
   `imagery` · `motion-and-interaction` · `experimental-and-creative`, plus the strategy layer
   (`niche-and-vertical-design` · `trust-proof-and-structure` · `persuasion-and-conversion`).
4. **Build** — scaffold Next.js, one client component per section key in a fail-loud registry, and
   apply the DESIGN.md tokens as a collision-free Tailwind v4 theme.
   → [frontend-build-patterns.md](references/frontend-build-patterns.md) ·
   [tailwind-v4-theme.md](references/tailwind-v4-theme.md)
5. **Art review** — the eye that set the direction judges the build section by section, at full
   resolution, and hands back an A0–A3 punch-list (or signs off).
   → [art-review.md](references/art-review.md)
6. **Critique / QA gate** — a scored, severity-routed pass (Nielsen 0–40, cognitive load, personas,
   mechanical checks) that turns "looks good" into a go/no-go, checked against the named AI tells.
   → [design-critique.md](references/design-critique.md) ·
   [anti-default-catalog.md](references/anti-default-catalog.md)

Stages 1, 3, 5, and 6 also stand alone: you can set a direction without building, critique a page you
didn't build, or run the craft router for a single section.

## Pick by job

Read only what the job requires.

| I need to… | Read |
|---|---|
| **Decide a visual direction / take a point of view / avoid generic** | [frontend-design-principles.md](references/frontend-design-principles.md) |
| **Record the direction as a DESIGN.md (format, tokens, CLI, lint)** | [design-direction.md](references/design-direction.md) |
| **Map DESIGN.md tokens → a Tailwind v4 theme (no `max-w` collapse)** | [tailwind-v4-theme.md](references/tailwind-v4-theme.md) |
| **Check a draft against the current named AI tells** | [anti-default-catalog.md](references/anti-default-catalog.md) |
| **Plan a site's pages, nav, footer, section catalog + archetypes** | [section-archetypes.md](references/section-archetypes.md) |
| **Design/compose/build one distinctive section** | [section-design-workflow.md](references/section-design-workflow.md) → its device map |
| **Lay out a section / break the grid** | [layout-and-composition.md](references/layout-and-composition.md) |
| **Make type the hero** | [typography.md](references/typography.md) |
| **Set palette + section rhythm (light↔dark cadence, one accent)** | [color-and-rhythm.md](references/color-and-rhythm.md) |
| **Make it feel 3D / premium / not flat** | [depth-and-texture.md](references/depth-and-texture.md) |
| **Add decoration (patterns, dividers, cutouts) without noise** | [decoration.md](references/decoration.md) |
| **Present images as more than rectangles** | [imagery.md](references/imagery.md) |
| **Add motion / scroll interaction** | [motion-and-interaction.md](references/motion-and-interaction.md) |
| **Go Awwwards-tier (WebGL, shaders, particles, custom cursor)** | [experimental-and-creative.md](references/experimental-and-creative.md) |
| **Design for a specific business/vertical + set the premium↔info dial** | [niche-and-vertical-design.md](references/niche-and-vertical-design.md) |
| **Build credibility / E-E-A-T / SEO structure / case studies** | [trust-proof-and-structure.md](references/trust-proof-and-structure.md) |
| **Drive & convert the user ethically (Cialdini, CCD, copy↔design)** | [persuasion-and-conversion.md](references/persuasion-and-conversion.md) |
| **Decide what to do & judge it (composition process, AI-slop tells)** | [design-thinking.md](references/design-thinking.md) |
| **Build the Next.js frontend from a design** | [frontend-build-patterns.md](references/frontend-build-patterns.md) |
| **Review a finished build against its direction (punch-list)** | [art-review.md](references/art-review.md) |
| **Run a scored review / go-no-go QA gate** | [design-critique.md](references/design-critique.md) |
| **Trace a technique to its source** | [SOURCES.md](references/SOURCES.md) |

## The non-negotiable laws

These govern every technique in the references — the load-bearing ones, quoted:

1. **Depth over flatness.** A boring section is one flat plane (text + an image-square on a solid
   fill). Resolve every section into ≥2 planes, or at least one unifying texture/glow/shadow.
2. **Contrast creates interest.** Manufacture a real jump in *scale*, *weight*, *color*, or *depth*.
   Exactly one element per section is unambiguously the biggest/boldest. Even spacing + even weight =
   forgettable.
3. **One bold move + restraint.** Spend boldness in ONE place — a giant type lockup, a single
   saturated accent, one striking image, one experimental interaction — and keep everything else
   quiet so that move lands. *"Two bold moves compete and cancel; zero = generic."* The cardinal rule:
   **use one or two devices per section, executed precisely — never all of them at once.**
4. **Design for the *business*, not "a website."** Before the moves, set the **premium↔information
   dial**: a niche site must be premium (noticed, remembered, trusted) *and* deliver proof (answer
   questions, prove competence). Don't blend them — *sequence* them (restrained emotional hero →
   progressively denser proof → low-friction action). Where you set the dial is decided by
   **stakes & emotion, not taste**.
5. **Register first — is the design the product, or does it serve it?** Brand sites / landing pages /
   marketing = **design IS the product**, distinctiveness is the bar, take the risk. Dashboards /
   app shells / dense daily tools = **design SERVES the product**, earned familiarity is the bar; this
   *inverts* several defaults (fixed rem scale, full interactive-state coverage, boring proven
   patterns, and Inter/SF Pro is a legitimate pick, not a tell). Name the register **per surface**.
   Full doctrine:
   [frontend-design-principles.md](references/frontend-design-principles.md#register-is-the-design-the-product-or-does-it-serve-it).
6. **Refuse the named defaults.** Models default to the same look regardless of subject (cream+serif+
   terracotta; near-black+acid accent; broadsheet mono; Inter; indigo-600/slate-900; eyebrow chips;
   01/02/03 markers; three identical feature cards). Run every draft against
   [anti-default-catalog.md](references/anti-default-catalog.md) — and avoid the *predictable
   anti-default rebound* too.
7. **Real content, real assets.** Specific copy and real asset libraries (a proper icon set held to
   one weight, real flag/logo/pattern libraries) over lorem, stock, emoji-as-icons, and hand-rolled
   SVG. Generic content is the loudest AI tell; a wrong-for-meaning or mixed-weight icon is a real
   defect at review, not a nitpick.

The always-run gate on any section: the **anti-boring checklist** in
[section-design-workflow.md](references/section-design-workflow.md) (depth · one focal point · a
contrast move · one signature · grayscale test · one spacing scale · quality floor). And Chanel's
rule — before shipping, remove one accessory.

## Complementary global skills (don't duplicate these)

This skill owns web design *direction, craft, build, and review*. Hand off to these for adjacent jobs:

- **generate-image** / **generate-video** — actually generating the images/video/backgrounds a
  direction calls for (prompt shape, model steering). This skill decides *what asset a slot needs*;
  those skills produce it.
- **building-components** — engineering a reusable component's API, composability, and a11y
  internals (the durable component library), where this skill covers composing *sections* from them.
- **extract-design-system** — mining tokens/primitives from an existing public site to seed a project
  (a good input to stage 1's direction).
- **accessibility** — a full WCAG 2.2 audit (screen-reader, keyboard, ARIA). Stage 6 here does a
  design-level contrast/focus pass; that skill goes deep.
- **scroll-driven-video** · **transparent-web-video** · **safari-mobile-optimization** — specialist
  web techniques for scroll-scrubbed video, alpha/transparent hero video, and iOS/Safari browser-chrome
  hardening, when a section's signature move needs them.
- **prototype** — throwaway exploration of several radically different UI variations before committing
  to one direction.
