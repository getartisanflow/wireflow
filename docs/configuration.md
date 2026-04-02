---
title: Configuration
description: WireFlow config options for theme, asset injection, and customization.
order: 10
section: Reference
---

# Configuration

## Publishing the config

```bash
php artisan vendor:publish --tag=wireflow-config
```

This creates `config/wireflow.php`.

## Options

### inject_alpineflow

```php
'inject_alpineflow' => true,
```

| Value | Behavior |
|-------|----------|
| `true` (default) | WireFlow expects AlpineFlow JS/CSS to be imported via Vite from the vendor path |
| `false` | Disables any auto-injection. Use this if you install `@getartisanflow/alpineflow` via npm and register it yourself. WireFlow Blade components still work. |

### theme

```php
'theme' => 'default',
```

| Value | CSS File | Description |
|-------|----------|-------------|
| `'default'` | `alpineflow-theme.css` | Neutral zinc/slate theme with light and dark mode |
| `'flux'` | `alpineflow-theme-flux.css` | Flux UI / Tailwind v4 native theme using `--color-accent` tokens |
| `'structural'` | — | Structural CSS only, no visual theme. Bring your own styles. |
| `'none'` | — | No CSS at all. You manage all imports manually. |

## Full config file

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Auto-inject AlpineFlow
    |--------------------------------------------------------------------------
    |
    | When true, WireFlow expects AlpineFlow JS/CSS to be imported via Vite
    | from the vendor path. Set to false if you register AlpineFlow via npm
    | yourself. WireFlow Blade components still work either way.
    |
    */
    'inject_alpineflow' => true,

    /*
    |--------------------------------------------------------------------------
    | Theme
    |--------------------------------------------------------------------------
    |
    | Which theme CSS to use: 'default' (zinc/slate), 'flux' (Tailwind v4 /
    | Flux UI native), 'structural' (layout only, no visual styling), or
    | 'none' (no CSS — you manage imports manually).
    |
    */
    'theme' => 'default',
];
```

## Passing AlpineFlow config

For AlpineFlow-specific options not exposed as `<x-flow>` props, use the `config` prop:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="[
        'connectionSnapRadius' => 30,
        'helperLines' => true,
        'preventOverlap' => 10,
        'selectionTool' => 'lasso',
    ]"
>
```

The `config` array is merged last, overriding any prop-derived values.

### Common config options

These are the most frequently used options you can pass via the `config` prop. All have sensible defaults — you only set what you need to change.

**Connections:**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `isValidConnection` | `callback` | — | Custom validator: `WireFlow::js('(conn) => conn.source !== conn.target')`. Return `false` to reject. |
| `connectOnClick` | `bool` | `true` | Click source handle, then click target handle to connect. |
| `connectionSnapRadius` | `int` | `20` | Pixel radius for snapping to nearby handles. `0` disables. |
| `connectionMode` | `string` | `'strict'` | `'strict'` = source→target only. `'loose'` = any handle to any handle. |
| `multiConnect` | `bool` | `false` | Drag from one handle creates connections from ALL selected nodes. |
| `easyConnect` | `bool` | `false` | Hold Alt and drag from node body to connect. |
| `proximityConnect` | `bool` | `false` | Auto-create edges when dragging nodes near each other. |

**Node behavior:**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `snapToGrid` | `array\|false` | `false` | Snap to grid: `[20, 20]` for 20px grid. |
| `helperLines` | `bool\|array` | `false` | Show alignment guides during drag. `true` for defaults. |
| `preventOverlap` | `bool\|int` | `false` | Prevent nodes from overlapping. Pass number for gap in px. |
| `nodeExtent` | `array` | — | Position boundaries: `[[-500, -500], [500, 500]]`. |
| `nodeDragThreshold` | `int` | `0` | Minimum px distance before drag starts. |
| `elevateNodesOnSelect` | `bool` | `true` | Selected nodes render above others. |
| `reconnectOnDelete` | `bool` | `false` | Auto-bridge connections when deleting middle nodes. |

**Selection:**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `selectionMode` | `string` | `'partial'` | `'partial'` = any overlap. `'full'` = entire node inside box. |
| `selectionOnDrag` | `bool` | `false` | Selection box on plain drag (pair with `'panOnDrag' => [2]`). |
| `selectionTool` | `string` | `'box'` | `'box'` or `'lasso'`. |

**Viewport:**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `panOnScroll` | `bool` | `false` | Scroll to pan instead of zoom. Ctrl+scroll zooms. |
| `translateExtent` | `array` | — | Pan boundaries: `[[-1000, -1000], [1000, 1000]]`. |
| `viewportCulling` | `bool` | `true` | Only render visible nodes (performance). |
| `zoomOnDoubleClick` | `bool` | `true` | Double-click to zoom in. |
| `autoPanOnNodeDrag` | `bool` | `true` | Auto-pan when dragging near canvas edge. |

**Drop zone:**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `onDrop` | `callback` | — | Handle drops from external drag sources. Return a node array to add it. |
| `onEdgeDrop` | `callback` | — | Handle connection drops on empty canvas. Return a node to auto-create. |

For the complete list of 120+ options, see the [AlpineFlow configuration reference](https://artisanflow.dev/docs/alpineflow/configuration).

## Runtime config updates

From the server, use the `WithWireFlow` trait to patch config at runtime:

```php
$this->flowPatchConfig([
    'pannable' => false,
    'zoomable' => false,
]);
```

See [WithWireFlow Trait](server/trait.md#layout--state) for details.

## Related

- [Installation](getting-started/installation.md) — importing CSS and JS
- [Components](components/_index.md) — `<x-flow>` props
- [AlpineFlow Configuration](https://artisanflow.dev/docs/alpineflow/configuration) — full config reference
