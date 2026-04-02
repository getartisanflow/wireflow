---
title: Connection Basics
description: Drag-connect, click-to-connect, and reconnection.
order: 1
---

# Connection Basics

Connections are edges created interactively by the user. WireFlow supports drag-to-connect, click-to-connect, and reconnection out of the box.

## Drag to connect

The default connection method. Drag from a source handle to a target handle to create an edge.

1. Pointer down on a source handle starts the connection.
2. A temporary dashed line follows the cursor.
3. Valid target handles highlight as the cursor approaches (within `connectionSnapRadius`).
4. Release on a valid target handle to create the edge.
5. Release on empty space to cancel.

Auto-pan activates when dragging near the canvas edge.

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
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Source' } },
        { id: 'b', position: { x: 250, y: 100 }, data: { label: 'Target A' } },
        { id: 'c', position: { x: 500, y: 0 }, data: { label: 'Target B' } },
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

## Click to connect

Create edges by clicking handles instead of dragging. Enabled by default.

1. Click a source handle to select it (receives `.flow-handle-active` CSS class).
2. Valid target handles highlight with `.flow-handle-valid`.
3. Click a valid target handle to complete the connection.
4. Click empty space or press **Escape** to cancel.

Disable click-to-connect via the `:config` prop:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'connectOnClick' => false,
]">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

## Connection line

Customize the temporary line shown during a connection drag via `:config`:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'connectionLineType' => 'bezier',
    'connectionLineStyle' => [
        'stroke' => '#6366f1',
        'strokeWidth' => 2,
        'strokeDasharray' => '6 3',
    ],
]">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

| Config key | Type | Default | Description |
|------------|------|---------|-------------|
| `connectionLineType` | `string` | `'straight'` | `'straight'`, `'bezier'`, `'smoothstep'`, or `'step'` |
| `connectionLineStyle` | `array` | Themed defaults | Style overrides: `stroke`, `strokeWidth`, `strokeDasharray` |

## Reconnection

Drag existing edge endpoints to reconnect them to different handles. Enabled by default via the `edges-reconnectable` prop.

```blade
<x-flow :nodes="$nodes" :edges="$edges" :edges-reconnectable="true">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

Disable reconnection:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :edges-reconnectable="false">
```

### Per-edge control

Each edge has a `reconnectable` property you can set in your PHP array:

| Value | Behavior |
|-------|----------|
| `true` | Both endpoints can be dragged (default) |
| `false` | Neither endpoint can be dragged |
| `'source'` | Only the source endpoint can be dragged |
| `'target'` | Only the target endpoint can be dragged |

```php
public array $edges = [
    [
        'id' => 'e1-2',
        'source' => '1',
        'target' => '2',
        'reconnectable' => 'source', // Only source end can be reconnected
    ],
];
```

## Connection snap radius

Control how close the cursor must be to a handle before it snaps:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'connectionSnapRadius' => 30,
]">
```

The default is `20` pixels.

## Connection mode

The `connectionMode` config controls handle matching:

| Value | Behavior |
|-------|----------|
| `'strict'` | Source handles only snap to target handles (default) |
| `'loose'` | Source handles can snap to any handle type |

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'connectionMode' => 'loose',
]">
```

## See also

- [Advanced Connections](advanced.md) -- multi-connect, easy-connect, and proximity connect
- [Connection Events](server-events.md) -- handle connection events on the server
- [Components](../components/_index.md) -- `<x-flow>` props and handle configuration
