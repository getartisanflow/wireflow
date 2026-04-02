---
title: Node Basics
description: Creating and configuring nodes in WireFlow.
order: 1
---

# Node Basics

Nodes are the primary building blocks of a WireFlow diagram. Define them as PHP arrays in your Livewire component and render them with `<x-flow>`.

## Node data shape

Every node is a PHP associative array with the following keys:

```php
public array $nodes = [
    [
        'id' => 'step-1',                              // Required. Unique string ID.
        'position' => ['x' => 100, 'y' => 200],       // Required. Flow-space coordinates.
        'data' => ['label' => 'My Node'],              // Optional. Your custom data — access via node.data.label
        'type' => 'default',                            // Optional. Maps to node-types registry.
        'class' => 'my-class',                          // Optional. CSS class(es) on the node element.
        'selected' => false,                            // Optional. Selection state.
        'draggable' => true,                            // Optional. Can be dragged.
        'selectable' => true,                           // Optional. Can be selected.
        'connectable' => true,                          // Optional. Handles accept connections.
        'deletable' => true,                            // Optional. Can be deleted via keyboard.
        'hidden' => false,                              // Optional. Hide from rendering.
        'locked' => false,                              // Optional. Fully freeze all interactions.
        'resizable' => true,                            // Optional. Per-node resize override (requires <x-flow-resizer>).
        'parentId' => null,                             // Optional. Makes this a child of another node.
        'shape' => null,                                // Optional. 'diamond', 'hexagon', 'circle', etc.
        'dimensions' => ['width' => 200, 'height' => 80], // Optional. Explicit dimensions.
        'sourcePosition' => 'bottom',                   // Optional. Default handle position for sources.
        'targetPosition' => 'top',                      // Optional. Default handle position for targets.
    ],
];
```

Only `id` and `position` are required. Everything else has sensible defaults.

## Basic usage

Pass your nodes and edges to the `<x-flow>` component:

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Start' } },
        { id: 'b', position: { x: 250, y: 100 }, data: { label: 'Process' } },
        { id: 'c', position: { x: 500, y: 0 }, data: { label: 'End' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'c' },
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

## Per-node flags

Override global behavior on individual nodes by setting these flags in your PHP array:

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `draggable` | `bool` | `true` | Can be dragged |
| `selectable` | `bool` | `true` | Can be selected |
| `connectable` | `bool` | `true` | Handles accept connections |
| `deletable` | `bool` | `true` | Can be deleted via keyboard |
| `locked` | `bool` | `false` | Fully freeze -- no drag, delete, connect, select, or resize. Shows dashed border. |
| `hidden` | `bool` | `false` | Hidden from rendering |
| `resizable` | `bool` | -- | Per-node resize override (requires `<x-flow-resizer>`) |

> **Note:** Setting `'locked' => true` freezes **all** interactions at once. If you need to lock a node but still allow selection, set both `'locked' => true` and `'selectable' => true` -- explicit flags take precedence over the lock.

```php
public array $nodes = [
    [
        'id' => 'locked-node',
        'position' => ['x' => 0, 'y' => 0],
        'data' => ['label' => 'Locked'],
        'locked' => true,
    ],
    [
        'id' => 'no-drag',
        'position' => ['x' => 250, 'y' => 0],
        'data' => ['label' => 'No Drag'],
        'draggable' => false,
    ],
    [
        'id' => 'hidden-node',
        'position' => ['x' => 500, 'y' => 0],
        'data' => ['label' => 'Hidden'],
        'hidden' => true,
    ],
];
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'normal', position: { x: 0, y: 0 }, data: { label: 'Normal' } },
        { id: 'locked', position: { x: 220, y: 0 }, data: { label: 'Locked' }, locked: true },
        { id: 'nodrag', position: { x: 440, y: 0 }, data: { label: 'No Drag' }, draggable: false },
    ],
    edges: [],
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

## Node templates via `<x-slot:node>`

Use the `node` slot to define how all nodes render. Inside the slot, `node` is the Alpine reactive node object. Use Alpine expressions (`x-text`, `x-show`, `:class`, etc.) to bind to node data:

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" />
        <span x-text="node.data.label"></span>
        <span x-show="node.selected" class="text-green-500">Selected</span>
        <span x-text="node.id" class="text-xs text-gray-400"></span>
        <x-flow-handle type="source" />
    </x-slot:node>
</x-flow>
```

Use `:class` for conditional styling:

```blade
<x-slot:node>
    <div :class="{ 'opacity-50': node.locked, 'ring-2 ring-blue-500': node.selected }">
        <span x-text="node.data.label"></span>
    </div>
</x-slot:node>
```

## Custom node types

Register different templates per node type using the `:node-types` prop. Each type maps to a Blade component name:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :node-types="[
    'input' => 'flow.nodes.input-node',
    'output' => 'flow.nodes.output-node',
]">
    <x-slot:node>
        {{-- Default template for nodes without a matching type --}}
        <x-flow-handle type="target" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" />
    </x-slot:node>
</x-flow>
```

Set the `type` key on your node data to route it to the correct template:

```php
public array $nodes = [
    ['id' => '1', 'type' => 'input', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Start']],
    ['id' => '2', 'position' => ['x' => 250, 'y' => 0], 'data' => ['label' => 'Process']],
    ['id' => '3', 'type' => 'output', 'position' => ['x' => 500, 'y' => 0], 'data' => ['label' => 'End']],
];
```

## See also

- [Shapes](shapes.md) -- built-in node shapes
- [Groups & Nesting](groups.md) -- parent-child hierarchies
- [Resizable Nodes](resize.md) -- add resize handles
- [Node Styling](styling.md) -- status classes and custom CSS
