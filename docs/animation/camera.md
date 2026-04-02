---
title: Camera Control
description: Focus and follow nodes from the server.
order: 5
---

# Camera Control

WireFlow provides server-side methods to control the viewport camera: `flowFocusNode()` pans and zooms to center on a specific node, while `flowFollow()` / `flowUnfollow()` keep the camera tracking a node as it moves. The `x-flow-follow` directive offers a client-side alternative for follow mode.

::demo
```toolbar
<button id="demo-cam-top-a" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Focus A</button>
<button id="demo-cam-top-c" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Focus C</button>
<button id="demo-cam-top-follow" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Follow B</button>
<button id="demo-cam-top-reset" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Fit View</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Step A' } },
        { id: 'b', position: { x: 300, y: 0 }, data: { label: 'Step B' } },
        { id: 'c', position: { x: 600, y: 0 }, data: { label: 'Step C' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'c' },
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
})" class="flow-container" style="height: 220px;"
   x-init="
       let fh = null;
       document.getElementById('demo-cam-top-a').addEventListener('click', () => { if (fh) { fh.stop(); fh = null; } fh = $flow.follow({ x: 0, y: 0 }, { zoom: 2 }); });
       document.getElementById('demo-cam-top-c').addEventListener('click', () => { if (fh) { fh.stop(); fh = null; } fh = $flow.follow({ x: 600, y: 0 }, { zoom: 2 }); });
       document.getElementById('demo-cam-top-follow').addEventListener('click', () => { if (fh) fh.stop(); fh = $flow.follow('b', { zoom: 1.5 }); });
       document.getElementById('demo-cam-top-reset').addEventListener('click', () => { if (fh) { fh.stop(); fh = null; } $flow.fitView({ duration: 300 }); });
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

## flowFocusNode

Pan and zoom the viewport to center on a specific node. Defaults to a 300ms smooth transition:

```php
// Default smooth focus
$this->flowFocusNode('step-2');
```

### Options

```php
$this->flowFocusNode('step-2', duration: 600, padding: 100);
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `$id` | `string` | (required) | Target node ID |
| `$duration` | `?int` | `300` | Transition duration in ms. Pass `0` for instant. |
| `$padding` | `float` | `50` | Padding around the node in pixels |

### Use cases

Focus after creating a new node:

```php
public function addNode(): void
{
    $id = 'node-' . uniqid();

    $this->flowAddNodes([
        [
            'id' => $id,
            'position' => ['x' => 800, 'y' => 400],
            'data' => ['label' => 'New Node'],
        ],
    ]);

    $this->flowFocusNode($id, duration: 400);
}
```

Focus on the next step in a workflow:

```php
public function approve(string $stepId): void
{
    $nextStep = $this->getNextStep($stepId);

    $this->flowLockNode($stepId);
    $this->flowHighlightNode($stepId, 'success');
    $this->flowFocusNode($nextStep, duration: 500);
}
```

Click "Focus" buttons to pan/zoom to each node, or "Follow" to track a node as you drag it:

::demo
```toolbar
<button id="demo-focus-a" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Focus A</button>
<button id="demo-focus-c" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Focus C</button>
<button id="demo-follow-b" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Follow B</button>
<button id="demo-cam-reset" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Fit View</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Step A' } },
        { id: 'b', position: { x: 300, y: 0 }, data: { label: 'Step B' } },
        { id: 'c', position: { x: 600, y: 0 }, data: { label: 'Step C' } },
        { id: 'd', position: { x: 300, y: 200 }, data: { label: 'Step D' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'c' },
        { id: 'e3', source: 'b', target: 'd' },
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
})" class="flow-container" style="height: 280px;"
   x-init="
       let followHandle = null;
       document.getElementById('demo-focus-a').addEventListener('click', () => {
           if (followHandle) { followHandle.stop(); followHandle = null; }
           followHandle = $flow.follow({ x: 0, y: 0 }, { zoom: 2 });
       });
       document.getElementById('demo-focus-c').addEventListener('click', () => {
           if (followHandle) { followHandle.stop(); followHandle = null; }
           followHandle = $flow.follow({ x: 600, y: 0 }, { zoom: 2 });
       });
       document.getElementById('demo-follow-b').addEventListener('click', () => {
           if (followHandle) followHandle.stop();
           followHandle = $flow.follow('b', { zoom: 1.5 });
       });
       document.getElementById('demo-cam-reset').addEventListener('click', () => {
           if (followHandle) { followHandle.stop(); followHandle = null; }
           $flow.fitView({ duration: 300 });
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

## flowFollow / flowUnfollow

Make the camera track a node continuously. As the node moves (via drag, animation, or server updates), the viewport stays centered on it:

```php
// Start following
$this->flowFollow('active-node');

// Follow with options
$this->flowFollow('active-node', [
    'zoom' => 1.5,        // Lock zoom level while following
    'speed' => 0.1,       // Camera smoothing (0-1, lower = smoother)
    'padding' => 80,      // Padding around the node
]);

// Stop following
$this->flowUnfollow();
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `zoom` | `float` | Current zoom | Lock zoom level while following |
| `speed` | `float` | `0.15` | Camera smoothing factor (0 = very smooth, 1 = instant) |
| `padding` | `float` | `50` | Padding around the tracked node |

### Example: Follow a processing node

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Attributes\Renderless;
use Livewire\Component;

class FollowDemo extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => 'a', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Step A']],
        ['id' => 'b', 'position' => ['x' => 400, 'y' => 0], 'data' => ['label' => 'Step B']],
        ['id' => 'c', 'position' => ['x' => 800, 'y' => 0], 'data' => ['label' => 'Step C']],
        ['id' => 'd', 'position' => ['x' => 400, 'y' => 300], 'data' => ['label' => 'Step D']],
    ];

    public array $edges = [
        ['id' => 'e-a-b', 'source' => 'a', 'target' => 'b'],
        ['id' => 'e-b-c', 'source' => 'b', 'target' => 'c'],
        ['id' => 'e-b-d', 'source' => 'b', 'target' => 'd'],
    ];

    #[Renderless]
    public function focusA(): void
    {
        $this->flowFocusNode('a', duration: 500);
    }

    #[Renderless]
    public function focusC(): void
    {
        $this->flowFocusNode('c', duration: 500, padding: 100);
    }

    #[Renderless]
    public function focusD(): void
    {
        $this->flowFocusNode('d', duration: 500);
    }

    #[Renderless]
    public function followB(): void
    {
        $this->flowFollow('b', [
            'zoom' => 1.2,
            'speed' => 0.1,
        ]);
    }

    #[Renderless]
    public function stopFollow(): void
    {
        $this->flowUnfollow();
    }

    public function render()
    {
        return view('livewire.follow-demo');
    }
}
```

```blade
{{-- resources/views/livewire/follow-demo.blade.php --}}
<div>
    <div class="mb-4 flex flex-wrap gap-2">
        <button wire:click="focusA" class="rounded bg-blue-500 px-3 py-1 text-sm text-white">Focus A</button>
        <button wire:click="focusC" class="rounded bg-blue-500 px-3 py-1 text-sm text-white">Focus C</button>
        <button wire:click="focusD" class="rounded bg-blue-500 px-3 py-1 text-sm text-white">Focus D</button>
        <button wire:click="followB" class="rounded bg-purple-500 px-3 py-1 text-sm text-white">Follow B</button>
        <button wire:click="stopFollow" class="rounded bg-gray-500 px-3 py-1 text-sm text-white">Stop Follow</button>
    </div>

    <x-flow :nodes="$nodes" :edges="$edges" :fit-view-on-init="true" style="height: 400px;">
        <x-slot:node>
            <x-flow-handle type="target" position="left" />
            <span x-text="node.data.label" class="px-2"></span>
            <x-flow-handle type="source" position="right" />
        </x-slot:node>
    </x-flow>
</div>
```

## x-flow-follow directive

For client-side follow mode that does not require a server round-trip, use the `x-flow-follow` directive directly in your Blade template. Bind it to an Alpine expression that evaluates to a node ID (or `null` to stop following):

```blade
<div x-data="{ following: null }">
    <x-flow :nodes="$nodes" :edges="$edges" style="height: 400px;">
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <div class="flex items-center gap-2 p-2">
                <span x-text="node.data.label"></span>
                <button
                    x-on:click="following = node.id"
                    class="rounded bg-purple-100 px-1 text-xs"
                    title="Follow this node"
                >
                    eye
                </button>
            </div>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>

        {{-- Follow mode driven by Alpine state --}}
        <div x-flow-follow="following"></div>
    </x-flow>

    <div class="mt-2">
        <button
            x-on:click="following = null"
            x-show="following"
            class="rounded bg-gray-500 px-3 py-1 text-sm text-white"
        >
            Stop Following
        </button>
        <span x-show="following" class="ml-2 text-sm text-gray-600">
            Following: <span x-text="following"></span>
        </span>
    </div>
</div>
```

The directive watches the bound expression reactively. When it changes to a new node ID, the camera starts tracking that node. When it changes to `null`, following stops.

## Combining focus and follow

A common pattern is to focus on a node first, then start following it:

```php
#[Renderless]
public function trackNode(string $id): void
{
    // Smooth pan to the node first
    $this->flowFocusNode($id, duration: 400);

    // Then start following
    $this->flowFollow($id, [
        'zoom' => 1.3,
        'speed' => 0.1,
    ]);
}
```

## Related

- [Update & Animate](basics.md) -- flowUpdate and flowAnimate
- [Timeline](timeline.md) -- multi-step animations via Alpine
- [Particles](particles.md) -- fire particles along edges
- [WithWireFlow Trait](../server/trait.md) -- all viewport methods
