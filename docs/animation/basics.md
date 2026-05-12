---
title: Update & Animate
description: Move and transition nodes from the server.
order: 1
---

# Update & Animate

WireFlow provides two core methods for changing node, edge, and viewport state from the server: `flowUpdate()` for instant changes and `flowAnimate()` for smooth transitions. Two convenience wrappers -- `flowMoveNode()` and `flowUpdateNode()` -- cover the most common single-node cases.

::demo
```toolbar
<button id="demo-top-update" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Update (instant)</button>
<button id="demo-top-animate" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Animate (smooth)</button>
<button id="demo-top-reset" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Reset</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'u1', position: { x: 30, y: 15 }, data: { label: 'update()' } },
        { id: 'a1', position: { x: 250, y: 15 }, data: { label: 'animate()' } },
    ],
    edges: [],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 200px;"
   x-init="
       let uDown = false, aDown = false;
       document.getElementById('demo-top-update').addEventListener('click', () => {
           uDown = !uDown;
           $flow.update({ nodes: { u1: { position: { x: 30, y: uDown ? 80 : 15 } } } });
       });
       document.getElementById('demo-top-animate').addEventListener('click', () => {
           aDown = !aDown;
           $flow.animate({ nodes: { a1: { position: { x: 250, y: aDown ? 80 : 15 } } } }, { duration: 600, easing: 'easeInOut' });
       });
       document.getElementById('demo-top-reset').addEventListener('click', () => {
           uDown = false; aDown = false;
           $flow.update({ nodes: {
               u1: { position: { x: 30, y: 15 } },
               a1: { position: { x: 250, y: 15 } },
           }});
       });
   ">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <span x-text="node.data.label"></span>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## flowUpdate vs flowAnimate

| Method | Transition | Default Duration | Use Case |
|--------|-----------|-----------------|----------|
| `flowUpdate()` | Instant | n/a | Bulk state sync, initial positioning |
| `flowAnimate()` | Smooth | 300ms | User-visible transitions, visual feedback |

Both accept the same `targets` array structure and can update nodes, edges, and the viewport in a single call.

## Targets structure

The targets array maps node/edge IDs to property changes:

```php
$targets = [
    'nodes' => [
        'node-1' => ['position' => ['x' => 400, 'y' => 200]],
        'node-2' => ['position' => ['x' => 600, 'y' => 200], 'data' => ['label' => 'Updated']],
    ],
    'edges' => [
        'e-1-2' => ['animated' => true, 'style' => ['stroke' => '#22c55e']],
    ],
    'viewport' => ['x' => 0, 'y' => 0, 'zoom' => 1.2],
];
```

## flowUpdate -- instant changes

Apply changes immediately with no transition:

```php
// Move two nodes and update the viewport at once
$this->flowUpdate([
    'nodes' => [
        'step-1' => ['position' => ['x' => 0, 'y' => 0]],
        'step-2' => ['position' => ['x' => 300, 'y' => 0]],
    ],
    'viewport' => ['x' => 0, 'y' => 0, 'zoom' => 1],
]);
```

## flowAnimate -- smooth transitions

Animate changes over a duration. Default is 300ms:

```php
// Smooth transition with default 300ms
$this->flowAnimate([
    'nodes' => [
        'step-1' => ['position' => ['x' => 400, 'y' => 100]],
    ],
]);

// Custom duration
$this->flowAnimate([
    'nodes' => [
        'step-1' => ['position' => ['x' => 400, 'y' => 100]],
        'step-2' => ['position' => ['x' => 700, 'y' => 100]],
    ],
], ['duration' => 800]);
```

### Animating multiple properties

You can animate position, data, class, and style simultaneously:

```php
$this->flowAnimate([
    'nodes' => [
        'step-1' => [
            'position' => ['x' => 500, 'y' => 200],
            'class' => 'bg-green-100 border-green-500',
            'data' => ['label' => 'Complete', 'status' => 'done'],
        ],
    ],
    'edges' => [
        'e-1-2' => [
            'style' => ['stroke' => '#22c55e', 'strokeWidth' => 3],
        ],
    ],
], ['duration' => 600]);
```

Click each button to see the difference — "Update" snaps Node A instantly, "Animate" glides Node B smoothly:

::demo
```toolbar
<button id="demo-update-btn" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Update (instant)</button>
<button id="demo-animate-btn" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Animate (smooth)</button>
<button id="demo-basics-reset" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Reset</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 30, y: 15 }, data: { label: 'Node A' } },
        { id: 'b', position: { x: 250, y: 15 }, data: { label: 'Node B' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
    ],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 200px;"
   x-init="
       let uDown = false, aDown = false;
       document.getElementById('demo-update-btn').addEventListener('click', () => {
           uDown = !uDown;
           $flow.update({ nodes: { a: { position: { x: 30, y: uDown ? 80 : 15 } } } });
       });
       document.getElementById('demo-animate-btn').addEventListener('click', () => {
           aDown = !aDown;
           $flow.animate({ nodes: { b: { position: { x: 250, y: aDown ? 80 : 15 } } } }, { duration: 600, easing: 'easeInOut' });
       });
       document.getElementById('demo-basics-reset').addEventListener('click', () => {
           uDown = false; aDown = false;
           $flow.update({ nodes: {
               a: { position: { x: 30, y: 15 } },
               b: { position: { x: 250, y: 15 } },
           }});
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

## flowMoveNode -- move a single node

A convenience wrapper that moves one node. Instant by default, pass `duration` for a smooth transition:

```php
// Instant move
$this->flowMoveNode('step-3', 400, 200);

// Smooth move over 500ms
$this->flowMoveNode('step-3', 400, 200, duration: 500);
```

Equivalent to:

```php
$this->flowAnimate([
    'nodes' => [
        'step-3' => ['position' => ['x' => 400, 'y' => 200]],
    ],
], ['duration' => 500]);
```

## flowUpdateNode -- update a single node

Update any combination of properties on a single node. Merges with existing values:

```php
// Update data and class (instant)
$this->flowUpdateNode('step-1', [
    'data' => ['label' => 'Reviewed', 'status' => 'complete'],
    'class' => 'ring-2 ring-green-500',
]);

// Animate position + data change
$this->flowUpdateNode('step-1', [
    'position' => ['x' => 500, 'y' => 100],
    'data' => ['label' => 'Moved'],
], duration: 400);
```

## Complete example

A component with instant and animated controls side by side:

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Attributes\Renderless;
use Livewire\Component;

class AnimationDemo extends Component
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
    public function moveInstant(): void
    {
        $this->flowUpdate([
            'nodes' => [
                'a' => ['position' => ['x' => 200, 'y' => 100]],
                'b' => ['position' => ['x' => 500, 'y' => 100]],
            ],
        ]);
    }

    #[Renderless]
    public function moveSmooth(): void
    {
        $this->flowAnimate([
            'nodes' => [
                'a' => ['position' => ['x' => 200, 'y' => 100]],
                'b' => ['position' => ['x' => 500, 'y' => 100]],
            ],
        ], ['duration' => 800]);
    }

    #[Renderless]
    public function resetPositions(): void
    {
        $this->flowAnimate([
            'nodes' => [
                'a' => ['position' => ['x' => 0, 'y' => 0]],
                'b' => ['position' => ['x' => 300, 'y' => 0]],
                'c' => ['position' => ['x' => 150, 'y' => 200]],
            ],
        ], ['duration' => 500]);
    }

    public function render()
    {
        return view('livewire.animation-demo');
    }
}
```

```blade
{{-- resources/views/livewire/animation-demo.blade.php --}}
<div>
    <div class="mb-4 flex gap-2">
        <button wire:click="moveInstant" class="rounded bg-gray-500 px-3 py-1 text-sm text-white">Move Instant</button>
        <button wire:click="moveSmooth" class="rounded bg-blue-500 px-3 py-1 text-sm text-white">Move Smooth</button>
        <button wire:click="resetPositions" class="rounded bg-green-500 px-3 py-1 text-sm text-white">Reset</button>
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

## Tagging animations for bulk control *(v0.2.0-alpha)*

Pass a `tag` (or `tags` array) on any animate call, then stop/pause/resume all animations matching the tag from another handler. Useful for ambient loops, progress indicators, or "cancel all running transitions" UX flows.

```php
// Start several animations all tagged 'progress-loop'
#[Renderless]
public function startProgressLoop(): void
{
    foreach ($this->nodes as $node) {
        $this->flowAnimate([
            'nodes' => [$node['id'] => ['position' => ['y' => 10]]],
        ], [
            'duration' => 1200,
            'loop' => 'ping-pong',
            'tag' => 'progress-loop',
        ]);
    }
}

// Later — pause, resume, or cancel the whole group
#[Renderless]
public function pauseLoop(): void { $this->flowPauseAll(['tag' => 'progress-loop']); }

#[Renderless]
public function resumeLoop(): void { $this->flowResumeAll(['tag' => 'progress-loop']); }

#[Renderless]
public function cancelLoop(): void
{
    $this->flowCancelAll(['tag' => 'progress-loop'], ['mode' => 'rollback']);
}
```

`flowCancelAll()` accepts a stop mode: `'jump-end'` (default), `'rollback'` (revert to starting values), or `'freeze'` (leave mid-flight). See the AlpineFlow [stop modes](https://artisanflow.dev/docs/alpineflow/animation/animate#stop-modes) reference.

## Related

- [Timeline](timeline.md) -- multi-step animations via Alpine
- [Particles](particles.md) -- fire particles along edges
- [Camera Control](camera.md) -- focus and follow nodes
- [Convenience Methods](../server/convenience.md) -- all convenience method signatures
