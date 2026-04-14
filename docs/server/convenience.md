---
title: Convenience Methods
description: Simplified methods for common operations.
order: 2
---

# Convenience Methods

The `WithWireFlow` trait includes convenience methods that wrap common multi-step operations into single calls. These cover moving nodes, focusing the camera, creating connections, visual feedback, and visibility/lock state.

## All convenience methods

| Method | Description |
|--------|-------------|
| `flowUpdate(array $targets, array $options)` | Update nodes/edges/viewport instantly |
| `flowAnimate(array $targets, array $options)` | Animate nodes/edges/viewport with smooth transitions (300ms default) |
| `flowMoveNode(string $id, float $x, float $y, ?int $duration)` | Move a single node. Instant by default, pass `duration` for smooth transition. |
| `flowUpdateNode(string $id, array $changes, ?int $duration)` | Update any node properties (position, data, style, class, etc.) |
| `flowFocusNode(string $id, ?int $duration, float $padding)` | Pan and zoom to center on a specific node. Defaults to 300ms smooth. |
| `flowConnect(string $source, string $target, ?int $duration, ?string $edgeId, array $options)` | Create an edge between two nodes. Pass `duration` for draw-in animation. Auto-generates edge ID if omitted. |
| `flowDisconnect(string $source, string $target, ?int $duration)` | Remove edge(s) between two nodes. Pass `duration` for fade-out animation. |
| `flowHighlightNode(string $id, string $style, ?int $duration)` | Flash a preset visual state then revert. Presets: `'success'`, `'error'`, `'warning'`, `'info'`. Default: 1500ms. |
| `flowHighlightPath(array $nodeIds, array $options)` | Fire particles along edges connecting a sequence of nodes. Accepts any particle option (`renderer`, `color`, `size`, `duration`, `delay`, `gradient`, `length`, `width`, `easing`, …). |
| `flowLockNode(string $id)` | Lock a node (prevent drag, show dashed border) |
| `flowUnlockNode(string $id)` | Unlock a node |
| `flowHideNode(string $id)` | Hide a node from rendering |
| `flowShowNode(string $id)` | Show a hidden node |
| `flowSelectNodes(array $ids)` | Select specific nodes (deselects all others first) |
| `flowSelectEdges(array $ids)` | Select specific edges (deselects all others first) |

## flowMoveNode

Move a single node to new coordinates. Pass `duration` in milliseconds for a smooth transition, or omit for an instant move.

```php
// Instant move
$this->flowMoveNode('step-3', 400, 200);

// Smooth move over 500ms
$this->flowMoveNode('step-3', 400, 200, duration: 500);
```

## flowUpdateNode

Update any combination of node properties. Merges with existing values.

```php
// Update label and style
$this->flowUpdateNode('step-1', [
    'data' => ['label' => 'Updated Label', 'status' => 'complete'],
    'class' => 'bg-green-100 border-green-500',
]);

// Animate position + data change over 400ms
$this->flowUpdateNode('step-1', [
    'position' => ['x' => 500, 'y' => 100],
    'data' => ['label' => 'Moved!'],
], duration: 400);
```

## flowFocusNode

Pan and zoom the viewport to center on a specific node. Defaults to a 300ms smooth transition.

```php
// Default smooth focus
$this->flowFocusNode('step-2');

// Custom duration and padding
$this->flowFocusNode('step-2', duration: 600, padding: 100);
```

## flowConnect / flowDisconnect

Create or remove edges between nodes. Optionally animate the transition.

```php
// Create edge instantly
$this->flowConnect('step-1', 'step-2');

// Create edge with draw-in animation and custom ID
$this->flowConnect('step-1', 'step-2', duration: 600, edgeId: 'approval-edge');

// Create edge with additional options
$this->flowConnect('step-1', 'step-2', duration: 400, options: [
    'type' => 'smoothstep',
    'animated' => true,
]);

// Remove edge(s) between nodes
$this->flowDisconnect('step-1', 'step-2');

// Remove with fade-out animation
$this->flowDisconnect('step-1', 'step-2', duration: 300);
```

## flowHighlightNode

Flash a preset visual style on a node, then automatically revert. Four presets are available:

| Preset | Visual |
|--------|--------|
| `'success'` | Green glow |
| `'error'` | Red glow |
| `'warning'` | Amber glow |
| `'info'` | Blue glow |

```php
// Default 1500ms highlight
$this->flowHighlightNode('step-1', 'success');

// Custom duration
$this->flowHighlightNode('step-1', 'error', duration: 3000);
```

## flowHighlightPath

Fire particles along edges connecting a sequence of nodes, creating a cascading trail effect. Options are passed through to each particle, so any `$flow.sendParticle()` option works — renderer, gradient, beam geometry, easing, etc.

```php
// Simple path highlight
$this->flowHighlightPath(['step-1', 'step-2', 'step-3']);

// Customized particles
$this->flowHighlightPath(['step-1', 'step-2', 'step-3'], [
    'color' => '#22c55e',
    'size' => 6,
    'duration' => 1000,
    'delay' => 200,       // Delay between each segment
]);

// Beam with a multi-stop gradient (all options reach the particle)
$this->flowHighlightPath(['step-1', 'step-2', 'step-3'], [
    'renderer' => 'beam',
    'length' => 60,
    'width' => 4,
    'duration' => 900,
    'delay' => 220,
    'gradient' => [
        ['offset' => 0,   'color' => '#06B6D4', 'opacity' => 0],
        ['offset' => 0.7, 'color' => '#D946EF', 'opacity' => 0.8],
        ['offset' => 1,   'color' => '#fff',    'opacity' => 1],
    ],
]);
```

> **v0.2.0-alpha fix:** prior versions silently dropped every option other than `color` / `size` / `duration` / `delay`. Renderer, gradient, and beam options now pass through unchanged.

## flowLockNode / flowUnlockNode

Lock prevents dragging and shows a dashed border. Unlock restores normal interaction.

```php
$this->flowLockNode('step-1');    // Prevent drag, show dashed border
$this->flowUnlockNode('step-1'); // Restore normal interaction
```

## flowHideNode / flowShowNode

Toggle node visibility without removing it from the data.

```php
$this->flowHideNode('debug-panel');
$this->flowShowNode('debug-panel');
```

## flowSelectNodes / flowSelectEdges

Programmatically select nodes or edges. Deselects all others first.

```php
$this->flowSelectNodes(['step-1', 'step-3']);
$this->flowSelectEdges(['e-1-2']);
```

## Example: Workflow step approval

A complete approval workflow that locks the completed step, highlights it green, draws in the connecting edge, fires particles along the path, and focuses the next step:

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Attributes\Renderless;
use Livewire\Component;

class ApprovalFlow extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => 'draft', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Draft', 'status' => 'current']],
        ['id' => 'review', 'position' => ['x' => 300, 'y' => 0], 'data' => ['label' => 'Review', 'status' => 'pending']],
        ['id' => 'approved', 'position' => ['x' => 600, 'y' => 0], 'data' => ['label' => 'Approved', 'status' => 'pending']],
    ];

    public array $edges = [];

    #[Renderless]
    public function approve(string $stepId): void
    {
        $nextStep = $this->getNextStep($stepId);

        $this->flowLockNode($stepId);
        $this->flowHighlightNode($stepId, 'success');
        $this->flowConnect($stepId, $nextStep, duration: 600);
        $this->flowHighlightPath([$stepId, $nextStep]);
        $this->flowFocusNode($nextStep);
    }

    #[Renderless]
    public function reject(string $stepId): void
    {
        $this->flowHighlightNode($stepId, 'error');
        $this->flowFocusNode($stepId);
    }

    private function getNextStep(string $current): string
    {
        $order = ['draft', 'review', 'approved'];
        $index = array_search($current, $order);

        return $order[$index + 1] ?? $order[$index];
    }

    public function render()
    {
        return view('livewire.approval-flow');
    }
}
```

```blade
{{-- resources/views/livewire/approval-flow.blade.php --}}
<div>
    <x-flow :nodes="$nodes" :edges="$edges" :fit-view-on-init="true" style="height: 400px;">
        <x-slot:node>
            <x-flow-handle type="target" position="left" />
            <div class="p-3">
                <div class="font-semibold" x-text="node.data.label"></div>
                <div class="mt-2 flex gap-1">
                    <button
                        x-show="node.data.status === 'current'"
                        x-on:click="$wire.approve(node.id)"
                        class="rounded bg-green-500 px-2 py-1 text-xs text-white"
                    >
                        Approve
                    </button>
                    <button
                        x-show="node.data.status === 'current'"
                        x-on:click="$wire.reject(node.id)"
                        class="rounded bg-red-500 px-2 py-1 text-xs text-white"
                    >
                        Reject
                    </button>
                </div>
            </div>
            <x-flow-handle type="source" position="right" />
        </x-slot:node>
    </x-flow>
</div>
```

::demo
```toolbar
<button id="demo-approve" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Approve</button>
<button id="demo-reset" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Reset</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'submit', position: { x: 0, y: 50 }, data: { label: 'Submit' } },
        { id: 'review', position: { x: 200, y: 50 }, data: { label: 'Review' } },
        { id: 'done', position: { x: 400, y: 50 }, data: { label: 'Done' } },
    ],
    edges: [
        { id: 'e1', source: 'submit', target: 'review' },
        { id: 'e2', source: 'review', target: 'done' },
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 200px;"
   x-init="
        document.getElementById('demo-approve').addEventListener('click', () => {
            const n = nodes.find(n => n.id === 'review');
            if (n) { n.class = 'flow-node-success'; n.draggable = false; }
            edges.filter(e => e.source === 'review').forEach(e => {
                $flow.sendParticle(e.id, { color: '#14B8A6', size: 4, duration: '1s' });
            });
        });
        document.getElementById('demo-reset').addEventListener('click', () => {
            const n = nodes.find(n => n.id === 'review');
            if (n) { n.class = ''; n.draggable = true; }
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

## Example: Move and focus

```php
#[Renderless]
public function repositionNode(string $id, float $x, float $y): void
{
    $this->flowMoveNode($id, $x, $y, duration: 500);
    $this->flowFocusNode($id, duration: 400);
}
```

## Example: Remote control panel

A panel of buttons demonstrating several convenience methods working together:

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Attributes\Renderless;
use Livewire\Component;

class RemoteControl extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => 'a', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Node A']],
        ['id' => 'b', 'position' => ['x' => 300, 'y' => 0], 'data' => ['label' => 'Node B']],
        ['id' => 'c', 'position' => ['x' => 150, 'y' => 200], 'data' => ['label' => 'Node C']],
    ];

    public array $edges = [
        ['id' => 'e-a-b', 'source' => 'a', 'target' => 'b'],
        ['id' => 'e-b-c', 'source' => 'b', 'target' => 'c'],
    ];

    #[Renderless]
    public function moveNodeA(): void
    {
        $this->flowMoveNode('a', 100, 100, duration: 600);
    }

    #[Renderless]
    public function selectAll(): void
    {
        $this->flowSelectNodes(['a', 'b', 'c']);
    }

    #[Renderless]
    public function highlightSuccess(): void
    {
        $this->flowHighlightNode('b', 'success');
    }

    #[Renderless]
    public function connectAC(): void
    {
        $this->flowConnect('a', 'c', duration: 500);
    }

    #[Renderless]
    public function lockB(): void
    {
        $this->flowLockNode('b');
    }

    #[Renderless]
    public function unlockB(): void
    {
        $this->flowUnlockNode('b');
    }

    public function render()
    {
        return view('livewire.remote-control');
    }
}
```

```blade
{{-- resources/views/livewire/remote-control.blade.php --}}
<div>
    <div class="mb-4 flex flex-wrap gap-2">
        <button wire:click="moveNodeA" class="rounded bg-blue-500 px-3 py-1 text-sm text-white">Move A</button>
        <button wire:click="selectAll" class="rounded bg-purple-500 px-3 py-1 text-sm text-white">Select All</button>
        <button wire:click="highlightSuccess" class="rounded bg-green-500 px-3 py-1 text-sm text-white">Highlight B</button>
        <button wire:click="connectAC" class="rounded bg-indigo-500 px-3 py-1 text-sm text-white">Connect A-C</button>
        <button wire:click="lockB" class="rounded bg-amber-500 px-3 py-1 text-sm text-white">Lock B</button>
        <button wire:click="unlockB" class="rounded bg-gray-500 px-3 py-1 text-sm text-white">Unlock B</button>
    </div>

    <x-flow :nodes="$nodes" :edges="$edges" :fit-view-on-init="true" style="height: 400px;">
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
<button id="demo-rc-move" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Move Node</button>
<button id="demo-rc-highlight" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Highlight</button>
<button id="demo-rc-lock" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Lock</button>
<button id="demo-rc-focus" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Focus</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 50, y: 50 }, data: { label: 'Alpha' } },
        { id: 'b', position: { x: 300, y: 50 }, data: { label: 'Beta' } },
        { id: 'c', position: { x: 175, y: 180 }, data: { label: 'Gamma' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'c' },
    ],
    background: 'dots',
    fitViewOnInit: true,
})" class="flow-container" style="height: 280px;"
   x-init="
        document.getElementById('demo-rc-move').addEventListener('click', () => {
            const n = nodes.find(n => n.id === 'c');
            if (n) { n.position = { x: n.position.x + 30, y: n.position.y }; }
        });
        document.getElementById('demo-rc-highlight').addEventListener('click', () => {
            const n = nodes.find(n => n.id === 'b');
            if (n) n.class = n.class === 'flow-node-warning' ? '' : 'flow-node-warning';
        });
        document.getElementById('demo-rc-lock').addEventListener('click', () => {
            const n = nodes.find(n => n.id === 'a');
            if (n) { n.draggable = !n.draggable; n.class = n.draggable === false ? 'flow-node-muted' : ''; }
        });
        document.getElementById('demo-rc-focus').addEventListener('click', () => {
            $flow.fitView({ nodes: ['c'], duration: 300, padding: 0.5 });
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

- [WithWireFlow Trait](trait.md) -- setup and all base methods
- [Event Handlers](events.md) -- handle canvas events on the server
- [Update & Animate](../animation/basics.md) -- flowUpdate vs flowAnimate in depth
- [Particles](../animation/particles.md) -- flowSendParticle and flowHighlightPath details
