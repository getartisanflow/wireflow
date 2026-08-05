---
name: alpineflow-development
description: Build interactive flow diagrams with AlpineFlow. Covers core directives, the $flow API, animation/timeline, theming, layout addons, the schema (ER/table) addon, the workflow (run/condition/replay) addon, and whiteboard tools. Activates when working with x-flow-* directives, x-schema-* inspectors, flowCanvas(), $flow or $workflowRun magic, or flow diagram features.
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
- Configuring auto-layout algorithms (dagre/force/hierarchy/elk)
- Building schema / ER / table diagrams (`x-flow-schema`, the schema addon)
- Building workflow / execution diagrams (`x-flow-condition`, `x-flow-wait`, the workflow addon's run/replay API)

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

### 8. `viewportCulling` defaults to `'auto'`

Culling turns on **automatically** once the node count reaches `cullingAutoThreshold` (150) — off-screen nodes and edges get `display:none`. It is no longer opt-in. Set `false` to always render everything, or `true` to cull at any count:

```js
flowCanvas({ viewportCulling: 'auto' })                          // default — culls at ≥150 nodes
flowCanvas({ viewportCulling: false })                          // always render everything
flowCanvas({ viewportCulling: true, cullingAutoThreshold: 500, cullingBuffer: 100 })
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

### 10. Size the container via `containerHeight`, not Tailwind `h-full`

`.flow-container` height comes from `height: var(--flow-container-height, 400px)` — an **unlayered** rule. Tailwind v4 puts utilities like `h-full` in `@layer utilities` (lower cascade priority), so `h-full` silently loses and the container stays stuck at the 400px default (whitespace gap below the canvas). Set the height the canonical way:

```js
// config option — accepts 'auto' | 'fill' | number | string
flowCanvas({ containerHeight: 'fill' })   // fills a sized parent
```

```html
<!-- or override the variable inline (what container-height="fill" does under the hood) -->
<div x-data="flowCanvas({...})" class="flow-container" style="--flow-container-height: 100%"></div>
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

The drawing directives below require the **whiteboard addon** — they are NOT in core. Register it or every `x-flow-*-draw`/`-freehand`/`-eraser` attribute is a no-op: `import AlpineFlowWhiteboard from '@getartisanflow/alpineflow/whiteboard'; Alpine.plugin(AlpineFlowWhiteboard)`.

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
    x-flow-freehand="tool === 'draw'"
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

### Whole-graph replace

Swap the entire graph atomically. Both methods return `Promise<void>` that resolves once the new nodes are measured — so an immediate `fitView()` actually fits (no manual `nextFrame`):

```js
await $flow.replaceNodes(newNodes, newEdges);  // edges default to [] → true whole-graph swap
await $flow.fitView();                         // nodes are measured → this fits

$flow.setNodes(newNodes);                       // replace nodes only, keep current edges
```

This is the first-class replacement for the old `$clear()` + `addNodes()` workaround. Server-callable via the `flow:replaceNodes` / `flow:setNodes` wire commands.

### React only to user intent (change origin)

`nodes-change` / `edges-change` carry an `origin` so you can tell a user drop from your own API write:

```js
el.addEventListener('flow-nodes-change', (e) => {
    // e.detail = { type, nodes, origin }   // origin ∈ 'drop' | 'paste' | 'api' | 'load'
    if (e.detail.origin === 'drop') persist(e.detail.nodes);
});
$flow.addNodes(nodes, { source: 'load' });      // mutators can stamp origin (default 'api')
// the `restore` event carries origin too: 'undo' | 'redo' | 'load'
```

### Config callbacks receive the canvas context

Every config callback gets the canvas context (the same object as `$flow`) as an optional second argument — no global reference needed:

```js
flowCanvas({
    onDrop: (detail, ctx) => ctx.addNodes(nodeFrom(detail)),
    onConnect: (detail, ctx) => ctx.fitView(),
})
```

The context is passed as an argument only; it is **never** added to the event `detail`, which stays a plain serializable object for the DOM `CustomEvent`.

## v0.2.1-alpha surface

Reference for the newer canvas surface — verify signatures against the docs, don't guess:

- **`fitView(options?): Promise<boolean>`** — resolves `true` once the fit runs, `false` if nodes stay unmeasured after the retry budget. Ignoring the return works as before.
- **`interactive: boolean`** (default `true`) — start the canvas locked; a master overlay on `pannable`/`zoomable` (both forced off at init when `false`; `toggleInteractive()` restores the per-axis intent). Distinct from the per-node `locked` flag.
- **Edge-routing knobs** — `avoidantCrossingReduction: boolean | { channelGap? }` (fan shared-corridor edges into ordered lanes; runtime toggle `$flow.setCrossingReduction(value)`), `avoidantEndpointSpread: boolean | { spacing? }` (fan edges sharing one handle; per-node override `FlowNode.endpointSpread`), `avoidantSimplifyOnDrag: boolean` (default `true` — bezier during a node drag, re-route on drop). `schemaHandleGeometry: 'auto' | 'dom'` (default `'auto'` — arithmetic; `'dom'` measures handles).
- **Double-click zoom** — `zoomOnDoubleClick: 'step' | 'toggle' | false` (default `'step'`); `'toggle'` jumps to `dblClickZoomLevel` (default `1.5`) about the cursor and a second double-click restores the prior viewport.
- **`noWheelClassName`** (default `'nowheel'`) — add the class to opt an element out of wheel zoom (`.nopan` now gates panning only; wheel is gated separately). **`delegatedHandleEvents`** (default `true`) — one capture-phase handle `pointerdown` listener per canvas; `false` restores per-handle bubble listeners.
- **`data-flow-target="<selector>"`** — put on an out-of-canvas directive host (a toolbar/sidebar) so `x-flow-action`, `x-flow-snapshot`, `x-flow-edge-toolbar`, etc. resolve their canvas by selector instead of `closest()`.
- **`toImage(options?)`** — now renders edges; options `scale`, `format: 'png' | 'jpeg' | 'svg'`, `quality`, `scope`, `filename`.
- **ELK** (`$flow.elkLayout(...)`) — the `rectpacking` algorithm (packs unconnected boxes, ignores edges), `aspectRatio`, a raw `layoutOptions: Record<string, string>` escape hatch (merged last), and `includeChildren`.
- **`destroy()` runs** — teardown actually fires now; an `onDestroy(detail, ctx)` handler executes on teardown for the first time (it was silently shadowed before).
- **Keyboard shortcuts skip `contenteditable`** — typing in a `contenteditable` node body no longer deletes/moves the node or hits canvas history (Backspace/arrows/Cmd+Z edit the text).

## Addons

Addons register onto AlpineFlow's shared global registry (`globalThis.__alpineflow_registry__`), so core and each addon can ship in separate bundles. **Register core FIRST, then each addon.** A directive/method that "doesn't exist" almost always means its addon was never registered.

```js
import AlpineFlow from '@getartisanflow/alpineflow';
import AlpineFlowSchema from '@getartisanflow/alpineflow/schema';
import AlpineFlowWorkflow from '@getartisanflow/alpineflow/workflow';
import AlpineFlowWhiteboard from '@getartisanflow/alpineflow/whiteboard';
import AlpineFlowDagre from '@getartisanflow/alpineflow/dagre';

Alpine.plugin(AlpineFlow);           // core — creates the registry
Alpine.plugin(AlpineFlowSchema);     // schema directives + canvas methods
Alpine.plugin(AlpineFlowWorkflow);   // run/replay API + UI factories
Alpine.plugin(AlpineFlowWhiteboard); // drawing-tool directives
Alpine.plugin(AlpineFlowDagre);      // $flow.layout()
```

| Subpath | Registers |
|---|---|
| `/schema` | `x-schema-node-inspector`, `x-schema-row-inspector`, `x-schema-edge-inspector`, `x-schema-reorderable`, `x-schema-keyboard-nav` + canvas methods (`addField`, `renameField`, `removeField`, `reorderFields`, `inferReferences`, `schemaToJSON`, `schemaFromJSON`, `validateSchema`, `diffSchemas`, `toDot`, `schemaLayout`) |
| `/workflow` | canvas `run`/`stopRun`/`replayExecution`/`executionLog`/`resetExecutionLog`/`validateWorkflow` + `runState` getter, `$workflowRun` magic, `Alpine.data` factories `flowRunButton`/`flowStopButton`/`flowResetButton`/`flowReplayControls`/`flowExecutionLog` |
| `/whiteboard` | drawing directives `x-flow-freehand`, `x-flow-highlighter`, `x-flow-arrow-draw`, `x-flow-circle-draw`, `x-flow-rectangle-draw`, `x-flow-text-tool`, `x-flow-eraser` |
| `/dagre`, `/force`, `/hierarchy`, `/elk` | layout engines feeding `$flow.layout(...)` (install each peer dep: `@dagrejs/dagre`, `elkjs`, …) |
| `/collab` | `x-flow-cursors` + collaboration providers |
| `/css`, `/theme` | unified stylesheet + default theme tokens — one import covers ALL addons (no per-addon CSS) |

**`$flow` is the whole canvas.** `$flow` resolves to `Alpine.$data` of the `.flow-container`, so once an addon is registered its methods are reachable through it too: `$flow.addField(...)`, `$flow.run(...)`, `$flow.layout(...)`.

## Schema Addon (ER / table diagrams)

The **core** `x-flow-schema` directive renders a schema node — a header plus one row per `data.fields` entry, each row with labelled target (left) + source (right) handles so relationships connect field-to-field. The directive OWNS the element's children, so leave it empty:

```html
<template x-for="node in nodes" :key="node.id">
    <div x-flow-node="node" x-flow-schema></div>   <!-- directive stamps header + rows + handles -->
</template>
```

Node shape: `{ id, position, data: { label, fields: [{ name, type, key?: 'primary'|'foreign', required? }] } }`. Edges record `sourceHandle`/`targetHandle` = the connected field names. `x-flow-schema` renders with core alone; the **editing surface** needs `Alpine.plugin(AlpineFlowSchema)`:

- **Inspector directives** — place OUTSIDE `.flow-container`; each resolves the lone canvas via single-canvas fallback and injects reactive scope:
  - `x-schema-node-inspector` → `selectedNode` + `inspector.addField(field)` / `renameField` / `removeField` / `reorderFields`
  - `x-schema-row-inspector` → `selectedRow {nodeId, fieldName}` + `inspector.renameField(name)` / `removeField()`
  - `x-schema-edge-inspector` → `selectedEdge` + `inspector.setLabel(text)` / `removeEdge()`
- **Row directives** stamped automatically when `flowCanvas({ rowsReorderable: true })` / `keyboardConnect: true`: `x-schema-reorderable`, `x-schema-keyboard-nav`.
- **Canvas methods**: `addField(nodeId, field)` validates snake_case → returns `{applied:false, reason:'invalid-name'|'duplicate'}` on rejection; `removeField`/`renameField` cascade touching edges; plus `inferReferences()`, `schemaToJSON()`/`schemaFromJSON()`, `validateSchema`, `diffSchemas`, `toDot`, `schemaLayout`, `attachSchemaHistory`.

## Workflow Addon (run / condition / replay)

Two node-renderer directives are **core**: `x-flow-condition` (branches on an expression; renders true/false handles) and `x-flow-wait` (timed step). Register `@getartisanflow/alpineflow/workflow` for the execution engine:

- **Canvas API**: `run(startId, handlers, options)` walks the graph firing per-node handlers and recording to `executionLog`; `stopRun()`, `resetExecutionLog()`, `replayExecution(log, opts)`, `validateWorkflow()`, and a reactive `runState` getter (`'idle' | 'running' | 'paused' | 'stopped'`).
- **`$workflowRun(startId, handlers, options)`** magic — runs the nearest `.flow-container` from any scope.
- **UI factories** (`Alpine.data`, bound to the canvas run state): `flowRunButton`, `flowStopButton`, `flowResetButton`, `flowReplayControls`, `flowExecutionLog`.

## Directive Index

| Directive(s) | Source | Role |
|---|---|---|
| `x-flow-viewport`, `x-flow-node`, `x-flow-edge`, `x-flow-handle:target/source` | core | structure |
| `x-flow-panel`, `x-flow-node-toolbar`, `x-flow-edge-toolbar`, `x-flow-context-menu`, `x-flow-resizer`, `x-flow-drag-handle`, `x-flow-action`, `x-flow-loading` | core | overlays / controls |
| `x-flow-animate`, `x-flow-timeline`, `x-flow-follow` | core | animation |
| `x-flow-schema`, `x-flow-condition`, `x-flow-wait` | core | node renderers (schema / workflow) |
| `x-schema-node-inspector`, `x-schema-row-inspector`, `x-schema-edge-inspector`, `x-schema-reorderable`, `x-schema-keyboard-nav` | `/schema` | schema editing |
| `x-flow-freehand`, `x-flow-highlighter`, `x-flow-arrow-draw`, `x-flow-circle-draw`, `x-flow-rectangle-draw`, `x-flow-text-tool`, `x-flow-eraser` | `/whiteboard` | drawing tools |
| `x-flow-cursors` | `/collab` | presence |

Not exhaustive — run `grep -rn "Alpine.directive(" src/` in the package for the full set.

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

- `viewportCulling`: `'auto'` (culls off-screen nodes/edges at ≥ `cullingAutoThreshold`, default 150)
- `interactive`: `true` (set `false` to start locked)
- `fitViewOnInit`: `false`
- `pannable`: `true`
- `zoomable`: `true`
- `zoomOnDoubleClick`: `'step'` · `dblClickZoomLevel`: `1.5` (only used by `'toggle'`)
- `noWheelClassName`: `'nowheel'` · `delegatedHandleEvents`: `true`
- `minZoom`: `0.5`, `maxZoom`: `2`
- `background`: `'dots'`
- `connectOnClick`: `true`
- `edgesReconnectable`: `true`
- `avoidantSimplifyOnDrag`: `true` · `schemaHandleGeometry`: `'auto'` · `avoidantCrossingReduction`/`avoidantEndpointSpread`: off
- `history`: `false` (opt-in)
- `selectionOnDrag`: `false`
- `connectionMode`: `'strict'`

Search docs for the complete configuration reference with 120+ options.

## Migration

When upgrading a project across **v0.1.x → v0.2.1-alpha**, or debugging behavior that changed, consult the canonical guide: `docs/migration/v0.2.1-alpha.md` in the alpineflow repo (rendered at `/docs/alpineflow/migration/v0.2.1-alpha`). It walks every behavior shift with a before/after and an escape hatch. Highest-impact gotchas to check first:

- **Selection is no longer undoable** — clicking/selecting nodes captures no history; `undo()` jumps straight to the last structural change (move/add/remove/rename).
- **`canvas.viewport` settles on the next animation frame** — zoom/pan side-effects coalesce per rAF. Read the live value via the coordinate helpers (`screenToFlowPosition`…), or `await requestAnimationFrame` before asserting on `viewport`. Mostly test-facing.
- **Handle `pointerdown` is delegated** — one capture-phase listener per canvas claims it, so markup rendered *inside* a source handle no longer receives its own `pointerdown` (attach outside the handle, or set `delegatedHandleEvents: false`).
- **`viewportCulling` now `'auto'`** — off-screen nodes/edges are `display:none` at ≥150 nodes; set `false` to restore always-render.
- **`fitView()` returns `Promise<boolean>`** and **avoidant edge `d` strings changed** (rounded corners replace the Catmull-Rom spline) — re-baseline any snapshot tests that pinned exact paths.
- **DOM event names are `flow-*`** (`flow-nodes-change`, `flow-restore`, …); the `restore` payload's field is `origin` (not the interim `source`).
