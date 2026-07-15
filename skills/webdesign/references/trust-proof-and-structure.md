# Trust, Proof & Structure

The cross-cutting layer that makes a niche site both **credible** and **findable** — trust/proof design,
information architecture, and SEO-aware structure, as concrete design devices. This is the "high-quality
information and proof" half of the premium↔info dial (`niche-and-vertical-design.md`).

---

## 1. The three credibility layers (build all)
75% of users judge a company's credibility on website design alone (Stanford Web Credibility Project).
Credibility is built in three reinforcing layers:
1. **Visual** — design quality, real photography (not stock), consistent branding. The instant ~50ms halo.
2. **Content** — clarity, specificity, depth, plain language; answers in the order questions arise.
3. **Social** — reviews, testimonials, named logos, case results. *The most powerful* — third-party peer
   validation. Trust signals lift conversion ~15–34%; 93% read reviews before buying.

---

## 2. E-E-A-T as design (Experience · Expertise · Authoritativeness · Trust)
Google's quality framework, but it manifests in *page design + content structure*, not just SEO:
- **Experience (firsthand):** original photography, personal process descriptions, real case studies,
  authentic reviews, "we did this" narrative. → design: a process/behind-the-scenes section, real project imagery.
- **Expertise:** author/team bios with **credentials, certifications, education**; bylines; topic-deep content.
  → design: author cards, an internal-linked author/team page, designation badges.
- **Authoritativeness:** reputation + external validation — press/"as seen in" logos, awards, quality
  backlinks, consistent brand voice. → design: a media/awards strip, recognizable identity.
- **Trustworthiness (foundational — without it the rest is diluted):** clear authorship, **HTTPS**, accessible
  privacy policy, secure forms, transparent contact info, user-friendly design. → design: visible
  security/compliance cues, a real address/phone, honest copy.

---

## 3. Social-proof devices (and where to put them)
- **Testimonials:** real quote + **full name + role + company + headshot** (face visible, shoulders in
  frame). "Alex H." reads as fake; specificity converts. Video testimonials feel most authentic.
- **Logo wall:** recognizable customer/client logos (named logos outperform generic trust bars), desaturated/
  downsized so they support rather than distract.
- **Numbers / stats:** review counts + star ratings, usage ("Join 5,000+ companies"), outcome metrics, years/
  counts ("43 years," "500+ transactions"). Specific > superlative, always.
- **Case studies / results:** the strongest device for high-consideration buys (see §6).
- **Trust badges:** SSL/secure-payment, certifications, compliance (SOC 2, HIPAA, GDPR, ISO), guarantees.
- **Placement is the lever:** put the strongest testimonial / rating badge / guarantee **directly next to the
  CTA or form** to neutralize last-minute hesitation; logos and ratings on pricing/contact pages; reviews near
  product CTAs. Cluster multiple testimonials for a bandwagon effect.
- **Pitfall:** fabricated or stock-photo testimonials are unethical and easy to smell — and FTC-actionable.

---

## 4. Information architecture
- **Navigation:** primary nav **2–7 items**; keep the hierarchy **flat** (any page reachable in 2–3 clicks).
- **Plain labels beat clever ones** on every usability metric — descriptive, parallel structure (nouns with
  nouns), no internal jargon. Group into logical categories (Product / Company / Resources / Support).
- **Consistency:** keep nav order/placement stable across the site (critical for assistive tech).
- **Scannability:** people skim — use headings, subheadings, bulleted lists, cards, and buttons to chunk
  content into scannable sections; surface highlights so a skim conveys the gist.
- **Progressive disclosure:** show the routing-critical level first; reveal depth on demand (accordions, "read
  more," detail pages) so a page isn't a wall.
- **Pitfall:** deep hierarchies and creative/branded nav labels increase scanning effort and bounce.

---

## 5. SEO-aware structure (where SEO and design overlap)
Structure the page so humans scan it *and* crawlers/LLMs parse it — the same hierarchy serves both:
- **Semantic HTML:** use `header / nav / main / article / section / footer` over generic `div`s — gives
  search engines and assistive tech a clear structural picture and improves snippet/rich-result eligibility.
- **Heading hierarchy:** exactly **one `H1`** (the page's main title); `H2`/`H3` for nested subsections in
  order — don't skip levels or pick headings for size (style with CSS). This doubles as the visual hierarchy.
- **Above the fold:** the H1 + value proposition + primary action visible without scrolling; crawlers and
  users both weight it heavily.
- **Structured data (JSON-LD):** add schema.org markup (Organization, LocalBusiness, Article, Product,
  Review, FAQ, BreadcrumbList…) in a `<script type="application/ld+json">` — translates visible content into
  machine-readable entities for rich results and AI answers. JSON-LD is Google's preferred format.
- **Core Web Vitals as a design constraint, not a cleanup pass:** reserve media space with `aspect-ratio`/
  `width`+`height` to avoid **CLS**; lazy-load below-the-fold; WebP/AVIF; keep the hero light for **LCP**.
  Sub-3s (ideally sub-1s) load is itself a trust and ranking signal. (Perf details: `depth-and-texture.md`,
  `imagery.md §9`, `experimental-and-creative.md`.)
- **Internal linking + breadcrumbs:** connect related pages (pillar → cluster) for both navigation and crawl
  depth.
- **Pitfall:** designing headings purely for visual size breaks the document outline for SEO and screen readers.

---

## 6. Case-study / proof-page anatomy
The highest-converting proof format for high-consideration buyers. Structure as a **scannable narrative**:
- **Top context block:** industry / year / scope / client — so a scanning decision-maker instantly gauges
  relevance.
- **The arc:** **Challenge → Solution → Results.** Results carry the headline outcome.
- **Proof callouts:** pull the key metrics into **large/bold typography** or shaded callout boxes (a graph in
  a bright accent carrying the headline number; a pull-quote from the client closing it out) so skimmers
  catch them without reading prose.
- **Make it scannable + immersive:** motion/animated reveals keep people moving through the story; a named,
  photographed client quote anchors authenticity.
- **Multi-asset:** a scannable web page + a sales PDF one-pager + a 60–90s video covers different buyer modes.
- **Pitfall:** burying the measurable result in a paragraph; vague outcomes ("great results") instead of a
  number, a %, a timeframe, or a $.

---

## 7. Presenting dense information without killing the premium aesthetic
The reconciliation of the two halves of the dial:
- **Whitespace around dense blocks** — a stat row or spec table reads premium when isolated in space, cheap
  when crammed.
- **Typographic hierarchy does the compression** — big number + small label (a "proof stat" pattern) conveys
  density while staying elegant; let scale carry the data.
- **Progressive disclosure** — keep the premium surface clean; move depth into accordions, tabs, detail/case
  pages, and FAQs so the hero stays restrained and the proof is one interaction away.
- **One styled accent for proof** — shaded callouts / a single accent on the headline metric (von Restorff,
  `persuasion-and-conversion.md`) makes proof pop without clutter.
- **Real photography unifies** — credentialed team photos and real project shots are *both* proof and premium
  texture; stock is neither.
- **Sequence, don't blend** — premium hero first, proof densifies as the visitor scrolls and self-qualifies.
