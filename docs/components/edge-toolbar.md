---
title: x-flow-edge-toolbar
description: Floating toolbar along an edge path.
order: 11
---

# x-flow-edge-toolbar

A floating toolbar that positions itself along an edge path. Useful for adding action buttons or labels directly on edges.

Click an edge to see its toolbar appear:

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 20, y: 50 }, data: { label: 'Source' } },
        { id: 'b', position: { x: 300, y: 10 }, data: { label: 'Target 1' } },
        { id: 'c', position: { x: 300, y: 100 }, data: { label: 'Target 2' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b', data: { weight: '5ms' } },
        { id: 'e2', source: 'a', target: 'c', data: { weight: '12ms' } },
    ],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
    edgeTemplate: 'labeled',
})" class="flow-container" style="height: 220px;">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
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
| `position` | `float` | `0.5` | Position along the edge path, from `0` (source) to `1` (target) |
| `below` | `bool` | `false` | Render below the path instead of above |
| `show` | `string` | `'selected'` | When to show: `'selected'` (only when edge is selected) or `'always'` |

## Usage

Must be used inside an edge scope, typically within a custom edge template or the default edge rendering:

```blade
<x-flow-edge-toolbar>
    <button @click="removeEdge(edge.id)">Delete</button>
</x-flow-edge-toolbar>
```

### Custom position

Place the toolbar at 25% along the path:

```blade
<x-flow-edge-toolbar :position="0.25">
    <span x-text="edge.label"></span>
</x-flow-edge-toolbar>
```

### Always visible

```blade
<x-flow-edge-toolbar show="always">
    <span class="text-xs" x-text="edge.data.weight"></span>
</x-flow-edge-toolbar>
```

### Below the path

```blade
<x-flow-edge-toolbar :below="true">
    <button @click="editEdge(edge.id)">Edit</button>
</x-flow-edge-toolbar>
```

## Behavior

- Counter-scales against viewport zoom so the toolbar remains a consistent size regardless of zoom level.
- Automatically follows the edge path when nodes are moved.

## Directive mapping

Maps to: `x-flow-edge-toolbar`
