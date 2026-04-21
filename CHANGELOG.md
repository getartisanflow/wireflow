# Changelog

## v0.2.1-alpha — 2026-04-14

### Added
- **AlpineFlow v0.2.1-alpha bundle** — includes Tier A measurement/layout lifecycle fixes, Tier B API additions (B1–B6), Tier C convenience/polish (C1–C4), D2 runState, and the workflow addon
- `flowSetNodeState(string|array $ids, string $state)` — sets `runState` on one or more nodes; auto-syncs server-side `$this->nodes` and dispatches `flow:setNodeState` to the client. Valid states: `pending`, `running`, `completed`, `failed`, `skipped`
- `flowResetStates()` — clears `runState` from all nodes; auto-syncs server-side `$this->nodes` and dispatches `flow:resetStates`
- `wireflow:install` now prompts for optional addons (workflow) via interactive multiselect. Non-interactive: `--no-interaction --with=workflow` for CI/AI agents
- Workflow addon bundle (`alpineflow-workflow.esm.js`) published alongside core — includes parallel branches, execution replay (`$flow.replayExecution()`), auto-skip, auto-reset, `$workflowRun` magic, `particleOptions`, and `.flow-edge-failed` CSS class
- `<x-flow-schema-node>` Blade component wrapping AlpineFlow's `x-flow-schema` directive. Renders database-schema-style nodes with per-row target/source handles keyed by field name. Supports an optional SSR fallback via `:label` + `:fields` props.
- `@connect-validate` event bridge — server-side async validation gate for new connections. Returns `bool` or `['allowed' => bool, 'reason' => string]`; edges only commit on allowance, with a default `flux-toast` on rejection-with-reason. Bridges to AlpineFlow's new `connectValidator` hook.

### Changed
- `flowAddNodes`, `flowRemoveNodes`, `flowAddEdges`, `flowRemoveEdges` now mutate server-side `$this->nodes` / `$this->edges` automatically, mirroring client-side cascade behavior. `flowRemoveNodes` cascade-removes descendants (via `parentId` chain) and connected edges. Fully backwards-compatible — components without public `$nodes`/`$edges` arrays skip the mutation and just dispatch

---

Schema companion — Blade wrappers + trait for the alpineflow schema addon.

### Added
- **Bundled `alpineflow-schema.esm.js`** — ships the `@getartisanflow/alpineflow/schema` subpath addon alongside the main bundle (17.8 KB raw / 4.4 KB gzip). Registers the three inspector directives plus field CRUD / `inferReferences` / `schemaToJSON` helpers on every canvas scope
- **`<x-schema-designer>`** — Blade preset. One-liner that wraps `<x-flow>` and stamps three inspector mount points. Props: `:nodes`, `:edges`, `:default-edge-type` (default `'avoidant'`), `:keyboard-connect` (default `true`), `:collapse-bidirectional-edges` (default `false`). Named slots `node-inspector`, `row-inspector`, `edge-inspector` for custom overrides; default slot passes through to the inner `<x-flow>`
- **`<x-schema-node-inspector>` / `<x-schema-row-inspector>` / `<x-schema-edge-inspector>`** — slot-overridable inspector wrappers. Each renders an `<aside>` with the matching Alpine directive (`x-schema-node-inspector`, etc.) and, when the slot is empty, stamps `<template x-schema-default-ui>` so the addon renders its minimal default UI. `:default-ui="false"` suppresses the stamp entirely
- **`WithSchemaDesigner` trait** — server-side mirror of the addon's field CRUD. Methods: `addField`, `renameField`, `removeField`, `removeNode`. Each mutates `$this->nodes` / `$this->edges` with edge cascade, validates field names via `SchemaFieldName`, and dispatches `flow:update` (add/remove) or `flow:fromObject` (rename/node-remove). Silent-fail discipline — returns `['applied' => bool, 'reason' => string]`, never throws
- **`SchemaFieldName` validator rule** — Laravel 11+ `ValidationRule`. Enforces `/^[a-z][a-z0-9_]*$/`, max 40 chars, required non-empty string. Reusable in consumer validation
- **`SchemaEdgeShape` validator rule** — validates an edge array: required `source`/`target` non-empty strings, optional `id`/`sourceHandle`/`targetHandle`/`label` are strings when present

### Docs
- `docs/components/schema-designer.md` — preset reference + examples
- `docs/components/schema-inspector.md` — three-scope inspector wrappers
- `docs/traits/with-schema-designer.md` — trait method reference, reason values, validator rule quick reference
- Installation guide updated with schema addon entry

## v0.1.2-alpha — 2026-04-03

### Fixed
- Updated bundled AlpineFlow to v0.1.2-alpha — bundle no longer requires `alpinejs` as an external dependency
- Fresh Livewire starter kits can now install WireFlow and run `npm run build` without any Vite configuration changes

## v0.1.1-alpha — 2026-04-03

### Fixed
- Updated bundled AlpineFlow to v0.1.1-alpha (widened y-websocket peer dep, picomatch security fix)

## v0.1.0-alpha — 2026-04-02

Initial alpha release.

### Features
- Blade components for AlpineFlow integration (`<x-flow>`, `<x-flow-handle>`, `<x-flow-panel>`, etc.)
- `WithWireFlow` trait for Livewire components with 50+ flow methods
- Three sync modes: static, entangled, and collab
- `WireFlow::js()` for client-side JavaScript callbacks
- Server-side connection validation via `@connect` events
- Bundled AlpineFlow assets (zero npm install required)
- Artisan install command (`php artisan wireflow:install`)
- Publishable configuration with theme support (default, flux, structural)
- Collaboration support with ReverbProvider
- 12 Blade components matching AlpineFlow directives
- Livewire 3 and 4 compatible
- Laravel 11, 12, and 13 compatible
