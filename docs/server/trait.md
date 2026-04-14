---
title: WithWireFlow Trait
description: Server-side flow control setup and base methods.
order: 1
---

# WithWireFlow Trait

The `WithWireFlow` trait gives your Livewire component methods to control the flow canvas from the server: dispatch viewport changes, add or remove nodes and edges, manage layout, undo/redo history, and collapse/expand groups.

## Setup

Add the trait to any Livewire component that uses `<x-flow>`:

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;

class FlowEditor extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => '1', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Start']],
        ['id' => '2', 'position' => ['x' => 250, 'y' => 100], 'data' => ['label' => 'End']],
    ];

    public array $edges = [
        ['id' => 'e1', 'source' => '1', 'target' => '2'],
    ];

    public function render()
    {
        return view('livewire.flow-editor');
    }
}
```

All `flow*` methods dispatch Livewire events that the AlpineFlow bridge picks up and executes on the client.

## Viewport

| Method | Description |
|--------|-------------|
| `$this->flowFitView()` | Fit all nodes in viewport |
| `$this->flowZoomIn()` | Zoom in one step |
| `$this->flowZoomOut()` | Zoom out one step |
| `$this->flowSetCenter(float $x, float $y, ?float $zoom)` | Pan/zoom to coordinates |
| `$this->flowSetViewport(array $viewport)` | Set viewport `['x' => 0, 'y' => 0, 'zoom' => 1]` |
| `$this->flowPanBy(float $dx, float $dy)` | Pan by offset |
| `$this->flowFitBounds(array $rect, array $options)` | Fit specific bounds `['x', 'y', 'width', 'height']` |
| `$this->flowToggleInteractive()` | Toggle pan/zoom/drag on the entire canvas |

### Viewport examples

```php
// Fit all content with padding
$this->flowFitView();

// Zoom to a specific region
$this->flowFitBounds(
    ['x' => 0, 'y' => 0, 'width' => 500, 'height' => 300],
    ['padding' => 50],
);

// Center on a coordinate
$this->flowSetCenter(250, 150, zoom: 1.5);

// Nudge the viewport
$this->flowPanBy(100, 0); // Pan 100px right
```

## Nodes & Edges

| Method | Description |
|--------|-------------|
| `$this->flowAddNodes(array $nodes)` | Add nodes to the canvas |
| `$this->flowRemoveNodes(array $ids)` | Remove nodes by ID |
| `$this->flowAddEdges(array $edges)` | Add edges to the canvas |
| `$this->flowRemoveEdges(array $ids)` | Remove edges by ID |
| `$this->flowClear()` | Remove all nodes and edges |
| `$this->flowDeselectAll()` | Deselect everything |

### Adding nodes and edges

```php
public function addStep(): void
{
    $this->flowAddNodes([
        [
            'id' => 'step-' . uniqid(),
            'position' => ['x' => 300, 'y' => 200],
            'data' => ['label' => 'New Step'],
        ],
    ]);
}

public function connectSteps(string $from, string $to): void
{
    $this->flowAddEdges([
        [
            'id' => "e-{$from}-{$to}",
            'source' => $from,
            'target' => $to,
        ],
    ]);
}

public function removeStep(string $id): void
{
    $this->flowRemoveNodes([$id]);
}

public function reset(): void
{
    $this->flowClear();
}
```

## Update & Animation

| Method | Description |
|--------|-------------|
| `$this->flowUpdate(array $targets, array $options)` | Update nodes/edges/viewport instantly |
| `$this->flowAnimate(array $targets, array $options)` | Animate nodes/edges/viewport (300ms smooth default) |
| `$this->flowSendParticle(string $edgeId, array $options)` | Fire one particle along an edge |
| `$this->flowSendParticleAlongPath(string $path, array $options)` | Fire a particle along an arbitrary SVG path string — no edge required |
| `$this->flowSendParticleBetween(string $source, string $target, array $options)` | Fire a particle on the straight line between two node centers — no edge required |
| `$this->flowSendParticleBurst(string $edgeId, array $options)` | Fire `count` staggered particles along one edge |
| `$this->flowSendConverging(array $sourceEdgeIds, array $options)` | Fan-in: fire particles on multiple edges with synchronized arrival (or start) |
| `$this->flowCancelAll(array $filter, array $options)` | Cancel all animations matching `['tag' => …]` or `['tags' => […]]`. `options.mode`: `freeze` \| `rollback` \| `jump-end` |
| `$this->flowPauseAll(array $filter)` | Pause all animations matching the tag filter |
| `$this->flowResumeAll(array $filter)` | Resume paused animations matching the tag filter |
| `$this->flowFollow(string $nodeId, array $options)` | Camera follows a node |
| `$this->flowUnfollow()` | Stop following |

See [Update & Animate](../animation/basics.md), [Particles](../animation/particles.md), and [Camera Control](../animation/camera.md) for detailed usage.

## Layout & State

| Method | Description |
|--------|-------------|
| `$this->flowLayout(array $options)` | Apply auto-layout (dagre/elk) |
| `$this->flowFromObject(array $data)` | Load entire flow from serialized data |
| `$this->flowSetLoading(bool $loading)` | Show/hide loading overlay |
| `$this->flowPatchConfig(array $changes)` | Update config at runtime |

### Layout example

```php
public function autoLayout(): void
{
    $this->flowLayout([
        'direction' => 'TB',     // Top-to-bottom
        'spacing' => [80, 60],   // [horizontal, vertical] gap
    ]);
}

public function loadSaved(int $diagramId): void
{
    $this->flowSetLoading(true);

    $diagram = Diagram::findOrFail($diagramId);

    $this->flowFromObject([
        'nodes' => $diagram->nodes,
        'edges' => $diagram->edges,
    ]);

    $this->flowSetLoading(false);
    $this->flowFitView();
}
```

## History

| Method | Description |
|--------|-------------|
| `$this->flowUndo()` | Undo last change (requires `history: true`) |
| `$this->flowRedo()` | Redo last undone change |

Enable history on the canvas component:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :history="true">
```

```php
public function undo(): void
{
    $this->flowUndo();
}

public function redo(): void
{
    $this->flowRedo();
}
```

## Collapse/Expand

| Method | Description |
|--------|-------------|
| `$this->flowCollapseNode(string $id)` | Collapse a group node, hiding its children |
| `$this->flowExpandNode(string $id)` | Expand a collapsed group node |
| `$this->flowToggleNode(string $id)` | Toggle collapse/expand |

```php
public function toggleGroup(string $groupId): void
{
    $this->flowToggleNode($groupId);
}
```

## Using #[Renderless]

For methods that only dispatch flow commands without changing Livewire state, use the `#[Renderless]` attribute to skip the re-render cycle. This improves performance for fire-and-forget actions.

> **Livewire 3:** The `#[Renderless]` attribute requires Livewire 3.3+. On older Livewire 3.x versions, call `$this->skipRender()` at the end of the method instead.

```php
use Livewire\Attributes\Renderless;

class FlowEditor extends Component
{
    use WithWireFlow;

    #[Renderless]
    public function zoomToFit(): void
    {
        $this->flowFitView();
    }

    #[Renderless]
    public function centerOnNode(string $id): void
    {
        $this->flowSetCenter(250, 150, zoom: 1.2);
    }

    #[Renderless]
    public function toggleLock(): void
    {
        $this->flowToggleInteractive();
    }
}
```

The corresponding Blade template wires these to buttons:

```blade
<div>
    <div class="mb-4 flex gap-2">
        <button wire:click="zoomToFit">Fit View</button>
        <button wire:click="centerOnNode('step-1')">Center on Step 1</button>
        <button wire:click="toggleLock">Toggle Lock</button>
    </div>

    <x-flow :nodes="$nodes" :edges="$edges" style="height: 500px;">
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>
    </x-flow>
</div>
```

::demo
```toolbar
<button id="demo-trait-add" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Add Node</button>
<button id="demo-trait-fit" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Fit View</button>
<button id="demo-trait-clear" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Clear All</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'n1', position: { x: 50, y: 50 }, data: { label: 'Start' } },
        { id: 'n2', position: { x: 250, y: 50 }, data: { label: 'Process' } },
    ],
    edges: [
        { id: 'e1', source: 'n1', target: 'n2' },
    ],
    background: 'dots',
    fitViewOnInit: true,
})" class="flow-container" style="height: 250px;"
   x-init="
        let counter = 3;
        document.getElementById('demo-trait-add').addEventListener('click', () => {
            addNodes([{ id: 'n'+counter, position: { x: Math.random()*400, y: Math.random()*200 }, data: { label: 'Node '+counter } }]);
            counter++;
        });
        document.getElementById('demo-trait-fit').addEventListener('click', () => $flow.fitView({ duration: 300 }));
        document.getElementById('demo-trait-clear').addEventListener('click', () => {
            const ids = nodes.map(n => n.id);
            removeNodes(ids);
            counter = 1;
        });
   ">
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

## Related

- [Convenience Methods](convenience.md) -- simplified methods for common operations
- [Event Handlers](events.md) -- handle canvas events on the server
- [Server Patterns](patterns.md) -- complete working patterns and recipes
