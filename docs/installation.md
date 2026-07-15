# Installation

How to get `/webdesign` running, confirm it's registered, update it, and remove it. `webdesign` is
a plain [Agent Skills](https://agentskills.io)-format skill — a `SKILL.md` router plus a
`references/` folder, no scripts, no config file — so any agent that reads that format can use it.
This guide targets Claude Code (the reference host) and notes the other hosts' paths where they
differ.

## Prerequisites

- An Agent Skills host: [Claude Code](https://claude.com/product/claude-code) (reference), or
  Codex CLI / Cursor CLI / Antigravity / opencode / Grok Build / Hermes.
- Nothing else is required. The skill has no external CLI dependency, no worktree requirement, and
  no config file — it's a router plus 22 reference files an agent reads on demand. (Optional
  tooling for the direction stage — the `design.md` CLI — is covered at the bottom.)

## Install (pick one)

### 1. skills.sh ecosystem

If you already use the [skills.sh](https://skills.sh) registry:

```bash
npx skills add gabros20/webdesign
```

Maps to the right directory across 70+ agents automatically. Add `-g` to install it globally
(available in every project); drop it to install into the current project only.

### 2. Clone + installer script

```bash
git clone https://github.com/gabros20/webdesign && cd webdesign
./install.sh claude   # or: codex | cursor | antigravity | opencode | grok | hermes | agents | all
```

`install.sh` takes one argument (default `claude` if omitted):

| Argument | Installs to |
|---|---|
| `claude` | `~/.claude/skills/webdesign/` |
| `codex` / `agents` | `~/.agents/skills/webdesign/` (the cross-agent standard path — Cursor, opencode, Copilot, Amp read it too) |
| `cursor` | `~/.cursor/skills/webdesign/` |
| `antigravity` | `~/.gemini/config/skills/` (IDE) **and** `~/.gemini/antigravity-cli/skills/` (agy) |
| `opencode` | `~/.config/opencode/skills/webdesign/` |
| `grok` | `~/.grok/skills/webdesign/` (Grok Build also reads `~/.claude/skills` directly) |
| `hermes` | `~/.hermes/skills/webdesign/` (Hermes has no confirmed project-level dir; invoke explicitly with `/webdesign`) |
| `all` | `claude` + `agents` — covers most hosts without littering every vendor dir |

It's a straight copy — `rm -rf <dest>` then `cp -R skills/webdesign <dest>` — so re-running it is
also how you update (see [Updating](#updating) below). No other arguments are accepted; anything
else prints usage and exits 1.

### 3. Manual copy

```bash
cp -R skills/webdesign ~/.claude/skills/webdesign
```

Equivalent to the installer's `claude` target — use this if you want the skill under a different
name, or if you're vendoring it into a monorepo's own skills directory instead of `~/.claude/skills`.

## Verifying it registered

Claude Code loads skills from `~/.claude/skills/*/SKILL.md` at session start, keyed by the
frontmatter `name` field. After installing:

1. Start a **new** Claude Code session (already-running sessions won't pick up a fresh install).
2. Type `/webdesign` — it should be offered as a slash command. You can also just describe the
   task in the trigger phrases from the frontmatter description ("design a website / section /
   hero", "art direction", "author a DESIGN.md", "make it look premium / not generic / not
   AI-generated", "design review / critique") and the host should invoke the skill on its own —
   unlike a dispatch-style skill, there's no separate argument grammar to learn.
3. Ask "which version of webdesign is installed" — it should answer from the version line in its
   own `SKILL.md` body (`**Version 1.0.0**`), not from a separate command.
4. If none of that works, confirm the file exists and has valid frontmatter:
   ```bash
   head -5 ~/.claude/skills/webdesign/SKILL.md
   ```
   You should see `name: webdesign` and a `description:` line. A missing or malformed frontmatter
   block is the usual reason a skill silently fails to register.

For the other hosts, registration is governed by each CLI's own skill-discovery mechanism —
confirm the directory and `SKILL.md` exist. Notable per-host quirks: opencode invokes skills via
its `skill` tool (no slash form); Gemini-lineage hosts may show a one-time consent prompt on first
activation; Grok Build loads skills at session start only (start a new session after installing);
Hermes requires explicit `/webdesign` (no description auto-trigger).

## Updating

There's no separate update command — re-run whichever install path you used:

```bash
# clone + installer
cd webdesign && git pull && ./install.sh claude

# skills.sh
npx skills add gabros20/webdesign

# manual
cp -R skills/webdesign ~/.claude/skills/webdesign
```

Each of these overwrites the installed copy in place (`install.sh` does `rm -rf` first), so there's
nothing to reconcile — just make sure you're pulling the latest source before you re-copy it.

## Uninstalling

```bash
rm -rf ~/.claude/skills/webdesign      # Claude Code
rm -rf ~/.agents/skills/webdesign      # Codex, if installed there
```

The skill carries no per-project workspace or state directory to clean up separately — removing
the skill directory is the whole uninstall.

## Optional: the `design.md` CLI

Needed only for the direction stage — authoring, linting, and diffing a project's `DESIGN.md` (see
[usage.md](usage.md) and the skill's `references/design-direction.md`).

```bash
npx @google/design.md@<pinned-version> spec
```

`design.md` (npm `@google/design.md`, Apache-2.0) is alpha and its schema churns — pin a version
rather than always pulling latest, and run `design.md spec` before authoring to verify the current
API instead of trusting memory. Without it, direction can still be written and recorded as prose;
you just lose the automated lint/diff/export gate.
