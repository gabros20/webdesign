# Contributing

Improve concrete website-design decisions, routes, artifacts, or validation without turning the
runtime pack into a general frontend, marketing, SEO, or product-design encyclopedia.

## Pull-request checklist

1. Put universal behavior in `SKILL.md` and conditional depth in one directly linked reference.
2. Add or update activation, traversal, output, and regression fixtures affected by the change.
3. Test any runtime script or code example that changed.
4. Run:

   ```bash
   scripts/check-sync
   scripts/count-skill-tokens
   ```

5. Update README/user docs when the public workflow changes and `AGENTS.md`/`CLAUDE.md` when
   repository invariants change.
6. Record user-visible behavior in `CHANGELOG.md`.

Use semantic versioning. Synchronize `.codex-plugin/plugin.json`, the newest changelog release,
tag `v<version>`, and the matching GitHub Release. Do not add version metadata to runtime
`SKILL.md`.
