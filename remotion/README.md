# remotion — "Life of a Page"

The hero animation for the **webdesign** skill. A bare wireframe becomes a directed,
crafted, reviewed, and shipped page by moving through the skill's six stages —
**direction → structure → craft → build → art review → critique**. 16:9, 28s, loops.

The palette in [`src/theme.ts`](src/theme.ts) mirrors `site/index.html`'s `:root` tokens
exactly, so the video reads as part of the page in both light and dark.

## Commands

```bash
npm i                     # install (node_modules is gitignored)
npm run dev               # Remotion Studio preview
```

Render the two theme variants + poster stills into the site (paths are relative to this dir):

```bash
npx remotion render life-of-a-page-light ../site/assets/life-of-a-page-light.mp4 --codec=h264 --crf=23
npx remotion render life-of-a-page-dark  ../site/assets/life-of-a-page-dark.mp4  --codec=h264 --crf=23
npx remotion still life-of-a-page-light ../site/assets/life-of-a-page-light-poster.png --frame=815
npx remotion still life-of-a-page-dark  ../site/assets/life-of-a-page-dark-poster.png  --frame=815
```

The page (`site/index.html`) swaps `life-of-a-page-{light,dark}.mp4` on theme change and
falls back to the poster PNG (and to the CSS arc diagram) when video/motion is unavailable.

## Re-rendering with AI assistance

The Remotion AI skills used to build this are not vendored (they'd pollute the installable
skill layout). Reinstall locally when needed:

```bash
npx skills add remotion-dev/skills
```

They land in `.agents/` + `.claude/skills/remotion-*` (both gitignored — see the repo `.gitignore`).
