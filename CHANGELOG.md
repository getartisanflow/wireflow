# Changelog

## v0.2.1-alpha — 2026-04-14

> Companion release: [AlpineFlow v0.2.1-alpha](https://github.com/getartisanflow/alpineflow/blob/main/CHANGELOG.md#v021-alpha--2026-04-14) ships the underlying Tier A/B/C core polish, D2 runState, workflow addon, and schema addon that this release bundles and wraps.

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

---

Polish — flow component + schema-designer preset.

### Added
- **`fullscreenTarget` prop on `<x-flow>` and `<x-schema-designer>`** — forwards to alpineflow's new canvas config. Accepts a CSS selector string, or use `WireFlow::js('...')` to pass an HTMLElement resolver function. (`d072451`)
- **`<x-schema-designer>` forwards every `<x-flow>` prop + `$node` slot** — the preset now exposes all 25 `<x-flow>` constructor props plus two schema-specific additions (`keyboardConnect`, `collapseBidirectionalEdges`) and overrides `defaultEdgeType` default to `'avoidant'`. The `$node` named slot is forwarded into `<x-flow>`'s node template. Previously only 5 props were exposed, making the preset unusable for rich integrations. (`159068d`)
- **Wire event attribute forwarding on `<x-schema-designer>`** — attributes like `@connect-validate`, `@node-click`, `wire:*`, `x-on:*` on the preset now forward to the inner `<x-flow>` (where the wireflow event bridge lives). HTML attrs like `class` / `id` / `data-*` / `style` stay on the outer wrapper. (`3d5e8d1`)

### Fixed
- **`<x-flow>` class attribute merging** — template now uses `{{ $attributes->class(['flow-container']) }}` instead of a static `class="flow-container"` followed by `{{ $attributes }}`. Consumer `class="h-full w-full"` passes now correctly merge with `flow-container` instead of being silently dropped due to duplicate `class=` attributes. (`cd68d31`)

---

Schema addon Phase A+B companion.

### Added
- **`<x-schema-field>` Blade primitive** — composable row component for consumers writing custom `<x-slot:node>` templates. Renders a `.flow-schema-row` with target/source handles, mirror handles, row-select wiring, and PK/FK/required class bindings via Alpine `:class`. Reads `node` + `field` from the surrounding Alpine scope. Consumer-supplied slot content replaces the default body (icon/name/type) while handles always stamp. (`aafab49`)
- **Dist resync** — bundled `alpineflow.bundle.esm.js` and `alpineflow-schema.esm.js` now include all Phase A+B surface (`validateSchema`, `diffSchemas`, `toDot`, `schemaLayout`, `attachSchemaHistory`, `rowsReorderable`, keyboard field navigation).

---

Follow-up fixes — containerHeight prop.

### Added
- **`containerHeight` prop on `<x-flow>` and `<x-schema-designer>`** — forwards to alpineflow's new canvas config. Accepts `'auto'`, `'fill'`, a number, or a CSS length string. Useful when the canvas is nested in a layout that drives its own height (flex row, dashboard panel, fullscreen wrapper). (`7747b71`)

---

Workflow addon foundations — `<x-flow-wait>` Blade primitive + docs reorg.

### Added
- **`<x-flow-wait>` Blade component** — wraps AlpineFlow's `x-flow-wait` directive. Renders a wait node (header + formatted duration + top/bottom handles) inside `<x-flow>` slots, with an optional SSR fallback when `:label` and `:duration-ms` are passed for standalone previews. Includes a static `FlowWait::formatDuration(int $ms)` helper that mirrors the JS formatter. Registered as `<x-flow-wait>` in the service provider.
- `docs/addons/schema.md` — consolidated WireFlow schema-addon page cross-linking components, trait, validators, and the wire bridge.
- `docs/addons/workflow.md` — consolidated WireFlow workflow-addon page covering install, components, server trait methods, wire bridge events, `validateWorkflow()` reference, and a quick-start.
- `docs/components/flow-wait.md` — component reference for `<x-flow-wait>`.

### Changed
- `docs/addons/_index.md` lists schema + workflow alongside the existing addons.
- `docs/components/_index.md` groups components by area (core / schema / workflow) and includes the new `<x-flow-wait>` entry.
- **Dist resync** — bundled `alpineflow.bundle.esm.js`, `alpineflow-workflow.esm.js`, `alpineflow.css`, and `alpineflow-theme.css` now include `validateWorkflow()`, the `x-flow-wait` directive, and the `.flow-wait-node` CSS.

---

Workflow addon UI primitives — condition node + replay controls + execution log + run/stop/reset trio.

### Added
- `<x-flow-condition-node>` Blade wrapper — emits `x-flow-condition` directive with optional SSR fallback when `:label` / `:condition` / `:direction` / `:evaluate-label` are passed. Static `FlowConditionNode::prettyPrintCondition()` helper mirrors the JS pretty-printer so SSR matches runtime output.
- `<x-flow-replay-controls>` — duck-typed playback toolbar around the addon's replay handles. Auto-binds to `$flow.lastReplayHandle` or lazy-builds `$flow.replayExecution($flow.executionLog)`. Renders Play/Pause/Restart/Speed always; adds an interactive scrubber + time when the handle exposes `scrubTo`/`currentTime`/`duration`, otherwise a non-interactive progress bar derived from log timestamps. Props: `:handle`, `:target`, `:speeds` (default `[0.5, 1, 2, 4]`).
- `<x-flow-execution-log>` — dense reactive event viewer. Filter dropdown (`all` / `errors` / `lifecycle`), auto-scroll-while-running with manual override, click-to-highlight via `flow:highlight-node` CustomEvent dispatch. **XSS-safe by construction**: structured per-type templates render every dynamic field via `x-text` on a discrete element. Test asserts no `x-html` in output. Props: `:source`, `:target`, `:filter`, `:max-events` (default 500).
- `<x-flow-run-button>`, `<x-flow-stop-button>`, `<x-flow-reset-button>` — workflow control trio. All accept `:target` for page-level placement; run-button reads handlers from canvas `$el.runHandlers` (overrideable via `:handlers-key`). Run-button auto-disables during runs. Stop-button hidden by default when idle (override via `:always-visible`). Reset-button always enabled.
- All six new components support both in-canvas (panel slot) and page-level (`:target`) placement, mirroring the schema-inspector pattern.

### Docs
- New pages under `docs/components/` for each of the six components.
- `docs/components/_index.md` updated to list the six new components under the Workflow addon group.
- `docs/addons/workflow.md` extended with cross-links to each component.

### Changed
- Dist resync with alpineflow workflow-addon UI primitives — bundles `x-flow-condition` directive registration, the five Alpine.data factories, and the matching CSS.

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
