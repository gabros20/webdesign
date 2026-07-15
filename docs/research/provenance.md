# `webdesign` — research record, provenance, and source→target mapping

> **Status:** research record — implemented in **v1.0.0** (design:
> [../designs/v1.0.0-initial-synthesis.md](../designs/v1.0.0-initial-synthesis.md) ·
> [CHANGELOG](../../CHANGELOG.md)).

Where each reference file in `skills/webdesign/references/` came from, and what was deliberately
left behind. The source was the design corpus of **Brease Factory** — an internal website-rebuild
pipeline/CLI whose tool skills were extracted and generalized here for standalone reuse: skills and
agent briefs written for a very different context (an automated multi-phase site-rebuild system
with run directories, phase codes, and CMS wiring) that nonetheless contained a complete,
load-bearing body of web-design knowledge worth porting on its own. Individual source-skill names
are generalized below — the pipeline coupling itself was stripped, not ported; external citations
for the technique content live in the skill's own `references/SOURCES.md`, not here.

## The corpus

Roughly **4.5k lines** across **8 skills + 4 agent briefs** in the source pipeline:

- A **craft corpus** — 13 reference files covering design thinking, layout and composition,
  typography, color and rhythm, depth and texture, decoration, imagery, motion and interaction,
  persuasion and conversion, trust/proof/structure, experimental and creative technique,
  niche/vertical design, plus a sources file — that was itself a standalone craft-reference skill in
  the source pipeline, already close to project-agnostic.
- A **section-design-workflow** skill — the craft *router* that pointed at the above corpus.
- A **DESIGN.md-authoring skill** — the format/tooling half of what's now `design-direction.md` and
  `tailwind-v4-theme.md`.
- A **design-director agent brief** — the taste/judgment half of authoring, and separately, the
  review job that became `art-review.md`.
- An **art-review skill** — the studio creative-review procedure.
- A **frontend-design skill** — the scored critique rubric and the standing anti-default-tell
  catalog.
- A **QA validator gate** — the mechanical severity-routing and go/no-go discipline that folded into
  `design-critique.md`.
- A **blueprint skill** plus an **architect agent brief** — the sitemap/IA/section-catalog
  procedure now in `section-archetypes.md`.
- **Build skills** plus a **builder agent brief**, plus an externally-sourced set of **technical
  guidelines** (adapted from `bendc/frontend-guidelines`, MIT-era web craft conventions modernized
  for the current stack) — together now `frontend-build-patterns.md`.

## Source → target mapping

| Target reference | Ported from |
|---|---|
| `design-thinking.md`, `layout-and-composition.md`, `typography.md`, `color-and-rhythm.md`, `depth-and-texture.md`, `decoration.md`, `imagery.md`, `motion-and-interaction.md`, `persuasion-and-conversion.md`, `trust-proof-and-structure.md`, `experimental-and-creative.md`, `niche-and-vertical-design.md`, `SOURCES.md` | The craft corpus (13 files), ported near-verbatim — this content was already project-agnostic technique reference, so the port preserved wording and structure closely. Byte-diff-verified for fidelity across 9 of these files during the adversarial review. |
| `section-design-workflow.md` | Distilled from the source pipeline's own craft-router skill — condensed to the device map, the one-idea framing, and the anti-boring checklist, with pipeline-specific framing removed. |
| `design-direction.md`, `tailwind-v4-theme.md` | The pipeline's DESIGN.md-authoring skill, merged with the design-director agent brief's **author** job (the taste/register decisions that precede writing tokens). |
| `art-review.md` | The pipeline's art-review skill, merged with the design-director agent brief's **review** job (the same eye that authored the direction, now judging the build against it). |
| `design-critique.md`, `anti-default-catalog.md`, `frontend-design-principles.md` | The pipeline's frontend-design skill, merged with its QA validator gate's severity-routing and go/no-go mechanics. |
| `section-archetypes.md` | The pipeline's blueprint skill, merged with its architect agent brief — the sitemap/IA procedure and the section-archetype catalog. |
| `frontend-build-patterns.md` | The pipeline's build skills and technical guidelines (itself adapted from `bendc/frontend-guidelines`), merged with its builder agent brief. |

## What was deliberately stripped

- **Pipeline coupling** — run directories, phase codes (P0–P6), artifact-contract validation
  against a specific pipeline schema, CMS-specific wiring (a proprietary content-management
  integration the source pipeline targeted). None of it is present in any `webdesign` reference;
  every file reads as a standalone technique document.
- **Multi-agent dispatch machinery** — the source pipeline spawned one subagent per phase with a
  typed artifact contract between each. `webdesign` has no equivalent — each stage is something one
  agent does directly, with no ledger, run directory, or inter-phase handoff file.
- **Non-web-design surface area** — anything about crawling/capturing an existing site, asset
  generation execution (vs. deciding what's needed), and CMS content modeling stayed out; those are
  either out of scope entirely or handed to a named complementary skill (see
  [usage.md](../usage.md#complementary-global-skills-dont-duplicate-these)).

## External citations

Citations for the craft techniques themselves (CSS technique write-ups, design-writing sources,
the Nielsen heuristics literature, `bendc/frontend-guidelines`, `pbakaus/impeccable`) are not
duplicated here — they live in the skill's own
[`references/SOURCES.md`](../../skills/webdesign/references/SOURCES.md), consolidated once so
citation lists don't cost tokens on every on-demand reference read.
