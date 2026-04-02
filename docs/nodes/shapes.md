---
title: Shapes
description: Built-in node shapes.
order: 2
---

# Shapes

WireFlow ships with seven built-in node shapes. Set the `shape` key on a node to apply one:

```php
public array $nodes = [
    [
        'id' => 'decision',
        'position' => ['x' => 100, 'y' => 100],
        'shape' => 'diamond',
        'data' => ['label' => 'Yes/No?'],
    ],
];
```

## Built-in shapes

| Shape | CSS class | Technique |
|-------|-----------|-----------|
| `diamond` | `.flow-node-diamond` | `clip-path` (rotated square) |
| `hexagon` | `.flow-node-hexagon` | `clip-path` (6-point polygon) |
| `parallelogram` | `.flow-node-parallelogram` | `clip-path` (skewed rectangle) |
| `triangle` | `.flow-node-triangle` | `clip-path` (3-point polygon) |
| `circle` | `.flow-node-circle` | `border-radius: 50%` |
| `cylinder` | `.flow-node-cylinder` | `clip-path` (rounded rectangle with elliptical caps) |
| `stadium` | `.flow-node-stadium` | `border-radius: 9999px` |

Nodes without a `shape` key render as standard rectangles.

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'rect', position: { x: 0, y: 0 }, data: { label: 'Rectangle' } },
        { id: 'circle', position: { x: 220, y: 0 }, shape: 'circle', data: { label: 'Circle' } },
        { id: 'stadium', position: { x: 400, y: 0 }, shape: 'stadium', data: { label: 'Stadium' } },
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

## How shapes render

Clipped shapes (diamond, hexagon, parallelogram, triangle, cylinder) use a **background-as-border** pattern. The outer element's background acts as the border color, while a `::after` pseudo-element provides the inner fill with a slightly inset clip-path.

When a node is selected, the outer background changes to the accent color, giving the appearance of a colored border following the shape outline. The inset is 2px by default (3px when selected).

## Handle positions

Each shape has **perimeter-aware handle positions** defined in CSS. Handles snap to the actual shape edge rather than the rectangular bounding box. For example, a diamond's left handle sits at the leftmost point of the diamond (the midpoint of the left edge), not at the top-left corner of the bounding box.

## Shape CSS variable

| Variable | Description |
|----------|-------------|
| `--flow-shape-border-color` | Border fill color for clipped shapes |

Override this variable to change the border appearance of all shaped nodes:

```css
.flow-container {
    --flow-shape-border-color: #64748b;
}
```

## Example

```php
public array $nodes = [
    ['id' => '1', 'position' => ['x' => 0, 'y' => 0], 'shape' => 'diamond', 'data' => ['label' => 'Diamond']],
    ['id' => '2', 'position' => ['x' => 200, 'y' => 0], 'shape' => 'hexagon', 'data' => ['label' => 'Hexagon']],
    ['id' => '3', 'position' => ['x' => 400, 'y' => 0], 'shape' => 'circle', 'data' => ['label' => 'Circle']],
    ['id' => '4', 'position' => ['x' => 600, 'y' => 0], 'shape' => 'stadium', 'data' => ['label' => 'Stadium']],
    ['id' => '5', 'position' => ['x' => 0, 'y' => 200], 'shape' => 'parallelogram', 'data' => ['label' => 'Parallelogram']],
    ['id' => '6', 'position' => ['x' => 250, 'y' => 200], 'shape' => 'triangle', 'data' => ['label' => 'Triangle']],
    ['id' => '7', 'position' => ['x' => 450, 'y' => 200], 'shape' => 'cylinder', 'data' => ['label' => 'Cylinder']],
];
```

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

## See also

- [Node Basics](basics.md) -- node data shape and flags
- [Node Styling](styling.md) -- CSS classes and theming
