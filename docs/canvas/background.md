---
title: Background
description: Dot, line, and cross grid patterns.
order: 2
---

# Background

WireFlow renders a configurable grid pattern behind the diagram. The background moves and scales with the viewport to provide spatial context while panning and zooming.

## Patterns

Set the background pattern with the `background` prop on `<x-flow>`:

```blade
<x-flow :nodes="$nodes" :edges="$edges" background="dots">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

| Value | Description |
|-------|-------------|
| `'dots'` | Dot grid (default) |
| `'lines'` | Horizontal and vertical lines |
| `'cross'` | Crosshair marks at grid intersections |
| `'none'` | No background pattern |

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 80, y: 60 }, data: { label: 'Node' } },
    ],
    edges: [],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 220px;">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <div x-flow-handle:target></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Grid spacing

Control the distance between grid points or lines with the `background-gap` prop:

```blade
<x-flow :nodes="$nodes" :edges="$edges" background="dots" :background-gap="30">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

The default gap is `20` pixels.

## CSS variable overrides

Override background styling globally through CSS variables:

| Variable | Description |
|----------|-------------|
| `--flow-bg-color` | Canvas background fill color |
| `--flow-bg-pattern-color` | Pattern element color (dots, lines, crosses) |
| `--flow-bg-pattern-gap` | Grid spacing |

```css
.flow-container {
    --flow-bg-color: #fafafa;
    --flow-bg-pattern-color: rgba(0, 0, 0, 0.06);
}
```

## Dark mode

Pattern colors auto-adjust when using the default theme's CSS variables. The theme sets appropriate values for both light and dark modes, so backgrounds remain visible without manual configuration.

To customize dark mode colors explicitly, override the CSS variables within a dark mode selector:

```css
.dark .flow-container {
    --flow-bg-color: #0f172a;
    --flow-bg-pattern-color: rgba(255, 255, 255, 0.04);
}
```

## See also

- [Viewport](viewport.md) -- pan, zoom, and viewport control
- [Controls & Actions](controls.md) -- built-in viewport buttons
- [Configuration](../configuration.md) -- theme settings
