# Experimental & Creative (the Awwwards tier)

Purpose: Select and constrain one high-impact experimental interaction or rendering technique.

Read when:
- The brief calls for a signature WebGL, canvas, cursor, transition, or generative moment.

Skip when:
- A CSS-level solution meets the goal or performance and accessibility constraints rule out experimental effects.

Inputs:
- Creative objective, target devices, performance budget, and fallback requirements.

Produces:
- One justified experimental technique with progressive enhancement and exit criteria.

## Contents

- 1. WebGL / shader gradient & liquid backgrounds (the premium hero canvas)
- 2. Canvas particle systems / interactive backgrounds
- 3. Custom cursors & cursor-driven effects
- 4. View Transitions API (cinematic state & page changes)
- 5. Generative / creative-coding accents
- The award-winner's discipline (synthesized from Awwwards judging)
- When to reach here vs stay in CSS

This is the layer that takes a section from "clean and modern" to *award-winning*. It is heavier (WebGL,
canvas, JS) and **must be rationed**: the research is unanimous — every Awwwards Site-of-the-Day shares
**one signature moment that makes you stop scrolling, not twenty effects**. Custom interaction is the
single biggest differentiator between award winners and templated/AI sites; **performance is a creative
discipline**, not a post-launch pass. So: pick ONE experimental move per page, build it bespoke, make it
run at 60fps on a mid-range phone, and gate it behind `prefers-reduced-motion` + lazy init.

> This reference reinforces the core law of `section-design-workflow.md`: one bold move + restraint.
> Experimental tech is *how* you spend the one bold move when CSS isn't enough — not a license to add
> five more.

---

## 1. WebGL / shader gradient & liquid backgrounds (the premium hero canvas)
- **Why:** A fragment-shader background — animated mesh gradient, liquid distortion, flowing noise — is the
  current high-end hero. It reads as bespoke and "motion-driven premium" in a way a CSS gradient can't,
  and weighs less than a video. The majority of recent Awwwards/FWA winners use Three.js / custom
  WebGL(GPU) for exactly this.
- **How:** a full-viewport plane with a custom fragment shader; drive color via `mix()` + a noise function,
  animate with a `uTime` uniform, add `uMouse` for cursor-driven distortion and a grain term. In React,
  use **react-three-fiber** + drei `shaderMaterial`.
```jsx
// react-three-fiber: a single full-screen shader plane
function GradientBG() {
  const ref = useRef()
  useFrame((_, dt) => { ref.current.uTime += dt })
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={ref}
        uniforms={{ uTime:{value:0}, uMouse:{value:[0,0]},
                    uColorA:{value:new THREE.Color('#6d28d9')}, uColorB:{value:new THREE.Color('#2563eb')} }}
        fragmentShader={`
          uniform float uTime; uniform vec3 uColorA,uColorB; varying vec2 vUv;
          // cheap value-noise omitted; t mixes the two brand colors with a moving wave
          void main(){ float t = 0.5 + 0.5*sin(vUv.x*3.0 + uTime*0.4 + vUv.y*2.0);
                       gl_FragColor = vec4(mix(uColorA,uColorB,t), 1.0); }`}
        vertexShader={`varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }`} />
    </mesh>
  )
}
```
- **Modern note:** **TSL (Three Shading Language)** lets you write shader logic in JS/TS that targets both
  WebGL and WebGPU — future-proof. Shadertoy shaders port into Three.js with minor uniform renaming.
- **Pitfall:** ships a big dependency (Three.js ~150KB+) — **lazy-load** the canvas (dynamic import,
  `IntersectionObserver`), pause `useFrame` when offscreen, cap `dpr={[1,2]}`. Always render a static CSS
  gradient/grain fallback for `prefers-reduced-motion` and no-WebGL. One per page, hero only.

## 2. Canvas particle systems / interactive backgrounds
- **Why:** Particles reacting to the cursor (repulsion, connection lines, click bursts) add living depth and
  a tactile signature. Lighter than WebGL for 2D effects.
- **How:** an HTML5 `<canvas>`, an array of particle objects, a `requestAnimationFrame` loop; on
  `mousemove` apply repulsion (push particles from the cursor); draw connection lines between near neighbors
  for the "network" look.
```js
const ctx = canvas.getContext('2d'); let mouse = {x:-999,y:-999};
const P = Array.from({length: 90}, () => ({ x:Math.random()*w, y:Math.random()*h,
  vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4 }));
function tick(){
  ctx.clearRect(0,0,w,h);
  for (const p of P){
    const dx=p.x-mouse.x, dy=p.y-mouse.y, d=Math.hypot(dx,dy);
    if (d<120){ p.vx += dx/d*0.3; p.vy += dy/d*0.3; }     // repulsion
    p.x+=p.vx; p.y+=p.vy; p.vx*=.98; p.vy*=.98;            // drift + damping
    if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1;
    ctx.fillRect(p.x,p.y,2,2);
  }
  requestAnimationFrame(tick);
}
```
- Libraries if you don't roll your own: tsParticles (modern, maintained), particles.js (legacy).
- **Pitfall:** particle count kills mid-range devices — cap count by viewport/device, throttle to rAF,
  pause when the section is offscreen, drop count on mobile. `pointer-events:none` on the canvas. Provide a
  static fallback under reduced-motion.

## 3. Custom cursors & cursor-driven effects
- **Why:** A custom cursor (a dot that lags/scales, a trail, a magnetic blob, a hover "view" label) is one
  of the most recognizable Awwwards signatures — it personalizes the whole site cheaply.
- **How:** hide the native cursor on a desktop class; a fixed element that **lerps** toward the real
  pointer each frame (the lag is what feels premium); scale/morph it on interactive-element hover.
```js
let cx=0, cy=0, tx=0, ty=0;
addEventListener('pointermove', e => { tx=e.clientX; ty=e.clientY; });
function loop(){ cx += (tx-cx)*0.15; cy += (ty-cy)*0.15;       // lerp = the signature lag
  dot.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); }
// on hover of [data-cursor="view"], add a class that scales the dot + shows a label
```
- Pair with magnetic buttons (`motion-and-interaction.md §A6`) for a cohesive feel.
- **Pitfall:** **Never** remove the cursor on touch (`@media (hover:hover)` gate) or you strand mobile
  users; keep keyboard focus styles intact; ensure the custom cursor never hides clickable affordance.
  Honor reduced-motion (drop the lag/trail).

## 4. View Transitions API (cinematic state & page changes)
- **Why:** Native-feeling morphs between DOM states and **across page navigations** (MPA) — a shared
  element (a card → its detail hero) animates seamlessly, the thing that used to require a SPA + heavy JS.
- **How:** same-document — wrap the state change; cross-document — opt both pages in with `@view-transition`
  and name the shared elements.
```js
// same-document
document.startViewTransition(() => updateTheDOM());
```
```css
/* cross-document (MPA), same origin, in BOTH pages' CSS */
@view-transition { navigation: auto; }
.hero-image { view-transition-name: hero; }   /* shared element morphs across the navigation */
::view-transition-old(hero), ::view-transition-new(hero){ animation-duration: .4s; }
```
- Cross-document shipped in Chrome/Edge 126+, Safari 18.2+ (not Firefox yet) — progressive enhancement:
  without support, navigation just happens instantly.
- **Pitfall:** `view-transition-name` must be **unique per snapshot** on a page or the transition errors;
  large/looping transitions feel slow — keep ≤400ms. Re-check it doesn't fight a smooth-scroll lib.

## 5. Generative / creative-coding accents
- **Why:** Small generative touches — a flow field, reactive blobs, audio-reactive bars, an SVG that draws
  itself — give a section a one-of-a-kind, "a human coded this" quality judges reward.
- **How:** light canvas/SVG sketches (p5.js for prototyping, vanilla canvas for ship), or animated SVG
  `stroke-dashoffset` "self-drawing" paths driven by scroll. Keep them as *accents* in one plane, not the
  whole section.
- **Pitfall:** generative ≠ random noise — constrain it to the brand (palette, motion language) or it reads
  as a screensaver. Budget the CPU; pause offscreen.

---

## The award-winner's discipline (synthesized from Awwwards judging)
- **One signature, not twenty effects.** Awwwards weights Design 40 / Usability 30 / Creativity 20 /
  Content 10 — creativity is real but usability outweighs it. Spend the wow on ONE moment.
- **Custom > template.** Judges spot off-the-shelf instantly; the differentiator is bespoke interaction
  tied to the subject's story, not a library dropped in.
- **Performance is design.** Complex visuals must load fast and run smooth on mid-range devices. Treat the
  frame budget as a constraint from day one: lazy-init heavy canvases, pause offscreen, cap dpr/particle
  count, ship static fallbacks.
- **Narrative.** The signature should *mean* something about the subject — emotion and story, not effect
  for its own sake. (Ties to `design-thinking.md §B4` and the core "one bold move" law.)
- **Accessibility floor still applies.** Reduced-motion path, keyboard reachability, focus states, and no
  meaning-by-motion-alone — even on the most experimental section.

## When to reach here vs stay in CSS
Stay in CSS (other references) for 90% of sections. Reach for this tier only when **one hero/landing
moment** is the page's reason to exist and CSS genuinely can't deliver it (true 3D, fluid simulation,
cursor-reactive fields, cross-page shared-element morphs). If a CSS aurora + grain + tilt
(`depth-and-texture.md`) gets you 90% of the wow at 5% of the cost — do that instead.
