# Changelog

## v0.2.1-alpha — 2026-04-14

### Added
- **AlpineFlow v0.2.1-alpha bundle** — includes Tier A measurement/layout lifecycle fixes, Tier B API additions (B1–B6), Tier C convenience/polish (C1–C4), D2 runState, and the workflow addon
- `flowSetNodeState(string|array $ids, string $state)` — sets `runState` on one or more nodes; auto-syncs server-side `$this->nodes` and dispatches `flow:setNodeState` to the client. Valid states: `pending`, `running`, `completed`, `failed`, `skipped`
- `flowResetStates()` — clears `runState` from all nodes; auto-syncs server-side `$this->nodes` and dispatches `flow:resetStates`
- `wireflow:install` now prompts for optional addons (workflow) via interactive multiselect. Non-interactive: `--no-interaction --with=workflow` for CI/AI agents
- Workflow addon bundle (`alpineflow-workflow.esm.js`) published alongside core — includes parallel branches, execution replay (`$flow.replayExecution()`), auto-skip, auto-reset, `$workflowRun` magic, `particleOptions`, and `.flow-edge-failed` CSS class

### Changed
- `flowAddNodes`, `flowRemoveNodes`, `flowAddEdges`, `flowRemoveEdges` now mutate server-side `$this->nodes` / `$this->edges` automatically, mirroring client-side cascade behavior. `flowRemoveNodes` cascade-removes descendants (via `parentId` chain) and connected edges. Fully backwards-compatible — components without public `$nodes`/`$edges` arrays skip the mutation and just dispatch

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
