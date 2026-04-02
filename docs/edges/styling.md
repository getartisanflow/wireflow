---
title: Edge Styling
description: Colors, classes, and status styles.
order: 6
---

# Edge Styling

Control edge appearance with inline properties or CSS classes.

## Style properties

Set these directly on the edge array:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `color` | `string` or `array` | `--flow-edge-stroke` | Stroke color or [gradient](gradients.md) |
| `strokeWidth` | `float` | `1.5` | Visible stroke width in SVG units |
| `class` | `string` | -- | CSS class(es) added to the edge element |

```php
[
    'id' => 'e1',
    'source' => 'a',
    'target' => 'b',
    'color' => '#8b5cf6',
    'strokeWidth' => 3,
    'class' => 'my-custom-edge',
]
```

## Status classes

Apply status classes via the `class` key for semantic edge coloring:

```php
public array $edges = [
    ['id' => 'e1', 'source' => 'a', 'target' => 'b', 'class' => 'flow-edge-success'],
    ['id' => 'e2', 'source' => 'b', 'target' => 'c', 'class' => 'flow-edge-warning'],
    ['id' => 'e3', 'source' => 'c', 'target' => 'd', 'class' => 'flow-edge-danger'],
    ['id' => 'e4', 'source' => 'd', 'target' => 'e', 'class' => 'flow-edge-info'],
    ['id' => 'e5', 'source' => 'e', 'target' => 'f', 'class' => 'flow-edge-primary'],
    ['id' => 'e6', 'source' => 'f', 'target' => 'g', 'class' => 'flow-edge-highlight'],
];
```

| Class | Color | Use case |
|-------|-------|----------|
| `flow-edge-success` | Green (`#10b981`) | Successful or valid connections |
| `flow-edge-warning` | Amber (`#f59e0b`) | Connections that need attention |
| `flow-edge-danger` | Red (`#ef4444`) | Error or invalid connections |
| `flow-edge-info` | Blue (`#3b82f6`) | Informational or neutral connections |
| `flow-edge-primary` | Purple (`#8b5cf6`) | Primary or highlighted connections |
| `flow-edge-highlight` | Slate (`#64748b`) | Subtle emphasis without a semantic color |

All status classes set `stroke-width: 2.5` in addition to their color.

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
        { id: 'b', position: { x: 300, y: 0 }, data: { label: 'Node B' } },
        { id: 'c', position: { x: 300, y: 120 }, data: { label: 'Node C' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b', color: '#DAA532', strokeWidth: 3 },
        { id: 'e2', source: 'a', target: 'c', color: '#8B5CF6', strokeWidth: 1 },
    ],
    background: 'dots',
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

## Combining properties

Properties can be combined freely:

```php
[
    'id' => 'e1',
    'source' => 'a',
    'target' => 'b',
    'color' => '#8b5cf6',
    'strokeWidth' => 3,
    'class' => 'my-custom-edge',
    'animated' => 'pulse',
    'markerEnd' => 'arrowclosed',
]
```

When both `color` and a status class are set, the inline `color` property takes precedence over the CSS class color.

## Example

```php
public array $nodes = [
    ['id' => 'a', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Success']],
    ['id' => 'b', 'position' => ['x' => 250, 'y' => 0], 'data' => ['label' => 'Warning']],
    ['id' => 'c', 'position' => ['x' => 500, 'y' => 0], 'data' => ['label' => 'Danger']],
    ['id' => 'd', 'position' => ['x' => 125, 'y' => 150], 'data' => ['label' => 'Info']],
    ['id' => 'e', 'position' => ['x' => 375, 'y' => 150], 'data' => ['label' => 'Primary']],
];

public array $edges = [
    ['id' => 'e1', 'source' => 'a', 'target' => 'd', 'class' => 'flow-edge-success', 'markerEnd' => 'arrowclosed'],
    ['id' => 'e2', 'source' => 'b', 'target' => 'd', 'class' => 'flow-edge-warning', 'markerEnd' => 'arrowclosed'],
    ['id' => 'e3', 'source' => 'b', 'target' => 'e', 'class' => 'flow-edge-danger', 'markerEnd' => 'arrowclosed'],
    ['id' => 'e4', 'source' => 'c', 'target' => 'e', 'class' => 'flow-edge-info', 'markerEnd' => 'arrowclosed'],
];
```

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" />
    </x-slot:node>
</x-flow>
```

## See also

- [Edge Types](types.md) -- all available edge path types
- [Gradients](gradients.md) -- gradient colors along edge strokes
- [Markers](markers.md) -- SVG arrowheads for edge endpoints
- [Animation](animation.md) -- dash, pulse, and dot animation modes
- [Labels](labels.md) -- text labels along edges
