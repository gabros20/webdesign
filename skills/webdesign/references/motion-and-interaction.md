# Motion & Interaction

Purpose: Add motion that guides attention or rewards interaction while preserving a complete reduced-motion state.

Read when:
- A section needs reveal, hover, scroll, parallax, or ambient interaction behavior.

Skip when:
- Motion is decorative only, the no-motion experience is incomplete, or performance constraints prohibit it.

Inputs:
- Interaction goal, element hierarchy, browser support, and reduced-motion requirements.

Produces:
- A motion hierarchy, implementation pattern, fallback, and validation checks.

## Contents

- A1. CSS scroll-driven reveals (`animation-timeline`) — the 2025/26 baseline
- A2. Intersection Observer reveals (universal JS fallback)
- A3. Pinned / sticky scroll sections (GSAP ScrollTrigger) — scrollytelling
- A4. Scroll-scrubbed video / image sequence
- A5. Horizontal scroll gallery
- A6. Magnetic button
- A7. 3D card tilt
- A8. Hover micro-interactions
- A9. Continuous ambient motion (marquee, gradient drift)
- A10. Smooth scroll (Lenis) + Motion/Framer Motion
- A11. Motion principles (the taste layer)

Two halves: **Part A** — implementable motion/interaction patterns. **Part B** is in
`design-thinking.md` (composition + critique). Golden rule for everything here: motion **guides
attention and rewards**, never decorates; make the no-motion state the complete, usable state; always
honor `prefers-reduced-motion`.

---

## A1. CSS scroll-driven reveals (`animation-timeline`) — the 2025/26 baseline
- **Why:** Ties animation progress to scroll position natively — no JS, off the main thread, smooth.
```css
.reveal {
  animation: fadeUp linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;   /* start as it enters, finish 40% up */
}
@keyframes fadeUp { from { opacity:0; translate:0 24px; } to { opacity:1; translate:0 0; } }

/* progress bar (document-relative) */
.progress { transform-origin:left; animation: grow linear; animation-timeline: scroll(); }
@keyframes grow { from { transform:scaleX(0); } }
```
- **Range keywords:** `cover` (entry→exit), `contain` (only while fully visible), `entry`, `exit`.
  Two timelines for entry+exit. `timeline-scope: --name` + `view-timeline: --name` animate element B from
  element A's scroll position.
- **Pitfall:** Firefox support is recent/partial. **Gate it:** `@media (prefers-reduced-motion:
  no-preference) { … animation-timeline: view(); }` so the default state is the finished, visible state.

## A2. Intersection Observer reveals (universal JS fallback)
- **Why:** Works everywhere; one-shot trigger (add a class, CSS transitions handle motion).
```js
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
```
```css
[data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .6s ease-out, transform .6s ease-out;}
[data-reveal].in{opacity:1;transform:none;}
```
- **Stagger** from index: `el.style.transitionDelay = `${i*80}ms`` (cap ~6 items / ~500ms total).
- **Pitfall:** Unobserve after first reveal; negative `rootMargin` bottom avoids "pops in already on screen."

## A3. Pinned / sticky scroll sections (GSAP ScrollTrigger) — scrollytelling
```js
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ scrollTrigger: {
  trigger: '.section', start: 'top top', end: '+=1200', pin: true, scrub: 1,
}});
tl.from('.headline',{autoAlpha:0,y:40}).to('.img',{scale:1.1},'<');
```
- **Scrub:** `true` = locked; `1` = 1s catch-up (recommended); `0.5` smoother/heavier; `2` laggier/lighter.
  Pin wraps the element in a `.pin-spacer`.
- **Pitfall:** In React/Next, pin breaks on remount/route change — create inside `useGSAP`/`useLayoutEffect`,
  call `ScrollTrigger.refresh()` after images/fonts load, clean up with `ctx.revert()`. Pinning inside
  transformed/overflow-hidden ancestors misbehaves.

## A4. Scroll-scrubbed video / image sequence
- **Why:** Frame-accurate storytelling tied to scroll (the Apple AirPods effect).
- **How:** (a) a `<video>` whose `currentTime` maps to scroll progress in a pinned section, or (b) draw a
  numbered image sequence to `<canvas>` per frame (redraw only on change).
- **Pitfall:** Safari/iOS won't seek network video smoothly. A dedicated `scroll-driven-video` skill
  handles the cross-browser version (scrub on enter → autoplay at center → reset on exit). Throttle
  `currentTime` to rAF.

## A5. Horizontal scroll gallery
```js
gsap.to('.track', { x: () => -(track.scrollWidth - innerWidth), ease:'none',
  scrollTrigger:{ trigger:'.wrap', pin:true, scrub:1, end:()=>`+=${track.scrollWidth}` }});
```
CSS-only alt: `scroll-snap-type:x mandatory` on an `overflow-x:auto` track.
- **Pitfall:** Don't trap vertical-scroll users — keep pinned distance modest, ensure keyboard/trackpad
  reach, add scroll-snap so it doesn't feel floaty.

## A6. Magnetic button
```js
btn.addEventListener('mousemove', e => {
  const r = btn.getBoundingClientRect();
  const x = e.clientX - (r.left + r.width/2), y = e.clientY - (r.top + r.height/2);
  btn.style.transform = `translate(${x*0.3}px, ${y*0.3}px)`; // 0.2–0.4 strength
});
btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0,0)');
```
Add `transition:transform .3s ease-out` for spring-back; move the inner label at a smaller factor for parallax.
- **Pitfall:** Gate behind `@media (hover:hover)` (touch has no hover); keep strength low or the click target misses.

## A7. 3D card tilt
```js
const rx = (0.5 - py) * 12, ry = (px - 0.5) * 12; // px,py = 0..1 within card
card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
```
Cursor-Y → `rotateX`, cursor-X → `rotateY` so it tilts *toward* the cursor. Add a cursor-following glare.
- **Pitfall:** drive via rAF not raw mousemove; cap ≤15°; reset on leave; `transform-style:preserve-3d` for depth children.

## A8. Hover micro-interactions
- **Image zoom:** wrap in `overflow:hidden`; `img{transition:transform .5s ease}` `.card:hover img{transform:scale(1.05)}`.
- **Underline draw (L→R):** `a{background:linear-gradient(currentColor 0 0) left bottom/0% 1px no-repeat;
  transition:background-size .3s}` `a:hover{background-size:100% 1px}`.
- **Pitfall:** Transition `transform`/`opacity` only (GPU-composited); never `width`/`top`/`box-shadow` spread.

## A9. Continuous ambient motion (marquee, gradient drift)
- **Marquee (CSS-only):** duplicate the track once, animate `translateX(0 → -50%)` linear infinite (the
  seam is invisible). Edge-fade with `mask-image: linear-gradient(to right, transparent, #000 20%, #000
  80%, transparent)`. `:hover{animation-play-state:paused}`.
```css
.track{display:flex;width:max-content;animation:scroll 36s linear infinite;}
@keyframes scroll{to{transform:translateX(-50%);}}
```
- **Slow gradient shift:** animate `background-position` on a large gradient over 15–30s, or drift an
  offscreen blurred radial blob.
- **Pitfall:** Set duration proportional to content width. **Reduced-motion:** stop animation +
  `flex-wrap:wrap` into a static grid; `aria-hidden="true"` the duplicated copy (SR shouldn't read twice).

## A10. Smooth scroll (Lenis) + Motion/Framer Motion
- **Lenis** normalizes wheel/trackpad into eased scroll; pair its rAF with GSAP
  (`lenis.on('scroll', ScrollTrigger.update)`).
- **Pitfall:** Two rAF loops fighting = jitter — drive both from one loop. Destroy on unmount (SPA leak).
  Disable Lenis under `prefers-reduced-motion`.
- **Framer Motion / Motion:** `whileInView` + `viewport={{once:true, margin:'-10%'}}` for reveals; a parent
  `variants` with `staggerChildren:0.08` for cascades; `useScroll`+`useTransform` for parallax.

## A11. Motion principles (the taste layer)
- **Duration:** small UI 150–240ms; overlays/sections 300–400ms; most transitions 200–500ms. More travel = slightly longer.
- **Easing:** `ease-out` for entrances (fast in, settle), `ease-in` for exits, `cubic-bezier(0.16,1,0.3,1)`
  (expo-out) for the "expensive" decelerate. Never linear for UI (only loops/marquees/scrubs).
- **Stagger:** 60–100ms between siblings; cap total so a list doesn't crawl.
- **Purposeful vs decorative:** every motion should communicate state (enter, success, relationship,
  spatial origin). If it doesn't tell the user something, it's decoration — ration it.
