# Changelog

All notable changes to the **webdesign** skill are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) ·
Versioning: [SemVer](https://semver.org/) — **MAJOR** = workflow-arc or reference-contract breaks,
**MINOR** = new stages/references/material that changes behavior, **PATCH** = fixes, doc
corrections, wording tuning with unchanged behavior.

The release procedure synchronizes `.codex-plugin/plugin.json`, this changelog, git tag
`v<version>`, and the matching GitHub Release. Runtime `SKILL.md` contains no version metadata.

## [1.3.0] — 2026-07-17

### Added
- Codex plugin packaging and `agents/openai.yaml` client metadata.
- Activation, traversal, output, and compression-ablation evaluation fixtures.
- Repository-local high-signal validation for frontmatter, direct reference routing, reference
  primacy headers, contents lists, metadata, scripts, and evaluation fixtures.
- Explicit artifact, completion, standalone-use, and adjacent-skill handoff contracts.
- Repository-specific `AGENTS.md` and `CLAUDE.md` guidance, enforced by the baseline gate.

### Changed
- Tightened activation around website design and appearance-producing frontend work, with explicit
  exclusions for backend, state/data architecture, component APIs, full accessibility audits,
  general SEO strategy, and product-growth work.
- Moved version and repository metadata out of runtime `SKILL.md`.
- Adopted the `webdesign-skill` repository/package name while preserving `webdesign` as the runtime
  skill identifier.
- Split Codex installation from the cross-agent `~/.agents/skills` target and made replacement
  transactional.
- Removed the generic TypeScript/JavaScript appendix from the visual-build reference and compressed
  the activation router while retaining all direct routes.

## [1.2.0] — 2026-07-16

### Added
- **Capture-tooling contract for the visual stages.** `art-review.md` now states what the review
  physically needs — serve the build, programmatic per-section screenshots at two viewports with
  reduced motion emulated, and a model that can read images — and recommends the token-efficient
  toolchain: script batch captures (a throwaway Playwright script; zero tokens while it runs) and
  the `agent-browser` CLI for interactive inspection (terse CDP-based output, no
  Playwright/Puppeteer dependency), with host-native browser tools as fallback and an
  honest-degrade rule (a review that viewed no build must say so). Pointer added from the build
  stage's visual self-check; SKILL.md stage 5 and the installation prerequisites aligned.
- Docs timeline backfill: `research/stack-agnosticism.md` (the coupling audit + scope question
  that fed 1.1.0), `designs/v1.1.0-stack-posture.md`, and `designs/v1.0.1-color-identity.md`
  (the per-skill hue-identity system + reskin checklist); docs index updated.

### Changed
- Provenance docs now name the source by brand — the skill was extracted from **Brease Factory**,
  an internal website-rebuild pipeline/CLI (brand named, repo internals still not referenced).

## [1.1.0] — 2026-07-15

### Changed
- **Stack posture made explicit.** SKILL.md now states the skill's scope rule (it owns everything
  between "what should this look like" and "the pixels on screen match it"; engineering that
  doesn't change appearance is out of scope) and frames Next.js + Tailwind v4 as the worked
  example rather than a requirement. `frontend-build-patterns.md` gains a "Stack posture" section
  with a pattern→your-stack mapping table (Astro, SvelteKit, Nuxt, TanStack Start, React Router 7,
  HTMX + Alpine.js; Tailwind, vanilla CSS custom properties, StyleX, CSS Modules), its stack
  section is retitled "Reference stack", and the TypeScript/JavaScript craft section is demoted to
  an explicitly-labeled appendix (engineering hygiene, not design doctrine — content unchanged).
  `tailwind-v4-theme.md` notes how `DESIGN.md` tokens are consumed without Tailwind. README, docs,
  and site aligned to the same framing.
- Site: reference map rebuilt from a stretched card grid to a stage→chips definition list
  (kills the craft-card whitespace voids and the orphan card).
- Site: hero terminal now shows the `/webdesign` invocation (matching the sibling site's `/orchestrate plan.md` pattern) instead of install;
  install consolidated in "Start here" with a short use beat (family-site alignment with orchestrate).

## [1.0.1] — 2026-07-15

### Changed
- Raspberry accent identity — the site, favicon, OG image, and the "Life of a Page" hero
  animation move from the inherited blue to a raspberry accent (OKLCH hue ~350, with L and
  chroma held at the previous accent's levels so contrast ratios and neutrals are unchanged).
  Establishes a per-skill color scheme so each published skill is recognizable by its hue;
  orchestrate retains blue. Skill behavior and references are unchanged.

## [1.0.0] — 2026-07-15

### Added
- Initial release: the six-stage workflow arc (direction → structure → per-section craft → build →
  art review → critique / QA gate), enterable at any stage.
- 22 reference files under `skills/webdesign/references/` — design principles, DESIGN.md format,
  anti-default catalog, section archetypes, per-device craft references (layout, typography,
  color, depth, decoration, imagery, motion, experimental), the strategy layer (niche/vertical,
  trust/proof, persuasion), frontend build patterns, Tailwind v4 theming, art review, and scored
  design critique.
- `install.sh` — multi-host installer (`claude | codex | cursor | antigravity | opencode | grok |
  hermes | agents | all`).
- Docs set (`docs/`) — installation, usage, stages, recipes.
- Visual guide (`site/`), deploys to webdesign-skill.vercel.app.

[1.3.0]: https://github.com/gabros20/webdesign-skill/releases/tag/v1.3.0
[1.2.0]: https://github.com/gabros20/webdesign-skill/releases/tag/v1.2.0
[1.1.0]: https://github.com/gabros20/webdesign-skill/releases/tag/v1.1.0
[1.0.1]: https://github.com/gabros20/webdesign-skill/releases/tag/v1.0.1
[1.0.0]: https://github.com/gabros20/webdesign-skill/releases/tag/v1.0.0
