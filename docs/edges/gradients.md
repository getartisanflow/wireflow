---
title: Gradients
description: Gradient colors along edges.
order: 4
---

# Gradients

Set `color` to an associative array with `from` and `to` keys for a two-color linear gradient along the edge stroke.

## PHP syntax

```php
public array $edges = [
    [
        'id' => 'e1',
        'source' => 'a',
        'target' => 'b',
        'color' => ['from' => '#22c55e', 'to' => '#ef4444'],
    ],
];
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Source' } },
        { id: 'b', position: { x: 300, y: 100 }, data: { label: 'Target' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b', color: { from: '#DAA532', to: '#8B5CF6' }, strokeWidth: 2 },
    ],
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

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `color` | `string` or `array` | CSS variable | A solid color string (e.g., `'#64748b'`) or a gradient array (`['from' => '...', 'to' => '...']`). |
| `gradientDirection` | `string` | `'source-target'` | Which end gets the `from` color. `'source-target'` or `'target-source'`. |

## Reversing direction

Set `gradientDirection` to reverse which end gets which color:

```php
[
    'id' => 'e1',
    'source' => 'a',
    'target' => 'b',
    'color' => ['from' => '#3b82f6', 'to' => '#8b5cf6'],
    'gradientDirection' => 'target-source',
]
```

## How it works

The gradient is implemented as an SVG `<linearGradient>` in `userSpaceOnUse` coordinates, updated reactively as nodes move. Each unique gradient pair produces its own `<linearGradient>` element in SVG `<defs>`.

## Example

```php
public array $nodes = [
    ['id' => 'a', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Start']],
    ['id' => 'b', 'position' => ['x' => 300, 'y' => 0], 'data' => ['label' => 'End']],
    ['id' => 'c', 'position' => ['x' => 150, 'y' => 150], 'data' => ['label' => 'Middle']],
];

public array $edges = [
    ['id' => 'e1', 'source' => 'a', 'target' => 'b', 'color' => ['from' => '#22c55e', 'to' => '#ef4444']],
    ['id' => 'e2', 'source' => 'a', 'target' => 'c', 'color' => ['from' => '#3b82f6', 'to' => '#8b5cf6']],
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
- [Edge Styling](styling.md) -- colors, stroke width, and CSS classes
- [Markers](markers.md) -- marker colors can complement gradient edges
