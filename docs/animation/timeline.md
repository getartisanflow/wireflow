---
title: Timeline
description: Multi-step animations via Alpine.
order: 2
---

# Timeline

`$flow.timeline()` is a client-side API for orchestrating multi-step animations. Unlike `flowAnimate()` which runs a single transition from the server, timelines let you chain steps, run actions in parallel, loop sequences, and lock interactivity during playback -- all from Alpine expressions in your Blade templates.

## Basic usage

Build a timeline with `$flow.timeline()`, add steps, then call `.play()`:

```blade
<button
    x-on:click="
        $flow.timeline()
            .step('a', { position: { x: 300, y: 0 } }, 500)
            .step('b', { position: { x: 600, y: 0 } }, 500)
            .step('c', { position: { x: 450, y: 200 } }, 500)
            .play()
    "
>
    Play Sequence
</button>
```

Each `.step(nodeId, changes, duration)` animates a single node over the given duration in milliseconds. Steps execute sequentially -- each waits for the previous one to finish.

## step()

Animate a single node's properties over a duration:

```blade
<button x-on:click="
    $flow.timeline()
        .step('node-1', { position: { x: 400, y: 100 } }, 600)
        .step('node-1', { data: { label: 'Arrived!' } }, 300)
        .play()
">
    Move then relabel
</button>
```

## parallel()

Run multiple animations at the same time. Pass an array of step definitions:

```blade
<button x-on:click="
    $flow.timeline()
        .parallel([
            ['a', { position: { x: 200, y: 0 } }, 600],
            ['b', { position: { x: 400, y: 0 } }, 600],
            ['c', { position: { x: 300, y: 200 } }, 600],
        ])
        .play()
">
    Move all at once
</button>
```

You can mix sequential steps and parallel blocks:

```blade
<button x-on:click="
    $flow.timeline()
        .step('a', { position: { x: 100, y: 0 } }, 400)
        .parallel([
            ['b', { position: { x: 400, y: 0 } }, 500],
            ['c', { position: { x: 400, y: 200 } }, 500],
        ])
        .step('a', { position: { x: 400, y: 100 } }, 400)
        .play()
">
    Sequential then parallel then sequential
</button>
```

## loop()

Repeat the entire timeline a set number of times, or pass `Infinity` to loop forever (until the page navigates away or you call stop):

```blade
{{-- Loop 3 times --}}
<button x-on:click="
    $flow.timeline()
        .step('a', { position: { x: 300, y: 0 } }, 500)
        .step('a', { position: { x: 0, y: 0 } }, 500)
        .loop(3)
        .play()
">
    Bounce 3 times
</button>
```

## lock()

Prevent user interaction (pan, zoom, drag) while the timeline is playing. Interaction is restored automatically when playback finishes:

```blade
<button x-on:click="
    $flow.timeline()
        .lock()
        .step('a', { position: { x: 500, y: 0 } }, 800)
        .step('b', { position: { x: 500, y: 200 } }, 800)
        .play()
">
    Play (locked)
</button>
```

## Edge transitions

Timelines can also animate edges. Use the `draw` and `fade` transition styles:

```blade
<button x-on:click="
    $flow.timeline()
        .step('a', { position: { x: 300, y: 0 } }, 500)
        .step('e-a-b', { style: { opacity: 1 } }, 400, 'draw')
        .step('b', { data: { label: 'Connected!' } }, 300)
        .play()
">
    Move, draw edge, update label
</button>
```

Edge transition types:

| Type | Effect |
|------|--------|
| `'draw'` | Edge path draws in progressively from source to target |
| `'fade'` | Edge fades in from transparent to full opacity |

## Easing presets

Pass an easing name as the fourth argument to `.step()`:

```blade
<button x-on:click="
    $flow.timeline()
        .step('a', { position: { x: 400, y: 0 } }, 800, 'easeOutBounce')
        .play()
">
    Bounce in
</button>
```

Available presets:

| Easing | Description |
|--------|-------------|
| `'linear'` | Constant speed |
| `'easeIn'` | Accelerate from zero |
| `'easeOut'` | Decelerate to zero |
| `'easeInOut'` | Accelerate then decelerate |
| `'easeOutBounce'` | Bounce at the end |
| `'easeOutElastic'` | Elastic overshoot |
| `'easeOutBack'` | Slight overshoot then settle |

## x-flow-timeline directive

For reactive timelines that rebuild when data changes, use the `x-flow-timeline` directive. The timeline replays automatically when the bound expression changes:

```blade
<div x-data="{ step: 0 }">
    <x-flow :nodes="$nodes" :edges="$edges" style="height: 400px;">
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>

        {{-- Timeline replays when step changes --}}
        <template x-flow-timeline="step">
            <script type="application/json" x-text="JSON.stringify([
                { id: 'a', changes: { position: { x: step * 200, y: 0 } }, duration: 500 },
                { id: 'b', changes: { position: { x: step * 200 + 300, y: 0 } }, duration: 500 },
            ])"></script>
        </template>
    </x-flow>

    <div class="mt-4 flex gap-2">
        <button x-on:click="step++" class="rounded bg-blue-500 px-3 py-1 text-sm text-white">Next Step</button>
        <button x-on:click="step = 0" class="rounded bg-gray-500 px-3 py-1 text-sm text-white">Reset</button>
    </div>
</div>
```

## Complete example

A Livewire component that triggers a client-side timeline from server data:

```php
<?php

namespace App\Livewire;

use Livewire\Component;

class TimelineDemo extends Component
{
    public array $nodes = [
        ['id' => 'a', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Start']],
        ['id' => 'b', 'position' => ['x' => 300, 'y' => 0], 'data' => ['label' => 'Middle']],
        ['id' => 'c', 'position' => ['x' => 600, 'y' => 0], 'data' => ['label' => 'End']],
    ];

    public array $edges = [
        ['id' => 'e-a-b', 'source' => 'a', 'target' => 'b'],
        ['id' => 'e-b-c', 'source' => 'b', 'target' => 'c'],
    ];

    public function render()
    {
        return view('livewire.timeline-demo');
    }
}
```

```blade
{{-- resources/views/livewire/timeline-demo.blade.php --}}
<div>
    <div class="mb-4 flex gap-2">
        <button
            x-on:click="
                $flow.timeline()
                    .lock()
                    .step('a', { position: { x: 0, y: 100 } }, 400, 'easeOut')
                    .step('e-a-b', { style: { opacity: 1 } }, 300, 'draw')
                    .step('b', { position: { x: 300, y: 100 } }, 400, 'easeOut')
                    .step('e-b-c', { style: { opacity: 1 } }, 300, 'draw')
                    .step('c', { position: { x: 600, y: 100 } }, 400, 'easeOut')
                    .play()
            "
            class="rounded bg-blue-500 px-3 py-1 text-sm text-white"
        >
            Play Timeline
        </button>
        <button
            x-on:click="
                $flow.timeline()
                    .parallel([
                        ['a', { position: { x: 0, y: 0 } }, 500],
                        ['b', { position: { x: 300, y: 0 } }, 500],
                        ['c', { position: { x: 600, y: 0 } }, 500],
                    ])
                    .play()
            "
            class="rounded bg-gray-500 px-3 py-1 text-sm text-white"
        >
            Reset
        </button>
    </div>

    <x-flow :nodes="$nodes" :edges="$edges" :fit-view-on-init="true" style="height: 400px;">
        <x-slot:node>
            <x-flow-handle type="target" position="left" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="right" />
        </x-slot:node>
    </x-flow>
</div>
```

::demo
```toolbar
<button id="demo-seq-play" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Play</button>
<button id="demo-seq-reset" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Reset</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 60 }, data: { label: 'Step 1' } },
        { id: 'b', position: { x: 0, y: 60 }, data: { label: 'Step 2' } },
        { id: 'c', position: { x: 0, y: 60 }, data: { label: 'Step 3' } },
    ],
    edges: [],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
})" class="flow-container" style="height: 250px;"
   x-init="
       const playBtn = document.getElementById('demo-seq-play');
       const resetBtn = document.getElementById('demo-seq-reset');
       if (playBtn) playBtn.addEventListener('click', () => {
           $flow.timeline()
               .step({ nodes: ['a'], position: { x: 0, y: 60 }, duration: 400 })
               .step({ nodes: ['b'], position: { x: 200, y: 60 }, duration: 400 })
               .step({ nodes: ['c'], position: { x: 400, y: 60 }, duration: 400 })
               .play();
       });
       if (resetBtn) resetBtn.addEventListener('click', () => {
           $flow.update({ nodes: {
               a: { position: { x: 0, y: 60 } },
               b: { position: { x: 0, y: 60 } },
               c: { position: { x: 0, y: 60 } },
           }});
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

## Related

- [Update & Animate](basics.md) -- server-side flowUpdate/flowAnimate
- [Particles](particles.md) -- fire particles along edges
- [Camera Control](camera.md) -- focus and follow nodes
