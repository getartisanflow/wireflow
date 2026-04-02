---
title: Minimap
description: Overview panel with viewport indicator.
order: 4
---

# Minimap

The minimap renders a scaled-down overview of the entire diagram in a corner of the canvas. A viewport indicator rectangle shows which portion of the diagram is currently visible.

## Enabling

Enable the minimap with the `minimap` prop on `<x-flow>`:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :minimap="true">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Start' } },
        { id: 'b', position: { x: 250, y: 0 }, data: { label: 'Process' } },
        { id: 'c', position: { x: 500, y: 0 }, data: { label: 'End' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'c' },
    ],
    background: 'dots',
    minimap: true,
    minimapPannable: true,
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 250px;">
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

## Position

Control placement via `:config`:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :minimap="true" :config="[
    'minimapPosition' => 'bottom-right',
]">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

Supported positions: `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'` (default).

## Interaction

The minimap supports panning and zooming interactions, both disabled by default:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :minimap="true" :config="[
    'minimapPannable' => true,
    'minimapZoomable' => true,
]">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

| Config key | Type | Default | Description |
|------------|------|---------|-------------|
| `minimapPannable` | `bool` | `false` | Click or drag on the minimap to pan the main viewport |
| `minimapZoomable` | `bool` | `false` | Scroll over the minimap to zoom the main viewport |

## Node colors

Use `minimapNodeColor` to control how nodes appear in the minimap. Pass a static color string:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :minimap="true" :config="[
    'minimapNodeColor' => '#6366f1',
]">
```

For per-node colors based on type, use `WireFlow::js()`:

```php
use ArtisanFlow\WireFlow\View\Components\WireFlow;

public function render(): \Illuminate\Contracts\View\View
{
    return view('livewire.flow-editor', [
        'config' => [
            'minimapNodeColor' => WireFlow::js("(node) => {
                if (node.type === 'input') return '#22c55e';
                if (node.type === 'output') return '#ef4444';
                return '#6366f1';
            }"),
        ],
    ]);
}
```

```blade
<x-flow :nodes="$nodes" :edges="$edges" :minimap="true" :config="$config">
```

## Viewport mask color

The `minimapMaskColor` option sets the color of the area outside the current viewport indicator:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :minimap="true" :config="[
    'minimapMaskColor' => 'rgba(0, 0, 0, 0.15)',
]">
```

## CSS variables

Fine-tune minimap appearance with CSS variables:

| Variable | Description |
|----------|-------------|
| `--flow-minimap-bg` | Minimap background color |
| `--flow-minimap-border` | Border around the minimap panel |
| `--flow-minimap-node-color` | Default node fill color |
| `--flow-minimap-mask-color` | Viewport mask overlay color |
| `--flow-minimap-border-radius` | Corner rounding of the minimap panel |

## See also

- [Viewport](viewport.md) -- pan, zoom, and viewport control
- [Background](background.md) -- grid patterns
- [Controls & Actions](controls.md) -- built-in viewport buttons
