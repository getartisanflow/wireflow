# Contributing to WireFlow

Thanks for your interest in improving WireFlow — the Livewire/Blade bridge for [AlpineFlow](https://github.com/getartisanflow/alpineflow), part of the [ArtisanFlow](https://artisanflow.dev) ecosystem.

## ⚠️ Open pull requests against `dev`, not `main`

This is the one thing that trips people up. GitHub defaults the base branch to `main`, but **`main` only ever mirrors the latest tagged release** — all work integrates through **`dev`** first.

When you open a PR, **switch the base branch to `dev`**. PRs opened against `main` will be asked to retarget.

## Branch model

- **`dev`** — the integration branch. Everything lands here first.
- **`main`** — mirrors the latest tagged release. Never the target of a feature PR.
- Cut your branch from `dev`:

  ```bash
  git checkout dev && git pull
  git checkout -b feature/<short-kebab-topic>
  ```

## Getting set up

```bash
composer install
```

WireFlow targets **PHP 8.4+**, Laravel 13, and Livewire 4 (the last two as peer dependencies). The suite runs against Orchestra Testbench, so you don't need a full Laravel app.

## Tests — required

Every change needs test coverage. Component changes get a feature test under `tests/Feature/`; trait/concern logic gets a unit test.

```bash
vendor/bin/pest --compact                          # run everything
vendor/bin/pest --compact --filter=ComponentName   # one test
composer test                                      # same as the first
```

## Code style

Format your PHP with Pint before committing:

```bash
vendor/bin/pint --dirty   # format only your changed files
```

Otherwise match the surrounding code: constructor property promotion, explicit return types + parameter type hints, curly braces on every control structure, PHPDoc array shapes for non-trivial arrays.

## The compiled bundle (`dist/`)

WireFlow ships AlpineFlow's compiled JS/CSS inside `dist/` so Laravel apps don't need a Node toolchain. **You normally won't touch `dist/`** — it's synced from the AlpineFlow repo. Changes to flow *behavior* usually belong in [AlpineFlow](https://github.com/getartisanflow/alpineflow); WireFlow's job is the PHP/Blade surface.

## Before you open a PR

- [ ] Base branch is **`dev`**
- [ ] `vendor/bin/pest --compact` passes
- [ ] `vendor/bin/pint --dirty` run on changed PHP
- [ ] New behavior has a test
- [ ] No new Composer dependencies without discussing first
- [ ] No `CHANGELOG.md` entries — the maintainer compiles them at release
- [ ] No version bumps or tags — releases are cut by the maintainer

## Reporting bugs / requesting features

Use the [issue templates](.github/ISSUE_TEMPLATE) — there's a bug report and a feature/example request form. A minimal reproduction (a Livewire component + Blade snippet) makes bugs far faster to fix.

Thanks again! 🙌
