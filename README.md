# /webdesign

**An end-to-end web design, art-direction, and frontend-build system — for any agent that reads SKILL.md.**

`/webdesign` takes a page from creative direction through a shipped, reviewed build. Point it at a
site, a section, or an existing build; it walks six stages — **direction → structure → per-section
craft → build → art review → critique** — and you can enter at any stage: "critique this page"
jumps straight to 5–6, "build this from a design spec" starts at 4, a greenfield brand site runs
1→6. 22 reference files, every one copy-pasteable rather than abstract.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Visual guide:** [webdesign-skill.vercel.app](https://webdesign-skill.vercel.app) — every stage,
device, and law on one page.

## What it is

Six stages, distilled from a production website-rebuild pipeline:

1. **Direction** — decide the taste/point-of-view (palette, type, register, the one signature) and
   record it as a `DESIGN.md` design-system contract.
2. **Structure** — sitemap, navigation, footer, per-page section blueprints, a deduplicated section
   catalog keyed to reusable archetypes.
3. **Per-section craft** — one bold move + the 1–2 devices that deliver it, per section (layout,
   typography, color, depth, decoration, imagery, motion, experimental/WebGL, plus the strategy
   layer for vertical, trust/proof, and persuasion).
4. **Build** — one component per section key in a fail-loud registry, `DESIGN.md` tokens applied as
   a collision-free theme (reference stack Next.js + Tailwind v4; the patterns port to any stack).
5. **Art review** — the eye that set the direction judges the build section by section, at full
   resolution, and hands back a punch-list (or signs off).
6. **Critique / QA gate** — a scored, severity-routed pass (Nielsen heuristics, cognitive load,
   personas, mechanical checks) against the named AI tells — turns "looks good" into a go/no-go.

Everything routes through [`skills/webdesign/SKILL.md`](skills/webdesign/SKILL.md) — load only the
reference(s) your current job needs, never all 22 at once.

**The non-negotiable laws**, in brief (full text with the load-bearing quotes lives in SKILL.md):

- **Depth over flatness** — resolve every section into ≥2 planes, or at least one unifying texture.
- **Contrast creates interest** — exactly one biggest/boldest element per section.
- **One bold move + restraint** — spend boldness in one place; two bold moves compete and cancel.
- **Design for the business, not "a website"** — set the premium↔information dial deliberately.
- **Register first** — is the design the product, or does it serve it? Name it per surface.
- **Refuse the named defaults** — check every draft against the anti-default catalog.
- **Real content, real assets** — specific copy and real asset libraries over lorem/stock/emoji.

## Install

**skills.sh ecosystem:**
```bash
npx skills add gabros20/webdesign
```

**Clone + installer** (per-host targets):
```bash
git clone https://github.com/gabros20/webdesign && cd webdesign
./install.sh claude   # or: codex | cursor | antigravity | opencode | grok | hermes | agents | all
```

| Host | Installs to |
|---|---|
| **Claude Code** (`claude`) | `~/.claude/skills/webdesign` |
| **Codex CLI / cross-agent standard** (`codex`, `agents`) | `~/.agents/skills/webdesign` |
| **Cursor** (`cursor`) | `~/.cursor/skills/webdesign` |
| **Antigravity** (`antigravity`) | `~/.gemini/config/skills/webdesign` (IDE) + `~/.gemini/antigravity-cli/skills/webdesign` (agy CLI) |
| **opencode** (`opencode`) | `~/.config/opencode/skills/webdesign` |
| **Grok Build** (`grok`) | `~/.grok/skills/webdesign` |
| **Hermes** (`hermes`) | `~/.hermes/skills/webdesign` |
| `all` | both `claude` and `agents` targets |

**Manual:**
```bash
cp -R skills/webdesign ~/.claude/skills/webdesign   # or your host's skills dir
```

## Quick start

Invoke with `/webdesign` (or your host's skill invocation):

```
/webdesign author a DESIGN.md for a fintech landing page
/webdesign design a hero that doesn't look AI-generated
/webdesign art-review this build
/webdesign run a scored design critique on this page
```

## Pick by job

Read only what the job requires — the full 22-row table lives in
[SKILL.md](skills/webdesign/SKILL.md#pick-by-job):

| I need to… | Read |
|---|---|
| Decide a visual direction / take a point of view / avoid generic | [frontend-design-principles.md](skills/webdesign/references/frontend-design-principles.md) |
| Record the direction as a DESIGN.md (format, tokens, CLI, lint) | [design-direction.md](skills/webdesign/references/design-direction.md) |
| Check a draft against the current named AI tells | [anti-default-catalog.md](skills/webdesign/references/anti-default-catalog.md) |
| Plan a site's pages, nav, footer, section catalog + archetypes | [section-archetypes.md](skills/webdesign/references/section-archetypes.md) |
| Design/compose/build one distinctive section | [section-design-workflow.md](skills/webdesign/references/section-design-workflow.md) |
| Build the frontend from a design (any stack; Next.js worked example) | [frontend-build-patterns.md](skills/webdesign/references/frontend-build-patterns.md) |
| Review a finished build against its direction (punch-list) | [art-review.md](skills/webdesign/references/art-review.md) |
| Run a scored review / go-no-go QA gate | [design-critique.md](skills/webdesign/references/design-critique.md) |

## Repo map

```
skills/webdesign/   the skill: SKILL.md (router) + references/ (22 reference files)
docs/               the manual — installation, usage, stages, recipes
site/               the visual guide, deploys to webdesign-skill.vercel.app
scripts/check-sync  the release gate (repo-side tooling, NOT shipped with the skill)
install.sh          installer (claude | codex | cursor | antigravity | opencode | grok | hermes | agents | all)
```

## Versioning & releases

[SemVer](https://semver.org/). The current version lives in `skills/webdesign/SKILL.md`
frontmatter (`version:`) and is tagged in git as `v<version>`. Every release updates the
frontmatter, the **Version X.Y.Z** line in the SKILL.md body, and `CHANGELOG.md` together, and
must pass `scripts/check-sync` — CI-enforced on every PR via
[`.github/workflows/check-sync.yml`](.github/workflows/check-sync.yml).

## License

[MIT](LICENSE) · Tamás Gábor ([@gabros20](https://github.com/gabros20))

Repo structure and release discipline templated from
[github.com/gabros20/orchestrate](https://github.com/gabros20/orchestrate).
