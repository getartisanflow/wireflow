---
title: Themes
description: Built-in themes and custom theming.
order: 1
---

# Themes

WireFlow ships with three visual themes and a structural-only mode. The active theme is set in `config/wireflow.php`.

## Theme config

```php
// config/wireflow.php
'theme' => 'default',
```

| Value | CSS File | Description |
|-------|----------|-------------|
| `'default'` | `alpineflow-theme.css` | Neutral zinc/slate palette with light and dark mode. Works with any Laravel app. |
| `'flux'` | `alpineflow-theme-flux.css` | Flux UI / Tailwind v4 native theme. Reads `--color-accent` tokens so nodes, edges, and handles match your Flux accent color automatically. |
| `'structural'` | -- | Structural CSS only. Every `--flow-*` variable falls back to its bare-minimum default (`transparent`, `none`, etc.). Use this as a blank canvas for a fully custom theme. |
| `'none'` | -- | No CSS at all. You manage all imports manually in your `app.css`. |

### What each theme provides

**Default** -- Sets background colors, border colors, shadows, handle styles, edge colors, and selection accents using a zinc/slate neutral scale. Includes `.dark` overrides for all variables.

**Flux** -- Inherits Flux UI's `--color-accent-*` CSS custom properties. Interactive states (selected borders, handle hover, edge selection) automatically match whatever accent color you configure in Flux. Dark mode uses Flux's built-in `.dark` class convention.

**Structural** -- Provides only layout and positioning rules (z-index layers, handle placement, resize grip behavior). Every visual property uses its fallback default from the structural CSS. This is the starting point when you want to theme from scratch.

## Switching themes

Change the `theme` value in `config/wireflow.php` and rebuild:

```bash
npm run build
```

The install command also accepts a theme:

```bash
php artisan wireflow:install --theme=flux
npm run build
```

## Structural-only mode for custom themes

Set `'theme' => 'structural'` and create your own theme file:

```css
/* resources/css/my-flow-theme.css */
.flow-container {
    --flow-bg-color: #fafaf9;
    --flow-node-bg: #ffffff;
    --flow-node-border: 1px solid #d6d3d1;
    --flow-node-border-radius: 8px;
    --flow-node-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    --flow-node-padding: 12px 16px;
    --flow-handle-bg: #a8a29e;
    --flow-handle-border: 2px solid #ffffff;
    --flow-edge-stroke: #a8a29e;
}

.flow-container.dark {
    --flow-bg-color: #1c1917;
    --flow-node-bg: #292524;
    --flow-node-border: 1px solid #44403c;
    --flow-node-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    --flow-handle-bg: #78716c;
    --flow-edge-stroke: #78716c;
}
```

Import it in your `resources/css/app.css`:

```css
@import '../../vendor/getartisanflow/wireflow/dist/alpineflow.css';
@import './my-flow-theme.css';
```

## Quick brand override

To match your brand without building a full theme, override these 15 accent-related variables. Everything else derives from the neutral scale and stays consistent.

```css
.flow-container {
    /* Interactive states (selection, hover, focus) */
    --flow-node-hover-border-color: #7c3aed;
    --flow-node-selected-border-color: #7c3aed;
    --flow-node-selected-shadow: 0 0 0 1px #7c3aed;
    --flow-node-focus-outline: 2px solid #7c3aed;

    /* Handles */
    --flow-handle-hover-bg: #7c3aed;
    --flow-handle-active-bg: #7c3aed;

    /* Edges */
    --flow-edge-stroke-selected: #7c3aed;
    --flow-edge-dot-fill: #7c3aed;
    --flow-edge-focus-stroke: #7c3aed;

    /* Selection box & lasso */
    --flow-selection-bg: rgba(124, 58, 237, 0.06);
    --flow-selection-border: 1px solid rgba(124, 58, 237, 0.3);
    --flow-lasso-stroke: rgba(124, 58, 237, 0.5);

    /* Resize handles */
    --flow-resizer-border: 1px solid #7c3aed;
    --flow-resizer-hover-bg: #7c3aed;

    /* Accent stripe (top border on nodes) */
    --flow-node-border-top: 2.5px solid #a78bfa;
}
```

Replace `#7c3aed` / `#a78bfa` with your brand color and its lighter variant.

### Inline override in Blade

Apply per-component overrides directly on `<x-flow>`:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    style="--flow-node-selected-border-color: #059669; --flow-edge-stroke-selected: #059669;"
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

## Accent stripe

The `--flow-node-border-top` variable adds a colored stripe to the top of every node. The default theme uses a blue accent (`#93c5fd`). Set it to `var(--flow-node-border)` to remove the stripe:

```css
.flow-container {
    --flow-node-border-top: var(--flow-node-border);
}
```

Or use different colors per node type with CSS classes:

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

```css
.flow-node.success-node {
    --flow-node-border-top: 2.5px solid #22c55e;
}
.flow-node.warning-node {
    --flow-node-border-top: 2.5px solid #f59e0b;
}
.flow-node.error-node {
    --flow-node-border-top: 2.5px solid #ef4444;
}
```

Assign the class in your node data:

```php
$this->nodes = [
    ['id' => '1', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Start'], 'class' => 'success-node'],
    ['id' => '2', 'position' => ['x' => 200, 'y' => 0], 'data' => ['label' => 'Review'], 'class' => 'warning-node'],
    ['id' => '3', 'position' => ['x' => 400, 'y' => 0], 'data' => ['label' => 'Failed'], 'class' => 'error-node'],
];
```


## Related

- [CSS Variables](css-variables.md) -- full variable reference
- [Dark Mode](dark-mode.md) -- class-based dark mode
- [Configuration](../configuration.md) -- `wireflow.php` config
