# Changelog

All notable changes to the **webdesign** skill are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) ·
Versioning: [SemVer](https://semver.org/) — **MAJOR** = workflow-arc or reference-contract breaks,
**MINOR** = new stages/references/material that changes behavior, **PATCH** = fixes, doc
corrections, wording tuning with unchanged behavior.

The skill's current version lives in `skills/webdesign/SKILL.md` frontmatter (`version:`) and is
tagged in git as `v<version>`. Every release PR updates **both** plus this file, and must pass
`scripts/check-sync` (version sync across frontmatter/body/changelog, no orphan references, every
cross-link and anchor resolved, internal-tooling leakage guard — CI-enforced on every PR).

## [Unreleased]

### Added
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

[1.1.0]: https://github.com/gabros20/webdesign/releases/tag/v1.1.0
[1.0.1]: https://github.com/gabros20/webdesign/releases/tag/v1.0.1
[1.0.0]: https://github.com/gabros20/webdesign/releases/tag/v1.0.0
