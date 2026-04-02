---
title: Labels
description: Text labels on edges.
order: 3
---

# Labels

Edges support three label positions. Labels are rendered as HTML elements, so they support full styling.

## Label positions

| Property | Position | Description |
|----------|----------|-------------|
| `label` | Center of the path | Main label, placed at the midpoint |
| `labelStart` | Near the source end | Label offset from the source node |
| `labelEnd` | Near the target end | Label offset from the target node |

```php
public array $edges = [
    [
        'id' => 'e1',
        'source' => 'a',
        'target' => 'b',
        'label' => 'main',
        'labelStart' => '1',
        'labelEnd' => '*',
    ],
];
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Source' } },
        { id: 'b', position: { x: 330, y: 120 }, data: { label: 'Target' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b', label: 'center', labelStart: 'start', labelEnd: 'end' },
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

## Label visibility

Control when labels appear with `labelVisibility`:

| Value | Behavior |
|-------|----------|
| `'always'` | Always visible (default) |
| `'hover'` | Visible on hover or when the edge is selected |
| `'selected'` | Visible only when the edge is selected |

```php
public array $edges = [
    [
        'id' => 'e1',
        'source' => 'a',
        'target' => 'b',
        'label' => 'Hover to see',
        'labelVisibility' => 'hover',
    ],
    [
        'id' => 'e2',
        'source' => 'b',
        'target' => 'c',
        'label' => 'Select to see',
        'labelVisibility' => 'selected',
    ],
    [
        'id' => 'e3',
        'source' => 'c',
        'target' => 'd',
        'label' => 'Always visible',
        'labelVisibility' => 'always',
    ],
];
```

## Example

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
- [Markers](markers.md) -- SVG arrowheads for edge endpoints
