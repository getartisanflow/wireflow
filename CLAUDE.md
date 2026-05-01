# WireFlow — Internal Working Notes

These are notes for developers (human or AI) working **inside** this repo. The public API is documented in `docs/` and on https://artisanflow.dev. This file is committed to the public repository — keep it factual about how the package is built and tested, not about downstream/consumer-site workflows.

## Tech stack

- **PHP** 8.4
- **Laravel** 13 (peer dependency)
- **Livewire** 4 (peer dependency)
- **Pest** 4 + Orchestra Testbench for testing
- **Pint** for formatting (Laravel default config)
- The compiled JS surface lives in `dist/` and is **synced from the alpineflow repo** — see "Dist resync" below

## Test

```bash
vendor/bin/pest --compact                          # run everything
vendor/bin/pest --compact --filter=ComponentName   # filter to one test
composer test                                      # equivalent to the first command
```

**Every change requires test coverage.** Component changes → feature test under `tests/Feature/`. Trait/concern logic → unit test. Match sibling-file style.

## Format

```bash
vendor/bin/pint --dirty --format agent      # format only changed files (preferred during dev)
vendor/bin/pint --format agent              # format the whole repo
```

Run before every commit that touches PHP. Do NOT run `pint --test --format agent` — that only checks; just run the formatter and let it fix.

## Dist resync from alpineflow

WireFlow ships the compiled alpineflow bundles inside its own `dist/` so Laravel apps don't need a separate Node toolchain to use both packages.

When alpineflow changes, sync the dist manually:

```bash
cp /Users/zachiler/projects/alpineflow/dist/alpineflow.bundle.esm.js          dist/
cp /Users/zachiler/projects/alpineflow/dist/alpineflow.bundle.esm.js.map      dist/
cp /Users/zachiler/projects/alpineflow/dist/alpineflow-<addon>.esm.js         dist/   # for each touched addon
cp /Users/zachiler/projects/alpineflow/dist/alpineflow-<addon>.esm.js.map     dist/
cp /Users/zachiler/projects/alpineflow/dist/alpineflow.css                    dist/
cp /Users/zachiler/projects/alpineflow/dist/alpineflow-theme.css              dist/
```

(Absolute paths shown above are the conventional sibling layout. Adjust if your local checkout differs.)

After sync, run `vendor/bin/pest --compact` to confirm no regressions. Commit dist changes in a single `chore: resync dist with <reason>` commit, separate from feature commits.

## Components, traits, and registration

- Blade components: `src/View/Components/<Name>.php` + `resources/views/components/<kebab-name>.blade.php`
- Component class: `__construct` with constructor property promotion + property defaults, type-hinted props
- Register every new component in `src/WireFlowServiceProvider.php` (`$loadViewsFrom` already handles the namespace; explicit `Blade::component` calls are required for the prefixed `<x-flow-*>` / `<x-schema-*>` aliases)
- Traits live in `src/Concerns/` (e.g., `WithWireFlow`, `WithSchemaDesigner`)
- Validator rules in `src/Rules/`
- Console commands in `src/Console/`

For new components that wrap an alpineflow directive, follow the SSR-fallback pattern from `<x-flow-schema-node>` — accept optional props for standalone use, render a fallback DOM when those props are passed, otherwise let the directive own the render at runtime.

## Branching & releases

- **`dev`** is the integration branch
- **Feature workflow:** cut a `feature/<kebab-topic>` branch off `dev`, do the work there, open a PR back to `dev` once tests pass. The PR gets reviewed and merged into `dev` (typically by the owner). Don't push commits directly to `dev`
- **`main`** mirrors the latest tagged release. **Never push to main directly. Never merge dev → main without owner approval**
- **Never tag a version**. Tags are cut by the owner after manual verification across alpineflow + wireflow + the consuming site
- **CHANGELOG.md** is append-only. Match the existing version-block structure

## Conventions

- PHP follows Laravel/Pint defaults — explicit return types and parameter type hints on every method
- PHPDoc array shape annotations for non-trivial array params (`@var array<int, array{name: string, type: string}>`)
- Constructor property promotion preferred — no boilerplate constructors with assignment-only bodies
- Curly braces on all control structures, even single-statement bodies
- Match sibling-file style for component class shape, Blade view header comments, test descriptions
- No new Composer dependencies without owner approval

## Don't

- Don't skip Pint or Pest before claiming a change is done
- Don't ship dist changes without re-running the test suite
- Don't add a workaround in a consumer (Livewire app) when the right fix is in this trait/component
- Don't introduce a Livewire-specific dispatch event without a matching `flow:<command>` listener in alpineflow's `src/core/wire-bridge.ts` so the bridge stays bidirectional
