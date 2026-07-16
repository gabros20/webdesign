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

- **[research/](research/)** — the research record: where the skill's content came from, what was
  deliberately left out, and the analysis behind later changes. Version-agnostic; each header
  states its status.
  - [research/provenance.md](research/provenance.md) — the source→target mapping that fed v1.0.0
    (which reference file came from which part of the Brease Factory source corpus, and what was
    stripped).
  - [research/stack-agnosticism.md](research/stack-agnosticism.md) — the stack-coupling audit and
    the "how much frontend code belongs in a design skill" question that fed v1.1.0 (the inclusion
    test, the options weighed, the examples-not-endorsements rule).
  - [research/visual-capture-tooling.md](research/visual-capture-tooling.md) — what the review
    stages physically need (serve + screenshot + vision) and the token-efficiency comparison
    behind v1.2.0's toolchain recommendation (script the batch, `agent-browser` for interactive).
- **[designs/](designs/)** — implementation designs that shipped, one per release worth recording
  (skill behavior or its presentation). **The filename carries the release version**
  (`v<version>-<topic>.md`) and the header states the version + date;
  [CHANGELOG.md](../CHANGELOG.md) is the cross-reference.
  - [designs/v1.0.0-initial-synthesis.md](designs/v1.0.0-initial-synthesis.md) — why the skill is a
    router over references rather than one long document, the six-stage arc, the `SKILL.md` line
    budget, and how v1.0.0 was actually built (a staged multi-agent synthesis run over the source
    corpus, closed out with a four-way adversarial review).
  - [designs/v1.0.1-color-identity.md](designs/v1.0.1-color-identity.md) — the raspberry accent
    and the per-skill OKLCH hue-as-identity system (hold L/C, vary hue; the reskin checklist).
  - [designs/v1.1.0-stack-posture.md](designs/v1.1.0-stack-posture.md) — the scope rule and the
    stack-agnostic build posture (Next.js + Tailwind reframed as the worked example; the
    pattern→your-stack mapping table; the demoted JS appendix).
  - [designs/v1.2.0-capture-tooling.md](designs/v1.2.0-capture-tooling.md) — the capture-tooling
    contract for the visual stages (contract over tool mandate; the four-rung ladder; the
    honest-degrade rule).

Lifecycle: research lands in `research/` → when acted on, an implementation design lands in
`designs/` as `v<next-version>-<topic>.md` → the release bumps `version:` in
`skills/webdesign/SKILL.md` frontmatter, adds a CHANGELOG entry, passes `scripts/check-sync`
(CI-enforced on every PR), and tags `v<version>`.

Read these if you want to know *why* something works the way it does, or if you're extending the
skill yourself.

---

*Repo structure and release discipline templated from the orchestrate skill repo
(github.com/gabros20/orchestrate).*
