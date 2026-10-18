# portfolio-svelte

Max Huber's personal site. Static. SvelteKit + Tailwind + shadcn-svelte.

## Quick start

```sh
pnpm install
cp .env.example .env       # then fill in PUBLIC_SUBSTACK_FEED when you have one
pnpm dev
```

Open http://localhost:5173.

## Common commands

```sh
pnpm dev        # local dev server
pnpm build      # static build into ./build/
pnpm preview    # serve ./build/ locally
pnpm check      # svelte-check (types + a11y)
pnpm lint       # prettier --check && eslint
pnpm format     # prettier --write
```

## Deploy

Builds to a fully static `./build/` directory. Pushing to `main` triggers
`.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages at
https://maxhuber888.github.io/. `BASE_PATH` stays unset for the user site; set it only for
a project-page deploy (e.g. `BASE_PATH=/some-repo pnpm build`).

## Where to read next

- [`CLAUDE.md`](./CLAUDE.md) — orientation for new contributors
- [`docs/architecture.md`](./docs/architecture.md) — data flow + design rationale
- [`docs/adding-a-project.md`](./docs/adding-a-project.md) — YAML schema for projects
- [`docs/conventions.md`](./docs/conventions.md) — coding conventions
