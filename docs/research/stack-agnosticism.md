# `webdesign` — stack-coupling audit and the scope question

> **Status:** implemented — this research fed **v1.1.0** (design:
> [../designs/v1.1.0-stack-posture.md](../designs/v1.1.0-stack-posture.md) ·
> [CHANGELOG](../../CHANGELOG.md)). Run 2026-07-15.

Two questions, raised together after v1.0.1 shipped:

1. **How Next.js/React-oriented is the skill really?** A web design skill obviously has to touch
   technology, but it shouldn't push one stack — a user on Astro, SvelteKit, or plain HTML should
   get the same value.
2. **How much frontend-code content belongs in a *web design* skill at all?** Is implementation
   detail technically/strategically valid here, or does it belong in a separate frontend skill?

## Method

A mechanical audit rather than an impression: grep the whole skill (SKILL.md + 22 references,
3,631 lines) for stack markers — `Next.js`, `App Router`, `'use client'`, `React`, `jsx/tsx`,
`generateStaticParams`, `next/font`, `Tailwind`, plus tooling names (`pnpm`, `biome`, `vercel`,
`shadcn`) — then classify every hit in context: stack *requirement*, stack *example*, or a false
positive.

## Findings

**~85% of the skill is genuinely stack-agnostic.** All 13 craft references (layout, typography,
color, depth, decoration, imagery, motion, experimental, verticals, trust, persuasion, design
thinking, the craft router) plus `design-direction.md`, `art-review.md`, `design-critique.md`,
`anti-default-catalog.md`, `frontend-design-principles.md`, and `section-archetypes.md` are pure
design doctrine and plain CSS.

False positives worth naming: every `Vercel` hit in the craft corpus is an **aesthetic exemplar**
("the Linear/Stripe/Vercel feel"), not stack advice. The only framework traces in the craft corpus
are legitimate: react-three-fiber named as *one* way to ship a WebGL shader plane
(`experimental-and-creative.md`), and a one-line GSAP-remount pitfall scoped "In React/Next"
(`motion-and-interaction.md`).

**The real coupling concentrated in exactly two files plus the router's framing:**

| Surface | Coupling | Assessment |
|---|---|---|
| `frontend-build-patterns.md` | Stack section mandated Next.js App Router + Tailwind + pnpm + biome + motion; registry pattern uses `'use client'`, `generateStaticParams`, `next/font` | Half the file was *already written generically* ("the framework's native `Image`", "the framework's not-found handler"); the load-bearing patterns — keyed section registry, fail-loud on unmapped keys, token-only styling, visual self-check, punch-list loop — port to any stack unchanged |
| `tailwind-v4-theme.md` | 100% Tailwind v4 | Honestly named, loaded only when the job *is* Tailwind; defensible as-is with one added escape hatch |
| `SKILL.md` | Three sentences: "the Next.js build", "scaffold Next.js", "Build the Next.js frontend" | The perception problem — made the whole skill *sound* Next-locked when only one stage's reference implementation was |

**The scope question resolved into an inclusion test:** content belongs in this skill **if it
changes what the user sees or feels; it doesn't if it only changes how the codebase is
maintained.** Run against the corpus: all the CSS craft, token→theme mapping, the section-registry
discipline (fail-loud is a design-integrity mechanism), motion implementation, asset handling, and
the visual self-check pass. The one section that fails is the TypeScript/JavaScript style guide in
`frontend-build-patterns.md` (`const` > `let`, composition, coercion rules) — generic engineering
craft; nothing in it changes a pixel.

**No separate frontend skill is warranted.** The boundary already exists in the ecosystem —
SKILL.md hands component-API engineering to `building-components`, deep a11y to `accessibility`,
asset generation to `generate-image`/`generate-video`. A standalone "frontend skill" would just
recreate the fuzzy boundary one level down. The fix is stating the rule and demoting the one
violating section, not a new skill.

## Options considered

- **A — reframe (chosen).** Reposition Next.js + Tailwind v4 as the **worked example / reference
  stack**: state the scope rule and stack posture in SKILL.md, add a "Stack posture" section with
  a pattern→your-stack mapping table to `frontend-build-patterns.md`, demote the JS style guide to
  a labeled appendix, add a "No Tailwind?" note to `tailwind-v4-theme.md`, align README/docs/site.
  Zero craft content rewritten — quality risk ≈ 0.
- **B — split into a stack-neutral core + `stacks/nextjs.md` adapters (deferred).** Opens clean
  slots for `stacks/astro.md` etc., but premature while there's one worked stack; revisit when a
  second stack is actually requested.
- **C — full abstract rewrite (rejected).** Violates the skill's own founding principle ("every
  reference is copy-pasteable rather than abstract"); abstract build guidance is worse guidance.

## The examples list (and the staleness trap)

The reframe names alternatives as **categories with examples, never an endorsement list** — a
framework catalog goes stale the moment the landscape shifts. Snapshot used (mid-2026 heat):
frameworks — Astro, SvelteKit, Nuxt, TanStack Start, React Router 7 (Remix's successor), and
HTMX + Alpine.js at the lean end; styling — Tailwind, vanilla CSS custom properties, StyleX
(gaining traction), CSS Modules. The durable content is the *mapping table of primitives*
(component-per-key, fail-loud registry, tokens→styling, static routes, image/font primitives,
redirects) — what to look for in *any* stack.

## Watchlist

- If a second worked stack gets real demand, promote option B (`stacks/` adapters) — the Stack
  posture mapping table is the seed for each adapter.
- The framework/styling example names will age; refresh them opportunistically on future releases
  (they're framed as examples precisely so staleness isn't a correctness bug).
