---
title: Resizable Nodes
description: Add resize handles with <x-flow-resizer>.
order: 4
---

# Resizable Nodes

The `<x-flow-resizer>` component adds interactive resize handles to a node, allowing users to drag edges and corners to change the node's dimensions.

## Usage

Place `<x-flow-resizer>` inside your `<x-slot:node>` template:

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <span x-text="node.data.label"></span>
        <x-flow-resizer :min-width="120" :min-height="80" />
    </x-slot:node>
</x-flow>
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Resize me' } },
        { id: 'b', position: { x: 300, y: 0 }, data: { label: 'Fixed' }, resizable: false },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
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
                <div x-flow-resizer></div>
                <div x-flow-handle:target></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source></div>
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

## Constraints

Pass min-width and min-height to prevent nodes from being resized too small:

```blade
<x-flow-resizer :min-width="100" :min-height="50" />
```

Without constraints, the node can be resized freely.

## Per-node control

Use the `resizable` flag on individual nodes to control which nodes can be resized:

```php
public array $nodes = [
    [
        'id' => 'resizable',
        'position' => ['x' => 0, 'y' => 0],
        'data' => ['label' => 'Resize me'],
        'resizable' => true,
        'dimensions' => ['width' => 200, 'height' => 100],
    ],
    [
        'id' => 'fixed',
        'position' => ['x' => 300, 'y' => 0],
        'data' => ['label' => 'Fixed size'],
        'resizable' => false,
    ],
];
```

If `node.resizable` is `false`, the resize handles will not appear even when `<x-flow-resizer>` is in the template.

## Behavior

- Respects grid snapping when enabled in the canvas configuration.
- During a resize, the node's `width` and `height` properties are updated in real time.
- Works correctly with locked nodes -- locked nodes cannot be resized.

## Events

The following events are dispatched during a resize operation:

| Event | Payload | Description |
|-------|---------|-------------|
| `node-resize-start` | `{ node, handle, initialWidth, initialHeight }` | Fired when resizing begins |
| `node-resize` | `{ node, handle, width, height }` | Fired continuously on resize |
| `node-resize-end` | `{ node, handle, width, height }` | Fired when resizing completes |

## See also

- [Node Basics](basics.md) -- per-node flags including `resizable`
- [Groups & Nesting](groups.md) -- resizing group nodes
