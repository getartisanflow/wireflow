---
title: Advanced Connections
description: Multi-connect, easy-connect, and proximity connect.
order: 2
---

# Advanced Connections

WireFlow supports three advanced connection modes for power users: multi-connect, easy-connect, and proximity connect. All are configured via the `:config` prop on `<x-flow>`.

## Multi-connect

Create edges from multiple selected nodes in a single drag.

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'multiConnect' => true,
]">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

### How it works

1. Select multiple nodes (Shift+click or drag-select).
2. Drag from any selected node's source handle.
3. Connection lines appear from **all** selected nodes' source handles to the cursor.
4. Drop on a valid target to create all valid connections in a single batch.

Each connection in the batch is validated individually. Connections that fail validation are silently skipped.

## Easy connect

Connect nodes without targeting a specific handle. Hold a modifier key and drag from anywhere on a node's body to start a connection.

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'easyConnect' => true,
    'easyConnectKey' => 'alt',
]">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

AlpineFlow finds the nearest source handle on the node and starts a connection from it. The connection then behaves exactly like a standard drag-to-connect.

### Modifier keys

| Value | Key |
|-------|-----|
| `'alt'` | Alt/Option (default) |
| `'meta'` | Cmd (macOS) / Win (Windows) |
| `'shift'` | Shift |

```blade
{{-- Use Shift as the modifier key --}}
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'easyConnect' => true,
    'easyConnectKey' => 'shift',
]">
```

## Proximity connect

Auto-create edges when dragging nodes close together.

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'proximityConnect' => true,
    'proximityConnectDistance' => 150,
    'proximityConnectConfirm' => false,
]">
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
        { id: 'a', position: { x: 0, y: 60 }, data: { label: 'Drag me close' } },
        { id: 'b', position: { x: 350, y: 60 }, data: { label: 'To me' } },
    ],
    edges: [],
    proximityConnect: true,
    proximityConnectDistance: 150,
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

| Config key | Type | Default | Description |
|------------|------|---------|-------------|
| `proximityConnect` | `bool` | `false` | Enable proximity connections |
| `proximityConnectDistance` | `int` | `150` | Distance threshold in flow pixels |
| `proximityConnectConfirm` | `bool` | `false` | Show visual confirmation before creating the edge |

### Direction inference

Direction is inferred automatically: the node further left becomes the source. If X positions are similar (within 30px), the higher node becomes the source.

### Confirmation mode

When `proximityConnectConfirm` is `true`, a visual indicator appears when nodes are close enough to connect, but the edge is not created until the user releases the drag.

## Prevent cycles

Reject connections that would create circular dependencies:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :prevent-cycles="true">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

When enabled, any connection that would form a cycle is rejected during the validation chain.

## Custom connection validation

Use `WireFlow::js()` to pass a custom JavaScript validation callback via `:config`. The callback runs as the last step in the validation chain, after all built-in checks.

```php
use ArtisanFlow\WireFlow\View\Components\WireFlow;

// In your Livewire component
public function render(): \Illuminate\Contracts\View\View
{
    return view('livewire.flow-editor', [
        'config' => [
            'isValidConnection' => WireFlow::js('(conn) => conn.source !== "locked-node"'),
        ],
    ]);
}
```

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="$config">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

The callback receives a connection object with `source`, `sourceHandle`, `target`, and `targetHandle`. Return `false` to reject the connection.

## See also

- [Connection Basics](basics.md) -- drag-connect, click-to-connect, and reconnection
- [Connection Events](server-events.md) -- handle connection events on the server
- [Configuration](../configuration.md) -- all config options including connection settings
