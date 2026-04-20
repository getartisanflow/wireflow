---
title: Event Handlers
description: Handle canvas events on the server.
order: 3
---

# Event Handlers

Declare these methods on your Livewire component to handle canvas events. Wire them up via event attributes on `<x-flow>`:

```blade
<x-flow :nodes="$nodes" :edges="$edges"
    @connect="onConnect"
    @node-click="onNodeClick"
    @node-drag-end="onNodeDragEnd"
    @pane-click="onPaneClick"
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

Only the events you reference with `@event-name` are dispatched to the server. Omit an attribute to skip that event entirely.

## Connection events

```php
public function onConnect(
    string $source,        // Source node ID
    string $target,        // Target node ID
    ?string $sourceHandle, // Source handle ID (null if default)
    ?string $targetHandle, // Target handle ID (null if default)
): void {
    // A new edge was created by the user.
    // Typically you'd store the edge:
    $this->edges[] = [
        'id' => "e-{$source}-{$target}",
        'source' => $source,
        'target' => $target,
        'sourceHandle' => $sourceHandle,
        'targetHandle' => $targetHandle,
    ];
}

public function onConnectStart(
    string $source,        // Source node ID
    ?string $sourceHandle, // Source handle ID
): void {
    // User started dragging from a handle
}

public function onConnectEnd(
    ?array $connection,    // ['source', 'target', 'sourceHandle', 'targetHandle'] or null if cancelled
    ?string $source,       // Source node ID
    ?string $sourceHandle, // Source handle ID
    ?array $position,      // ['x' => float, 'y' => float] -- flow coordinates where drag ended
): void {
    // Drag finished -- $connection is null if user released on empty canvas
}
```

## Connection validators

### `@connect-validate`

Runs **before** the edge is committed, unlike `@connect` which fires after. Return `true` to allow, `false` to silently reject, or `['allowed' => false, 'reason' => '...']` to reject with a user-facing toast.

```blade
<x-flow :nodes="$nodes" :edges="$edges" @connect-validate="canConnect">
```

```php
public function canConnect(
    string $source,
    string $target,
    ?string $sourceHandle,
    ?string $targetHandle,
): bool|array {
    if ($source === $target) {
        return ['allowed' => false, 'reason' => 'Self-connections not supported.'];
    }
    return true;
}
```

While the Livewire roundtrip is in flight, AlpineFlow adds the CSS class `flow-handle-validating` to the source and target handles. Style it to indicate a pending state — the default theme ships a subtle pulse. Override the class name via `config.validatingHandleClass`.

When the server rejects with a `reason`, WireFlow dispatches a `flux-toast` event (`{ variant: 'warning', text: reason }`). To suppress or customize the toast, listen for the validated DOM event and call `preventDefault()` — AlpineFlow respects it.

Two DOM events fire on the canvas for deeper customization:
- `flow-connect-validating` — `{ detail: { connection } }` fires on drop.
- `flow-connect-validated`  — `{ detail: { connection, allowed, reason } }` fires when the server responds.

Attach with `@flow-connect-validating="..."` on the `<x-flow>` element.

## Node events

```php
public function onNodeClick(
    string $nodeId,        // Clicked node ID
    array $node,           // Full node array: ['id', 'position' => ['x','y'], 'data' => [...], ...]
): void {
    // Handle node click
}

public function onNodeDragStart(string $nodeId): void {
    // User started dragging a node
}

public function onNodeDragEnd(
    string $nodeId,
    array $position,       // ['x' => float, 'y' => float] -- final flow-space position
): void {
    // Update the server-side position if using sync mode
}

public function onNodeResizeStart(
    string $nodeId,
    array $dimensions,     // ['width' => float, 'height' => float]
): void {
    // User started resizing a node
}

public function onNodeResizeEnd(
    string $nodeId,
    array $dimensions,     // ['width' => float, 'height' => float] -- final dimensions
): void {
    // Persist the new dimensions if needed
}

public function onNodeCollapse(string $nodeId): void {
    // A group node was collapsed
}

public function onNodeExpand(string $nodeId): void {
    // A group node was expanded
}

public function onNodeReparent(
    string $nodeId,
    ?string $newParentId,  // New parent ID (null if detached)
    ?string $oldParentId,  // Previous parent ID (null if was root)
): void {
    // A node was drag-reparented into or out of a group
}

public function onNodeContextMenu(
    string $nodeId,
    array $screenPosition, // ['x' => float, 'y' => float] -- screen coordinates
): void {
    // Right-click on a node -- use screenPosition to place a context menu
}

public function onNodesChange(array $changes): void {
    // Batch notification of node additions or removals
    // $changes = ['type' => 'add'|'remove', 'nodes' => [['id' => '...', ...], ...]]
}
```

## Edge events

```php
public function onEdgeClick(string $edgeId): void {
    // User clicked an edge
}

public function onEdgeContextMenu(
    string $edgeId,
    array $screenPosition, // ['x' => float, 'y' => float]
): void {
    // Right-click on an edge
}

public function onEdgesChange(array $changes): void {
    // Batch notification of edge additions or removals
    // $changes = ['type' => 'add'|'remove', 'edges' => [['id' => '...', ...], ...]]
}

public function onReconnect(
    string $oldEdgeId,
    array $newConnection,  // ['source', 'target', 'sourceHandle', 'targetHandle']
): void {
    // An edge endpoint was dragged to a new node
}

public function onReconnectStart(
    string $edgeId,
    string $handleType,    // 'source' or 'target' -- which end is being reconnected
): void {
    // User started reconnecting an edge
}

public function onReconnectEnd(
    string $edgeId,
    bool $successful,      // true if reconnected, false if cancelled
): void {
    // Reconnect attempt finished
}
```

## Canvas events

```php
public function onPaneClick(array $position): void {
    // Clicked empty canvas area
    // $position = ['x' => 100, 'y' => 200] (flow coordinates)
}

public function onPaneContextMenu(array $position): void {
    // Right-click on empty canvas
}

public function onViewportChange(array $viewport): void {
    // Viewport panned or zoomed
    // $viewport = ['x' => 0, 'y' => 0, 'zoom' => 1.0]
}
```

## Selection events

```php
public function onSelectionChange(array $nodes, array $edges): void {
    // Selection changed
    // $nodes = ['node-1', 'node-2']  -- selected node IDs
    // $edges = ['edge-1']            -- selected edge IDs
}

public function onSelectionContextMenu(
    array $nodes,
    array $edges,
    array $screenPosition, // ['x' => float, 'y' => float]
): void {
    // Right-click while nodes/edges are selected
}
```

## Row events

```php
public function onRowSelect(string $nodeId, string $attrId): void {
    // A row attribute was selected on a node
}

public function onRowDeselect(string $nodeId, string $attrId): void {
    // A row attribute was deselected
}

public function onRowSelectionChange(array $rows): void {
    // Row selection changed
    // $rows = ['node1.attr1', 'node2.attr3']
}
```

## Other events

```php
public function onDrop(array $data): void {
    // External drag-and-drop onto the canvas
}

public function onInit(array $data): void {
    // Canvas finished initializing -- safe to call flow commands
}
```

## Complete example

A component that persists drag positions and handles connections:

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use App\Models\FlowNode;
use App\Models\FlowEdge;
use Livewire\Component;

class PersistentFlow extends Component
{
    use WithWireFlow;

    public array $nodes = [];
    public array $edges = [];

    public function mount(): void
    {
        $this->nodes = FlowNode::all()->map(fn ($n) => [
            'id' => (string) $n->id,
            'position' => ['x' => $n->x, 'y' => $n->y],
            'data' => ['label' => $n->label],
        ])->toArray();

        $this->edges = FlowEdge::all()->map(fn ($e) => [
            'id' => (string) $e->id,
            'source' => (string) $e->source_id,
            'target' => (string) $e->target_id,
        ])->toArray();
    }

    public function onNodeDragEnd(string $nodeId, array $position): void
    {
        FlowNode::where('id', $nodeId)->update([
            'x' => $position['x'],
            'y' => $position['y'],
        ]);
    }

    public function onConnect(string $source, string $target, ?string $sourceHandle, ?string $targetHandle): void
    {
        $edge = FlowEdge::create([
            'source_id' => $source,
            'target_id' => $target,
        ]);

        $this->edges[] = [
            'id' => (string) $edge->id,
            'source' => $source,
            'target' => $target,
        ];
    }

    public function onPaneClick(array $position): void
    {
        $this->flowDeselectAll();
    }

    public function render()
    {
        return view('livewire.persistent-flow');
    }
}
```

```blade
{{-- resources/views/livewire/persistent-flow.blade.php --}}
<div>
    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        @connect="onConnect"
        @node-drag-end="onNodeDragEnd"
        @pane-click="onPaneClick"
        style="height: 500px;"
    >
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>
    </x-flow>
</div>
```

## Quick reference

| Event | Handler | Payload |
|-------|---------|---------|
| `connect` | `onConnect` | `string $source, string $target, ?string $sourceHandle, ?string $targetHandle` |
| `connect-start` | `onConnectStart` | `string $source, ?string $sourceHandle` |
| `connect-end` | `onConnectEnd` | `?array $connection, ?string $source, ?string $sourceHandle, ?array $position` |
| `connect-validate` | `canConnect` | `string $source, string $target, ?string $sourceHandle, ?string $targetHandle` → `bool\|array` |
| `node-click` | `onNodeClick` | `string $nodeId, array $node` |
| `node-drag-start` | `onNodeDragStart` | `string $nodeId` |
| `node-drag-end` | `onNodeDragEnd` | `string $nodeId, array $position` |
| `node-resize-start` | `onNodeResizeStart` | `string $nodeId, array $dimensions` |
| `node-resize-end` | `onNodeResizeEnd` | `string $nodeId, array $dimensions` |
| `node-collapse` | `onNodeCollapse` | `string $nodeId` |
| `node-expand` | `onNodeExpand` | `string $nodeId` |
| `node-reparent` | `onNodeReparent` | `string $nodeId, ?string $newParentId, ?string $oldParentId` |
| `node-context-menu` | `onNodeContextMenu` | `string $nodeId, array $screenPosition` |
| `nodes-change` | `onNodesChange` | `array $changes` |
| `edge-click` | `onEdgeClick` | `string $edgeId` |
| `edge-context-menu` | `onEdgeContextMenu` | `string $edgeId, array $screenPosition` |
| `edges-change` | `onEdgesChange` | `array $changes` |
| `reconnect` | `onReconnect` | `string $oldEdgeId, array $newConnection` |
| `reconnect-start` | `onReconnectStart` | `string $edgeId, string $handleType` |
| `reconnect-end` | `onReconnectEnd` | `string $edgeId, bool $successful` |
| `pane-click` | `onPaneClick` | `array $position` |
| `pane-context-menu` | `onPaneContextMenu` | `array $position` |
| `viewport-change` | `onViewportChange` | `array $viewport` |
| `selection-change` | `onSelectionChange` | `array $nodes, array $edges` |
| `selection-context-menu` | `onSelectionContextMenu` | `array $nodes, array $edges, array $screenPosition` |
| `row-select` | `onRowSelect` | `string $nodeId, string $attrId` |
| `row-deselect` | `onRowDeselect` | `string $nodeId, string $attrId` |
| `row-selection-change` | `onRowSelectionChange` | `array $rows` |
| `drop` | `onDrop` | `array $data` |
| `init` | `onInit` | `array $data` |

## Related

- [WithWireFlow Trait](trait.md) -- setup and base methods
- [Convenience Methods](convenience.md) -- simplified methods for common operations
- [Server Patterns](patterns.md) -- complete working patterns
