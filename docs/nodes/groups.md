---
title: Groups & Nesting
description: Parent-child hierarchies in WireFlow.
order: 3
---

# Groups & Nesting

WireFlow supports hierarchical node structures where parent nodes contain and manage child nodes. Groups enable visual organization, collapse/expand interactions, and validation rules for child membership.

## Parent-child basics

Set `'parentId'` on a child node and `'type' => 'group'` on the parent. Child node positions are **relative to their parent**, so `['x' => 10, 'y' => 40]` means 10px right and 40px down from the parent's top-left corner.

```php
public array $nodes = [
    [
        'id' => 'group-1',
        'type' => 'group',
        'position' => ['x' => 100, 'y' => 100],
        'data' => ['label' => 'My Group'],
        'dimensions' => ['width' => 300, 'height' => 200],
    ],
    [
        'id' => 'child-1',
        'parentId' => 'group-1',
        'position' => ['x' => 10, 'y' => 40],
        'data' => ['label' => 'Child Node'],
    ],
    [
        'id' => 'child-2',
        'parentId' => 'group-1',
        'position' => ['x' => 10, 'y' => 100],
        'data' => ['label' => 'Another Child'],
    ],
];
```

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
        { id: 'group', type: 'group', position: { x: 0, y: 0 }, data: { label: 'My Group' }, style: { width: '280px', height: '180px' } },
        { id: 'child-1', parentId: 'group', position: { x: 20, y: 40 }, data: { label: 'Child A' }, expandParent: true },
        { id: 'child-2', parentId: 'group', position: { x: 20, y: 110 }, data: { label: 'Child B' }, expandParent: true },
    ],
    edges: [
        { id: 'e1', source: 'child-1', target: 'child-2' },
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
                <template x-if="node.type === 'group'">
                    <div x-flow-drag-handle class="px-2 py-1 text-xs font-mono font-medium opacity-60" x-text="node.data.label"></div>
                </template>
                <template x-if="node.type !== 'group'">
                    <div>
                        <div x-flow-handle:target></div>
                        <span x-text="node.data.label"></span>
                        <div x-flow-handle:source></div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Group styling

Group nodes receive the `.flow-node-group` CSS class, which applies a dashed border and semi-transparent background by default. Override the look with CSS variables:

| Variable | Description |
|----------|-------------|
| `--flow-group-border-color` | Group node dashed border color |
| `--flow-group-bg` | Group node background (typically semi-transparent) |

## Collapse and expand

### Client-side: `<x-flow-collapse>`

Place the `<x-flow-collapse>` component inside a node template to toggle collapsed state. When collapsed, child nodes and their edges are hidden.

```blade
<x-slot:node>
    <span x-text="node.data.label"></span>
    <x-flow-collapse>
        <span x-text="node.collapsed ? 'Expand' : 'Collapse'"></span>
    </x-flow-collapse>
</x-slot:node>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `instant` | `bool` | `false` | Skip animation |
| `all` | `bool` | `false` | Collapse/expand all collapsible nodes at once |
| `expand` | `bool` | `false` | Expand only (no toggle) |
| `children` | `bool` | `false` | Collapse children of a node |

#### Batch operations

Collapse or expand all nodes from outside the node template:

```blade
<x-flow-collapse :all="true">Collapse All</x-flow-collapse>
<x-flow-collapse :all="true" :expand="true">Expand All</x-flow-collapse>
<x-flow-collapse :all="true" :expand="true" :instant="true">Expand All (Instant)</x-flow-collapse>
```

### Server-side: `flowCollapseNode()` / `flowExpandNode()`

Use the `WithWireFlow` trait to collapse and expand nodes from PHP:

```php
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;

class FlowEditor extends Component
{
    use WithWireFlow;

    public array $nodes = [];
    public array $edges = [];

    public function collapseGroup(string $id): void
    {
        $this->flowCollapseNode($id);
    }

    public function expandGroup(string $id): void
    {
        $this->flowExpandNode($id);
    }

    public function toggleGroup(string $id): void
    {
        $this->flowToggleNode($id);
    }
}
```

```blade
<button wire:click="collapseGroup('group-1')">Collapse</button>
<button wire:click="expandGroup('group-1')">Expand</button>
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'group-a', type: 'group', position: { x: 0, y: 0 }, data: { label: 'Group A' }, droppable: true, style: { width: '180px', height: '120px' } },
        { id: 'group-b', type: 'group', position: { x: 280, y: 0 }, data: { label: 'Group B' }, droppable: true, style: { width: '180px', height: '120px' } },
        { id: 'loose', position: { x: 140, y: 160 }, data: { label: 'Drag me' } },
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
                <template x-if="node.type === 'group'">
                    <div x-flow-drag-handle class="px-2 py-1 text-xs font-mono font-medium opacity-60" x-text="node.data.label"></div>
                </template>
                <template x-if="node.type !== 'group'">
                    <div>
                        <div x-flow-handle:target></div>
                        <span x-text="node.data.label"></span>
                        <div x-flow-handle:source></div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Child validation

Define validation rules per node type using the `:config` prop. Pass `childValidationRules` to control which nodes can be children:

```php
$config = [
    'childValidationRules' => [
        'group' => [
            'allowedTypes' => ['task', 'note'],
            'maxChildren' => 10,
            'maxDepth' => 3,
        ],
    ],
];
```

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="$config">
    ...
</x-flow>
```

| Property | Type | Description |
|----------|------|-------------|
| `allowedTypes` | `array` | Node types permitted as children |
| `minChildren` | `int` | Minimum number of children required |
| `maxChildren` | `int` | Maximum number of children allowed |
| `maxDepth` | `int` | Maximum nesting depth from this node |

Validation runs on drag, delete, and programmatic add. Invalid states apply `.flow-node-invalid` on the node and `.flow-node-drop-target` on valid targets during drag.

## Drag-to-reparent

Nodes can be reparented by dragging them onto a droppable target. Set `'droppable' => true` on the target node:

```php
[
    'id' => 'target',
    'type' => 'group',
    'droppable' => true,
    'position' => ['x' => 200, 'y' => 200],
    'data' => ['label' => 'Drop here'],
    'dimensions' => ['width' => 300, 'height' => 200],
]
```

When a node is dragged onto a droppable node:

1. The node is **auto-detached** from its old parent (if any).
2. Its position is recalculated relative to the new parent.
3. A **circular guard** prevents reparenting a node to one of its own descendants.

## Condense via `<x-flow-condense>`

The `<x-flow-condense>` component toggles a node between its full view and a condensed summary view. Unlike collapse (which hides children), condense changes how the node itself is displayed.

```blade
<x-slot:node>
    <x-flow-condense>
        <span x-text="node.condensed ? 'Show Full' : 'Summary'"></span>
    </x-flow-condense>

    <!-- Full view -->
    <div x-show="!node.condensed">
        <h3 x-text="node.data.title"></h3>
        <p x-text="node.data.description"></p>
    </div>

    <!-- Condensed view -->
    <div x-show="node.condensed">
        <h3 x-text="node.data.title"></h3>
        <span x-text="node.data.items.length + ' items'" class="text-sm text-gray-500"></span>
    </div>
</x-slot:node>
```

Condensed nodes receive the `.flow-node-condensed` CSS class.

## See also

- [Node Basics](basics.md) -- node data shape and flags
- [Resizable Nodes](resize.md) -- add resize handles
- [Node Styling](styling.md) -- CSS classes and theming
