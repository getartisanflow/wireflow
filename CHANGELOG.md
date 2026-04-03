# Changelog

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
