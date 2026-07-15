# Tailwind v4 theme namespaces — mapping DESIGN.md tokens for full, collision-free coverage

Tailwind v4 is configured in CSS: utilities are generated from **theme variables** declared in an
`@theme { … }` block. Each variable lives in a **namespace** (`--color-*`, `--spacing-*`, …) and a
namespace powers a family of utilities. To reconfigure the theme with your planned tokens
**without collisions and with full coverage**, map every `DESIGN.md` token onto the right
namespace, and hand-author the namespaces `design.md` can't express. Verify against the installed
Tailwind version — these defaults are from v4 docs (`tailwindlabs/tailwindcss.com`, theme
reference).

**No Tailwind?** A `DESIGN.md` token export is just CSS custom properties — consume them directly
in vanilla CSS (or as StyleX / CSS Modules variables). Only the namespace mapping below is
Tailwind-specific; the collision and full-coverage discipline is worth mirroring in any token
system.

## 1. Namespace → utilities it powers (the complete set)

| Namespace | Powers | design.md export emits it? |
|---|---|---|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `ring-*`, … | ✅ from `colors:` (values are OKLCH-friendly — see note) |
| `--font-*` | `font-sans`/`font-<name>` (families) | ✅ from `typography.*.fontFamily` |
| `--text-*` (+ `--text-*--line-height`) | `text-<size>` font sizes | ✅ from `typography` sizes |
| `--font-weight-*` | `font-<weight>` | ✅ from `typography` |
| `--tracking-*` | `tracking-*` letter-spacing | ✅ from `typography` |
| `--leading-*` | `leading-*` line-height | ✅ (when set) |
| `--radius-*` | `rounded-*` | ✅ from `rounded:` |
| `--spacing-*` | **spacing AND sizing**: `p-*`, `m-*`, `gap-*`, `w-*`, `h-*`, `max-w-*`, `max-h-*`, `inset-*`, … | ✅ from `spacing:` ⚠️ **see §2** |
| `--container-*` | `max-w-*` / `min-w-*` t-shirt sizes (`max-w-2xl`) + `@container` queries | ❌ hand-author |
| `--shadow-*` · `--inset-shadow-*` · `--drop-shadow-*` · `--text-shadow-*` | `shadow-*`, `inset-shadow-*`, `drop-shadow-*`, `text-shadow-*` | ❌ hand-author |
| `--ease-*` · `--animate-*` | `ease-*`, `animate-*` | ❌ hand-author |
| `--aspect-*` | `aspect-*` | ❌ hand-author |
| `--breakpoint-*` | responsive variants `sm:` … (also feeds `--container` query sizes) | ❌ (defaults usually fine) |
| `--blur-*` · `--perspective-*` · `--tab-size-*` · `--zoom-*` | filter/3d/misc | ❌ rarely needed |

## 2. Three mechanics that bite (the root of the `max-w` collapse)

1. **`--spacing` is a single base multiplier, not a scale.** Default `--spacing: 0.25rem`; numeric
   utilities are computed — `p-4 = calc(var(--spacing) * 4)`, `py-24 = 6rem`. You almost never need
   to touch it.
2. **Named `--spacing-<key>` keys feed *sizing* utilities too** — `w-*`, `max-w-*`, `max-h-*`, …
   So a `--spacing-2xl: 4rem` token (which `design.md` emits from a `spacing: { 2xl: 4rem }` group)
   makes **`max-w-2xl` resolve to 4rem**, collapsing text columns. **Verified:** this **shadows
   `--container-2xl` even when the container scale is also defined** — restoring `--container-*`
   is *necessary but not sufficient*; the named `--spacing-*` t-shirt keys must **not be emitted at
   all**.
3. **`max-w-*` t-shirt sizes belong to `--container-*`** (`--container-2xl: 42rem`, `3xl: 48rem`,
   `4xl: 56rem`, …). That's where reading measures and the page shell go.

**Color values are OKLCH-friendly.** `--color-*` (and DESIGN.md `colors:`) accept any CSS color
syntax — author palette values in **OKLCH** when you want perceptual control (`oklch(L C H)`; vary
L, hold C/H for a harmonious ramp; one accent). Same role slots, no rename. AA-check **both**
surfaces when the page alternates light↔dark. (Depth effects — grain/glow/glass/duotone — are
per-section build-time craft, not theme tokens; see [depth-and-texture.md](depth-and-texture.md).)

**Override model (CSS-first):** adding a variable in `@theme` **extends** (like the old `extend`).
To **replace** a whole namespace (drop all Tailwind defaults, keep only yours) set
`--namespace-*: initial` first (e.g. `--color-*: initial`). `--*: initial` wipes the **entire**
default theme for a fully bespoke system. Removed defaults take their utilities with them
(`--color-*: initial` → no more `bg-red-500`).

## 3. DESIGN.md → theme: the full-coverage recipe (two `@theme` blocks)

Keep the generated export and a hand-authored companion — don't hand-edit the generated file.

1. **Generated `theme.css`** = `design.md export --format css-tailwind` → covers
   `--color/--font/--font-weight/--text/--tracking/--leading/--radius`. Imported as-is.
2. **Fix spacing at the source** so the generated file never shadows sizing utilities. Best:
   **don't put a t-shirt `spacing:` scale in the DESIGN.md** — rely on Tailwind's native
   `--spacing` base and express macro-rhythm with numeric utilities (the DESIGN.md *Layout* prose
   records the rhythm; `6rem → py-24`, `9rem → py-36`). If custom steps are unavoidable, give them
   **non-reserved names** (never `xs/sm/md/lg/xl/2xl…7xl`, which collide with
   `--container-*`/`--text-*`), or strip the `--spacing-<tshirt>` lines from the export in a
   deterministic post-step.
3. **Hand-authored `@theme` companion** (a second block in `globals.css` or a `theme-extra.css`)
   for the namespaces `design.md` can't express — derive each from a DESIGN.md prose section so
   coverage is complete:
   - **`--container-*`** ← *Layout*: reading measure + shell widths (define your own, e.g.
     `--container-prose: 42rem`, or override the t-shirt scale). **Always present** so `max-w-*`
     works.
   - **`--shadow-*` / `--inset-shadow-*` / `--drop-shadow-*` / `--text-shadow-*`** ← *Elevation &
     Depth*.
   - **`--ease-*` / `--animate-*`** ← *Motion* (any motion/animation library uses these).
   - **`--aspect-*`** ← media ratios used by section components.
   - **`--font-*`** binding to the actual loaded font faces (the export ships family *names*; bind
     them to the loaded font variables in your build's font-loading setup).
   - **`--breakpoint-*`** only if the brief needs non-default breakpoints.
4. **Optional brand lockdown** — `--color-*: initial` before the brand palette so only brand colors
   exist (kills off-palette `bg-red-500` drift). Keep `--spacing` base, `--breakpoint-*`, and other
   structural namespaces on Tailwind defaults unless the brief demands otherwise.

## 4. Tailwind v4 default scales (use as the reference baseline for authored scales)

So authored tokens sit on the same rails as the utilities people expect:

- **spacing base:** `--spacing: 0.25rem` (so `4 → 1rem`, `6 → 1.5rem`, `24 → 6rem`).
- **container (`max-w-*`):** `3xs 16` · `2xs 18` · `xs 20` · `sm 24` · `md 28` · `lg 32` · `xl 36`
  · `2xl 42` · `3xl 48` · `4xl 56` · `5xl 64` · `6xl 72` · `7xl 80` (rem).
- **text:** `xs .75` · `sm .875` · `base 1` · `lg 1.125` · `xl 1.25` · `2xl 1.5` · `3xl 1.875` ·
  `4xl 2.25` · `5xl 3` · `6xl 3.75` · `7xl 4.5` · `8xl 6` · `9xl 8` (rem; each has a
  `--text-*--line-height`).
- **radius:** `xs .125` · `sm .25` · `md .375` · `lg .5` · `xl .75` · `2xl 1` · `3xl 1.5` · `4xl 2`
  (rem).
- **shadow:** `2xs … 2xl` (see docs); **breakpoints:** `sm 40` · `md 48` · `lg 64` · `xl 80` ·
  `2xl 96` (rem).
- **tracking:** `tighter -.05 … widest .1em`; **leading:** `tight 1.25 … loose 2`;
  **font-weight:** `thin 100 … black 900`; **ease:** `in/out/in-out`.

## 5. Checklist (author + build)

- [ ] No t-shirt `--spacing-*` keys reach the generated theme (spacing as base + numeric, or
      non-reserved names).
- [ ] `--container-*` defined → `max-w-*` resolves to real widths (no `max-w-[42rem]` magic
      numbers).
- [ ] Every DESIGN.md prose section with visual weight maps to a namespace: *Elevation & Depth* →
      shadows, *Motion* → ease/animate, *Layout* → container/aspect.
- [ ] Font families bound to the loaded font faces.
- [ ] `design.md lint` clean; the built `@theme` is the export **plus** the companion (full
      coverage).
