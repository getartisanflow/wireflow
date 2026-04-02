---
title: Markers
description: Arrowhead markers for edges.
order: 2
---

# Markers

Markers are SVG arrowheads rendered at edge endpoints. Set `markerEnd` and `markerStart` on an edge to apply them.

## Built-in marker types

| Marker | Visual | Description |
|--------|--------|-------------|
| `'arrow'` | Open chevron | Unfilled polyline arrowhead |
| `'arrowclosed'` | Filled triangle | Closed and filled arrowhead |

## Shorthand strings

Use a string for the most common case:

```php
public array $edges = [
    [
        'id' => 'e1',
        'source' => 'a',
        'target' => 'b',
        'markerEnd' => 'arrowclosed',
    ],
    [
        'id' => 'e2',
        'source' => 'b',
        'target' => 'c',
        'markerEnd' => 'arrow',
        'markerStart' => 'arrow',
    ],
];
```

## MarkerConfig array

For full control over color and size, pass an associative array:

```php
public array $edges = [
    [
        'id' => 'e1',
        'source' => 'a',
        'target' => 'b',
        'markerEnd' => [
            'type' => 'arrowclosed',
            'color' => '#ef4444',
            'width' => 15,
            'height' => 15,
        ],
        'markerStart' => 'arrow',
    ],
];
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `string` | *(required)* | `'arrow'` or `'arrowclosed'` |
| `color` | `string` | CSS `--flow-edge-stroke` | Stroke and fill color |
| `width` | `int` | `12` | Marker width in stroke-width units |
| `height` | `int` | `12` | Marker height in stroke-width units |

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Source' } },
        { id: 'b', position: { x: 300, y: 80 }, data: { label: 'Target' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b', markerStart: 'arrow', markerEnd: 'arrowclosed' },
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

## Using both ends

Combine `markerStart` and `markerEnd` for bidirectional arrows:

```php
[
    'id' => 'e1',
    'source' => 'a',
    'target' => 'b',
    'markerStart' => 'arrow',
    'markerEnd' => [
        'type' => 'arrowclosed',
        'color' => '#3b82f6',
    ],
]
```

## Deduplication

Markers are deduplicated in SVG `<defs>` -- identical configurations (same type and color) share a single `<marker>` element regardless of how many edges use them.

## See also

- [Edge Types](types.md) -- all available edge path types
- [Edge Styling](styling.md) -- colors, stroke width, and CSS classes
- [Gradients](gradients.md) -- gradient colors along edge strokes
