---
name: alpineflow-development
description: Build interactive flow diagrams with AlpineFlow. Covers directives, $flow API, animation, theming, and whiteboard tools. Activates when working with x-flow-* directives, flowCanvas(), $flow magic, or flow diagram features.
---

# AlpineFlow Development

## When to Apply

Activate this skill when:
- Creating or modifying flow diagrams with `x-flow-*` directives
- Working with `flowCanvas()` configuration
- Using `$flow` magic methods
- Styling flows with `--flow-*` CSS variables
- Implementing whiteboard drawing tools
- Adding animation, timeline, or particle effects
- Configuring auto-layout algorithms

## Documentation

Use `search-docs` for detailed API reference. The docs at `https://artisanflow.dev/docs/alpineflow` are the source of truth for configuration options, directive props, event payloads, and CSS variables.

## Critical Rules

### 1. Always use `flow-container` class

The container element MUST have `class="flow-container"`. Without it, CSS variables don't apply and positioning breaks:

```html
<!-- CORRECT -->
<div x-data="flowCanvas({...})" class="flow-container">

<!-- WRONG — no CSS variables, no background, broken layout -->
<div x-data="flowCanvas({...})">
```

### 2. Never set `position: relative` on custom node classes

The `.flow-node` class sets `position: absolute`. Any custom class that sets `position: relative` will override it, causing nodes to stack in document flow instead of being absolutely positioned:

```css
/* WRONG — breaks node positioning */
.my-custom-node {
    position: relative;
    background: #fff;
}

/* CORRECT — flow-node already has position: absolute */
.my-custom-node {
    background: #fff;
}
```

If child elements need a positioning context, `.flow-node` itself is already `position: absolute` which serves as a positioned ancestor.

### 3. Alpine scope isolation on `x-data` elements

Directives and expressions on the SAME element as `x-data` evaluate in THAT element's scope only. They do NOT see parent `x-data` scopes:

```html
<!-- WRONG — tool is in parent scope, invisible to x-flow-freehand -->
<div x-data="{ tool: null }">
    <div x-data="flowCanvas({...})"
         x-flow-freehand="tool === 'draw'">  <!-- tool is undefined here -->
    </div>
</div>

<!-- CORRECT — spread into same scope -->
<div x-data="{
    ...flowCanvas({...}),
    tool: null,
}" x-flow-freehand="tool === 'draw'">
</div>
```

### 4. `toolSettings` must be a scope property, not config

Drawing directives read `toolSettings` from `Alpine.$data(el)`, not from the config object:

```html
<!-- WRONG — toolSettings in config is not accessible -->
<div x-data="flowCanvas({ toolSettings: { strokeColor: '#333' } })">

<!-- CORRECT — top-level scope property -->
<div x-data="{
    ...flowCanvas({...}),
    toolSettings: { strokeColor: '#333', strokeWidth: 2, opacity: 1 },
}">
```

### 5. Freehand paths use `fill`, not `stroke`

The `flow-freehand-end` event produces a filled outline path via perfect-freehand. Render with `fill`, not `stroke`:

```html
<!-- WRONG — path disappears or shows thin outline -->
<path :d="node.data.pathData" fill="none" :stroke="node.data.strokeColor" />

<!-- CORRECT — filled outline -->
<path :d="node.data.pathData" :fill="node.data.strokeColor" stroke="none" />
```

### 6. SVG annotations need overflow:visible

Annotation SVGs render at flow coordinates from a 1x1 container:

```html
<svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
    <path :d="node.data.pathData" :fill="node.data.strokeColor" stroke="none" />
</svg>
```

### 7. Panel CSS class selector

When checking if a click target is inside a panel, use `.flow-panel` class, not `[x-flow-panel]` attribute:

```js
// WRONG — attribute selector doesn't match Alpine directive attributes
target.closest('[x-flow-panel]')

// CORRECT — the directive adds this CSS class
target.closest('.flow-panel')
```

### 8. `viewportCulling` is opt-in

Viewport culling is `false` by default. Enable it explicitly for performance on large diagrams:

```js
flowCanvas({ viewportCulling: true, cullingBuffer: 100 })
```

### 9. `update()` vs `animate()`

`update()` is the core method (instant by default). `animate()` is a wrapper with 300ms default:

```js
// Instant update
$flow.update({ nodes: { 'a': { position: { x: 300 } } } });

// Smooth transition (300ms default)
$flow.animate({ nodes: { 'a': { position: { x: 300 } } } });

// Custom duration on either
$flow.update({ nodes: { 'a': { position: { x: 300 } } } }, { duration: 500 });
```

## Common Patterns

### Minimal flow

```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Start' } },
        { id: 'b', position: { x: 250, y: 100 }, data: { label: 'End' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
    ],
    background: 'dots',
})" class="flow-container" style="height: 400px;">
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

### Whiteboard with all tools

```html
<div x-data="{
    ...flowCanvas({
        nodes: [], edges: [],
        selectionOnDrag: true,
        panOnDrag: [2],
        background: 'dots',
    }),
    tool: null,
    toolSettings: { strokeColor: '#334155', strokeWidth: 2, opacity: 1 },
}"
    class="flow-container"
    x-flow-freehand.filled="tool === 'draw'"
    x-flow-highlighter="tool === 'highlighter'"
    x-flow-arrow-draw="tool === 'arrow'"
    x-flow-circle-draw="tool === 'circle'"
    x-flow-rectangle-draw="tool === 'rectangle'"
    x-flow-text-tool="tool === 'text'"
    x-flow-eraser="tool === 'eraser'"
    @flow-freehand-end="addNodes([{
        id: 'ann-' + Date.now(),
        position: { x: 0, y: 0 },
        draggable: false, selectable: false,
        class: 'flow-node-annotation',
        data: { annotation: 'drawing', pathData: $event.detail.pathData, strokeColor: $event.detail.strokeColor, opacity: $event.detail.opacity },
    }])"
>
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <!-- Annotation template -->
                <template x-if="node.data?.annotation === 'drawing'">
                    <svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
                        <path :d="node.data.pathData" :fill="node.data.strokeColor" :opacity="node.data.opacity ?? 1" stroke="none" />
                    </svg>
                </template>
                <!-- Regular node -->
                <template x-if="!node.data?.annotation">
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

Event listeners needed for ALL tools: `flow-freehand-end`, `flow-highlight-end`, `flow-rectangle-draw`, `flow-arrow-draw`, `flow-circle-draw`, `flow-text-draw`. Each creates an annotation node with `class: 'flow-node-annotation'`. See whiteboard addon docs for complete event handler and node template code for every tool type.

### Timeline animation

```js
$flow.timeline()
    .step({ nodes: ['a'], position: { x: 200 }, duration: 600, easing: 'easeInOut' })
    .step({ nodes: ['b'], position: { x: 200 }, duration: 600 })
    .parallel([
        { edges: ['e1'], edgeColor: '#22c55e', duration: 400 },
        { edges: ['e2'], edgeColor: '#22c55e', duration: 400 },
    ])
    .play()
```

### Path motion

Move nodes along curves with `followPath` on `animate()` or in timeline steps:

```js
// Orbit — JS path function (client-side only)
$flow.animate({
    nodes: { 'satellite': { followPath: orbit({ cx: 200, cy: 200, radius: 100 }) } },
}, { duration: 3000, loop: true, easing: 'linear' });

// SVG path string — also works from server via flowAnimate()
$flow.animate({
    nodes: { 'n1': { followPath: 'M 0 100 Q 200 0 400 100' } },
}, { duration: 2000 });
```

Built-in path functions: `orbit()`, `wave()`, `along()`, `pendulum()`, `drift()`, `stagger()`. Search docs for full options.

### Edge with draw-in animation

```js
$flow.timeline()
    .step({
        addEdges: [{ id: 'e-new', source: 'a', target: 'b', markerEnd: 'arrowclosed' }],
        edgeTransition: 'draw',
        duration: 800,
    })
    .play()
```

## Addon Registration

Addons share a global registry via `globalThis.__alpineflow_registry__`. Core and addons can be loaded from different bundles:

```js
import AlpineFlow from '@getartisanflow/alpineflow';
import AlpineFlowDagre from '@getartisanflow/alpineflow/dagre';

Alpine.plugin(AlpineFlow);
Alpine.plugin(AlpineFlowDagre);
// $flow.layout() now works — dagre registered on shared registry
```

## Theming

All visual properties use `--flow-*` CSS variables. Override on `.flow-container`:

```css
.flow-container {
    --flow-node-selected-border-color: #3b82f6;
    --flow-node-hover-border-color: #3b82f6;
    --flow-handle-active-bg: #3b82f6;
    --flow-edge-stroke-selected: #3b82f6;
}
```

Search docs for the full CSS variable reference — do not guess variable names.

## Key Defaults

- `viewportCulling`: `false` (opt-in)
- `fitViewOnInit`: `false`
- `pannable`: `true`
- `zoomable`: `true`
- `minZoom`: `0.5`, `maxZoom`: `2`
- `background`: `'dots'`
- `connectOnClick`: `true`
- `edgesReconnectable`: `true`
- `history`: `false` (opt-in)
- `selectionOnDrag`: `false`
- `connectionMode`: `'strict'`

Search docs for the complete configuration reference with 120+ options.
