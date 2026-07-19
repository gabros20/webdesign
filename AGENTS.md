# Agent guide — webdesign-skill

This repository packages one independently versioned runtime skill: `webdesign`. The GitHub and
plugin package name is `webdesign-skill`; the runtime identifier and Codex invocation remain
`webdesign` and `$webdesign`.

## Ownership boundary

`webdesign` owns website direction, site structure, section craft, appearance-producing frontend
work, rendered art review, and visual/usability critique. It does not absorb backend behavior,
application state or data architecture, reusable component API engineering, full WCAG auditing,
general SEO strategy, campaign execution, or product-growth management.

When an adjacent capability is required, preserve the approved webdesign artifacts and emit a
handoff. Do not silently expand this skill into a digital-product lifecycle composer.

## Repository contract

- `skills/webdesign/SKILL.md` is the activation-time router and universal contract.
- `skills/webdesign/references/` contains flat, directly linked, conditionally loaded knowledge.
- `skills/webdesign/agents/openai.yaml` contains Codex-facing discovery metadata.
- `.codex-plugin/plugin.json` contains package, storefront, and release metadata.
- `evals/` tests activation, traversal, output quality, and compression separately.
- `docs/`, research/design records, site assets, and release files stay outside the runtime skill.

## Change rules

1. Put universal behavior in `SKILL.md`; put conditional depth in the smallest owning reference.
2. Every reference must remain directly linked from `SKILL.md` and begin with `Purpose`,
   `Read when`, `Skip when`, `Inputs`, and `Produces`.
3. Add an early `## Contents` when a reference exceeds 100 lines. Do not add nested reference
   directories or chains that require discovery.
4. Keep runtime frontmatter to `name` and `description`. Versions and repository URLs belong in
   plugin metadata, changelog, tags, and releases.
5. Include frontend code only when it produces or validates the approved appearance. Remove generic
   engineering advice that belongs to a frontend or backend skill.
6. Never claim visual review without naming the rendered evidence actually inspected.
7. Update the affected activation, traversal, output, or compression fixtures when behavior changes.
8. Link to one source of truth instead of duplicating runtime guidance into README or docs.

## Validation and release

Run before handoff:

```bash
scripts/check-sync
scripts/count-skill-tokens
```

Structural success is necessary but not sufficient: representative evals must show useful
activation, minimal traversal, and better outputs. Release by synchronizing
`.codex-plugin/plugin.json`, `CHANGELOG.md`, tag `v<version>`, and the GitHub Release. Never add the
version to runtime `SKILL.md`.
