# Art-direction review — judging a build against its design direction

The studio creative-review pass: the eye that set the visual direction (see
[design-direction.md](design-direction.md)) checks the build before final correctness QA. You
judge with taste, not a test runner. If you can't edit the code yourself, your job is to **see,
judge, and write the punch-list** for whoever builds — direction → build → *review* → revise →
sign-off, repeated until the build honors the direction.

If the project preserves existing copy as SEO-sensitive IP, also flag any section whose copy the
build **altered** from the source/blueprint as a top-severity finding — content drift isn't a
design nitpick when the copy itself must be preserved.

## What you judge against

1. **The project's `DESIGN.md`** (or equivalent design-direction document) — the contract that was
   written. Palette, type pairing, register per-surface, the signature element. Does the build read
   as this direction, or did it drift to a default?
2. **The original source design signals**, when the brief is "new look, same brand" — the source
   look the build should still evoke.
3. **Any project-specific design-system doctrine** the build was supposed to follow — an anti-slop
   checklist, editorial principles, an "art-direct the page" rule set. Absent a project-specific
   doctrine, use [anti-default-catalog.md](anti-default-catalog.md) and
   [frontend-design-principles.md](frontend-design-principles.md) as the bar, including the
   **signature-section rule**: every page needs at least one bespoke composition, not just a
   catalog assembly of generic sections.
4. Your own design taste, informed by the anti-default catalog and the "spend your boldness in one
   place" discipline (see [frontend-design-principles.md](frontend-design-principles.md#restraint-and-self-critique)).

## Procedure

### 1. Capture the build section by section, at full resolution

Full-page screenshots downscale and lose the detail art direction actually lives in. Capture each
distinct section/component of the built page as its own tight crop, at both a desktop viewport and
a mobile device viewport, with reduced motion emulated so reveal/scroll animations settle to their
final resting state before the shot — a blank crop from motion-in-progress is a capture miss, not
a design defect; note it and move on. Build an ordered manifest (document order, desktop before
mobile per section) so the walk below is systematic rather than a random scroll-through.

### 2. Walk the sections ONE BY ONE — write a finding as you go

Go down the manifest in order. For **each** section: look at it, then **immediately write a short
finding for it** into a running notes document before moving to the next. Don't batch the whole
page and judge it at the end — typing each observation as you see it keeps every per-section
judgment available, so when you synthesize the final hand-off nothing gets lost to a fading first
impression.

> **Zoom in — don't rubber-stamp the gestalt.** A section can read fine at a glance and still be
> wrong in the details: a misused or awkwardly placed icon, an icon in the wrong size/style, text
> that wraps into an orphan or overflows its container, a label misaligned with its value, elements
> that don't sit on a shared line. These are exactly the flaws that slip through a fast "looks
> good" approval. Inspect each crop at full resolution and **actively hunt for the small defect**
> in every section before you accept it. Finding nothing is a conclusion you earn by looking, not a
> default.

For each section ask:

- **Direction fidelity** — palette/type/register match the design direction? Or drifted to a
  default (cream+serif+terracotta, near-black+acid-accent, generic broadsheet — see
  [anti-default-catalog.md](anti-default-catalog.md))?
- **Composition** — asymmetry & tension, or centered-everything? Intentional grid use, or a
  uniform card grid? Real type hierarchy (display↔body jump), or flat?
- **Rhythm** — does this section's density differ from its neighbors, or is every section the same
  height/padding?
- **Iconography** *(inspect every icon)* — is each icon the **right symbol for its meaning** (not
  a vaguely-related or generic glyph)? One **consistent set/style/weight** across the section (not
  mixed outline+solid, not mismatched sizes)? **Optically centered & aligned** in its container and
  on a shared baseline/axis with its label (not floating, off-center, clipped, oversized, or
  crammed against text)? No **emoji-as-icons** and no **hand-rolled inline icon SVG** when a real
  icon library was available and a meaning→icon mapping exists — a wrong-for-meaning, hand-drawn,
  mis-sized, or mixed-weight icon is a real defect, not a nitpick.
- **Micro-typography & element detail** — **awkward line breaks / orphans / widows**, text that
  **overflows, clips, or collides** with a neighbor, cramped or uneven padding, headings that wrap
  badly, **misaligned elements** (things that should share an edge/baseline but don't),
  inconsistent gaps, off-center content, buttons with lopsided label padding. The small
  alignment/spacing/wrapping flaws that make a build feel unfinished.
- **Anti-slop tells** — rounded-2xl+shadow cards, gradient text, emoji icons, purple/indigo, a
  predictable 3-col icon-title-blurb, weak contrast (full catalog:
  [anti-default-catalog.md](anti-default-catalog.md)).
- **Desktop ↔ mobile** — does the composition hold on mobile, or collapse to a generic stack? Do
  icons and text keep their alignment on mobile, or do labels wrap and icons drift?

### 3. Score severities — A0–A3

Route each finding by how much it hurts the *design* (this is a distinct severity track from a
functional/correctness QA pass — see [design-critique.md](design-critique.md) for that one):

- **A0 — direction violation.** Off-direction palette/type/register, a clear anti-default-catalog
  tell, broken hierarchy. **Blocks** → drives a revision round.
- **A1 — composition/rhythm failure OR a real detail defect.** Centered-everything, uniform
  repeated card grids, identical section rhythm, no signature section on the page — **and** the
  detail-level flaws that read as unfinished: an **icon misused / wrong-for-meaning / awkwardly
  positioned / mismatched in size or style**, **text that overflows, clips, collides, or breaks
  into awkward orphans**, **visibly misaligned elements** (things that should share an edge/
  baseline but don't). **Blocks.** (Judge severity by how obvious it is — a clearly awkward icon or
  broken text wrap is A1; a 2px nudge is A2.)
- **A2 — refinement.** Sub-perceptual spacing/alignment/measure/motion-tuning that would lift it
  but isn't *noticeably* wrong. Advisory — fix if cheap, never blocks.
- **A3 — delight.** Optional polish. Advisory.

### 4. Synthesize the hand-off + verdict

After the walk, write up a structured hand-off (shape below). The **verdict**:

- **`revise`** when any A0/A1 remains. List those as **specific, addressable instructions** the
  builder can act on without you present — name the page, the section, what's wrong, and the
  concrete fix ("hero is centered with two buttons; recompose as an asymmetric 5:7 split, text
  flush-left, per the design direction's editorial register"). A2/A3 go in a separate notes list
  (worth taking, don't gate).
- **`approve`** when there are **zero A0 and zero A1** findings — the build honors the direction —
  **and this is not the first review round** (see the no-first-pass rule below).

### The no-first-pass-sign-off rule (round 1 always sends something back)

**Round 1 must never be a sign-off.** A first look almost always has *something* worth fixing, and
a too-easy round-1 approval is exactly the failure this discipline exists to prevent. So on
**round 1**:

- If you found any A0/A1 → `revise` as normal.
- If you genuinely found **no** A0/A1 → you still return **`revise`**, and **promote the 1–3
  highest-value refinements** (your best A2 items — the icon/text/alignment/detail improvements
  that would most lift the build) into the blocking list so the builder makes **one real polish
  pass**. Mark each promoted item as gating this round (elevate it to A1 for routing purposes) and
  flag it as promoted, and say in the summary that these are promoted round-1 polish items, not
  direction violations.

This guarantees at least one build→review→**fix**→review cycle. From **round 2 onward** the normal
rule applies: `approve` the moment A0/A1 are clear.

### Convergence discipline (this is what keeps the loop safe — not "crazy picky")

- **Converge from round 2 on, don't chase perfection.** Once the mandatory first revision is done,
  approve as soon as A0/A1 are clear, even if A2/A3 remain. The bar is "honors the direction and
  has no obviously-unfinished details," not "flawless." Don't hold the build hostage to taste
  micro-preferences.
- **Round-over-round, only escalate.** On round 2+, judge whether your prior blocking items were
  fixed. Don't introduce *new* low-value nitpicks you let pass earlier — that's thrash. New A0/A1
  only if a revision genuinely broke something or a real defect was missed.
- **Cap the loop.** Agree a hard round limit up front (a good default is 3 rounds). If A0/A1 still
  remain at the cap, proceed anyway with the findings recorded — so make the final round's blocking
  list the *highest-leverage* fixes, not an exhaustive one.

## Output shape

A structured review record per round:

```ts
{
  round: number,                       // 1-based
  verdict: "approve" | "revise",
  summary: string,                     // one paragraph: does the build read as the direction? top issues.
  per_section: Array<{
    location: string,                  // page/route + section identifier
    direction_fidelity: "on" | "drifted" | "off",
    findings: Array<{ severity: "A0"|"A1"|"A2"|"A3", issue: string, fix: string }>
  }>,
  blocking: Array<{ location: string, severity: "A0"|"A1", issue: string, fix: string,
                    promoted?: boolean }>,   // promoted:true = a round-1 A2 raised to gate the mandatory first polish pass
  notes: Array<{ location: string, severity: "A2"|"A3", issue: string, fix: string }>,
  signed_off: boolean                  // true only on verdict "approve"
}
```

Plus a running per-section notes document (the human-readable trail from step 2).

## Acceptance

The review record has an explicit `verdict`; on `revise`, every A0/A1 appears in the blocking list
with a concrete fix. On `approve`, blocking is empty and `signed_off` is true. **Round 1's verdict
is never `approve`** — it always carries at least one blocking item, whether a real A0/A1 or a
promoted round-1 polish item.

## Boundaries

- **The reviewer's deliverable is the punch-list, not the fix.** A build that drifts from the
  direction is exactly what this review exists to catch, but someone else does the fixing — keep
  the roles separate even if the same person plays both at different times.
- **Design taste only.** Functional correctness (build/typecheck, coverage of intended
  components, route parity, broken links, data delivery) belongs to a correctness QA pass (see
  [design-critique.md](design-critique.md)) — don't duplicate it here. If you spot a hard
  functional break (a section renders nothing, an image 404s everywhere), note it in the summary so
  it gets caught early, but your severities are about the *look*.
