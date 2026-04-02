---
title: Edge Types
description: Built-in edge path types.
order: 1
---

# Edge Types

Edges are the connections between nodes. WireFlow provides seven built-in edge types, each using a different path algorithm.

## Edge data shape

Every edge is a PHP associative array:

```php
public array $edges = [
    [
        'id' => 'e1',                    // Required. Unique string ID.
        'source' => 'step-1',           // Required. Source node ID.
        'target' => 'step-2',           // Required. Target node ID.
        'sourceHandle' => null,          // Optional. Source handle ID (for multiple handles).
        'targetHandle' => null,          // Optional. Target handle ID.
        'type' => 'bezier',             // Optional. Edge path type (see table below).
        'label' => 'connects to',       // Optional. Center label text.
        'color' => '#64748b',            // Optional. Stroke color or gradient array.
        'animated' => false,             // Optional. true/'dash', 'pulse', or 'dot'.
        'markerEnd' => 'arrowclosed',   // Optional. 'arrow' (open) or 'arrowclosed' (filled).
        'markerStart' => null,           // Optional. Same options as markerEnd.
        'strokeWidth' => 1.5,            // Optional. Stroke width.
        'deletable' => true,             // Optional. Can be deleted via keyboard.
        'hidden' => false,               // Optional. Hide from rendering.
        'class' => 'my-edge',           // Optional. CSS class(es) on the edge element.
    ],
];
```

## Built-in types

Set the `type` key on an edge to choose a path algorithm:

| Type | Description | When to use |
|------|-------------|-------------|
| `'bezier'` | Smooth cubic bezier curve (default). | General-purpose connections. |
| `'smoothstep'` | Right-angle segments with rounded corners. | Flowcharts and structured diagrams. |
| `'step'` | Right-angle segments with sharp corners. | Compact structured layouts. |
| `'straight'` | Direct line from source to target. | Simple, minimal layouts. |
| `'orthogonal'` | Right-angle routing that avoids crossing other nodes. | Dense diagrams where edges must not cross nodes. |
| `'avoidant'` | Smooth curves routed around obstacle nodes. | Same as orthogonal, but with smoother curves. |
| `'editable'` | User-controlled waypoints. Double-click to add/remove points. | When users need to manually shape edge paths. |

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a1', position: { x: 0, y: 0 }, data: { label: 'Bezier' } },
        { id: 'a2', position: { x: 85, y: 130 }, data: { label: 'Bezier' } },
        { id: 'b1', position: { x: 220, y: 0 }, data: { label: 'Smoothstep' } },
        { id: 'b2', position: { x: 305, y: 130 }, data: { label: 'Smoothstep' } },
        { id: 'c1', position: { x: 440, y: 0 }, data: { label: 'Straight' } },
        { id: 'c2', position: { x: 525, y: 130 }, data: { label: 'Straight' } },
    ],
    edges: [
        { id: 'e1', source: 'a1', target: 'a2', type: 'bezier' },
        { id: 'e2', source: 'b1', target: 'b2', type: 'smoothstep' },
        { id: 'e3', source: 'c1', target: 'c2', type: 'straight' },
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

## Setting the default edge type

Use the `default-edge-type` prop on `<x-flow>` to change the default for all edges:

```blade
<x-flow :nodes="$nodes" :edges="$edges" default-edge-type="smoothstep">
    <x-slot:node>
        <x-flow-handle type="target" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" />
    </x-slot:node>
</x-flow>
```

Individual edges can still override the default by setting their own `type`.

## Floating edges

Set `'type' => 'floating'` so endpoints are computed dynamically from node borders instead of fixed handle positions:

```php
public array $edges = [
    [
        'id' => 'e1',
        'source' => 'a',
        'target' => 'b',
        'type' => 'floating',
        'pathType' => 'smoothstep',
    ],
];
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pathType` | `string` | `'bezier'` | `'bezier'`, `'smoothstep'`, or `'straight'` -- which path generator to use for the floating edge. |

Floating edges find the intersection of the center-to-center line with each node's boundary. As nodes move, connection points slide along the border automatically.

## Example

```php
public array $nodes = [
    ['id' => 'a', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Bezier']],
    ['id' => 'b', 'position' => ['x' => 250, 'y' => 0], 'data' => ['label' => 'Smoothstep']],
    ['id' => 'c', 'position' => ['x' => 500, 'y' => 0], 'data' => ['label' => 'Straight']],
    ['id' => 'd', 'position' => ['x' => 125, 'y' => 150], 'data' => ['label' => 'Step']],
    ['id' => 'e', 'position' => ['x' => 375, 'y' => 150], 'data' => ['label' => 'Orthogonal']],
];

public array $edges = [
    ['id' => 'e1', 'source' => 'a', 'target' => 'd', 'type' => 'bezier'],
    ['id' => 'e2', 'source' => 'b', 'target' => 'd', 'type' => 'smoothstep'],
    ['id' => 'e3', 'source' => 'b', 'target' => 'e', 'type' => 'straight'],
    ['id' => 'e4', 'source' => 'c', 'target' => 'e', 'type' => 'step'],
];
```

## See also

- [Markers](markers.md) -- SVG arrowheads for edge endpoints
- [Labels](labels.md) -- text labels along edges
- [Gradients](gradients.md) -- gradient colors along edge strokes
- [Animation](animation.md) -- dash, pulse, and dot animation modes
- [Edge Styling](styling.md) -- colors, stroke width, CSS classes
