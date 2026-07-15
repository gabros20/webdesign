import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import { MONO, SANS, Theme, ThemeName, themes } from "./theme";

// ---------- timing ----------
// Six beats, one per stage of the webdesign arc. 840f @ 30fps = 28s.
// The canvas is the one persistent object: a page is directed, structured, crafted,
// built, reviewed, and shipped inside it. One bold move (the hero) carries each frame.
const STAGES = [
  { key: "direction", label: "DIRECTION", sub: "point of view", from: 0, to: 150 },
  { key: "structure", label: "STRUCTURE", sub: "sitemap & sections", from: 150, to: 300 },
  { key: "craft", label: "CRAFT", sub: "one bold move", from: 300, to: 470 },
  { key: "build", label: "BUILD", sub: "Next.js + tokens", from: 470, to: 580 },
  { key: "review", label: "ART REVIEW", sub: "the eye judges", from: 580, to: 690 },
  { key: "critique", label: "CRITIQUE", sub: "scored go / no-go", from: 690, to: 840 },
] as const;

const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const POP = Easing.spring({ damping: 12, stiffness: 150, mass: 0.7 });

const io = (
  frame: number,
  range: number[],
  out: number[],
  easing: (n: number) => number = EASE,
): number =>
  interpolate(frame, range, out, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

// spring-eased 0→1 pop with overshoot (for snap-in swatches, the GO stamp)
const pop = (frame: number, from: number, dur = 20): number =>
  io(frame, [from, from + dur], [0, 1], POP);

const mixC = (d: number, a: string, b: string): string =>
  interpolateColors(Math.max(0, Math.min(1, d)), [0, 1], [a, b]);

// ---------- geometry ---------- (composition is 1280×720, set in Root.tsx)
const CANVAS = { x: 352, y: 84, w: 872, h: 520 }; // browser frame
const CHROME = 38;
const PC = { x: CANVAS.x + 16, y: CANVAS.y + CHROME + 14, w: CANVAS.w - 32 }; // page content box
// section slots inside the page (asymmetric bento — deliberately NOT three equal cards)
const RIGHTX = PC.x + Math.round(PC.w * 0.52) + 14;
const RIGHTW = PC.w - Math.round(PC.w * 0.52) - 14;
const SEC = {
  nav: { x: PC.x, y: 136, w: PC.w, h: 26 },
  hero: { x: PC.x, y: 174, w: PC.w, h: 150 },
  bigImg: { x: PC.x, y: 336, w: Math.round(PC.w * 0.52), h: 150 },
  cardA: { x: RIGHTX, y: 336, w: RIGHTW, h: 68 },
  cardB: { x: RIGHTX, y: 416, w: RIGHTW, h: 70 },
  cta: { x: PC.x, y: 498, w: PC.w, h: 56 },
  footer: { x: PC.x, y: 566, w: PC.w, h: 32 },
};
type Rect = { x: number; y: number; w: number; h: number };

// draw order: appear (structure) + craft (design) stagger keys
const ORDER = ["nav", "hero", "bigImg", "cardA", "cardB", "cta", "footer"] as const;
type SecKey = (typeof ORDER)[number];

// ---------- small primitives ----------
const Bar: React.FC<{ t: Theme; w: number; h?: number; color?: string; r?: number; o?: number }> = ({
  t,
  w,
  h = 7,
  color,
  r = 4,
  o = 1,
}) => (
  <div style={{ width: w, height: h, borderRadius: r, background: color ?? t.glyph, opacity: o }} />
);

// ---------- LEFT RAIL — the six-stage timeline (mirrors the site's .steps) ----------
const Rail: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const railTop = 178;
  const rowH = 68;
  return (
    <div style={{ position: "absolute", left: 56, top: CANVAS.y, width: 256, height: CANVAS.h }}>
      {/* wordmark */}
      <div style={{ opacity: 1 }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 12,
            letterSpacing: 3,
            fontWeight: 700,
            textTransform: "uppercase",
            color: t.muted,
          }}
        >
          An agent skill
        </div>
        <div style={{ fontFamily: MONO, fontSize: 33, fontWeight: 600, color: t.ink, marginTop: 6, letterSpacing: -1 }}>
          <span style={{ color: t.accent }}>/</span>webdesign
        </div>
      </div>

      {/* connector spine */}
      <div
        style={{
          position: "absolute",
          left: 13,
          top: railTop + 26,
          width: 2,
          height: rowH * 5,
          background: t.line,
        }}
      />

      {STAGES.map((s, i) => {
        const active = frame >= s.from && frame < s.to;
        const done = frame >= s.to;
        const appear = 1; // rail present from frame 0 (seamless-ish loop, non-blank first frame)
        const litGlow = active ? io(frame, [s.from, s.from + 14], [0, 1]) : 0;
        const dotBg = done ? t.good : active ? t.accent : t.panel;
        const dotBorder = done ? t.good : active ? t.accent : t.line;
        const numColor = done || active ? t.accentInk : t.glyph;
        const labelColor = active ? t.ink : done ? t.muted : t.glyph;
        return (
          <div
            key={s.key}
            style={{
              position: "absolute",
              top: railTop + i * rowH,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              gap: 14,
              opacity: appear,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: dotBg,
                border: `2px solid ${dotBorder}`,
                boxShadow: litGlow ? `0 0 0 6px ${t.accent}22` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: MONO,
                fontSize: 13,
                fontWeight: 600,
                color: numColor,
                flex: "none",
                scale: String(io(frame, [s.from - 6, s.from + 8], active || done ? [0.9, 1] : [1, 1])),
              }}
            >
              {done ? "✓" : i + 1}
            </div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 16.5, fontWeight: 600, color: labelColor, letterSpacing: 0.2 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 11.5, color: t.muted, marginTop: 1 }}>{s.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- the browser frame ----------
const BrowserChrome: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const url =
    frame < 150
      ? "DESIGN.md"
      : frame < 470
        ? "webdesign — draft"
        : frame < 690
          ? "localhost:3000"
          : "webdesign-skill.vercel.app";
  const secure = frame >= 690;
  return (
    <div
      style={{
        position: "absolute",
        left: CANVAS.x,
        top: CANVAS.y,
        width: CANVAS.w,
        height: CHROME,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        background: t.codeBg,
        borderBottom: `1px solid ${t.line}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        paddingLeft: 16,
      }}
    >
      <div style={{ display: "flex", gap: 7 }}>
        {[t.bad, t.amber, t.good].map((c) => (
          <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.85 }} />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          marginRight: 16,
          height: 22,
          borderRadius: 6,
          background: t.panel,
          border: `1px solid ${t.line}`,
          display: "flex",
          alignItems: "center",
          gap: 7,
          paddingLeft: 10,
          fontFamily: MONO,
          fontSize: 12.5,
          color: secure ? t.ink : t.muted,
        }}
      >
        <span style={{ color: secure ? t.good : t.glyph, fontSize: 11 }}>{secure ? "🔒" : "▤"}</span>
        {url}
      </div>
    </div>
  );
};

// ---------- BEAT 1 — DIRECTION BOARD ----------
const SWATCHES = (t: Theme) => [
  { c: t.bg, name: "bg" },
  { c: t.panel, name: "panel" },
  { c: t.ink, name: "ink" },
  { c: t.accent, name: "accent" },
  { c: t.amber, name: "amber" },
  { c: t.good, name: "good" },
];

const DirectionBoard: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const opacity = io(frame, [10, 30], [0, 1]) * io(frame, [150, 172], [1, 0]);
  if (opacity <= 0.01) return null;
  const sw = SWATCHES(t);
  const tokens = ["--accent  #b6307d", "--ink     #1c2333", "type      mono / system"];
  return (
    <div
      style={{
        position: "absolute",
        left: PC.x,
        top: SEC.nav.y,
        width: PC.w,
        opacity,
        scale: String(io(frame, [150, 172], [1, 0.96])),
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 15, color: t.accent, fontWeight: 600 }}>
        DESIGN.md — the direction
      </div>
      <div style={{ fontFamily: SANS, fontSize: 13, color: t.muted, marginTop: 4, maxWidth: 520 }}>
        Palette, type, register, and the one signature — decided once, then enforced.
      </div>

      {/* palette swatches snap in (the accent is biggest — the one bold move) */}
      <div style={{ display: "flex", gap: 16, marginTop: 30 }}>
        {sw.map((s, i) => {
          const p = pop(frame, 30 + i * 9);
          const isAccent = s.name === "accent";
          const size = isAccent ? 92 : 74;
          return (
            <div key={s.name} style={{ opacity: io(frame, [30 + i * 9, 44 + i * 9], [0, 1]), scale: String(p) }}>
              <div
                style={{
                  width: size,
                  height: size,
                  borderRadius: 14,
                  background: s.c,
                  border: `1px solid ${t.line}`,
                  boxShadow: isAccent ? `0 12px 30px -8px ${t.accent}88` : `0 6px 16px -8px #00000040`,
                }}
              />
              <div style={{ fontFamily: MONO, fontSize: 11.5, color: t.muted, marginTop: 7, textAlign: "center" }}>
                {s.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* type specimen + token list */}
      <div style={{ display: "flex", gap: 40, marginTop: 34, alignItems: "flex-end" }}>
        <div style={{ opacity: io(frame, [70, 88], [0, 1]) }}>
          <div style={{ fontFamily: MONO, fontSize: 96, fontWeight: 600, color: t.ink, lineHeight: 0.9, letterSpacing: -3 }}>
            Aa
          </div>
          <div style={{ fontFamily: SANS, fontSize: 12, color: t.muted, marginTop: 8, letterSpacing: 1, textTransform: "uppercase" }}>
            Display · monospace
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 8 }}>
          {tokens.map((tk, i) => {
            const shown = Math.round(io(frame, [80 + i * 12, 100 + i * 12], [0, tk.length]));
            return (
              <div
                key={tk}
                style={{
                  fontFamily: MONO,
                  fontSize: 15,
                  color: t.ink,
                  background: t.codeBg,
                  border: `1px solid ${t.line}`,
                  borderRadius: 7,
                  padding: "7px 12px",
                  whiteSpace: "pre",
                  opacity: io(frame, [80 + i * 12, 92 + i * 12], [0, 1]),
                }}
              >
                {tk.slice(0, shown)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ---------- BEATS 2–6 — the page mockup ----------
// per-section design progress d (0 wireframe → 1 designed), crafted in stagger during S3
const craftD = (frame: number, i: number): number => io(frame, [300 + i * 20, 360 + i * 20], [0, 1]);
// per-section appear a (drop-in during S2)
const appearA = (frame: number, i: number): number => io(frame, [150 + i * 16, 178 + i * 16], [0, 1]);

const SectionFrame: React.FC<{
  t: Theme;
  r: Rect;
  d: number;
  a: number;
  designedFill?: string;
  designedBorder?: string;
  glow?: boolean;
  children?: React.ReactNode;
}> = ({ t, r, d, a, designedFill, designedBorder, glow, children }) => {
  const bg = mixC(d, t.wire, designedFill ?? t.panel);
  const border = mixC(d, t.glyph, designedBorder ?? t.line);
  const shadowD = io(d, [0.45, 1], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        left: r.x,
        top: r.y,
        width: r.w,
        height: r.h,
        opacity: a,
        translate: `0px ${io(a, [0, 1], [14, 0])}px`,
        scale: String(io(a, [0, 1], [0.98, 1])),
        background: bg,
        border: `${io(d, [0, 1], [1.6, 1])}px ${d < 0.5 ? "dashed" : "solid"} ${border}`,
        borderRadius: 10,
        boxShadow: shadowD ? `0 ${10 * shadowD}px ${28 * shadowD}px -12px rgba(0,0,0,${0.1 + shadowD * 0.14})` : "none",
        overflow: "hidden",
      }}
    >
      {/* hero glow plane (depth-over-flatness, made literal) */}
      {glow ? (
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: t.accent,
            opacity: 0.14 * d,
            filter: "blur(46px)",
          }}
        />
      ) : null}
      {children}
    </div>
  );
};

const wireBars = (t: Theme, d: number, rows: number[], pad = 12, gap = 9) => (
  <div style={{ position: "absolute", inset: 0, padding: pad, display: "flex", flexDirection: "column", gap, opacity: 1 - d }}>
    {rows.map((w, i) => (
      <Bar key={i} t={t} w={w} h={7} color={t.glyph} o={0.5} />
    ))}
  </div>
);

const PageMockup: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const idx: Record<SecKey, number> = { nav: 0, hero: 1, bigImg: 2, cardA: 3, cardB: 4, cta: 5, footer: 6 };
  const d = (k: SecKey) => craftD(frame, idx[k]);
  const a = (k: SecKey) => appearA(frame, idx[k]);

  const dHero = d("hero");
  const dNav = d("nav");

  return (
    <>
      {/* NAV */}
      <SectionFrame t={t} r={SEC.nav} d={dNav} a={a("nav")} designedFill={t.panel} designedBorder={t.line}>
        {wireBars(t, dNav, [64, 40, 40, 40], 8, 6)}
        <div style={{ position: "absolute", inset: 0, padding: "0 12px", display: "flex", alignItems: "center", gap: 12, opacity: dNav }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: t.accent }} />
          <div style={{ fontFamily: MONO, fontSize: 11, color: t.ink, fontWeight: 600 }}>webdesign</div>
          <div style={{ flex: 1 }} />
          <Bar t={t} w={34} h={6} color={t.muted} />
          <Bar t={t} w={34} h={6} color={t.muted} />
          <div style={{ width: 52, height: 18, borderRadius: 6, background: t.accent }} />
        </div>
      </SectionFrame>

      {/* HERO — the one bold move: giant type lockup + accent highlight + depth glow */}
      <SectionFrame t={t} r={SEC.hero} d={dHero} a={a("hero")} designedFill={t.panel} designedBorder={t.line} glow>
        {wireBars(t, dHero, [120, 300, 240, 90], 16, 11)}
        <div style={{ position: "absolute", inset: 0, padding: "0 22px", opacity: dHero, display: "flex", flexDirection: "column", justifyContent: "center", gap: 9 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: t.accent, fontWeight: 700 }}>
            Design system · v1
          </div>
          <div style={{ fontFamily: MONO, fontSize: 31, fontWeight: 600, color: t.ink, lineHeight: 1.02, letterSpacing: -1 }}>
            Refuse the <span style={{ color: t.accent }}>default.</span>
          </div>
          <div style={{ fontFamily: SANS, fontSize: 13, color: t.muted, maxWidth: 440 }}>
            One point of view, one bold move per section.
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <div style={{ height: 30, width: 108, borderRadius: 8, background: t.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 12, fontWeight: 600, color: t.accentInk }}>
              Get started
            </div>
            <div style={{ height: 30, width: 84, borderRadius: 8, border: `1px solid ${t.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 12, color: t.ink }}>
              Docs
            </div>
          </div>
        </div>
      </SectionFrame>

      {/* BIG IMAGERY tile — the imagery slot resolves into a gradient plane, not a gray box */}
      <SectionFrame t={t} r={SEC.bigImg} d={d("bigImg")} a={a("bigImg")} designedBorder={t.line}>
        {wireBars(t, d("bigImg"), [200, 380, 320], 16, 12)}
        <div style={{ position: "absolute", inset: 0, opacity: d("bigImg") }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${t.accent} 0%, ${t.dim} 100%)`,
              opacity: 0.9,
            }}
          />
          <div style={{ position: "absolute", left: 18, bottom: 16, right: 18 }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#ffffffcc", fontWeight: 700 }}>
              Featured work
            </div>
            <div style={{ fontFamily: MONO, fontSize: 20, color: "#fff", fontWeight: 600, marginTop: 4 }}>
              A hero that earns the scroll
            </div>
          </div>
        </div>
      </SectionFrame>

      {/* CARD A — icon tile + copy (accent-keyed) */}
      <SectionFrame t={t} r={SEC.cardA} d={d("cardA")} a={a("cardA")} designedFill={t.panel} designedBorder={t.line}>
        {wireBars(t, d("cardA"), [40, 200, 150], 12, 8)}
        <div style={{ position: "absolute", inset: 0, padding: 14, display: "flex", gap: 12, alignItems: "center", opacity: d("cardA") }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: `${t.accent}22`, border: `1px solid ${t.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <div style={{ width: 15, height: 15, borderRadius: 4, background: t.accent }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Bar t={t} w={140} h={8} color={t.ink} />
            <Bar t={t} w={200} h={6} color={t.muted} />
          </div>
        </div>
      </SectionFrame>

      {/* CARD B — deliberately different from A (amber-keyed) so it's never a "3 identical cards" row */}
      <SectionFrame t={t} r={SEC.cardB} d={d("cardB")} a={a("cardB")} designedFill={t.panel} designedBorder={t.line}>
        {wireBars(t, d("cardB"), [40, 180, 150], 12, 8)}
        <div style={{ position: "absolute", inset: 0, padding: 14, display: "flex", gap: 12, alignItems: "center", opacity: d("cardB") }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: `${t.amber}22`, border: `1px solid ${t.amber}55`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <div style={{ width: 15, height: 15, borderRadius: "50%", background: t.amber }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Bar t={t} w={120} h={8} color={t.ink} />
            <Bar t={t} w={190} h={6} color={t.muted} />
          </div>
        </div>
      </SectionFrame>

      {/* CTA band */}
      <SectionFrame t={t} r={SEC.cta} d={d("cta")} a={a("cta")} designedFill={t.ink} designedBorder={t.ink}>
        {wireBars(t, d("cta"), [260, 120], 16, 10)}
        <div style={{ position: "absolute", inset: 0, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: d("cta") }}>
          <div style={{ fontFamily: MONO, fontSize: 15, color: t.bg, fontWeight: 600 }}>Ship a page that gets remembered.</div>
          <div style={{ height: 28, width: 96, borderRadius: 7, background: t.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 12, fontWeight: 600, color: t.accentInk }}>
            Start free
          </div>
        </div>
      </SectionFrame>

      {/* FOOTER */}
      <SectionFrame t={t} r={SEC.footer} d={d("footer")} a={a("footer")} designedFill={t.panel} designedBorder={t.line}>
        {wireBars(t, d("footer"), [60, 60, 60], 10, 0)}
        <div style={{ position: "absolute", inset: 0, padding: "0 16px", display: "flex", alignItems: "center", gap: 18, opacity: d("footer") }}>
          <div style={{ fontFamily: MONO, fontSize: 11, color: t.muted }}>© webdesign</div>
          <div style={{ flex: 1 }} />
          <Bar t={t} w={40} h={5} color={t.glyph} />
          <Bar t={t} w={40} h={5} color={t.glyph} />
          <Bar t={t} w={40} h={5} color={t.glyph} />
        </div>
      </SectionFrame>
    </>
  );
};

// ---------- BEAT 4 — BUILD (code overlay) ----------
const CODE: { txt: string; c: (t: Theme) => string }[] = [
  { txt: "@theme {", c: (t) => t.muted },
  { txt: "  --color-accent: #b6307d;", c: (t) => t.accent },
  { txt: "  --font-display: ui-monospace;", c: (t) => t.ink },
  { txt: "}", c: (t) => t.muted },
  { txt: "export function Hero() {", c: (t) => t.dim },
  { txt: "  return <Section bold />;", c: (t) => t.ink },
  { txt: "}", c: (t) => t.dim },
];

const CodeOverlay: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const opacity = io(frame, [478, 500], [0, 1]) * io(frame, [560, 580], [1, 0]);
  if (opacity <= 0.01) return null;
  const cardW = 386;
  return (
    <div
      style={{
        position: "absolute",
        left: CANVAS.x + CANVAS.w - cardW - 26,
        top: CANVAS.y + CANVAS.h - 214,
        width: cardW,
        opacity,
        translate: `0px ${io(frame, [478, 502], [26, 0])}px`,
        background: t.bg === "#12151d" ? "#0d1017" : "#0f1320",
        border: `1px solid ${t.line}`,
        borderRadius: 12,
        boxShadow: `0 24px 60px -20px #000000aa`,
        padding: "14px 16px",
        fontFamily: MONO,
        fontSize: 13.5,
        lineHeight: 1.75,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: t.bad }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: t.amber }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: t.good }} />
        <div style={{ fontFamily: MONO, fontSize: 11, color: "#8391ad", marginLeft: 6 }}>theme.css · Hero.tsx</div>
      </div>
      {CODE.map((ln, i) => {
        const start = 500 + i * 8;
        const shown = Math.round(io(frame, [start, start + 10], [0, ln.txt.length]));
        return (
          <div key={i} style={{ color: ln.c(t), whiteSpace: "pre", opacity: io(frame, [start, start + 6], [0, 1]) }}>
            {ln.txt.slice(0, shown) || " "}
          </div>
        );
      })}
    </div>
  );
};

// ---------- BEAT 5 — ART REVIEW (annotation pins) ----------
const Pin: React.FC<{ t: Theme; frame: number; at: number; x: number; y: number; tag: string; note: string; sev: string }> = ({
  t,
  frame,
  at,
  x,
  y,
  tag,
  note,
  sev,
}) => {
  const inO = pop(frame, at);
  const resolve = io(frame, [665, 685], [0, 1]); // pins turn to checks
  const color = sev === "A1" ? t.bad : t.amber;
  const shown = mixC(resolve, color, t.good);
  return (
    <div style={{ position: "absolute", left: x, top: y, scale: String(inO), opacity: io(frame, [at, at + 8], [0, 1]) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: shown,
            border: `2px solid ${t.panel}`,
            boxShadow: `0 6px 16px -4px ${color}88`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
            flex: "none",
          }}
        >
          {resolve > 0.5 ? "✓" : tag}
        </div>
        <div
          style={{
            background: t.panel,
            border: `1px solid ${t.line}`,
            borderRadius: 7,
            padding: "5px 10px",
            fontFamily: SANS,
            fontSize: 12,
            color: t.ink,
            whiteSpace: "nowrap",
            boxShadow: `0 8px 20px -10px #00000055`,
            opacity: io(frame, [665, 682], [1, 0.35]),
            textDecoration: resolve > 0.5 ? "line-through" : "none",
          }}
        >
          {note}
        </div>
      </div>
    </div>
  );
};

const ReviewPins: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const opacity = io(frame, [585, 605], [0, 1]);
  if (opacity <= 0.01) return null;
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <Pin t={t} frame={frame} at={604} x={SEC.hero.x + 292} y={SEC.hero.y + 2} tag="A1" note="raise headline contrast" sev="A1" />
      <Pin t={t} frame={frame} at={628} x={SEC.cardA.x + 74} y={SEC.cardA.y - 12} tag="A2" note="tighten rhythm" sev="A2" />
    </div>
  );
};

// ---------- BEAT 6 — CRITIQUE (score + GO stamp) ----------
const ScoreCard: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const opacity = io(frame, [694, 714], [0, 1]);
  if (opacity <= 0.01) return null;
  const score = Math.round(io(frame, [700, 760], [0, 36]));
  const rows = [
    { label: "Nielsen heuristics", ok: 726 },
    { label: "Cognitive load", ok: 742 },
    { label: "Anti-default tells", ok: 758 },
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: CANVAS.x + 30,
        top: CANVAS.y + 66,
        width: 300,
        opacity,
        translate: `${io(frame, [694, 716], [-18, 0])}px 0px`,
        background: t.panel,
        border: `1px solid ${t.line}`,
        borderRadius: 14,
        boxShadow: `0 30px 70px -24px #000000aa`,
        padding: "18px 20px",
      }}
    >
      <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.muted, fontWeight: 700 }}>
        Critique — go / no-go
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 8 }}>
        <div style={{ fontFamily: MONO, fontSize: 52, fontWeight: 600, color: t.ink, letterSpacing: -2 }}>{score}</div>
        <div style={{ fontFamily: MONO, fontSize: 22, color: t.muted }}>/ 40</div>
      </div>
      <div style={{ height: 8, borderRadius: 5, background: t.codeBg, overflow: "hidden", marginTop: 6 }}>
        <div style={{ height: "100%", width: `${io(frame, [700, 760], [0, 90])}%`, background: t.good }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 16 }}>
        {rows.map((r) => (
          <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 9, opacity: io(frame, [r.ok, r.ok + 10], [0, 1]) }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: t.good, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flex: "none" }}>
              ✓
            </div>
            <div style={{ fontFamily: SANS, fontSize: 13, color: t.ink }}>{r.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GoStamp: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const s = pop(frame, 770, 22);
  if (frame < 770) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: CANVAS.x + CANVAS.w / 2 - 6,
        top: CANVAS.y + CANVAS.h / 2 - 40,
        scale: String(io(s, [0, 1], [1.9, 1])),
        rotate: "-9deg",
        opacity: io(frame, [770, 784], [0, 1]),
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 62,
          fontWeight: 700,
          letterSpacing: 4,
          color: t.good,
          border: `5px solid ${t.good}`,
          borderRadius: 16,
          padding: "6px 26px",
          background: `${t.panel}e6`,
          boxShadow: `0 20px 50px -18px ${t.good}88`,
        }}
      >
        GO
      </div>
      <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: t.good, textAlign: "center", marginTop: 10, letterSpacing: 1, opacity: io(frame, [792, 806], [0, 1]) }}>
        shipped ✓
      </div>
    </div>
  );
};

// ---------- caption bar ----------
const Caption: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const captions: { from: number; to: number; lead: string; rest: string }[] = [
    { from: 8, to: 150, lead: "DIRECTION", rest: "palette, type, and the one signature — recorded as DESIGN.md." },
    { from: 156, to: 300, lead: "STRUCTURE", rest: "a sitemap, navigation, and a deduplicated section catalog." },
    { from: 306, to: 470, lead: "CRAFT", rest: "one bold move per section — depth, contrast, a signature." },
    { from: 476, to: 580, lead: "BUILD", rest: "Next.js, one component per section, tokens as a Tailwind theme." },
    { from: 586, to: 690, lead: "ART REVIEW", rest: "the same eye judges the build — an A0–A3 punch-list." },
    { from: 696, to: 838, lead: "CRITIQUE", rest: "a scored go / no-go. The page ships." },
  ];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 636, textAlign: "center" }}>
      {captions.map((c) => {
        const o = io(frame, [c.from, c.from + 14], [0, 1]) * io(frame, [c.to - 12, c.to], [1, 0]);
        if (o <= 0.01) return null;
        return (
          <div key={c.lead} style={{ position: "absolute", left: 0, right: 0, opacity: o, translate: `0px ${io(frame, [c.from, c.from + 16], [8, 0])}px` }}>
            <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, letterSpacing: 2, color: t.accent, marginRight: 12 }}>
              {c.lead}
            </span>
            <span style={{ fontFamily: SANS, fontSize: 21, color: t.muted }}>{c.rest}</span>
          </div>
        );
      })}
    </div>
  );
};

// ---------- composition ----------
export const LifeOfAPage: React.FC<{ theme: ThemeName }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const t = themes[theme];
  return (
    <AbsoluteFill style={{ background: t.bg }}>
      {/* soft canvas shell shadow — grounds the browser frame */}
      <div
        style={{
          position: "absolute",
          left: CANVAS.x,
          top: CANVAS.y,
          width: CANVAS.w,
          height: CANVAS.h,
          borderRadius: 12,
          background: t.panel,
          border: `1px solid ${t.line}`,
          boxShadow: `0 40px 90px -40px #00000066`,
          // present from frame 0 so the loop point isn't a blank flash — the empty
          // browser canvas is the intended starting state, not a fade-in from nothing
          opacity: 1,
        }}
      />
      <Rail t={t} frame={frame} />
      <BrowserChrome t={t} frame={frame} />
      {/* page content clipped to the canvas body */}
      <div
        style={{
          position: "absolute",
          left: CANVAS.x,
          top: CANVAS.y + CHROME,
          width: CANVAS.w,
          height: CANVAS.h - CHROME,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          overflow: "hidden",
        }}
      >
        {/* inner elements use absolute page coords, offset back into this clip box */}
        <div style={{ position: "absolute", left: -CANVAS.x, top: -(CANVAS.y + CHROME) }}>
          <DirectionBoard t={t} frame={frame} />
          <PageMockup t={t} frame={frame} />
          <ReviewPins t={t} frame={frame} />
          <ScoreCard t={t} frame={frame} />
          <GoStamp t={t} frame={frame} />
        </div>
      </div>
      <CodeOverlay t={t} frame={frame} />
      <Caption t={t} frame={frame} />
    </AbsoluteFill>
  );
};
