# Adding a project

Projects live in [`src/data/projects.yaml`](../src/data/projects.yaml). One entry per
project. The schema is validated by zod at build time
([`src/lib/projects.ts`](../src/lib/projects.ts)) — typos and missing fields fail the
build with a clear message.

## Schema

```yaml
- id: kebab-case-id # required. unique. used as a key.
  title: Display Title # required.
  subtitle: Optional one-liner # optional.
  description: > # required. one paragraph. shown on the card.
    A few sentences max. Long-form goes elsewhere (a link, an essay).
  color: blue # required. one of the allowed colors below.
  date: 2025-06-01 # required. YYYY-MM-DD (completion or last major milestone).
  status: active # required. one of: active, shipped, archived, experiment.
  tech: [Rust, CLI] # optional. list of tag strings. shown as chips.
  links: # optional. external links surfaced on the card.
    - { label: Repo, href: https://github.com/... }
    - { label: Write-up, href: https://... }
```

## Allowed colors

`slate`, `blue`, `green`, `amber`, `red`, `purple`, `pink`, `orange`, `teal`

Each color maps to a left-edge accent stripe (`bg-{color}-500`) and a faint hover wash
(`bg-{color}-500/5`). Add a new color by extending `PROJECT_COLORS` in
`src/lib/projects.ts` **and** the `accent` + `wash` maps in
`src/lib/components/ProjectCard.svelte`. Both must change together because Tailwind v4
only emits classes it sees in static source.

## Allowed statuses

| Status       | Visual        | Meaning                                     |
| ------------ | ------------- | ------------------------------------------- |
| `active`     | solid badge   | I'm working on this right now               |
| `shipped`    | muted badge   | Done. Live. Stable.                         |
| `experiment` | outline badge | Toy / prototype / didn't finish — that's OK |
| `archived`   | outline badge | Done, no longer maintained                  |

## Ordering

Projects render newest-first, sorted by `date` (descending), with ties broken by `id`
(alphabetical, for determinism in builds).

## Validation errors

If you mess up the YAML, `pnpm build` (or `pnpm dev`) will fail with something like:

```
projects.yaml failed validation:
  • 2.color: Invalid enum value. Expected slate | blue | ..., received cerulean
  • 2.date: Required
```

The numeric prefix is the array index of the offending entry (0-based).

## Examples

A long-running project with multiple links:

```yaml
- id: opensvg
  title: opensvg
  subtitle: SVG optimizer plugin for OpenSCAD
  description: >
    Compiles parametric OpenSCAD models into clean, minified SVGs without
    losing geometry precision.
  color: teal
  date: 2024-03-15
  status: shipped
  tech: [TypeScript, OpenSCAD]
  links:
    - { label: Repo, href: https://github.com/MaxHuber888/opensvg }
    - { label: Demo, href: https://opensvg.dev }
    - { label: HN post, href: https://news.ycombinator.com/item?id=12345 }
```

A scrappy experiment:

```yaml
- id: tinybytes
  title: tinybytes
  description: One-evening hack to fingerprint binary file formats by histogram.
  color: orange
  date: 2023-11-02
  status: experiment
  tech: [Python]
```
