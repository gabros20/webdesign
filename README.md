# Webdesign

Design and build distinctive websites from visual direction through rendered review. `webdesign`
combines art direction, page structure, per-section craft, appearance-producing frontend guidance,
and evidence-based visual QA without expanding into general application engineering.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Visual guide:** [webdesign-skill.vercel.app](https://webdesign-skill.vercel.app)

## What it owns

Use `webdesign` for websites, landing pages, marketing sites, and visual web-interface work that
needs one or more of:

- Art direction and a concrete `DESIGN.md` contract.
- Sitemap, navigation, page blueprint, or reusable section catalog.
- Layout, typography, color, imagery, depth, motion, and restrained experimental effects.
- Appearance-producing frontend work in the project's existing stack.
- Art review against an approved direction or a scored visual/usability critique.

It does not own backend behavior, application state and data architecture, reusable component API
engineering, full WCAG audits, general SEO or campaign strategy, or product-growth planning unless
the request also contains a website-design job.

## Workflow

Enter at the stage the request requires:

1. **Direction** — define register, palette, type, layout, and one signature move.
2. **Structure** — define sitemap, navigation, page blueprints, and stable section archetypes.
3. **Per-section craft** — choose one bold move and the one or two devices that deliver it.
4. **Build** — translate the approved appearance into the existing frontend stack.
5. **Art review** — compare rendered evidence with the approved direction and return an A0-A3
   punch list or sign-off.
6. **Critique / QA** — run the scored, severity-routed go/no-go gate.

The runtime router is [skills/webdesign/SKILL.md](skills/webdesign/SKILL.md). It links directly to
22 focused references and instructs the agent to load only the smallest sufficient set.

## Install

With skills.sh:

```bash
npx skills add gabros20/webdesign-skill
```

Or clone and install for a specific client:

```bash
git clone https://github.com/gabros20/webdesign-skill.git
cd webdesign-skill
./install.sh codex
```

| Target | Destination |
|---|---|
| `codex` | `${CODEX_HOME:-$HOME/.codex}/skills/webdesign` |
| `agents` | `~/.agents/skills/webdesign` |
| `claude` | `~/.claude/skills/webdesign` |
| `cursor` | `~/.cursor/skills/webdesign` |
| `antigravity` | Gemini IDE and Antigravity CLI skill paths |
| `opencode` | `~/.config/opencode/skills/webdesign` |
| `grok` | `~/.grok/skills/webdesign` |
| `hermes` | `~/.hermes/skills/webdesign` |
| `all` | Claude, Codex, and the cross-agent path |

The installer stages a complete copy before replacing an existing installation and restores the
old copy if replacement fails.

## Use

Codex explicit invocation uses `$webdesign`:

```text
Use $webdesign to author a DESIGN.md for a fintech landing page.
Use $webdesign to design a hero that does not look AI-generated.
Use $webdesign to art-review this rendered build against its DESIGN.md.
Use $webdesign to run a scored visual and usability critique.
```

Documentation may use `/webdesign` as shorthand. Other clients may expose a slash command,
`@webdesign`, a skill tool, or natural-language activation.

## Common routes

| User intent | Primary reference | Result |
|---|---|---|
| Set a visual direction | [frontend-design-principles.md](skills/webdesign/references/frontend-design-principles.md) | Register and direction constraints |
| Write a design-system contract | [design-direction.md](skills/webdesign/references/design-direction.md) | `DESIGN.md` and tokens |
| Structure a site | [section-archetypes.md](skills/webdesign/references/section-archetypes.md) | Sitemap, blueprints, and section catalog |
| Design one section | [section-design-workflow.md](skills/webdesign/references/section-design-workflow.md) | Concept, selected devices, and anti-boring check |
| Build the approved appearance | [frontend-build-patterns.md](skills/webdesign/references/frontend-build-patterns.md) | Integrated visual frontend and self-check |
| Compare build and direction | [art-review.md](skills/webdesign/references/art-review.md) | A0-A3 punch list or sign-off |
| Run the go/no-go gate | [design-critique.md](skills/webdesign/references/design-critique.md) | Scored, severity-routed critique |

## Outputs and completion

Depending on the route, the skill produces a direction brief, `DESIGN.md`, site structure, section
specification or implementation, visual frontend, art-review punch list, or scored critique.

Work is complete only when requested artifacts exist, relevant viewports and states have been
checked, assumptions and unresolved work are recorded, and any claimed visual review names the
rendered evidence actually inspected.

## Repository map

```text
.codex-plugin/plugin.json  Codex plugin and release metadata
AGENTS.md / CLAUDE.md      repository and client-specific maintainer guidance
skills/webdesign/          portable runtime skill and client metadata
evals/                     activation, traversal, output, and compression fixtures
docs/                      installation, usage, stages, recipes, research, and design records
site/                      optional visual guide
remotion/                  source for the visual guide's hero animation
scripts/                   repository validation and token accounting
```

## Validate

```bash
scripts/check-sync
scripts/count-skill-tokens
```

The gate validates runtime frontmatter, direct reference routing, reference headers and contents
lists, plugin/client metadata, evaluation fixtures, internal links, executable scripts, and release
version alignment.

## Documentation

- [Installation](docs/installation.md)
- [Usage](docs/usage.md)
- [Stages](docs/stages.md)
- [Recipes](docs/recipes.md)
- [Evaluation fixtures](evals/README.md)

## Versioning and releases

Each release synchronizes `.codex-plugin/plugin.json`, the newest `CHANGELOG.md` release, git tag
`v<version>`, and the matching GitHub Release. Runtime `SKILL.md` intentionally carries no version
or repository metadata.

## Contributing

See [AGENTS.md](AGENTS.md) for repository invariants and [CONTRIBUTING.md](CONTRIBUTING.md) for the
change and release workflow. The repository is independently versioned and does not require a
sibling skill or collection checkout.

## License

[MIT](LICENSE) · Tamás Gábor ([@gabros20](https://github.com/gabros20))
