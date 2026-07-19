# Installation

Install the `webdesign` runtime pack from `gabros20/webdesign-skill`.

## Prerequisites

- An Agent Skills-compatible client.
- Stages 1-4 require no external CLI.
- Art review, critique, and build self-checks require a runnable page, screenshot capability, and a
  model that can inspect images. A scripted browser capture is preferred for batches;
  [`agent-browser`](https://github.com/vercel-labs/agent-browser) is suitable for interactive
  inspection. Without rendered evidence, the skill must label its review as code-level only.

## Install with skills.sh

```bash
npx skills add gabros20/webdesign-skill
```

## Clone and install

```bash
git clone https://github.com/gabros20/webdesign-skill.git
cd webdesign-skill
./install.sh codex
```

| Argument | Destination |
|---|---|
| `codex` | `${CODEX_HOME:-$HOME/.codex}/skills/webdesign/` |
| `agents` | `~/.agents/skills/webdesign/` |
| `claude` | `~/.claude/skills/webdesign/` |
| `cursor` | `~/.cursor/skills/webdesign/` |
| `antigravity` | Gemini IDE and Antigravity CLI skill paths |
| `opencode` | `~/.config/opencode/skills/webdesign/` |
| `grok` | `~/.grok/skills/webdesign/` |
| `hermes` | `~/.hermes/skills/webdesign/` |
| `all` | Claude, Codex, and the cross-agent path |

The installer stages a full runtime copy before replacement and restores an existing installation
if replacement fails.

## Verify

Start a new client session and use its supported form:

- Codex: `$webdesign`
- Slash-command clients: `/webdesign`
- Other clients: `@webdesign`, a skill tool, or natural-language activation

For Codex, verify the runtime pack directly:

```bash
test -f "${CODEX_HOME:-$HOME/.codex}/skills/webdesign/SKILL.md"
```

Then run a small route-specific request, for example:

```text
Use $webdesign to critique the visual hierarchy of this landing page.
```

## Update

```bash
cd webdesign-skill
git pull --ff-only
./install.sh codex
```

Review [CHANGELOG.md](../CHANGELOG.md) and GitHub Releases for version history. Version metadata
intentionally stays outside runtime `SKILL.md`.

## Uninstall

```bash
rm -rf "${CODEX_HOME:-$HOME/.codex}/skills/webdesign"
```

## Optional DESIGN.md CLI

The direction workflow can use Google's alpha `design.md` CLI for schema inspection, linting,
diffing, and token export:

```bash
npx @google/design.md@<pinned-version> spec
```

Pin a tested version and inspect its current specification before authoring. Without the CLI, the
skill can still produce the same design contract as Markdown; only automated lint/diff/export is
unavailable.
