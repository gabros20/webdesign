# `webdesign` — visual-capture tooling: what the review stages actually need

> **Status:** implemented — this research fed **v1.2.0** (design:
> [../designs/v1.2.0-capture-tooling.md](../designs/v1.2.0-capture-tooling.md) ·
> [CHANGELOG](../../CHANGELOG.md)). Run 2026-07-15/16.

The question, raised after v1.1.0: **does the skill have prerequisites, and how does the art
review technically work?** Stages 1–4 turned out to be dependency-free (direction, structure, and
craft are pure reading/writing; the build needs only the project's own stack). But stages 5–6 and
the build stage's visual self-check are genuinely *visual* — the agent must serve the build,
screenshot it, and **read the images** — and the skill never named that prerequisite anywhere.
`design-critique.md` even warns that a screenshot-less review isn't a design review, without
saying what tooling makes one possible.

## The capability contract (tool-independent)

1. Serve the build on a local port.
2. Screenshot programmatically: per-section tight crops, two viewports (desktop ~1440×900 +
   iPhone-class), `prefers-reduced-motion` emulated, elements scrolled into view first.
3. Read the images — the reviewing model must be multimodal. No vision, no art review.

## Evidence — the production pattern this skill descends from

Brease Factory (the internal website-rebuild pipeline this skill was extracted from) runs the same
review at production scale as a **two-tier hybrid**:

- **Batch capture is a deterministic Playwright script** — serves the build, targets each
  section wrapper, writes full-res element crops at desktop + iPhone-class viewports with reduced
  motion emulated and scroll-into-view (lazy images), and prints an ordered manifest for the
  reviewer to walk. **Zero tokens while it runs** — one tool call, images on disk, tokens spent
  only on *reading* them.
- **Interactive inspection is the `agent-browser` CLI** — both its art-review and QA agents carry
  it (`set viewport 1440 900`, `set device "iPhone 14"`, screenshots, poking hover/nav/forms).

## Evidence — the tool landscape (checked 2026-07-16)

- **`agent-browser`** (Vercel's Rust CLI over CDP): the documented token-efficiency winner for
  interactive agent automation. Published comparisons: Playwright MCP costs ~13.7k tokens just to
  load its tooling and returns a full accessibility snapshot per action; agent-browser returns
  "Done" for a click — a 10-step flow measured at ~7k tokens vs ~114k on Playwright MCP (~93% less
  context). No Playwright/Puppeteer dependency (installs its own Chromium via `agent-browser
  install`), host-agnostic (Claude Code, Cursor, Codex, …), and self-documenting (`agent-browser
  skills get core` serves usage matching the installed version, so guidance can't go stale).
- **MCP browser servers** (Playwright MCP, Chrome DevTools MCP, host Chrome integrations): the
  least token-efficient path — schema loading plus per-action snapshots land in context. Fine as a
  *fallback* when already present; not the recommendation.
- **Scripted Playwright/Puppeteer**: unbeatable for *batch* capture (one call, N images), wrong
  shape for exploratory poking (every probe means editing and re-running a script).

## Conclusion (what v1.2.0 encodes)

A ladder, matching the job to the tool:

1. **Batch capture → script it** (throwaway Playwright script or a one-command shell loop): the
   token-optimal path for building the review manifest.
2. **Interactive inspection → `agent-browser`**: the token-optimal path for everything
   exploratory.
3. **Fallback → host-native browser tools** when nothing can be installed.
4. **No browser → degrade honestly**: a code-level pass explicitly labeled "not an art review; no
   build was viewed" — never a silent downgrade.

Plus the economy rule that governs all four: **spend tokens reading crops, not driving the
browser** ("a picture is worth a thousand tokens").

## Considered and rejected

- **Shipping a capture script with the skill** — rejected: the skill deliberately has no
  scripts/runtime machinery (v1.0.0 design), and a committed script would hard-code one stack's
  section markup; the *recipe* (crops, viewports, reduced motion, manifest) is the durable part.
- **A `toolbox`-style prerequisite probe script** (as the orchestrate skill ships) — rejected for
  the same no-machinery reason; a stated contract + ladder in `art-review.md` does the job at zero
  runtime cost.
- **Mandating one tool** — rejected: contradicts the v1.1.0 stack-posture doctrine. The contract
  is normative; the tools are recommendations with a fallback ladder.

## Watchlist

- The token-cost comparisons are point-in-time (agent-browser 0.26.x era); MCP servers may grow
  terser. The *shape* of the recommendation (script batch / CLI interactive / honest degrade)
  outlives the specific numbers.
