---
title: Handles
description: Connection handles — positions, validation, and limits.
order: 1
---

# Handles

Handles are connection points on nodes. The `<x-flow-handle>` Blade component creates source or target handles that initiate or receive edge connections.

## Basic usage

Place handles inside your `<x-slot:node>` template:

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | *(required)* | `'source'` or `'target'` |
| `position` | `string` | `''` | `'top'`, `'right'`, `'bottom'`, `'left'` |
| `id` | `string` | `''` | Handle ID (for multiple handles per node) |
| `hidden` | `bool` | `false` | Hide visually while keeping functional |

When no `position` is provided, the default is `bottom` for source handles and `top` for target handles.

## Positions

| Position | Description |
|----------|-------------|
| `top` | Top edge of the node |
| `right` | Right edge of the node |
| `bottom` | Bottom edge of the node |
| `left` | Left edge of the node |

```blade
<x-slot:node>
    <x-flow-handle type="target" position="left" />
    <span x-text="node.data.label"></span>
    <x-flow-handle type="source" position="right" />
</x-slot:node>
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
        { id: 'b', position: { x: 250, y: 0 }, data: { label: 'Node B' } },
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
                <div x-flow-handle:target></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Multiple handles

A node can have multiple handles. Use unique IDs to distinguish them:

```blade
<x-slot:node>
    <x-flow-handle type="target" position="left" id="in-1" />
    <x-flow-handle type="target" position="left" id="in-2" />
    <span x-text="node.data.label"></span>
    <x-flow-handle type="source" position="right" id="out-1" />
    <x-flow-handle type="source" position="right" id="out-2" />
</x-slot:node>
```

Reference handle IDs in your edge data:

```php
public array $edges = [
    [
        'id' => 'e1',
        'source' => 'nodeA',
        'sourceHandle' => 'out-1',
        'target' => 'nodeB',
        'targetHandle' => 'in-1',
    ],
];
```

## Hidden handles

Hide a handle visually while keeping it functional:

```blade
<x-flow-handle type="source" position="bottom" :hidden="true" />
```

## Validation

Add validation to handles using Alpine directives alongside `<x-flow-handle>`. These directives must be placed on the same element or a wrapping element inside the node template.

### x-flow-handle-validate

Attach a custom validator function to a handle. The validator receives a `Connection` object and must return a boolean:

```blade
<x-slot:node>
    <div x-flow-handle:target="'input'"
         x-flow-handle-validate="(conn) => conn.source !== 'restricted-node'">
    </div>
    <span x-text="node.data.label"></span>
    <x-flow-handle type="source" />
</x-slot:node>
```

The `Connection` object has:

| Property | Type | Description |
|----------|------|-------------|
| `source` | `string` | Source node ID |
| `sourceHandle` | `string` | Source handle ID |
| `target` | `string` | Target node ID |
| `targetHandle` | `string` | Target handle ID |

### Validation chain order

When a connection is attempted, checks run in this order:

1. Node `connectable` flag
2. Built-in checks (cycle prevention, duplicate edges)
3. Handle limits (`x-flow-handle-limit`)
4. Handle validators (`x-flow-handle-validate`)
5. Global `isValidConnection` callback

### x-flow-handle-limit

Set the maximum number of connections a handle can have:

```blade
<x-slot:node>
    {{-- Target accepts only 1 connection --}}
    <x-flow-handle type="target" position="top" id="input"
        x-flow-handle-limit="1" />
    <span x-text="node.data.label"></span>
    {{-- Source can have up to 3 connections --}}
    <x-flow-handle type="source" position="bottom" id="output"
        x-flow-handle-limit="3" />
</x-slot:node>
```

Dynamic limits from node data:

```blade
<x-flow-handle type="target" position="top" id="input"
    x-flow-handle-limit="node.data.maxInputs" />
```

### x-flow-handle-connectable

Control whether a handle can initiate connections, receive connections, or both:

```blade
{{-- Disable this source from starting connections --}}
<x-flow-handle type="source" position="right" id="output"
    x-flow-handle-connectable.start="false" />

{{-- Disable this target from receiving connections --}}
<x-flow-handle type="target" position="left" id="input"
    x-flow-handle-connectable.end="false" />

{{-- Reactive: conditionally accept based on data --}}
<x-flow-handle type="target" position="top" id="input"
    x-flow-handle-connectable.end="node.data.acceptsInput" />
```

| Modifier | Description |
|----------|-------------|
| _(none)_ | Controls both initiating and receiving |
| `.start` | Controls only initiating connections (drag out) |
| `.end` | Controls only receiving connections (drop in) |

## Visual feedback

During a connection drag, handles display visual feedback via CSS classes:

| Class | Applied when |
|-------|-------------|
| `.flow-handle-valid` | Target can accept the pending connection (green ring) |
| `.flow-handle-invalid` | Target cannot accept the pending connection (red ring) |
| `.flow-handle-limit-reached` | Connection rejected due to handle limit |
| `.flow-handle-active` | Handle is being hovered or snapped during drag |

Style the limit-reached state distinctly:

```css
.flow-handle-limit-reached {
    background: orange;
}
```

## Node-level `connectable`

The node-level `connectable` flag is checked first. If a node has `'connectable' => false`, all its handles are non-connectable regardless of per-handle directives.

```php
[
    'id' => 'readonly',
    'position' => ['x' => 0, 'y' => 0],
    'connectable' => false,
    'data' => ['label' => 'Read Only'],
]
```

## See also

- [Node Basics](../nodes/basics.md) -- node data shape and flags
- [Edge Types](../edges/types.md) -- edge data shape and sourceHandle/targetHandle
