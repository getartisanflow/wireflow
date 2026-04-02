---
title: Path Motion
description: Move nodes along curves, orbits, and SVG paths.
order: 3
---

# Path Motion

Move nodes along arbitrary curves instead of straight-line interpolation. AlpineFlow provides built-in path functions for orbits, waves, pendulums, and more, plus raw SVG path support.

::demo
```toolbar
<button id="demo-path-orbit" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Orbit</button>
<button id="demo-path-wave" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Wave</button>
<button id="demo-path-stop" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Stop</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'center', position: { x: 180, y: 70 }, data: { label: 'Center' }, draggable: false },
        { id: 'mover', position: { x: 330, y: 70 }, data: { label: 'Mover' } },
    ],
    edges: [
        { id: 'e1', source: 'center', target: 'mover', type: 'floating' },
    ],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 240px;"
   x-init="
       let handle = null;
       document.getElementById('demo-path-orbit').addEventListener('click', () => {
           if (handle) handle.stop();
           $flow.update({ nodes: { mover: { position: { x: 330, y: 70 } } } });
           handle = $flow.animate({
               nodes: { mover: { followPath: orbit({ cx: 200, cy: 80, radius: 80 }) } },
           }, { duration: 3000, loop: true, easing: 'linear' });
       });
       document.getElementById('demo-path-wave').addEventListener('click', () => {
           if (handle) handle.stop();
           $flow.update({ nodes: { mover: { position: { x: 10, y: 70 } } } });
           handle = $flow.animate({
               nodes: { mover: { followPath: wave({ startX: 10, startY: 80, endX: 380, endY: 80, amplitude: 50, frequency: 2 }) } },
           }, { duration: 3000, loop: 'reverse', easing: 'linear' });
       });
       document.getElementById('demo-path-stop').addEventListener('click', () => {
           if (handle) { handle.stop(); handle = null; }
           $flow.update({ nodes: { mover: { position: { x: 330, y: 70 } } } });
       });
   ">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node" :style="node.id === 'center' ? 'opacity: 1' : ''">
                <div x-flow-handle:target></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Server-Side: SVG Path Strings

You can pass SVG path `d` strings to `flowAnimate()` from your Livewire component. The node will follow the curve instead of moving in a straight line:

```php
// Move a node along a quadratic bezier curve
$this->flowAnimate([
    'nodes' => [
        'data-packet' => [
            'followPath' => 'M 0 100 Q 200 0 400 100',
        ],
    ],
], ['duration' => 2000]);
```

This works because `followPath` accepts either a JavaScript path function or an SVG path string. The string is converted to a path function on the client side automatically.

> **Note:** Only SVG path strings work from the server. JavaScript path functions like `orbit()` and `wave()` must be called from the client side (see below).

## Client-Side: Path Functions

For programmatic paths, use `$flow.animate()` directly in your Blade template. AlpineFlow provides these built-in path functions:

### orbit()

Circular or elliptical motion around a center point:

```blade
<x-flow :nodes="$nodes" :edges="$edges"
    x-init="
        $flow.animate({
            nodes: {
                'satellite': {
                    followPath: orbit({ cx: 200, cy: 200, radius: 100 }),
                },
            },
        }, { duration: 3000, loop: true, easing: 'linear' });
    ">
    ...
</x-flow>
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `cx` | `number` | (required) | Center X |
| `cy` | `number` | (required) | Center Y |
| `radius` | `number` | `100` | Radius (or use `rx`/`ry` for ellipse) |
| `rx` | `number` | — | Horizontal radius (overrides `radius`) |
| `ry` | `number` | — | Vertical radius (overrides `radius`) |
| `offset` | `number` | `0` | Start angle (0-1, where 1 = full rotation) |
| `clockwise` | `boolean` | `true` | Direction |

### wave()

Sinusoidal oscillation along a start-end axis:

```js
$flow.animate({
    nodes: {
        'signal': {
            followPath: wave({
                startX: 0, startY: 100,
                endX: 400, endY: 100,
                amplitude: 50,
                frequency: 2,
            }),
        },
    },
}, { duration: 2000, loop: 'reverse' });
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `startX` | `number` | (required) | Start X |
| `startY` | `number` | (required) | Start Y |
| `endX` | `number` | (required) | End X |
| `endY` | `number` | (required) | End Y |
| `amplitude` | `number` | `30` | Wave height |
| `frequency` | `number` | `1` | Number of full cycles |
| `offset` | `number` | `0` | Phase offset (0-1) |

### along()

Follow an SVG path with optional reverse and subsection control:

```js
// Follow entire path
$flow.animate({
    nodes: { 'n1': { followPath: along('M 0 0 C 100 0 200 100 300 50') } },
}, { duration: 2000 });

// Reverse, middle 50% only
along('M 0 0 C 100 0 200 100 300 50', {
    reverse: true,
    startAt: 0.25,
    endAt: 0.75,
})
```

### pendulum()

Swinging arc around a pivot point:

```js
pendulum({
    cx: 200,        // Pivot X
    cy: 50,         // Pivot Y
    radius: 100,    // Arm length
    angle: 60,      // Max swing degrees (default: 60)
    offset: 0,      // Phase offset (0-1)
})
```

### drift()

Smooth pseudo-random wandering for ambient effects:

```js
drift({
    originX: 200,   // Center X
    originY: 200,   // Center Y
    range: 20,      // Max displacement (default: 20)
    speed: 1,       // Speed multiplier (default: 1)
    seed: 0,        // Vary pattern per node (default: 0)
})
```

### stagger()

Distributes offset values across multiple items — useful for spacing orbit or wave phases:

```js
const offsets = stagger(0.25, { from: 0 });

['s1', 's2', 's3', 's4'].forEach((id, i, arr) => {
    $flow.animate({
        nodes: { [id]: { followPath: orbit({ cx: 200, cy: 200, radius: 100, offset: offsets(i, arr.length) }) } },
    }, { duration: 4000, loop: true, easing: 'linear' });
});
```

## Using with Timeline

Path functions work in timeline steps:

```blade
<x-flow :nodes="$nodes" :edges="$edges"
    x-init="
        $flow.timeline()
            .step({
                nodes: ['satellite'],
                followPath: orbit({ cx: 200, cy: 200, radius: 100 }),
                duration: 3000,
            })
            .step({
                nodes: ['satellite'],
                position: { x: 0, y: 0 },
                duration: 500,
            })
            .play();
    ">
    ...
</x-flow>
```

## Guide Paths

When using an SVG path string, you can show a visible guide overlay:

```js
$flow.animate({
    nodes: {
        'n1': {
            followPath: 'M 0 100 Q 200 0 400 100',
            guidePath: {
                visible: true,
                class: 'my-guide',
                autoRemove: true,
            },
        },
    },
}, { duration: 2000 });
```

Guide paths get the `.flow-guide-path` CSS class:

```css
.flow-guide-path {
    stroke: var(--flow-accent);
    stroke-width: 1;
    stroke-dasharray: 4 4;
    fill: none;
    opacity: 0.4;
}
```

## Custom Path Functions

Any `(t: number) => { x, y }` function works as a path:

```js
// Figure-eight
const figure8 = (t) => ({
    x: 200 + 100 * Math.sin(t * Math.PI * 2),
    y: 100 + 50 * Math.sin(t * Math.PI * 4),
});

$flow.animate({
    nodes: { 'n1': { followPath: figure8 } },
}, { duration: 4000, loop: true, easing: 'linear' });
```

## Related

- [Update & Animate](basics.md) -- flowUpdate and flowAnimate
- [Timeline](timeline.md) -- multi-step animations via Alpine
- [Camera Control](camera.md) -- focus and follow nodes
