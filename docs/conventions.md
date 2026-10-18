# Conventions

The few rules that matter. Everything else is whatever Prettier + ESLint say.

## Imports

- `$lib/*` for anything under `src/lib/` (set by SvelteKit; don't change).
- `$app/paths` for `base` — use this on every internal link, never hardcode `/projects/`.
- `$app/state` (not `$app/stores`) for `page`/`navigating` — runes-friendly, recommended on Svelte 5.

## Components

- `src/lib/components/ui/` is **owned by shadcn-svelte's CLI**. Don't hand-edit unless
  you understand you may overwrite changes on next `add`/`update`. Tweak via theme
  tokens (`src/routes/layout.css`) or wrap with your own component.
- `src/lib/components/<Component>.svelte` is for your own components.
- Use `$props()` runes mode. No `export let`.
- Use the shadcn pattern: `import * as Card from '$lib/components/ui/card'`, then
  `<Card.Root>`/`<Card.Header>` etc.

## Styling

- Tailwind v4. **No `tailwind.config.js`.** Theme tokens live in
  `src/routes/layout.css` under `:root` / `.dark` / `@theme`.
- Class names must be static strings. Build a map if you need conditional colors —
  see `ProjectCard.svelte`.
- Use the shadcn semantic tokens (`bg-background`, `text-foreground`, `border-border`,
  `text-muted-foreground`, etc.) rather than raw Tailwind colors for chrome. Reserve
  raw colors (`bg-blue-500`) for content-level accents like project cards.

## TypeScript

- `strict: true`. No `any` unless you absolutely have to (and add a comment explaining).
- Server load functions: type the return via `PageServerLoad`, not by repeating the
  shape.
- Schema-validated data (zod): always use the inferred type (`z.infer<typeof X>`),
  never duplicate the shape in a hand-written interface.

## Prerender

Every page must prerender. Defaults are set in `src/routes/+layout.ts`. If you write
a route that genuinely can't prerender, you've stepped outside what GH Pages can host —
stop and reconsider the data flow.

## When in doubt

Match the patterns in existing files. They were written deliberately. If something
looks weird, check git blame for the reasoning before "fixing" it.
