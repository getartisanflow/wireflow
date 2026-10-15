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

### translations

```php
'translations' => env('WIREFLOW_TRANSLATIONS', true),
```

| Value | Behavior |
|-------|----------|
| `true` (default) | Every `<x-flow>` passes the `wireflow::canvas` messages for `app()->getLocale()` and the locale itself to AlpineFlow, so built-in canvas text follows the app locale. See [Translations](#translations). |
| `false` | Canvases stay in English unless you pass `:translations` or `locale` explicitly. The rendered canvas is identical to WireFlow before translations existed. |

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

    /*
    |--------------------------------------------------------------------------
    | Translate Canvases
    |--------------------------------------------------------------------------
    |
    | When enabled, every <x-flow> passes the 'wireflow::canvas' messages for
    | the app locale and the locale itself to AlpineFlow. Set to false to
    | leave canvases in English unless a :translations or locale prop is
    | passed explicitly.
    |
    */
    'translations' => env('WIREFLOW_TRANSLATIONS', true),
];
```

## Passing AlpineFlow config

The [`<x-flow>`](components/flow.md) component promotes the most common options to named props. For everything else, use the `config` prop:

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

## Translations

Canvases follow your app's locale with no setup. `<x-flow>` passes the `wireflow::canvas` messages for `app()->getLocale()` to AlpineFlow together with the locale, so the built-in canvas text (control tooltips, loading text, accessible names and screen reader announcements) renders in the user's language. WireFlow ships English and German. For a locale without a catalog, Laravel falls back to your `app.fallback_locale`.

The workflow components ([`<x-flow-run-button>`](components/flow-run-button.md), [`<x-flow-stop-button>`](components/flow-stop-button.md), [`<x-flow-reset-button>`](components/flow-reset-button.md), [`<x-flow-replay-controls>`](components/flow-replay-controls.md) and [`<x-flow-execution-log>`](components/flow-execution-log.md)) translate their default text through `wireflow::components` with `__()`.

### Turning it off

```dotenv
WIREFLOW_TRANSLATIONS=false
```

Or set `'translations' => false` in `config/wireflow.php`. Canvases then stay in English unless you pass `:translations` or `locale` yourself. The flag only controls what `<x-flow>` passes to AlpineFlow. The workflow components always go through `__()`, and in an English app their text is the same as before.

### Overriding messages

Publish the language files:

```bash
php artisan vendor:publish --tag=wireflow-lang
```

This copies `canvas.php` and `components.php` for each shipped locale to `lang/vendor/wireflow/{locale}/`. Laravel merges your files over WireFlow's key by key, so keep only the keys you change and delete the rest. You then keep receiving new and corrected messages when you upgrade.

```php
// lang/vendor/wireflow/de/canvas.php
return [
    'controls.zoomIn' => 'Näher heran',
];
```

To add a language WireFlow doesn't ship, create `lang/vendor/wireflow/{locale}/canvas.php` (and `components.php` if you use the workflow components) with the keys you need. Missing canvas keys fall back to English in the browser; missing component keys fall back to `app.fallback_locale`.

Keys are flat dotted strings in both files, in the same style as AlpineFlow (`controls.zoomIn`, `runButton.idle`). WireFlow's `lang/en/canvas.php` lists every engine message, and the [AlpineFlow docs](https://artisanflow.dev/docs/alpineflow/configuration/canvas#translations) describe what each key prefix covers.

### Per-canvas translations and locale

Pass `:translations` and `locale` to one canvas:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :translations="['controls.zoomIn' => 'Näher heran']"
    locale="de"
/>
```

An explicit `:translations` replaces the app-locale catalog for that canvas, and keys you leave out fall back to English. To change one key and keep the rest of the locale's messages, spread the catalog first: `:translations="[...trans('wireflow::canvas'), 'controls.zoomIn' => 'Näher heran']"`. Both props work even when `wireflow.translations` is off.

The [`config` passthrough](#passing-alpineflow-config) wins over both props: `:config="['locale' => 'de-CH']"`.

The locale is passed as Laravel spells it (`pt_BR`). AlpineFlow normalises it to a BCP 47 tag (`pt-BR`) to pick plural forms.

### Switching locale in a Livewire session

Messages are resolved once, when the canvas is created, and aren't reactive. `<x-flow>` also carries `wire:ignore` by default, so a locale change during a Livewire request doesn't reach a canvas that is already on the page. Key the canvas by locale so Livewire replaces it:

```blade
<x-flow wire:key="flow-{{ app()->getLocale() }}" :nodes="$nodes" :edges="$edges" />
```

### Plurals

Engine messages that carry a `:count` exist once per CLDR plural category: `announce.nodesSelected_one` and `announce.nodesSelected_other`, plus `_zero`, `_two`, `_few` or `_many` for languages that need them. AlpineFlow picks the form in the browser with `Intl.PluralRules` for the canvas locale. Don't use Laravel's `|` plural syntax in these files. `trans_choice()` doesn't apply to them.

### Contributing a language

- **Engine messages** (`canvas.php`) are generated from AlpineFlow's `locales/*.json` when WireFlow resyncs its bundled engine. Don't edit them in WireFlow; add or fix the language in AlpineFlow instead (see [Adding a language](https://github.com/getartisanflow/alpineflow/blob/main/CONTRIBUTING.md#adding-a-language)). The next WireFlow release picks it up.
- **WireFlow component text** (`components.php`) lives in this repository. Copy `lang/en/components.php` to `lang/{locale}/components.php` and translate the values. A test checks that every key exists in English and keeps English's placeholders.

## Related

- [Installation](getting-started/installation.md) — importing CSS and JS
- [x-flow component](components/flow.md) — full props reference
- [AlpineFlow Configuration](https://artisanflow.dev/docs/alpineflow/configuration) — full config reference
- [AlpineFlow Translations](https://artisanflow.dev/docs/alpineflow/configuration/canvas#translations) — message keys, plural forms, `$flow.t()`
