# Design critique — a scored review rubric

Purpose: Run a repeatable scored visual and usability review that produces a go or no-go decision.

Read when:
- The request asks for structured critique, severity routing, or a final visual QA gate.

Skip when:
- The request is an art-direction comparison against one approved design; use art-review instead.

Inputs:
- Rendered interface, target personas, constraints, and available mechanical checks.

Produces:
- Scored findings, severity, synthesis, and a go or no-go result.

## Contents

- Assessment A — heuristic and cognitive-load review
- Assessment B — mechanical checks
- Severity routing
- Synthesis
- Go/no-go gate

A repeatable way to *review* an interface, not just admire it. Use it for self-critique while
building (see
[frontend-design-principles.md](frontend-design-principles.md#restraint-and-self-critique)) and as
a structured QA pass on a finished build. It turns "looks good" into scored, severity-routed
findings.

Adapted from `pbakaus/impeccable` (Apache-2.0). Run it honestly — the point is to find the
problems, not to award a high number.

## Assessment A — heuristic + cognitive-load review

### 1. Nielsen's 10 usability heuristics, scored 0–4 each (/40)

Score each heuristic 0 (broken) → 4 (exemplary): visibility of system status · match to the real
world · user control & freedom (undo/redo, escape hatches) · consistency & standards · error
prevention · recognition over recall · flexibility & efficiency · aesthetic & minimalist design ·
help users recognize/diagnose/recover from errors · help & documentation.

**Honesty calibration:** most real, shipped interfaces score **20–32 / 40**. A 38 means you aren't
looking hard enough. Report the per-heuristic scores, not just the total, and name the lowest two
as the focus.

### 2. Cognitive load

Classify load as **intrinsic** (inherent to the task — keep), **extraneous** (caused by the
design — cut), or **germane** (builds the user's mental model — keep). Then check:

- **Working-Memory Rule:** a person holds **≤ 4 items** at once (Miller's 7±2, revised down by
  Cowan, 2001). Concretely: **nav ≤ 5** top items, **hierarchy ≤ 3 tiers**, **a form step ≤ 4
  fields** before it feels like work.
- Watch for named violations — e.g. **"The Wall of Options"** (every choice shown at once with no
  progressive disclosure), undifferentiated dense tables, dialogs that ask the user to remember
  something from the previous screen.

### 3. Five test personas

Walk the key flow as each: **power user** (is it fast, keyboardable?), **first-timer** (is the
next step obvious?), **accessibility user** (focus order, contrast, labels, reduced motion),
**stress-tester** (long strings, empty/overflow/error states), **distracted-mobile** (one thumb,
sunlight, half-attention).

## Assessment B — mechanical checks

Pair the judgment above with deterministic checks the eye misses: contrast ratios (AA ≥ 4.5:1 body
/ 3:1 large), text never clipped or overflowing its container, no skipped heading levels, tap
targets ≥ 44px, line length ~45–75ch, design-system tokens actually used (no off-scale one-off
colors / radii / fonts). Check by hand or with the build's lint/a11y tooling; if you have an
automated contrast/a11y detector available, run it and treat this as the pass it automates.

## Severity routing (P0–P3)

Route every finding by impact, not by how easy it is to fix:

- **P0** — blocks the core task or excludes a user (unusable control, contrast failure on a
  primary action, keyboard trap).
- **P1** — the test: **"would a real user contact support over this?"** If yes, it's at least P1.
- **P2** — friction or inconsistency that slows people but has a workaround.
- **P3** — polish, delight, refinement.

## Synthesis

Don't just list findings — **weave** the two assessments: note where judgment and mechanical
checks agree (high confidence), where the detector flagged something the review missed (and
vice-versa), and call out any false positives. Close with a **peak-end read**: what's the emotional
high point of the flow, and what's the last thing the user feels? Those two moments
disproportionately shape how the whole experience is remembered.

## Running this as a go/no-go QA gate

When this rubric is the final check before a build ships (not just self-critique while building),
add two mechanical layers underneath the judgment above, and let them gate the ship decision
directly:

- **Coverage.** Confirm every component/section the design or content plan calls for is actually
  wired up and rendering — not silently missing or falling back to a blank/placeholder state. A
  design system, template, or content model that defines a piece but never renders it is a
  load-bearing gap, not a cosmetic one: treat any such gap as a **blocker** (P0/NO-GO), not a
  polish item.
- **Build health.** The build/typecheck/lint pipeline passes clean, and — if a design-system spec
  like `DESIGN.md` backs the project — it still lints clean (see
  [design-direction.md](design-direction.md)) with no broken token references.
- **Look at the real thing, don't just build it.** Drive a real browser and screenshot *every*
  route/page at both a desktop viewport (e.g. 1440×900) and a mobile device viewport (e.g. an
  iPhone-class width), then read the screenshots. Route real layout/visual defects — overflow or
  clipping, header overlap, broken or placeholder media, unusable mobile navigation, unwanted
  horizontal scroll, low contrast — into the P0–P3 severity system above. A screenshot-only review
  (never actually looking at rendered output) misses exactly the defects that matter most to a
  real visitor.

Fold the coverage and build-health findings into the same P0–P3 list rather than keeping them as a
separate checklist — a broken build or a missing section is exactly the kind of P0 that should
block a ship decision alongside a usability P0 found by eye. **Any P0, or a P1 you can't
immediately fix, is a NO-GO** — don't round up a broken core flow to "ready" because the visual
polish is otherwise good.
