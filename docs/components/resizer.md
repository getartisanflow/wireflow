---
title: x-flow-resizer
description: Add resize handles to nodes.
order: 6
---

# x-flow-resizer

Adds interactive resize handles to a node's edges and corners. Users can drag to change the node's dimensions. The resizer automatically updates the node's `dimensions` property and repositions connected edges.

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 20, y: 30 }, data: { label: 'Resize me' }, dimensions: { width: 160, height: 60 } },
        { id: 'b', position: { x: 280, y: 30 }, data: { label: 'Connected' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
    ],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 200px;">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <div x-flow-resizer="{ minWidth: 100, minHeight: 40 }"></div>
                <div x-flow-handle:target.left></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source.right></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min-width` | `int` | `null` | Minimum width in pixels |
| `min-height` | `int` | `null` | Minimum height in pixels |

## Usage

Place `<x-flow-resizer>` inside your node template:

```blade
<x-slot:node>
    <span x-text="node.data.label"></span>
    <x-flow-resizer :min-width="120" :min-height="60" />
</x-slot:node>
```

### No constraints

Without min values, nodes can be resized freely:

```blade
<x-flow-resizer />
```

### Per-node control

Use the `resizable` flag on individual nodes to opt out:

```php
public array $nodes = [
    ['id' => 'a', 'position' => [...], 'data' => [...], 'resizable' => true],
    ['id' => 'b', 'position' => [...], 'data' => [...], 'resizable' => false],
];
```

The resizer component only activates on nodes where `resizable` is not `false`.

## Reading Dimensions

Access the current dimensions in your template via `node.dimensions`:

```blade
<x-slot:node>
    <x-flow-resizer :min-width="100" :min-height="50" />
    <span x-text="node.data.label"></span>
    <div class="text-xs opacity-50" x-text="node.dimensions?.width + ' x ' + node.dimensions?.height"></div>
</x-slot:node>
```

## Server Events

When a node is resized, these events fire on your Livewire component:

```php
public function onNodeResizeStart(string $nodeId, array $dimensions): void
{
    // $dimensions = ['width' => float, 'height' => float]
}

public function onNodeResizeEnd(string $nodeId, array $dimensions): void
{
    // Persist the new dimensions
}
```

## Directive Mapping

Maps to: `x-flow-resizer="{'minWidth': 100, 'minHeight': 50}"`

## See also

- [Resizable Nodes](../nodes/resize.md) -- full resize feature documentation
- [Node Basics](../nodes/basics.md) -- node configuration
