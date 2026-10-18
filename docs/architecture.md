# Architecture

## Design intent

A boring, static site that's easy to extend. Three principles guided every choice:

1. **Static over dynamic.** Everything prerenders. No runtime server. GitHub Pages can
   host it. Cold-start times don't exist.
2. **Configuration over code.** Projects live in YAML. Site metadata lives in one TS
   file. Tweaking the site shouldn't require touching components.
3. **Self-documenting harness.** `CLAUDE.md` + `docs/` + a typed YAML schema mean a
   future contributor (human or AI) can extend the site without reverse-engineering it.

## Data flow

```
┌───────────────────────┐
│  src/data/            │
│    projects.yaml      │── ?raw import → loadProjects() ─┐
└───────────────────────┘                                  │
                                                            ▼
                                          ┌────────────────────────────────┐
┌───────────────────────┐                 │ src/routes/projects/           │
│  PUBLIC_SUBSTACK_FEED │── fetch RSS  ──▶│   +page.server.ts (build only) │──▶ HTML
│  (env var)            │   at build      │ src/routes/blog/               │
└───────────────────────┘                 │   +page.server.ts (build only) │
                                          └────────────────────────────────┘
```

- **`+page.server.ts`** runs only at prerender (build) time. The result is baked into
  the static HTML. Nothing fetches at runtime.
- **YAML is read via `?raw`** (Vite's raw-string import). This makes the projects file
  part of the bundle dependency graph — touching it triggers a rebuild in dev — and
  avoids brittle `fs.readFileSync` paths that break after bundling.
- **Substack failures are non-fatal**: `loadSubstackPosts` catches errors and returns
  `{ posts: [], error: string }`. The blog page renders a banner. Build still succeeds.

## Why this stack

| Choice                      | Alternative considered           | Why we picked it                                                                                                                   |
| --------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| SvelteKit + adapter-static  | Astro                            | Svelte 5 runes are a joy; SvelteKit's `+page.server.ts` ergonomics beat Astro's content collections for small dynamic-build needs. |
| Tailwind v4 + shadcn-svelte | Hand-rolled CSS                  | Theme tokens (oklch + CSS vars) handle light/dark cleanly; shadcn ships well-designed components that we own (not a dep).          |
| YAML for projects           | TS array / JSON / markdown       | Comments + multi-line strings; user explicitly asked. Zod validates at build, so typos surface immediately.                        |
| zod                         | Manual type guards               | Schema is the doc. Errors with field paths beat type-narrowing assertions.                                                         |
| RSS at build time           | Substack API / client-side fetch | Substack RSS is simple and stable; no API keys; no CORS; result is static.                                                         |
| lefthook                    | husky                            | Single Go binary, no node_modules clutter, faster.                                                                                 |

## Trade-offs to keep in mind

- **Build-time freshness.** New Substack posts need a rebuild to appear on `/blog/`.
  Acceptable for a personal site; if it becomes annoying, set up a scheduled GitHub
  Action to rebuild daily.
- **No client-side routing for unknown paths.** `404.html` is generated as a fallback,
  so GH Pages serves it for any path that isn't prerendered. The fallback boots
  SvelteKit's client, which can then route. Useful for typo'd URLs.
- **YAML strictness vs flexibility.** Adding a field requires touching the zod schema.
  This is intentional friction — keeps the data model coherent.
