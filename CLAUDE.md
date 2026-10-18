# CLAUDE.md

Context for Claude (or any new contributor) working on this repo. Read this first.

## What this is

A static personal site: SvelteKit + Tailwind v4 + shadcn-svelte, deployed to GitHub Pages.
Three pages: **about (`/`)**, **projects (`/projects/`)**, **blog (`/blog/`)**.

## Stack at a glance

| Layer       | Choice                                               |
| ----------- | ---------------------------------------------------- |
| Framework   | SvelteKit (Svelte 5, runes mode)                     |
| Adapter     | `@sveltejs/adapter-static` — fully prerendered       |
| Styling     | Tailwind v4 (CSS-first, no JS config)                |
| Components  | shadcn-svelte (Nova preset)                          |
| Data        | YAML (projects) + Substack RSS (blog)                |
| Validation  | zod (runtime schema check on `projects.yaml`)        |
| Quality     | TypeScript strict · ESLint · Prettier · svelte-check |
| Hooks       | lefthook (pre-commit + pre-push)                     |
| Pkg manager | pnpm                                                 |

## File map (only the load-bearing bits)

```
src/
├── routes/
│   ├── +layout.svelte         # global nav + footer, imports global CSS
│   ├── +layout.ts             # `prerender = true`, `trailingSlash = 'always'`
│   ├── layout.css             # shadcn theme tokens + @theme (global stylesheet)
│   ├── +page.svelte           # /  — about + "currently working on"
│   ├── projects/
│   │   ├── +page.svelte       # grid of color-coded ProjectCards
│   │   └── +page.server.ts    # loads + validates projects.yaml
│   └── blog/
│       ├── +page.svelte       # list of recent Substack posts
│       └── +page.server.ts    # fetches Substack RSS at prerender time
├── lib/
│   ├── config.ts              # site-wide constants (name, links, nav, substack URL)
│   ├── projects.ts            # YAML loader + zod schema + Project type
│   ├── substack.ts            # RSS fetcher (graceful failure)
│   ├── utils.ts               # `cn()` helper (clsx + tailwind-merge) — shadcn-managed
│   └── components/
│       ├── Nav.svelte
│       ├── ProjectCard.svelte
│       └── ui/                # shadcn-svelte components (managed by the CLI)
└── data/
    └── projects.yaml          # source of truth for the projects page
```

## How to extend (most common tasks)

| I want to…                          | Touch…                                                          |
| ----------------------------------- | --------------------------------------------------------------- |
| Add a project                       | `src/data/projects.yaml` — see `docs/adding-a-project.md`       |
| Add a new color for project cards   | `PROJECT_COLORS` + `accent`/`wash` maps in `ProjectCard.svelte` |
| Add a nav item                      | `site.nav` in `src/lib/config.ts` + a new route folder          |
| Add a shadcn-svelte component       | `pnpm dlx shadcn-svelte@latest add <name> -y`                   |
| Change theme tokens (colors/radius) | `src/routes/layout.css` (`:root` and `.dark`)                   |
| Wire up the Substack feed           | Set `PUBLIC_SUBSTACK_FEED` in `.env` (see `.env.example`)       |

## Hard constraints (please respect)

1. **Everything must prerender.** `adapter-static` builds a directory of HTML. No server
   endpoints, no `+server.ts`, no per-request `load`. If you need dynamic data, fetch
   it at build time in `+page.server.ts`.
2. **No dynamic Tailwind class names.** Tailwind v4 scans source for class strings
   statically. `bg-${color}-500` won't work — use a static map like the one in
   `ProjectCard.svelte`.
3. **Base path must come from env.** `svelte.config.js` reads `process.env.BASE_PATH`.
   In templates, always use `$app/paths`'s `base` for internal links, never hardcode `/`.
4. **`projects.yaml` is the source of truth for projects.** Zod validates on load;
   if you add a field, update the schema in `src/lib/projects.ts` and document in
   `docs/adding-a-project.md`.

## Deploy story

- Live deploy target: GitHub Pages user site, https://maxhuber888.github.io/ (repo
  `MaxHuber888/MaxHuber888.github.io`, branch `main`, Pages source = GitHub Actions).
- `.github/workflows/deploy.yml` builds with pnpm on every push to `main` and deploys
  `build/`. `BASE_PATH` stays unset. `PUBLIC_SUBSTACK_FEED` comes from a repo variable.
- This repo lives at `Portfolio/site/` inside the portfolio harness (see `../CLAUDE.md`).
  The harness's `content/` library is reference material only; nothing is synced in.

## Local dev

```bash
pnpm install
pnpm dev           # local dev server
pnpm check         # svelte-check (types + a11y warnings)
pnpm lint          # prettier --check && eslint
pnpm format        # prettier --write
pnpm build         # static build into ./build/
pnpm preview       # serve ./build/ locally
```

## Pre-commit & pre-push

Configured in `lefthook.yml`. On commit: prettier, eslint, svelte-check (parallel).
On push: full build. If a hook fails, **fix the issue and make a new commit** — don't
bypass with `--no-verify`.

## Further reading

- `docs/architecture.md` — why the data flow looks the way it does
- `docs/adding-a-project.md` — the YAML schema in detail
- `docs/conventions.md` — coding style notes worth knowing
