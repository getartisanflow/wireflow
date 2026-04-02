---
title: Particles
description: Fire particles along edges from the server.
order: 4
---

# Particles

Particles are small animated dots that travel along edges, showing data flow, progress, or activity. Fire them from the server with `flowSendParticle()` on individual edges, or use `flowHighlightPath()` to cascade particles through a sequence of nodes.

## flowSendParticle

Fire a single particle along an edge:

```php
$this->flowSendParticle('e-api-db');
```

### Options

Customize the particle appearance and speed:

```php
$this->flowSendParticle('e-api-db', [
    'color' => '#3b82f6',    // Particle color (default: theme accent)
    'size' => 6,             // Particle radius in pixels (default: 4)
    'duration' => 1500,      // Travel time in ms (default: 1000)
]);
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `color` | `string` | Theme accent | CSS color value |
| `size` | `int` | `4` | Particle radius in pixels |
| `duration` | `int` | `1000` | Travel time in milliseconds |

### Firing multiple particles

Call `flowSendParticle()` multiple times to fire particles on different edges:

```php
public function showDataFlow(): void
{
    $this->flowSendParticle('e-api-auth', ['color' => '#3b82f6']);
    $this->flowSendParticle('e-api-db', ['color' => '#22c55e']);
    $this->flowSendParticle('e-db-cache', ['color' => '#f59e0b']);
}
```

## flowHighlightPath

Fire cascading particles along edges that connect a sequence of nodes. Particles fire segment by segment with a configurable delay between each:

```php
$this->flowHighlightPath(['step-1', 'step-2', 'step-3', 'step-4']);
```

The method finds the edges connecting each consecutive pair of nodes and fires particles along each one in sequence.

### Options

```php
$this->flowHighlightPath(['start', 'process', 'review', 'done'], [
    'color' => '#22c55e',    // Particle color
    'size' => 5,             // Particle radius
    'duration' => 800,       // Travel time per segment
    'delay' => 200,          // Delay between each segment
]);
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `color` | `string` | Theme accent | CSS color value |
| `size` | `int` | `4` | Particle radius in pixels |
| `duration` | `int` | `1000` | Travel time per edge segment |
| `delay` | `int` | `100` | Delay before starting the next segment |

## CSS styling

Particles render as `.flow-particle` elements inside the canvas SVG layer. Override the defaults with CSS:

```css
.flow-particle {
    filter: blur(1px);           /* Soft glow effect */
    mix-blend-mode: screen;      /* Blend with dark backgrounds */
}
```

You can also target particles by color or add animations:

```css
.flow-particle {
    filter: drop-shadow(0 0 4px currentColor);
}
```

## Complete example

A pipeline monitor that fires particles to show data flowing through the system:

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Attributes\Renderless;
use Livewire\Component;

class ParticleDemo extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => 'ingest', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Ingest']],
        ['id' => 'transform', 'position' => ['x' => 250, 'y' => 0], 'data' => ['label' => 'Transform']],
        ['id' => 'validate', 'position' => ['x' => 500, 'y' => 0], 'data' => ['label' => 'Validate']],
        ['id' => 'store', 'position' => ['x' => 750, 'y' => 0], 'data' => ['label' => 'Store']],
    ];

    public array $edges = [
        ['id' => 'e-1', 'source' => 'ingest', 'target' => 'transform'],
        ['id' => 'e-2', 'source' => 'transform', 'target' => 'validate'],
        ['id' => 'e-3', 'source' => 'validate', 'target' => 'store'],
    ];

    #[Renderless]
    public function fireSingle(): void
    {
        $this->flowSendParticle('e-1', [
            'color' => '#3b82f6',
            'size' => 5,
            'duration' => 1200,
        ]);
    }

    #[Renderless]
    public function fireAll(): void
    {
        $this->flowSendParticle('e-1', ['color' => '#3b82f6']);
        $this->flowSendParticle('e-2', ['color' => '#8b5cf6']);
        $this->flowSendParticle('e-3', ['color' => '#22c55e']);
    }

    #[Renderless]
    public function firePath(): void
    {
        $this->flowHighlightPath(['ingest', 'transform', 'validate', 'store'], [
            'color' => '#f59e0b',
            'size' => 6,
            'duration' => 800,
            'delay' => 150,
        ]);
    }

    public function render()
    {
        return view('livewire.particle-demo');
    }
}
```

```blade
{{-- resources/views/livewire/particle-demo.blade.php --}}
<div>
    <div class="mb-4 flex gap-2">
        <button wire:click="fireSingle" class="rounded bg-blue-500 px-3 py-1 text-sm text-white">
            Fire Single
        </button>
        <button wire:click="fireAll" class="rounded bg-purple-500 px-3 py-1 text-sm text-white">
            Fire All
        </button>
        <button wire:click="firePath" class="rounded bg-amber-500 px-3 py-1 text-sm text-white">
            Fire Path
        </button>
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

::demo
```toolbar
<button id="demo-particle-fire" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Fire</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 60 }, data: { label: 'Source' } },
        { id: 'b', position: { x: 250, y: 0 }, data: { label: 'Process' } },
        { id: 'c', position: { x: 500, y: 60 }, data: { label: 'Output' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'c' },
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 250px;"
   x-init="
       const fireBtn = document.getElementById('demo-particle-fire');
       if (fireBtn) fireBtn.addEventListener('click', () => {
           $flow.sendParticle('e1', { color: '#DAA532', size: 5, duration: '1s' });
           setTimeout(() => {
               $flow.sendParticle('e2', { color: '#8B5CF6', size: 5, duration: '1s' });
           }, 500);
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

- [Update & Animate](basics.md) -- flowUpdate and flowAnimate
- [Timeline](timeline.md) -- multi-step animations via Alpine
- [Camera Control](camera.md) -- focus and follow nodes
- [Convenience Methods](../server/convenience.md) -- flowHighlightPath details
