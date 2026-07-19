# Frontend design principles

Purpose: Set an opinionated, brief-specific visual point of view and the constraints that keep it coherent.

Read when:
- A website needs direction, register, visual identity, or an anti-generic starting point.

Skip when:
- The task implements an already approved direction without revisiting design intent.

Inputs:
- Subject, audience, brand evidence, content, surface register, and constraints.

Produces:
- A defensible direction with palette, typography, layout, signature move, and restraint rules.

## Contents

- Ground it in the subject
- Register: is the design the product, or does it serve it?
- Design principles
- Design with real assets, not invented ones
- Process: brainstorm, explore, plan, critique, build, critique again
- Restraint and self-critique
- More on writing in design

Approach this as the design lead at a small studio known for giving every client a visual identity
that could not be mistaken for anyone else's. Assume the client has already rejected proposals
that felt templated, and is paying for a distinctive point of view: make deliberate, opinionated
choices about palette, typography, and layout that are specific to this brief, and take one real
aesthetic risk you can justify.

This is the taste/point-of-view layer. It pairs with:

- [design-direction.md](design-direction.md) — how to record the direction you decide on here as a
  formal `DESIGN.md` design-system document.
- [anti-default-catalog.md](anti-default-catalog.md) — the named, current list of AI-design tells
  to check any draft against.
- [design-critique.md](design-critique.md) — a scored rubric for reviewing an interface once built.
- [art-review.md](art-review.md) — judging a finished build against the direction you set.
- The `web-section-design` skill (a separate, deeper technique library) — this file owns
  *direction* (palette, type, signature, register); when you need the concrete *moves* to realize
  it — copy-pasteable layout/type/depth/motion techniques, a goal→technique device map, and
  per-vertical strategy playbooks covering the premium↔information dial
  ([niche-and-vertical-design.md](niche-and-vertical-design.md)), trust/proof/E-E-A-T + SEO
  structure ([trust-proof-and-structure.md](trust-proof-and-structure.md)), and ethical
  persuasion/conversion ([persuasion-and-conversion.md](persuasion-and-conversion.md)) — load that
  skill during both the direction-setting stage and the build stage.

## Ground it in the subject

If the brief does not pin down what the product or subject is, pin it yourself before designing:
name one concrete subject, its audience, and the page's single job, and state your choice. If
there's any information available about the audience's preferences, context about what's being
built, or past designs, use that as a hint. The subject's own world — its materials, instruments,
artifacts, and vernacular — is where distinctive choices come from. Build with the brief's real
content and subject matter throughout.

## Register: is the design the product, or does it serve it?

Decide this before choosing any direction — it sets the bar, and can **invert** the principles
below. (Concept adapted from `pbakaus/impeccable`.)

- **Design IS the product** — brand sites, landing pages, marketing, launch microsites: anything
  whose job is to be *noticed and remembered*. **Distinctiveness is the bar.** The anti-templated
  thesis applies in full: take the aesthetic risk, make the type a character, let one signature
  element carry the boldness.
- **Design SERVES the product** — dashboards, app shells, settings, admin, dense tools people
  operate daily. **Earned familiarity is the bar.** A fluent Linear / Figma / Notion user should
  look at it and immediately *trust and operate* it; surprise here is a cost, not a feature. This
  inverts several defaults: prefer a **fixed rem type scale** over fluid `clamp()`; give every
  interactive component its **full state set** (hover / focus / active / disabled / loading /
  empty / error); reach for boring, proven patterns over novel ones (a modal as the *first* idea is
  usually laziness, not a choice); and **Inter / SF Pro is a legitimate pick here, not a tell**.

Name the register **per surface, not per project** — most products are mostly-serve with a few
is-the-product surfaces (a marketing home sitting over an app). Everything below assumes brand
register unless the surface is in serve register, where discipline, consistency, and
state-completeness matter more than the signature.

## Design principles

For web designs, the hero is a thesis. Open with the most characteristic thing in the subject's
world, in whatever form makes sense for it: a headline, an image, an animation, a live demo, an
interactive moment. Be deliberate with your choice: a big number with a small label, supporting
stats, and a gradient accent is the template answer, only use if that's truly the best option.

Typography carries the personality of the page. Pair the display and body faces deliberately, not
the same families you would reach for on any other project, and set a clear type scale with
intentional weights, widths, and spacing. Make the type treatment itself a memorable part of the
design, not a neutral delivery vehicle for the content.

Structure is information. Structural devices — numbering, eyebrows, dividers, labels — should
encode something true about the content, not decorate it. Many generic designs use numbered
markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence — like a
real process or a typed timeline where order carries information the reader needs. Question
whether choices like numbered markers actually make sense before incorporating them.

Leverage motion deliberately. Think about where and if animation can serve the subject: a
page-load sequence, a scroll-triggered reveal, hover micro-interactions, ambient atmosphere. An
orchestrated moment usually lands harder than scattered effects; choose what the direction calls
for. However, sometimes less is more, and extra animation contributes to the feeling that the
design is AI-generated.

Match complexity to the vision. Maximalist directions need elaborate execution; minimal directions
need precision in spacing, type, and detail. Elegance is executing the chosen vision well.

Consider written content carefully. Often a design brief may not contain real content, and it's up
to you to come up with copy. Copy can make a design feel as templated as the design itself. See
"More on writing in design" below.

## Design with real assets, not invented ones

Specify concrete assets in the design direction instead of leaving the builder to invent them —
real libraries exist for nearly everything a page needs: **icons** (e.g. a proper icon library
with a full meaning→icon index, in line *or* fill weight — pick one weight and hold it),
**flags** (a dedicated flag-icon library rather than emoji flags), **full-color brand/partner
logos** (a maintained SVG logo set, for client/partner/tech-stack strips), **mono brand/social
icons** (a dedicated simple-icons-style set), **background patterns** (a CSS pattern library), and
**decoration** — waves, blobs, hand-drawn underlines (dedicated small libraries exist for each,
rather than hand-rolling SVG). An icon used wrong-for-meaning, hand-rolled, mis-sized, or
mixed-weight — or decoration that reads as noise rather than one deliberate move — is a real defect
at review time (see [art-review.md](art-review.md)), not a nitpick; the point of naming real
libraries in the direction is that the builder had no excuse to invent worse.

## Process: brainstorm, explore, plan, critique, build, critique again

For calibration: AI-generated design right now clusters around three looks: (1) a warm cream
background (near #F4F1EA) with a high-contrast serif display and a terracotta accent; (2) a
near-black background with a single bright acid-green or vermilion accent; (3) a broadsheet-style
layout with hairline rules, zero border-radius, and dense newspaper-like columns. All three are
legitimate for some briefs, but they are defaults rather than choices, and they appear regardless
of subject. Where the brief pins down a visual direction, follow it exactly — the brief's own words
always win, including when it asks for one of these looks. Where it leaves an axis free, don't
spend that freedom on one of these defaults. For the fuller, more specific list of current tells —
the cream/sand OKLCH band and its token-name giveaways, display-type ceilings, reflex-reject fonts,
eyebrow/numbered-marker devices, GPT ghost-card/over-rounding defects, and the second-order
"anti-default rebound" trap — run your draft token system against
[anti-default-catalog.md](anti-default-catalog.md). Just like a human designer who's hired, there's
often a careful balance between doing what you're good at and taking each project as a chance to
experiment and learn.

Work in two passes. First, brainstorm a short design plan based on the brief: create a compact
token system with color, type, layout, and signature. Color: describe the palette as 4–6 named hex
values. Type: the typefaces for 2+ roles (a characterful display face that's used with restraint, a
complementary body face, and a utility face for captions or data if needed). Layout: a layout
concept, using one-sentence prose descriptions and ASCII wireframes to ideate and compare.
Signature: the single unique element this page will be remembered by that embodies the brief in an
appropriate way.

Then review that plan against the brief before building: if any part of it reads like the generic
default you would produce for any similar page (work through a similar prompt to see if you arrive
somewhere similar) rather than a choice made for this specific brief — revise that part, say what
you changed and why. Only after you've confirmed the relative uniqueness of your design plan should
you start to write the code, following the revised plan exactly and deriving every color and type
decision from it.

When writing the code, be careful of structuring your CSS selector specificities. It's easy to
generate CSS classes that cancel each other out (especially with a type-based selector like
`.section` and an element-based selector like `.cta`). This can happen often with paddings/margins
between sections.

These aesthetic choices pair with the implementation-discipline companion in
[frontend-build-patterns.md](frontend-build-patterns.md) — the HTML/CSS/TS craft guidelines,
notably the CSS-specificity care above.

Try to do a lot of this planning and iteration before committing to output, and only show ideas
once you have higher confidence they'll delight.

## Restraint and self-critique

Spend your boldness in one place. Let the signature element be the one memorable thing, keep
everything around it quiet and disciplined, and cut any decoration that does not serve the brief.
Not taking a risk can be a risk itself! Build to a quality floor without announcing it: responsive
down to mobile, visible keyboard focus, reduced motion respected. Critique your own work as you
build, taking screenshots when possible — a picture is worth 1000 tokens. For a structured pass
rather than an impressionistic one — Nielsen heuristics scored 0–40 with honesty calibration, a
cognitive-load / working-memory check (nav ≤ 5, ≤ 3 tiers, ≤ 4 fields), five test personas, and
P0–P3 severity routing — use [design-critique.md](design-critique.md). Consider Chanel's advice:
before leaving the house, take a look in the mirror and remove one accessory. Keep notes on what
you've tried across passes — memory of prior attempts helps avoid repeating a rejected idea.

## More on writing in design

Words appear in a design for one reason: to make it easier to understand, and therefore easier to
use. They are design material, not decoration. Bring the same intentionality to copy that you would
bring to spacing and color. Before writing anything, ask what the design needs to say, and how it
can best be said to help the person navigate the experience.

Write from the end user's side of the screen. Name things by what people control and recognize,
never by how the system is built. A person manages notifications, not webhook config. Describe what
something does in plain terms rather than selling it. Being specific is always better than being
clever.

Use active voice as default. A control should say exactly what happens when it's used: "Save
changes," not "Submit." An action keeps the same name through the whole flow, so the button that
says "Publish" produces a toast that says "Published." The vocabulary of an interface is the
signposting for someone navigating the product. Cohesion and consistency are how people learn their
way around.

Treat failure and emptiness as moments for direction, not mood. Explain what went wrong and how to
fix it, in the interface's voice rather than a person's. Errors don't apologize, and they are never
vague about what happened. An empty screen is an invitation to act.

Keep the register conversational and tuned: plain verbs, sentence case, no filler, with tone
matched to the brand and the audience. Let each element do exactly one job. A label labels, an
example demonstrates, and nothing quietly does double duty.
