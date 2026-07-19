# Anti-default catalog — named AI design tells (2026)

Purpose: Identify current visual patterns that make generated web work look generic or machine-produced.

Read when:
- A draft needs an anti-generic review or a route explicitly asks for named AI-design tells.

Skip when:
- The request concerns ordinary correctness rather than visual distinctiveness.

Inputs:
- A draft, screenshot, design direction, or implementation.

Produces:
- Specific default-pattern findings and deliberate replacements.

The specific, current tells that mark a design as machine-generated — sharper than "avoid
generic." Every model was trained on the same SaaS templates, so without active resistance you get
the same defaults *regardless of subject*. Name them, then refuse them.

Adapted from `pbakaus/impeccable` (Apache-2.0). **These are dated to 2026** — they're accurate now
and will age; treat them as a live list, not gospel. Brand register only — in *serve* register
(see [frontend-design-principles.md](frontend-design-principles.md#register-is-the-design-the-product-or-does-it-serve-it))
some of these are legitimate.

## Color

- **The cream/sand/beige body background is the saturated AI default of 2026.** The whole band is
  suspect: OKLCH roughly **L 0.84–0.97, C < 0.06, hue 40–100**. The token names give it away too —
  `--paper`, `--cream`, `--sand`, `--linen`, `--parchment`, `--bone`. If the background landed
  there without a brief reason, it's a default, not a choice.
- Purple→blue and indigo→violet gradients (especially on text or as the primary accent).
- Gradient-filled text headings as the hero device.
- Dark mode with a single bright acid-green / vermilion glow accent (default #2 of the cluster).

## Typography

- **Display `clamp()` max ≤ 6rem.** Bigger reads as a generated hero, not a designed one.
- **Letter-spacing floor ≥ −0.04em on display type.** The reflex default of −0.05 to −0.085em
  makes the letters touch — a dead giveaway.
- **Reflex-reject font list** (overused to the point of being tells): Inter, Fraunces, Playfair
  Display, Space Grotesk, DM Sans. Using one isn't banned, but if your pick *matches the reflex*,
  start the font choice over and justify it against the brief.
- Inter as the body face everywhere (legitimate only in serve register).

## Layout & structure

- **Eyebrow / kicker chips** above every hero headline (the little pill-labeled overline).
- **Numbered section markers** (01 / 02 / 03) used as decoration — only honest when the content
  *is* an ordered sequence (a real process, a typed timeline) where order carries information.
- Cards inside cards inside cards (nested-card soup).
- Icon-tile stacks: a grid of rounded squares each holding one line-icon + label.
- Centered three-up feature row with identical cards as the default "features" answer.

## GPT / Codex-specific defects (refuse and rewrite)

- **Ghost card**: a `1px` border *plus* a `box-shadow` with ≥16px blur on the same element.
- **Over-rounding**: `border-radius: 32px+` on cards/containers.
- Hand-drawn / `feTurbulence` "sketchy" SVG filters used for faux-organic texture.
- `repeating-linear-gradient` candy stripes as a background pattern.
- Meta-criticism copy ("not your average...", "this isn't just another...").

## The second-order check (don't just rebound)

Avoid not only the category default but the **predictable anti-default rebound** — the move a
model makes when told "don't be generic." Fintech-that's-not-navy-and-gold defaults to
terminal-native dark mode; wellness-that's-not-sage defaults to brutalist mono. The rebound is as
templated as the thing it's fleeing. Make a choice specific to *this* brief, not a reflex away from
the obvious one.

## How to use this

During the plan-critique pass (see
[frontend-design-principles.md](frontend-design-principles.md#process-brainstorm-explore-plan-critique-build-critique-again)),
run your draft token system against this list: any color, type, or structural choice that matches
a tell must either earn its place with a brief-specific reason or be replaced — and say what you
changed and why. It's also the reference an [art-review.md](art-review.md) pass judges a finished
build against.
