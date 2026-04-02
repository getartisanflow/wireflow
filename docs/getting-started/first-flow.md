---
title: First Flow
description: Build your first flow diagram with Blade components.
order: 2
---

# Your First Flow

This tutorial walks you through building a flow diagram from scratch using WireFlow's Blade components. By the end, you'll have an interactive diagram with nodes, edges, a background grid, controls, and server-side event handling.

## 1. Create a Livewire component

```bash
php artisan make:livewire FlowEditor
```

Define your nodes and edges as arrays on the component. Each node needs an `id`, `position`, and optionally `data` for display content. Each edge needs an `id`, `source`, and `target`.

```php
<?php

namespace App\Livewire;

use Livewire\Component;

class FlowEditor extends Component
{
    public array $nodes = [
        [
            'id' => '1',
            'position' => ['x' => 0, 'y' => 0],
            'data' => ['label' => 'Input'],
        ],
        [
            'id' => '2',
            'position' => ['x' => 250, 'y' => 120],
            'data' => ['label' => 'Process'],
        ],
        [
            'id' => '3',
            'position' => ['x' => 500, 'y' => 0],
            'data' => ['label' => 'Output'],
        ],
    ];

    public array $edges = [
        ['id' => 'e1-2', 'source' => '1', 'target' => '2'],
        ['id' => 'e2-3', 'source' => '2', 'target' => '3'],
    ];

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('livewire.flow-editor');
    }
}
```

## 2. Create the Blade view

Use `<x-flow>` to render the canvas and `<x-slot:node>` to define the node template. Inside the slot, `node` is the Alpine reactive object for each node.

```blade
{{-- resources/views/livewire/flow-editor.blade.php --}}
<div>
    <x-flow :nodes="$nodes" :edges="$edges" style="height: 400px;">
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>
    </x-flow>
</div>
```

This gives you:
- Three nodes with labels, connected by two edges
- Drag-to-move, pan, zoom
- Connection handles for creating new edges by dragging

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 50, y: 50 }, data: { label: 'Node A' } },
        { id: 'b', position: { x: 250, y: 50 }, data: { label: 'Node B' } },
        { id: 'c', position: { x: 150, y: 180 }, data: { label: 'Node C' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
    ],
    fitViewOnInit: true,
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

### What each element does

| Element | Purpose |
|---------|---------|
| `<x-flow>` | Renders the flow canvas with `flowCanvas()` Alpine data |
| `:nodes` / `:edges` | Pass initial data from the Livewire component |
| `<x-slot:node>` | Default node template — rendered for every node |
| `<x-flow-handle>` | Connection handle Blade component |
| `node.data.label` | Alpine expression — access the node's data in the template |

## 3. Adding features

Enable built-in canvas features by adding props to `<x-flow>`:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    background="dots"
    :controls="true"
    :minimap="true"
    :fit-view-on-init="true"
    :history="true"
    style="height: 500px;"
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

| Prop | Effect |
|------|--------|
| `background="dots"` | Dot-grid background pattern (also `"lines"`, `"cross"`, `"none"`) |
| `:controls="true"` | Zoom in/out and fit-view buttons |
| `:minimap="true"` | Minimap overview in the corner |
| `:fit-view-on-init="true"` | Automatically fits all nodes in view on load |
| `:history="true"` | Enables Ctrl+Z / Ctrl+Y undo/redo |

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 50, y: 50 }, data: { label: 'Input' } },
        { id: 'b', position: { x: 250, y: 50 }, data: { label: 'Process' } },
        { id: 'c', position: { x: 450, y: 50 }, data: { label: 'Output' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'c' },
    ],
    background: 'dots',
    controls: true,
    minimap: true,
    fitViewOnInit: true,
})" class="flow-container" style="height: 280px;">
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

## 4. Handling events

React to canvas events on the server by adding event attributes to `<x-flow>`:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    @connect="onConnect"
    @node-click="onNodeClick"
    @node-drag-end="onNodeDragEnd"
    style="height: 500px;"
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

Then add the `WithWireFlow` trait and define handler methods on your component:

```php
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;

class FlowEditor extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => '1', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Input']],
        ['id' => '2', 'position' => ['x' => 250, 'y' => 120], 'data' => ['label' => 'Process']],
        ['id' => '3', 'position' => ['x' => 500, 'y' => 0], 'data' => ['label' => 'Output']],
    ];

    public array $edges = [
        ['id' => 'e1-2', 'source' => '1', 'target' => '2'],
        ['id' => 'e2-3', 'source' => '2', 'target' => '3'],
    ];

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
        ];
    }

    public function onNodeClick(string $nodeId, array $node): void
    {
        // Handle node click — e.g., open a detail panel
    }

    public function onNodeDragEnd(string $nodeId, array $position): void
    {
        // Persist the new position
    }

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('livewire.flow-editor');
    }
}
```

The `@event` syntax on `<x-flow>` maps canvas events to your Livewire methods. See [Event Handlers](../server/events.md) for the full list.

## 5. Server-side sync

By default, nodes and edges are passed as initial data and managed client-side. Enable two-way sync to keep them entangled with your Livewire component:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :sync="true">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

With sync enabled, node positions, edge connections, and other changes are automatically entangled with your Livewire component's `$nodes` and `$edges` properties via `$wire.entangle()`.

There are three sync modes:

| Mode | Prop | Behavior |
|------|------|----------|
| **Static** | (default) | Nodes/edges passed as initial data. Client-side only. |
| **Sync** | `:sync="true"` | Two-way `$wire.entangle()`. Changes sync to server. |
| **Listen** | `:listen="true"` | Server pushes updates, client is non-interactive. |

See [Core Concepts](concepts.md) for more on how sync works.

## Next steps

- [Core Concepts](concepts.md) — how WireFlow bridges Blade and AlpineFlow
- [Components](../components/_index.md) — all Blade components, node/edge data shapes, and edge types
- [WithWireFlow Trait](../server/_index.md) — server-side flow control, convenience methods, and event handlers
- [Configuration](../configuration.md) — theme, injection settings, and common config options
- [AlpineFlow Edges](https://artisanflow.dev/docs/alpineflow/features/edges) — edge types, markers, labels, gradients, animations
- [AlpineFlow Animation](https://artisanflow.dev/docs/alpineflow/features/animation) — animate(), timeline(), particles, camera follow
- [AlpineFlow Theming](https://artisanflow.dev/docs/alpineflow/features/theming) — CSS variables, dark mode, custom themes
