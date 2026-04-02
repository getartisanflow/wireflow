---
title: Installation
description: Install WireFlow in your Laravel application.
order: 1
---

# Installation

## Requirements

- PHP 8.3+
- Laravel 11, 12, or 13
- Livewire 3 or 4

## Install via Composer

```bash
composer require getartisanflow/wireflow
```

WireFlow auto-discovers its service provider — no manual registration needed.

## Quick setup (recommended)

Run the install command to publish config, assets, and add JS/CSS imports automatically:

```bash
php artisan wireflow:install
npm run build
```

That's it — you're ready to use `<x-flow>` in your Blade views. See [Artisan Commands](../commands.md) for details.

## Manual setup

If you prefer to set things up manually, follow the steps below.

## Import AlpineFlow in your app.js

WireFlow bundles AlpineFlow's JS and CSS in its Composer package. Import from the vendor path in your `resources/js/app.js`:

```js
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
});
```

> **Do not** import Alpine separately — Livewire bundles it. Do not call `Alpine.start()` — Livewire handles that.

## Import CSS

In your `resources/css/app.css`:

```css
/* Structural CSS (required) */
@import '../../vendor/getartisanflow/wireflow/dist/alpineflow.css';

/* Theme (pick one) */
@import '../../vendor/getartisanflow/wireflow/dist/alpineflow-theme.css';
```

Or use the Flux UI theme for Tailwind v4 / Flux apps:

```css
@import '../../vendor/getartisanflow/wireflow/dist/alpineflow.css';
@import '../../vendor/getartisanflow/wireflow/dist/alpineflow-theme-flux.css';
```

## Publish config (optional)

```bash
php artisan vendor:publish --tag=wireflow-config
```

This publishes `config/wireflow.php`. See [Configuration](../configuration.md).

## Optional addons

WireFlow bundles AlpineFlow core only. Layout engines, collaboration, and whiteboard tools are installed separately via npm. The core and addons share a global registry, so they work together regardless of how each was loaded.

### Step 1: Install the AlpineFlow npm package

```bash
npm install @getartisanflow/alpineflow
```

This gives you access to addon sub-path imports. You don't need to import core from this package — WireFlow's vendor bundle provides the core.

### Step 2: Install addon peer dependencies

Only install what you need:

```bash
npm install @dagrejs/dagre    # for dagre layout
npm install d3-force          # for force-directed layout
npm install d3-hierarchy      # for tree/cluster layout
npm install elkjs             # for ELK layout engine
npm install yjs y-websocket y-protocols  # for real-time collaboration
# whiteboard has no peer deps
```

### Step 3: Register addons in app.js

```js
// Core from WireFlow vendor bundle
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';

// Addons from npm (only import what you installed)
import AlpineFlowDagre from '@getartisanflow/alpineflow/dagre';
import AlpineFlowWhiteboard from '@getartisanflow/alpineflow/whiteboard';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
    window.Alpine.plugin(AlpineFlowDagre);
    window.Alpine.plugin(AlpineFlowWhiteboard);
});
```

### Available addons

| Addon | Import | Peer Dependency | Enables |
|-------|--------|-----------------|---------|
| Dagre layout | `@getartisanflow/alpineflow/dagre` | `@dagrejs/dagre` | `$flow.layout()` |
| Force layout | `@getartisanflow/alpineflow/force` | `d3-force` | `$flow.forceLayout()` |
| Tree layout | `@getartisanflow/alpineflow/hierarchy` | `d3-hierarchy` | `$flow.treeLayout()` |
| ELK layout | `@getartisanflow/alpineflow/elk` | `elkjs` | `$flow.elkLayout()` |
| Whiteboard | `@getartisanflow/alpineflow/whiteboard` | — | Drawing tools directives |
| Collaboration | `@getartisanflow/alpineflow/collab` | `yjs`, `y-websocket`, `y-protocols` | Real-time sync |

See the [AlpineFlow addon docs](https://artisanflow.dev/docs/alpineflow/addons) for details.
