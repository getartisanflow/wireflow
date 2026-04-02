---
title: Edge Animation
description: Dash, pulse, and dot animation modes.
order: 5
---

# Edge Animation

Enable edge animation with the `animated` property on an edge.

## Animation modes

| Value | CSS class | Visual |
|-------|-----------|--------|
| `true` / `'dash'` | `.flow-edge-animated` | Scrolling dash pattern along the edge stroke |
| `'pulse'` | `.flow-edge-pulse` | Opacity breathing effect |
| `'dot'` | `.flow-edge-dot` | A circle element traveling along the path from source to target |

## Usage

Set `animated` in your PHP edge data:

```php
public array $edges = [
    [
        'id' => 'e1',
        'source' => 'a',
        'target' => 'b',
        'animated' => true,             // Scrolling dashes (default animation)
    ],
    [
        'id' => 'e2',
        'source' => 'b',
        'target' => 'c',
        'animated' => 'pulse',          // Opacity breathing effect
    ],
    [
        'id' => 'e3',
        'source' => 'c',
        'target' => 'd',
        'animated' => 'dot',            // Traveling dot particle
    ],
];
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a1', position: { x: 0, y: 0 }, data: { label: 'Dash' } },
        { id: 'a2', position: { x: 85, y: 130 }, data: { label: 'Dash' } },
        { id: 'b1', position: { x: 220, y: 0 }, data: { label: 'Pulse' } },
        { id: 'b2', position: { x: 305, y: 130 }, data: { label: 'Pulse' } },
        { id: 'c1', position: { x: 440, y: 0 }, data: { label: 'Dot' } },
        { id: 'c2', position: { x: 525, y: 130 }, data: { label: 'Dot' } },
    ],
    edges: [
        { id: 'e1', source: 'a1', target: 'a2', animated: true },
        { id: 'e2', source: 'b1', target: 'b2', animated: 'pulse' },
        { id: 'e3', source: 'c1', target: 'c2', animated: 'dot' },
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

## Timing overrides

Fine-tune animation behavior with additional properties on the edge array:

| Property | Type | Applies to | Description |
|----------|------|------------|-------------|
| `animationDuration` | `string` | All modes | CSS time value (e.g. `'1s'`, `'300ms'`). Overrides the mode's default duration. |
| `particleColor` | `string` | `'dot'` | Fill color of the traveling dot. |
| `particleSize` | `int` | `'dot'` | Circle radius in SVG units. |

```php
[
    'id' => 'e1',
    'source' => 'a',
    'target' => 'b',
    'animated' => 'dot',
    'animationDuration' => '2s',
    'particleColor' => '#22c55e',
    'particleSize' => 6,
]
```

## CSS variables

Override these variables on `.flow-container` for global animation control:

| Variable | Description |
|----------|-------------|
| `--flow-edge-animated-duration` | Duration of the dash scroll animation |
| `--flow-edge-animated-dasharray` | Dash pattern for the dash animation |
| `--flow-edge-pulse-duration` | Duration of the pulse breathing cycle |
| `--flow-edge-pulse-min-opacity` | Minimum opacity during pulse animation |
| `--flow-edge-dot-duration` | Duration for the dot to travel the full path |
| `--flow-edge-dot-size` | Circle radius for the dot animation |
| `--flow-edge-dot-fill` | Fill color for the dot animation |

## Example

```php
public array $nodes = [
    ['id' => 'a', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Dash']],
    ['id' => 'b', 'position' => ['x' => 250, 'y' => 0], 'data' => ['label' => 'Pulse']],
    ['id' => 'c', 'position' => ['x' => 500, 'y' => 0], 'data' => ['label' => 'Dot']],
    ['id' => 'd', 'position' => ['x' => 250, 'y' => 150], 'data' => ['label' => 'Target']],
];

public array $edges = [
    ['id' => 'e1', 'source' => 'a', 'target' => 'd', 'animated' => true],
    ['id' => 'e2', 'source' => 'b', 'target' => 'd', 'animated' => 'pulse'],
    ['id' => 'e3', 'source' => 'c', 'target' => 'd', 'animated' => 'dot', 'particleColor' => '#3b82f6'],
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
