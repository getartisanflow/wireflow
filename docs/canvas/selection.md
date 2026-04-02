---
title: Selection
description: Select nodes and edges.
order: 5
---

# Selection

WireFlow supports click selection, multi-select, selection box, and lasso selection. Selection state drives deletion, clipboard operations, group drag, and custom UI.

## Click selection

Click a node or edge to select it. The previously selected items are deselected.

**Shift+click** toggles the clicked item in/out of the current selection without clearing it.

Selected nodes receive the `.flow-node-selected` CSS class. Selected edges receive `.flow-edge-selected`.

## Selection box

Draw a rectangle on the canvas to select multiple nodes at once. By default, hold **Shift** and drag on the canvas background.

### Selection on drag

For a whiteboard-style UX where left-click drag selects immediately, enable `selectionOnDrag` via `:config`:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :selection-on-drag="true" :config="[
    'panOnDrag' => [2],
]">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

With `selectionOnDrag` enabled, pair with `panOnDrag: [2]` to move panning to right-click.

### Selection mode

The `selectionMode` config controls containment testing:

| Mode | Behavior |
|------|----------|
| `'partial'` (default) | Any overlap between the node and the box selects the node |
| `'full'` | The entire node must be inside the box |

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'selectionMode' => 'full',
]">
```

Hold **Alt** during a box drag to temporarily switch to the opposite mode.

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
        { id: 'b', position: { x: 200, y: 0 }, data: { label: 'Node B' } },
        { id: 'c', position: { x: 400, y: 0 }, data: { label: 'Node C' } },
        { id: 'd', position: { x: 200, y: 100 }, data: { label: 'Node D' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'c' },
        { id: 'e3', source: 'b', target: 'd' },
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

## Lasso selection

Freeform selection by drawing an arbitrary shape around nodes:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'selectionTool' => 'lasso',
]">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

Press **L** at runtime to toggle between box and lasso selection tools.

## Server-side selection control

Use `WithWireFlow` trait methods to control selection from PHP:

```php
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;

class FlowEditor extends Component
{
    use WithWireFlow;

    public function selectAll(): void
    {
        $nodeIds = array_column($this->nodes, 'id');
        $this->flowSelectNodes($nodeIds);
    }

    public function selectEdges(): void
    {
        $edgeIds = array_column($this->edges, 'id');
        $this->flowSelectEdges($edgeIds);
    }

    public function clearSelection(): void
    {
        $this->flowDeselectAll();
    }
}
```

### Method reference

| Method | Description |
|--------|-------------|
| `$this->flowSelectNodes(array $ids)` | Select nodes by ID |
| `$this->flowSelectEdges(array $ids)` | Select edges by ID |
| `$this->flowDeselectAll()` | Deselect everything |

### Example Blade with server buttons

```blade
<div>
    <div class="mb-4 flex gap-2">
        <button wire:click="selectAll">Select All Nodes</button>
        <button wire:click="selectEdges">Select All Edges</button>
        <button wire:click="clearSelection">Deselect All</button>
    </div>

    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        @selection-change="onSelectionChange"
        style="height: 400px;"
    >
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>
    </x-flow>
</div>
```

## Selection change event

Listen for selection changes on the server:

```blade
<x-flow :nodes="$nodes" :edges="$edges" @selection-change="onSelectionChange">
```

```php
public function onSelectionChange(array $nodes, array $edges): void
{
    // $nodes = ['node-1', 'node-2'] — array of selected node IDs
    // $edges = ['edge-1'] — array of selected edge IDs
}
```

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| **Click** | Select node/edge (deselects others) |
| **Shift+Click** | Toggle node/edge in multi-selection |
| **Shift+Drag** | Selection box (or lasso) on canvas |
| **Delete / Backspace** | Delete selected nodes and edges |
| **Ctrl+A / Cmd+A** | Select all nodes |
| **L** | Toggle between box and lasso |
| **Alt** (held during drag) | Toggle selection mode (partial/full) |

## See also

- [Viewport](viewport.md) -- pan, zoom, and viewport control
- [Controls & Actions](controls.md) -- built-in action buttons
- [Event Handlers](../server/events.md) -- all event handler signatures
