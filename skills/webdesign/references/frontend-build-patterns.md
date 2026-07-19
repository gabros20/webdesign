# Building the frontend: scaffold, sections, theming, data, and QA

Purpose: Translate approved website direction and section schemas into a runnable appearance layer in the existing stack.

Read when:
- The request asks to build the visual frontend, section registry, theme, assets, or rendered self-check.

Skip when:
- The work concerns backend behavior, application state, data architecture, or reusable component API design.

Inputs:
- Approved design, section catalog, content, assets, existing repository, and acceptance criteria.

Produces:
- Integrated visual frontend, section mapping, token application, and validation evidence.

## Contents

- Stack posture — the patterns are the contract, the stack is the example
- Reference stack (the worked example)
- Don't scaffold from scratch — start from a prebuilt template
- Design system layers worth building once, reusing every time
- Theming: pick a preset, then override token values
- Sections: one client component per section key
- Component-registry pattern for data-driven sections
- Content + data wiring (static/local-content builds)
- Clean up dev scaffolding before shipping
- Craft gotchas (learned the hard way)
- Visual end-to-end self-check
- Iterative design-review loop
- Acceptance checklist
- HTML / JSX craft
- CSS / Tailwind craft

How to turn a design (a theme spec, a section catalog, per-page content) into a runnable,
good-looking frontend. Covers scaffold conventions, the one-component-per-section discipline,
applying a design spec as the Tailwind theme, interactivity/motion, asset handling, a visual
end-to-end self-check, and the underlying HTML/CSS/JS craft guidelines.

## Stack posture — the patterns are the contract, the stack is the example

Everything below is demonstrated in one reference stack (next section) so the guidance stays
copy-pasteable. None of it *requires* that stack: when the project already uses something else,
keep the pattern and translate the mechanism — a project's existing stack always wins over this
file's example.

| Pattern (the contract) | Reference implementation | What to look for in your stack |
|---|---|---|
| One component per section key | React `'use client'` component | Astro/Svelte/Vue component, HTMX partial, template include |
| Fail-loud section registry | `Record<string, ComponentType>` map | any key→component map that throws/warns on a miss in dev |
| Design tokens → styling layer | Tailwind v4 `@theme` block | plain CSS custom properties, StyleX vars, CSS Modules + vars |
| Static routes from content | `generateStaticParams` | Astro `getStaticPaths`, SvelteKit `entries`, Nuxt prerender routes |
| Optimized image/font primitives | `next/image` / `next/font` | `astro:assets`, SvelteKit `enhanced:img`, `@nuxt/image`, or hand-rolled `srcset` + `font-display` |
| Redirects + not-found fallback | framework routing config | any router's redirect map + catch-all route |

Framework examples worth knowing (heat shifts — treat as examples, not an endorsement list):
Astro, SvelteKit, Nuxt, TanStack Start, React Router 7, and HTMX + Alpine.js at the lean end.
Styling: Tailwind, vanilla CSS custom properties, StyleX, CSS Modules. The design doctrine in the
rest of this skill is stack-free either way — only this file and the Tailwind theme reference are
implementation-specific.

## Reference stack (the worked example)

- **pnpm** for installs, **biome** (or your linter/formatter of choice) for lint/format,
  **TypeScript strict**.
- **Next.js App Router**. **Tailwind** for styling (use `prose`/Tailwind Typography for
  richtext). **motion** (the successor to framer-motion) for animation inside section
  components — since those are client components, motion works directly, no extra wiring.
- Deploy target: Vercel or equivalent.

## Don't scaffold from scratch — start from a prebuilt template

If you have (or can build once and reuse) a committed starter template — configs, a content
loader, App Router routing conventions, a tokenized UI primitive layer, an opt-in archetype
component catalog, and codegen scripts for the section map — copy it in and install, then fill in
only the per-site layer. Re-deriving this infrastructure from scratch for every project is pure
waste; known layout/CSS gotchas (below) are worth fixing once in the template and never again.

A good template ships:
- the base configs + a typed **content loader** abstraction,
- App Router routing (home, dynamic slug routes, collection detail routes via
  `generateStaticParams`),
- a `globals.css` with container/spacing custom properties already correctly scoped (see the
  **container-token collision** gotcha below),
- a tokenized UI primitive layer (buttons, inputs, cards — styled purely off theme tokens),
- an **opt-in** archetype/component catalog to reference (not ship) when composing new sections,
- a codegen script that generates the section-key → component map at build time and **fails loud**
  on an unmapped key.

## Design system layers worth building once, reusing every time

- **Layout/grid/breakout/type primitives** — `Section`, `Container`, `Grid`, `Breakout`,
  `DisplayHeading`, `Eyebrow`, etc. — the vocabulary every section composes from, so spacing and
  rhythm stay consistent without every section hand-rolling its own wrapper divs.
- **A motion kit** — `Reveal`, `Stagger`, `TextReveal`, `Parallax`, `Marquee`, `CountUp` or
  equivalents — a small set of named, reusable motion primitives rather than ad hoc `motion.div`
  everywhere.
- **A nav kit** for header/mobile-nav patterns.
- **A preset library** — a handful of named, complete visual directions (e.g. swiss-mono,
  editorial-serif, premium-dark, warm-minimal, brutalist-raw, maximalist, retro-futuristic) that
  bundle a coherent type/color/spacing/motion personality. Picking a preset as the starting point
  (via a single root attribute like `data-preset="<name>"`) gives every build a characterful,
  non-generic baseline before any per-project theming happens.
- **A variant section catalog** — for each archetype (hero, features, editorial, gallery, stats,
  testimonials, logos, pricing, faq, cta, team, timeline, steps, contact, newsletter, prose),
  several visually distinct variants. Treat this as **reference, not a menu**: lift an idiom that
  fits, copy it into the real section file, then restyle and reshape it for the actual content —
  never ship a catalog copy unmodified, and never pattern-match every section on the page to its
  nearest catalog neighbor (that's how you get five sections that all look the same).
- **An anti-slop checklist** — a standing list of "generic AI site" tells to actively avoid (see
  below). Keep it visible while building, not just at final review.

## Theming: pick a preset, then override token values

1. Choose the preset/visual-direction closest to the target design spec and set it as the root
   attribute (`data-preset`) — this gives you a distinctive, coherent baseline immediately.
2. Export the design spec's tokens (colors, type scale, fonts, radii) into the theme file's
   `@theme` (or equivalent token) block, **keeping the same token names and only overwriting
   values** — a design-token export tool that emits matching variable names should drop in near
   1:1. Swap font faces (`next/font`) if the spec calls for different families.
3. **Keep container/spacing tokens out of the per-project theme file** if your template already
   defines them correctly in the global stylesheet — duplicating or removing that block
   re-collapses layout `max-w-*` behavior (see the container-token collision gotcha below).

## Sections: one client component per section key

For every distinct section type in the catalog, write **one `'use client'` component**, exported
as the default export, that also exports its section key as a named constant (whatever your
section-map codegen script reads to build the registry). Component props are the section's typed
content fields.

**Before writing any section, art-direct the page**: from the content and the design spec, decide
the page's spatial intent — its rhythm, where it deliberately breaks the grid, which section
carries the most visual weight (usually the hero) — *before* writing code. Composing section by
section with no plan is how you end up with flat, undifferentiated rhythm down the page.

- **Compose each section for its actual content** from the layout/type/motion primitives, not by
  copying a catalog variant verbatim.
- **At least one section per page should be a bespoke composition** designed specifically for
  that content — usually the hero. A page where every section is a lightly-restyled catalog
  variant reads as generic regardless of how good the individual variants are.
- **Style with theme tokens only** — no hardcoded colors, no magic pixel values that bypass the
  token scale.
- **Art-direct for variety**: vary composition down the page, vary section spacing, alternate
  split-layout sides, take intentional grid breaks. Never repeat the same centered-card-grid
  pattern section after section.

### Anti-slop checklist

Watch for the generic-AI-site tells and deliberately avoid them:
- Everything centered.
- Uniform, repeated card grids as the only layout pattern.
- Identical section rhythm/spacing every single section.
- Weak type contrast between headings and body copy.
- Reflexive purple/gradient decoration as the default "make it look designed" move.

Fix by reaching for a different composition, varying section spacing, and deliberately breaking
the grid somewhere it earns attention.

### Assets — use installed libraries, don't hand-roll

- **Icons**: pull from an icon library package rather than hand-drawing SVGs or reaching for
  emoji. Resolve concept → icon name deliberately (search the library's tag/name index) rather
  than guessing a name that "sounds right."
- **Flags**: a dedicated flag-icon package rather than emoji flags (inconsistent rendering across
  platforms).
- **Brand logos**: fetch real, full-color brand marks from a logo API/CDN at build time rather
  than reconstructing them by hand; for monochrome/social icons, a dedicated icon-set package.
  Render brand logos unaltered — don't recolor or restyle a real brand mark.
- **Background patterns / decoration**: a small pattern/decoration library (wave shapes, blob
  paths, hand-drawn-underline effects) rather than hand-coded SVG paths. One deliberate decorative
  touch per section is enough — stacking several reads as noisy, not polished.

## Component-registry pattern for data-driven sections

When page content is a list of ordered "sections" identified by a key (from a CMS, a JSON file,
whatever the data source is), the standard rendering pattern is a **keyed component registry**:

```ts
// section-map.ts
import type { ComponentType } from 'react'
import HeroSection from '@/sections/hero'
import FeaturesSection from '@/sections/feature-cards'

export const sectionMap: Record<string, ComponentType<Record<string, unknown>>> = {
  hero: HeroSection,
  'feature-cards': FeaturesSection,
}
```

The page renderer iterates the page's ordered sections, looks up each one's key in the map,
spreads its typed field values as props, and renders — using the entry's stable id as the React
key. Properties of this pattern worth keeping deliberately:

- **Render order = data order.** Don't re-sort; the ordering is authored upstream.
- **An unmatched key should fail loud in development** (throw or warn clearly) rather than
  silently rendering nothing — a silent skip is a section quietly missing from a live page with
  no error anywhere.
- **Every section component in the registry must be a client component**, since the renderer
  itself is a client component and can't host server components inside its tree. This is a real
  exception to the general "default to server components, add `'use client'` only when needed"
  guidance — the mandate here is one client component per section key, no exceptions, because the
  registry mechanism requires it.
- **Render list-typed fields defensively.** A repeating field can contain empty or partial rows —
  filter out rows missing required keys before mapping, and use an index-qualified React key
  (`` `${label}-${i}` ``) since values may repeat or be blank.
- **Richtext fields arrive as an HTML string** — render with `dangerouslySetInnerHTML`, sanitizing
  untrusted input.

### Image and link primitives worth standardizing

- **A responsive image component** wrapping the framework's native `Image`: given a media object
  with multiple size variants, build the `srcSet` from them automatically rather than making every
  section author pick sizes by hand. Infer width/height from the largest variant so the browser
  never lays out with a content-shift gap — don't hand-manage a `fill` prop that fights this
  inference. Resolve `alt` through a fallback chain (explicit alt → the asset's own alt/name
  metadata → a safe generic default) so nothing ships with `alt=""` by accident. Default `sizes`
  to a sensible responsive breakpoint set, and let call sites override with `sizes="100vw"` for
  full-bleed images.
- **A link component** that branches on internal vs. external: internal links use the framework's
  client-side router `Link`, external links render a native `<a>` with `rel="noopener noreferrer"`
  when opening in a new tab. Centralizing this means no section has to remember the security
  attribute by hand.

## Content + data wiring (static/local-content builds)

For a self-contained build with no live backend, source content from local JSON/content files
(`{ route, title, meta, sections: [{ key, order, content }] }` per page, plus separate collection
files) through a typed loader, and render through real App Router routes
(`/`, `/[slug]`, `/projects/[slug]` via `generateStaticParams`). Resolve every media reference to
a local file under the public assets directory; when a reference can't be resolved, fall back to
a clean placeholder component — never a broken image — and log the unresolved set so it's visible,
not silently swallowed.

**Kept nav/footer links with no built page → a friendly fallback, not a 404.** If content was
captured/built for only a subset of the full site, the header/footer will still list links to
pages outside that subset (intentionally kept — see the structure doc). Derive the gap
automatically (all internal nav/footer hrefs minus the set of pages actually built) rather than
hand-maintaining a list, and route unbuilt single-segment paths to a page that renders a "this
page isn't part of the demo" notice inside the normal header/footer chrome, with the link's own
label so it doesn't look broken. Route everything else unmatched (multi-segment gaps, genuine
typos) to the same notice via the framework's not-found handler. This mechanism should be inert —
producing an empty gap set — once every page actually gets built; that's a feature, not something
to remove.

**Redirects when the IA changes.** If routes were restructured (not just a straight port), old
URLs need to keep resolving — implement a redirect map (`{ from, to, permanent: true }` entries,
301) in the framework's routing config from whatever migration plan defined the old→new mapping.
Skipping this means every legacy inbound link/bookmark/search-ranked URL 404s, which is exactly
the SEO equity a rewrite is supposed to carry forward.

## Clean up dev scaffolding before shipping

Delete any dev-only style-guide/reference routes and the unused reference component catalog
before the final build — they exist for the build process itself, not for the shipped site, and
must not ship as live routes.

## Craft gotchas (learned the hard way)

- **Container-token collision.** If your global stylesheet owns container/spacing custom
  properties (e.g. `--container-*`), keep the per-project theme file free of the same names —
  redefining or removing that block re-collapses `max-w-*`-based layout across the whole site.
  Solved once in a good template; don't re-break it by "cleaning up" the token file.
- **Grid child collapse.** An element with `max-w-*` placed directly inside a
  `grid-cols-[minmax(0,1fr)_auto]`-style track shrinks to min-content instead of filling its
  track — add `w-full` explicitly.
- **Button label wrap.** Inline-flex button labels can wrap mid-phrase ("View / Projects") — set
  `white-space: nowrap` on button/label text.
- **Map embeds paint black in headless browsers.** An embedded map iframe can render as a solid
  black box under headless/automated screenshot capture — put an on-brand fallback panel behind
  the iframe so automated visual QA doesn't flag (or ship) a black rectangle.
- **A literal `*` in a comment inside/near a token block can silently drop the whole block.**
  Some CSS minifiers/parsers choke on glob-style names in prose comments (e.g. writing
  `--spacing-*` inside a comment near `@theme`) and print a soft warning while dropping the entire
  token block — a build that's green but has lost all its tokens. Avoid literal `*` glob syntax in
  comments near token definitions; treat any such parser warning as a hard failure, and verify
  tokens are actually applied (inspect computed styles) during visual QA, not just from a green
  build.

## Visual end-to-end self-check

**A green build proves the code compiles, not that the page looks right.** Before calling a build
done:

1. **Serve the build** and get the full route list from the sitemap.
2. **Screenshot every route at two viewports** — a standard desktop width (e.g. 1440×900) and a
   representative mobile device size — using a browser-automation tool. For pages with
   scroll-reveal or lazy-loaded content, a single full-page screenshot can capture blank —
   step-scroll with a short wait between steps, then scroll back to the top before the final
   capture. Capture tooling — script the batch, `agent-browser` for interactive poking, and the
   honest-degrade rule — is specified in
   [art-review.md](art-review.md#capture-tooling-what-this-review-physically-needs).
3. **Actually look at each screenshot** for real defects: text overflow/clipping (an oversized
   display heading is the classic case), element overlap, a fixed header obscuring the first
   heading, broken or placeholder images, an unreachable or overlapping mobile nav, cramped or
   collapsed spacing, low-contrast text over imagery, horizontal scroll on mobile. Also re-check
   against the anti-slop checklist above.
4. **Fix and re-shoot** — edit the offending component/theme, rebuild, re-screenshot only the
   affected routes. Loop until both viewports read clean, capping at a few rounds and explicitly
   noting any residual issue rather than looping forever.
5. **Tear down the server** when done — don't leave a dev/preview server stranded on a port.

## Iterative design-review loop

When a build already exists and a design reviewer has left a punch-list rather than starting from
scratch:

1. Apply every **blocking** item — both direction violations (off-spec palette/type/register,
   anti-slop tells) and composition failures (centered-everything, uniform card grids, flat
   rhythm, a missing signature section). Each item should name a route, a section, and a concrete
   fix — recompose, re-theme, or re-rhythm exactly those sections.
2. Take cheap, clearly-right optional suggestions if you agree with them.
3. **Leave unflagged sections alone.** Don't regress work that was already signed off, and don't
   redesign the whole page because one section needed a fix.
4. Rebuild and re-run the full visual self-check so the reviewed state is reflected for the next
   round.

Work only from the punch-list as written — never guess at unstated intent behind a flagged item.

## Acceptance checklist

- A client component exists for every section key in the catalog; the section-map registry covers
  all of them with no gaps, and fails loud (not silently) on a miss.
- The build is green **and** desktop + mobile screenshots show no unresolved layout/visual defect
  (residuals explicitly noted, not silently ignored).
- Routes match the target sitemap; unresolved media falls back to a placeholder (logged, never
  silent); every kept nav/footer link resolves to either a real built page or the "not part of the
  demo" fallback — no kept link ever 404s.
- If routes were restructured, every entry in the redirect map is implemented and returns a
  permanent redirect — no legacy URL 404s.

---

*Adapted from bendc/frontend-guidelines (Ben De Cock), modernized — dated 2015-era advice
(recursion-over-loops, IIFE-as-conditional, arguments/apply/bind gymnastics, blanket
prefer-Map-over-objects) has been corrected.*

## HTML / JSX craft

**Semantics.** Use the element that describes the content: `<main>`, `<article>`, `<header>`,
`<nav>`, `<time datetime=…>`, `<button>` — not `<div>` soup. A wrong semantic element is worse
than a neutral one, so don't reach for `<section>`/`<article>` where a plain `<div>` is honest.

```html
<!-- bad -->
<div class=article><div class=header><h1>Post</h1></div>…</div>
<!-- good -->
<article><header><h1>Post</h1></header>…</article>
```

**Accessibility is not an afterthought** — bake it into the quality floor:
- Real `alt` text that describes the content (`alt="Company"`, not `alt="Logo"`).
- Links and buttons marked as such — **never `<div class=button>`**; in React use
  `<button>`/`<a>`/`<Link>`.
- Never rely on color alone to carry information.
- Explicitly label every form control (`<label>` wrapping or `htmlFor`).
- Visible keyboard focus; honor `prefers-reduced-motion`.

**Brevity.** Keep markup terse — no redundant attributes, no XHTML self-closing cruft. In JSX,
don't add wrapper `<div>`s you don't need — use a `<Fragment>`/`<>` instead.

**Language & encoding.** Declare `lang` on the document root and UTF-8 at the document level.

**Performance.** Don't block rendering: content first, non-critical scripts deferred. Use the
framework's built-in script/image/font primitives (deferred script loading strategies, optimized
image components, font optimization) rather than hand-managing `<script>`/`<img>` tags. Perceived
speed beats micro-optimization.

## CSS / Tailwind craft

These principles are why a Tailwind codebase stays maintainable; they also govern any custom CSS
or token block you write.

**Box model — keep it uniform.** A global `box-sizing: border-box` reset is fine; don't flip the
box model on individual elements.

**Stay in the natural flow.** Don't change an element's default `display` or pull it out of flow
when a flow-friendly answer exists. Prefer `vertical-align: middle` over `display:block` to kill
image whitespace; prefer `margin-left:auto` over `position:absolute; right:0`.

**Positioning — favor modern layout.** Reach for Flexbox and Grid; avoid `position: absolute` and
other out-of-flow hacks unless the design genuinely requires layering.

**Specificity — keep values easy to override.** Minimize `id` selectors and avoid `!important`.
Resolve conflicts by combining classes, not by escalating specificity weight. In Tailwind: don't
fight utilities with `!important` overrides — compose variants and extract components instead.

```css
/* bad */ .bar { color: green !important; } .foo { color: red; }
/* good */ .foo.bar { color: green; } .foo { color: red; }
```

**Don't override; structure so you don't have to.** Target the real subset (`li + li`) instead of
setting-then-unsetting (`li {hidden}; li:first-child {visible}`).

**Inheritance.** Don't duplicate declarations children can inherit — set `text-shadow`/`color`/
`font` on the parent.

**Selectors — keep them shallow.** Avoid selectors tightly coupled to DOM structure; add a class
once a selector exceeds roughly three combinators/structural pseudo-classes. Don't overload
attribute selectors (`[src$=svg]`, not `img[src$=svg]`).

**Brevity.** Use shorthand (`padding: 5px 10px 20px`, `transition: 1s`) and `calc()` over
margin-offset hacks.

**Units.** Unitless where possible (`margin: 0`, `line-height: 1.5`); favor `rem` for relative
sizing; prefer seconds over milliseconds (`.5s`). A Tailwind spacing/`rem` scale already encodes
this.

**Colors.** Hex for opaque colors, `rgba()`/`color-mix()` for transparency — or whatever color
space the design token spec defines (`oklch()`/`hsl()` are common in modern token systems); the
design spec is the source of truth for palette, not a hardcoded default.

**Animations — the load-bearing rule for motion.** Favor **transitions over keyframe
animations**, and **only animate `opacity` and `transform`** — these are compositor-friendly and
don't trigger layout. Animating `margin`/`width`/`top` causes reflow and visibly janks.

```css
/* bad */  div:hover { animation: move 1s forwards; } @keyframes move { 100% { margin-left:100px } }
/* good */ div:hover { transition: 1s; transform: translateX(100px); }
```

With a motion library, this is the same rule: animate `transform`/`opacity`, and respect
`prefers-reduced-motion`.

**No hacks.** Use `will-change: transform` honestly rather than a `translateZ(0)` GPU-forcing
hack; write real CSS comments (`/* */`), not `//`.

**Draw with CSS, not HTTP.** Replicate simple shapes (circles, triangles) with
border-radius/borders instead of fetching an SVG/image for them.

**Vendor prefixes.** Kill obsolete ones; let the toolchain add what's actually needed. If
hand-writing any, put the standard property *after* the prefixed one.
