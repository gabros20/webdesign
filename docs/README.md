# Docs index

Four documents cover using `webdesign`; two more (linked at the bottom) cover why it's built the
way it is. Each doc has one job — read in this order the first time, then jump straight to whichever
one answers your question.

| Doc | Type | Answers |
|---|---|---|
| [installation.md](installation.md) | How-to | How do I get `/webdesign` running in Claude Code (or another host)? |
| [usage.md](usage.md) | Reference | How does the skill trigger, what's the six-stage arc, and what does each stage produce? |
| [stages.md](stages.md) | Reference / explanation | What does each of the 6 stages do, which references does it load, and what's its gate? |
| [recipes.md](recipes.md) | How-to | What's the exact prompt for `<scenario>`? |

## Reading order

1. **[installation.md](installation.md)** — install it, confirm `/webdesign` responds.
2. **[usage.md](usage.md)** — how it triggers, the six-stage arc, the pick-by-job table, and the
   non-negotiable laws. Read this once, fully; everything else builds on it.
3. **[stages.md](stages.md)** — one stage at a time, as you need it. Skip straight to the stage
   your task enters, or browse to see the whole arc.
4. **[recipes.md](recipes.md)** — copy-paste scenario prompts. Keep this one open while you work.

If you only read one page, read **usage.md** — it's the full control surface; the others are
elaboration and shortcuts on top of it.

## Background (not needed to use the skill)

Two folders separate *what was gathered* from *what shipped*:

- **[research/](research/)** — the research record: where the skill's content came from and what
  was deliberately left out. Version-agnostic; the header states its status.
  - [research/provenance.md](research/provenance.md) — the source→target mapping that fed v1.0.0
    (which reference file came from which part of the source corpus, and what was stripped).
- **[designs/](designs/)** — implementation designs that shipped, one per release that changed
  behavior. **The filename carries the release version** (`v<version>-<topic>.md`) and the header
  states the version + date; [CHANGELOG.md](../CHANGELOG.md) is the cross-reference.
  - [designs/v1.0.0-initial-synthesis.md](designs/v1.0.0-initial-synthesis.md) — why the skill is a
    router over references rather than one long document, the six-stage arc, the `SKILL.md` line
    budget, and how v1.0.0 was actually built (a staged multi-agent synthesis run over the source
    corpus, closed out with a four-way adversarial review).

Lifecycle: research lands in `research/` → when acted on, an implementation design lands in
`designs/` as `v<next-version>-<topic>.md` → the release bumps `version:` in
`skills/webdesign/SKILL.md` frontmatter, adds a CHANGELOG entry, passes `scripts/check-sync`
(CI-enforced on every PR), and tags `v<version>`.

Read these if you want to know *why* something works the way it does, or if you're extending the
skill yourself.

---

*Repo structure and release discipline templated from the orchestrate skill repo
(github.com/gabros20/orchestrate).*
