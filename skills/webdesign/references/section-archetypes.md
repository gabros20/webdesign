# Structure & IA: sitemap, section blueprints, and the section catalog

How to turn a content plan — what pages exist, what's kept/changed/dropped, and what copy tier
each gets — into the target **structure**: the sitemap, navigation, footer, an ordered
per-page section blueprint, and — the centerpiece — a **deduplicated section catalog**. The
catalog is the schema bridge between "what the site is made of" and "what components render it":
get the catalog right and modeling + component-building become mechanical lookups instead of
one-off decisions per page.

## Why a catalog, not per-page ad-hoc sections

Almost every page reuses a small set of recurring section *types* (a hero, a feature grid, an
FAQ, a CTA band). Instead of describing each page's sections freeform, **collect every section
the target site needs and deduplicate them into distinct types**, each with:

- a stable, unique **key** (the join key threaded through content modeling and component
  building — pick it once, never rename it mid-project),
- a **field shape** (the typed content fields the section needs), and
- a flag for whether it **repeats** (records, not a one-off page block) or is **global**
  (one shared value set rendered on every page, like a header/footer).

This single artifact is what lets a content model and a component library both derive from the
same source of truth, instead of drifting apart.

## Procedure

### 1. Target sitemap

Apply the content plan: keep routes that are staying (as-is or modernized), create new
routes, fold multiple source pages into one where they merge, drop routes being removed. Assign
each page a `page_type`. Order and depth follow the project's information-architecture goals —
if the plan calls for **preserving the existing IA** (SEO, familiarity), keep routes 1:1 with the
source, no renaming/merging/dropping, and let sections re-chunk freely under a new design without
touching the URL. If the plan calls for **restructuring the IA** (a rebuild aimed at a different
funnel or audience), the new sitemap must still satisfy any redirect map already committed to
(every "moved-to" URL from a migration plan needs a matching sitemap route) — that redirect target
set is the authoritative new IA, not a suggestion.

### 2. Section catalog

For every distinct section the target needs:

- **Map it to the nearest archetype** in a section-archetype library (below) and reuse that
  archetype's field shape instead of inventing a schema from scratch. This is the biggest
  leverage point in the whole structure phase — archetypes are named to match a corresponding
  component in the frontend's component catalog, so a mapped section's whole
  structure → model → component path is already wired.
- **Trim or extend** the chosen shape to the actual captured/target content — drop fields the
  content doesn't have, add ones it does.
- **Author a bespoke type only when nothing fits.** A from-scratch redesign (new vocabulary, not
  mirroring the source) means you'll author more bespoke sections than a faithful preservation
  would — that's expected, not a failure to find a match.
- **Define fields using a small, fixed set of content types** — string, text (multi-line),
  richtext, integer, float, boolean, datetime, option (select/enum), list (repeating nested
  fields), media, link, collection (reference to a repeatable record type), reference (relation
  to another page/entity). Keep the type vocabulary small and consistent across the whole catalog
  — every consumer downstream (content model, components) should be able to switch on exactly
  these types, no more.
- **Mark `repeatable: true`** for content that recurs as records — FAQs, team members, blog
  posts, projects — so it becomes a **collection** (a set of entries + a shared detail-page
  template) rather than N one-off page sections.
- **Mark `global: true`** for shared-value blocks that render identically on every page — a
  site header/footer, a global CTA banner — so it's modeled and populated once, not per-page.
- **Default every field to optional.** Only mark a field required when the blueprint *always*
  supplies a value. A required field with no value blocks the whole page/section from being
  usable — the single biggest self-inflicted failure mode in this step. Logo/hero media and
  optional links are the classic over-eager-required offenders: leave them optional.
- **Prefer a relation/collection over a deep parent-child hierarchy** where either would work —
  simpler relations are easier to populate and query; reach for a hierarchical reference only
  when the content genuinely has a parent → children shape (e.g. a nested resource tree).
- **Mark interactive widgets explicitly.** When a source or design calls for a slider/carousel
  (a rotating hero, a testimonial rotator), an accordion, or a tabbed panel, tag that catalog
  entry's `interactive` field with the widget type. This is the signal the component-building
  step needs to actually recreate the *behavior* — without it, a rotating hero silently flattens
  into one static image, which is an easy, easy-to-miss fidelity loss.

### 3. Per-page blueprints

For each page, write the ordered list of sections with their intended content (field key →
value) and where that content came from (provenance back to the source, if there is one).

**Copy fidelity is a spectrum — decide where this project sits and apply it consistently:**

- **Verbatim** (a faithful port/rebuild): populate every text field with the source copy
  word-for-word. Don't rewrite, tighten, reorder, or "improve" it — the existing copy may carry
  real SEO equity or be contractually the client's own IP.
- **Preserve, lightly tighten** (a redesign that keeps the message): carry the source copy over,
  with light SEO-safe tightening only where a line is genuinely broken or unclear. Keep titles,
  meta, and the substance of every section — never a full rewrite.
- **Rewrite** (a repositioning / reimagining): author fresh copy against a stated persona/goal
  and copywriting framework (AIDA, PAS, BAB, PASTOR, etc.). If there's an SEO migration in play,
  preserve the target keywords and search intent from the old ranking pages so the rewrite
  *carries* the ranking forward instead of losing it — the redirects alone don't do that.

**Resolve media fields to a real, resolvable asset reference — never a bare rendered URL and
never a screenshot.** For each image slot, resolve it to the actual captured/local asset file;
if there's a naming convention with size/variant suffixes, prefer the canonical/original file
over a specific srcset variant (a variant-only match is exactly the kind of near-miss that causes
downstream tooling to give up and fall back to a screenshot). A slot with no available asset is a
real content gap — flag it for asset generation/sourcing, don't paper over it.

### 4. Navigation & footer

Build the header nav (including dropdowns) + CTAs, and the footer columns/contact/legal/social,
with internal links pointing at routes in the sitemap.

- **The logo is first-class, not optional prose.** When a logo asset is captured, resolve it to a
  real file and set it as structured navigation data (`logo: {src, alt, width?, height?}`) —
  never omit it in favor of a text wordmark. A captured logo with no logo field is exactly the
  gap that causes the component-building step to hand-write a text `<span>` over what should be a
  real logo image.
- A from-scratch redesign may restructure nav/footer to a new IA — new groupings, labels, order —
  freely.
- **Keep every link even when its target page wasn't built.** If the content-gathering phase was
  scoped to a subset of pages, the source header/footer will still reference pages outside that
  scope. **Don't prune those links down to the built set** — a nav with links quietly removed
  looks broken, and a dangling link 404s either way. Keep the link with its real route; have the
  frontend resolve any internal route that isn't in the sitemap to a friendly "this page isn't
  part of the demo/isn't built yet" fallback instead of a raw 404. So an internal route doesn't
  need its own page in the sitemap — but it must be a real route, never an invented one.

## Section sequence is IA — let the domain shape it

Page section order is a structural decision, not decoration. When the site's domain/vertical
implies a natural order (e.g. a portfolio-driven business: work samples → case study → team →
proof/trust → consultation CTA; or the common "premium framing → social proof → action" arc),
use that domain knowledge to sequence sections, and place proof/trust sections and CTAs where
persuasion literature says they convert best (proof before the ask, not buried after it). This is
about *which* sections and *in what order* — the visual craft of each section is a separate,
later concern.

## Acceptance checklist

- Every section key in the catalog is unique.
- Every field's type is one of the fixed content-type vocabulary.
- Every repeatable section is marked as a collection candidate; every shared-value section is
  marked global.
- Every slider/carousel/accordion/tabs section carries its `interactive` marker.
- The sitemap references only catalog section keys and includes the home route.
- Every internal route referenced by a page resolves to a sitemap page **or** is a kept
  nav/footer link that the frontend sends to the "not part of the demo" fallback — links are
  never pruned down to the built set.
- The navigation's logo field is set whenever a logo was actually captured/available.

---

## Section archetype catalog

A library of section *types* that recur across almost every site, each with a **prebuilt field
shape** and a note on the kind of frontend component it maps to. **Map a captured/needed section
to the nearest archetype and reuse its shape** instead of inventing a schema from scratch — that's
the biggest time/consistency win in this phase, and it keeps the whole
`section key → content model → component` path aligned.

**These are starting points, not a cage.** Adapt fields to the real content; rename/extend
freely; **author a novel archetype when nothing fits** (give it a fresh key + a purpose-built
component). Keep the same discipline throughout: default `required: false`, `repeatable: true` →
collection, `global: true` → global section, media values resolved to a real asset file (never a
screenshot).

Field shorthand: `key: type[modifier]` · `*` = the rare `required:true` · `[]` = a `list` with
the nested fields shown · `media(image)` = a media field constrained to images.

### Page sections (one per page, in per-page order)

| `section_key` | role | fields | → component |
|---|---|---|---|
| `hero` | hero | `eyebrow:string` · `title:string*` · `subtitle:text` · `cta:link` · `image:media(image)` | hero |
| `feature-cards` | features | `eyebrow:string` · `title:string` · `lead:text` · `items:list[ title:string*, body:text, icon:media(image) ]` | features |
| `cta-band` | cta | `title:string*` · `body:text` · `cta:link` · `secondary_cta:link` | cta |
| `stats-band` | stats | `heading:string` · `items:list[ value:string*, label:string* ]` | stats |
| `image-gallery` | gallery | `heading:string` · `images:media(image, multiple:true)` | gallery |
| `faq` | faq | `heading:string` · `items:list[ question:string*, answer:rich ]` | faq |
| `contact-form` | form | `heading:string` · `intro:text` · `fields:list[ label:string*, type:option(select)[text,email,tel,textarea] ]` · `submit_label:string` | form |
| `prose-section` | content | `title:string` · `body:rich*` | prose |
| `timeline` | timeline | `heading:string` · `milestones:list[ year:string*, title:string, body:text ]` | timeline |
| `logo-wall` | logos | `heading:string` · `logos:media(image, multiple:true)` | *(bespoke build)* |
| `testimonial` | testimonial | `quote:rich*` · `author:string` · `role:string` · `avatar:media(image)` | *(bespoke build)* |
| `featured-collection` | dynamic | `heading:string` · `cta:link` · `items:collection(<name>)` | *(bespoke build)* — renders entries from a collection (below) |

### Global sections (`global:true` — one shared value set, rendered on every page)

| `section_key` | role | fields | → component |
|---|---|---|---|
| `site-header` | nav | `logo:media(image)` · `nav:list[ label:string*, href:link ]` · `cta:link` | site header |
| `site-footer` | footer | `logo:media(image)` · `tagline:text` · `columns:list[ heading:string, links_label:string, links_href:link ]` · `social:list[ label:string*, url:link ]` · `copyright:string` | site footer |

> In a **static-content** build, header/footer typically render as layout chrome (a shared
> component outside the per-page section list). If content is served through a generic
> section-map/registry (see `frontend-build-patterns.md`), header/footer should render **through
> that same registry**, not *also* be hard-coded into the layout — doing both double-renders
> them. Either way, they're `global:true` in the catalog.

### Collections (`repeatable:true` — records, not a page section; a detail route renders one entry)

| `section_key` | typical use | fields |
|---|---|---|
| `project` / `post` / `case-study` | portfolio / blog / work | `title:string*` · `slug:string*` · `summary:text` · `body:rich` · `cover:media(image)` · `gallery:media(image, multiple:true)` · `date:datetime[date]` · `category:option(select)` · `tags:list[ label:string* ]` · `external_link:link` |
| `team-member` | people grid | `name:string*` · `role:string` · `bio:text` · `photo:media(image)` · `links:list[ label:string*, url:link ]` |
| `service` / `plan` | services / pricing | `name:string*` · `summary:text` · `price:string` · `features:list[ label:string* ]` · `cta:link` |

A collection is referenced from a page section by name via a `collection`-typed field (e.g.
`featured-collection.items: collection(project)`), and its **detail route** (`/projects/[slug]`)
is a **single template page** that renders whichever entry matches the slug — not one hand-built
page per entry.

**How to use this catalog:** for each distinct target section, pick the closest archetype, copy
its field shape, then trim/extend to the actual content (drop fields it doesn't have, add ones it
does). Reuse the archetype's `section_key` naming so the content model and the matching component
line up for free. Only sections with **no** reasonable archetype get a bespoke shape + a
purpose-built component.
