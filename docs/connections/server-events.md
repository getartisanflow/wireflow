---
title: Connection Events
description: Handle connection events on the server.
order: 3
---

# Connection Events

Handle connection lifecycle events on the server by adding event attributes to `<x-flow>` and defining handler methods on your Livewire component.

## Wiring events

Add `@event` attributes to `<x-flow>` and use the `WithWireFlow` trait:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    @connect="onConnect"
    @connect-start="onConnectStart"
    @connect-end="onConnectEnd"
    @reconnect="onReconnect"
    @reconnect-start="onReconnectStart"
    @reconnect-end="onReconnectEnd"
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

::demo
```toolbar
<div id="demo-event-log" class="font-mono text-[10px] text-text-faint">Drag from a handle to connect...</div>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 50 }, data: { label: 'Node A' } },
        { id: 'b', position: { x: 250, y: 0 }, data: { label: 'Node B' } },
        { id: 'c', position: { x: 250, y: 120 }, data: { label: 'Node C' } },
    ],
    edges: [],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
    onConnect(conn) {
        document.getElementById('demo-event-log').textContent =
            '@connect → source: ' + conn.source + ', target: ' + conn.target +
            (conn.sourceHandle ? ', handle: ' + conn.sourceHandle : '');
    },
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

## onConnect

Fires when a new edge is created by the user (drag or click-to-connect). This is the most commonly used connection event -- typically you store the new edge here.

```php
public function onConnect(
    string $source,        // Source node ID
    string $target,        // Target node ID
    ?string $sourceHandle, // Source handle ID (null if default)
    ?string $targetHandle, // Target handle ID (null if default)
): void {
    $this->edges[] = [
        'id' => "e-{$source}-{$target}",
        'source' => $source,
        'target' => $target,
        'sourceHandle' => $sourceHandle,
        'targetHandle' => $targetHandle,
    ];
}
```

## onConnectStart

Fires when the user starts dragging from a handle.

```php
public function onConnectStart(
    string $source,        // Source node ID
    ?string $sourceHandle, // Source handle ID
): void {
    // User started dragging from a handle
}
```

## onConnectEnd

Fires when a connection drag finishes, whether successful or cancelled. Use the `$connection` parameter to determine the outcome.

```php
public function onConnectEnd(
    ?array $connection,    // Connection array or null if cancelled
    ?string $source,       // Source node ID
    ?string $sourceHandle, // Source handle ID
    ?array $position,      // ['x' => float, 'y' => float] — flow coordinates where drag ended
): void {
    if ($connection === null) {
        // User released on empty canvas — connection was cancelled
        return;
    }

    // Connection was successful
    // $connection = ['source', 'target', 'sourceHandle', 'targetHandle']
}
```

## onReconnect

Fires when an existing edge is successfully reconnected to a different handle.

```php
public function onReconnect(
    string $oldEdgeId,     // ID of the edge being reconnected
    array $newConnection,  // ['source', 'target', 'sourceHandle', 'targetHandle']
): void {
    // Find and update the edge
    foreach ($this->edges as &$edge) {
        if ($edge['id'] === $oldEdgeId) {
            $edge['source'] = $newConnection['source'];
            $edge['target'] = $newConnection['target'];
            $edge['sourceHandle'] = $newConnection['sourceHandle'] ?? null;
            $edge['targetHandle'] = $newConnection['targetHandle'] ?? null;
            break;
        }
    }
}
```

## onReconnectStart

Fires when the user starts dragging an existing edge endpoint.

```php
public function onReconnectStart(
    string $edgeId,        // ID of the edge being reconnected
    string $handleType,    // 'source' or 'target' — which end is being dragged
): void {
    // Reconnection drag started
}
```

## onReconnectEnd

Fires when a reconnection drag finishes, whether successful or cancelled.

```php
public function onReconnectEnd(
    string $edgeId,        // ID of the edge
    bool $successful,      // true if reconnected, false if cancelled
): void {
    if (! $successful) {
        // User cancelled the reconnection
    }
}
```

## Full example

A complete Livewire component with all connection events wired up:

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;

class ConnectionDemo extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => '1', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Node A']],
        ['id' => '2', 'position' => ['x' => 250, 'y' => 0], 'data' => ['label' => 'Node B']],
        ['id' => '3', 'position' => ['x' => 500, 'y' => 0], 'data' => ['label' => 'Node C']],
    ];

    public array $edges = [];

    public array $log = [];

    public function onConnect(
        string $source,
        string $target,
        ?string $sourceHandle,
        ?string $targetHandle,
    ): void {
        $this->edges[] = [
            'id' => "e-{$source}-{$target}",
            'source' => $source,
            'target' => $target,
            'sourceHandle' => $sourceHandle,
            'targetHandle' => $targetHandle,
        ];

        $this->log[] = "Connected {$source} → {$target}";
    }

    public function onConnectEnd(
        ?array $connection,
        ?string $source,
        ?string $sourceHandle,
        ?array $position,
    ): void {
        if ($connection === null) {
            $this->log[] = "Connection cancelled at ({$position['x']}, {$position['y']})";
        }
    }

    public function onReconnect(string $oldEdgeId, array $newConnection): void
    {
        foreach ($this->edges as &$edge) {
            if ($edge['id'] === $oldEdgeId) {
                $edge['source'] = $newConnection['source'];
                $edge['target'] = $newConnection['target'];
                break;
            }
        }

        $this->log[] = "Reconnected edge {$oldEdgeId}";
    }

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('livewire.connection-demo');
    }
}
```

```blade
{{-- resources/views/livewire/connection-demo.blade.php --}}
<div>
    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        @connect="onConnect"
        @connect-end="onConnectEnd"
        @reconnect="onReconnect"
        style="height: 400px;"
    >
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>
    </x-flow>

    <ul class="mt-4 text-sm text-gray-500">
        @foreach ($log as $entry)
            <li>{{ $entry }}</li>
        @endforeach
    </ul>
</div>
```

## Event reference

| Event attribute | Handler method | When |
|-----------------|---------------|------|
| `@connect` | `onConnect` | New edge created |
| `@connect-start` | `onConnectStart` | Drag started from a handle |
| `@connect-end` | `onConnectEnd` | Drag finished (successful or cancelled) |
| `@reconnect` | `onReconnect` | Edge reconnected to a different handle |
| `@reconnect-start` | `onReconnectStart` | Reconnection drag started |
| `@reconnect-end` | `onReconnectEnd` | Reconnection drag finished |

## See also

- [Connection Basics](basics.md) -- drag-connect, click-to-connect, and reconnection
- [Advanced Connections](advanced.md) -- multi-connect, easy-connect, and proximity connect
- [Event Handlers](../server/events.md) -- all event handler signatures
