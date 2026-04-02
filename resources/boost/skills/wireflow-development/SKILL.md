---
name: wireflow-development
description: Build flow diagrams with WireFlow Blade components and Livewire integration. Covers Blade components, WithWireFlow trait, server-side flow control, and WireFlow-specific patterns. Activates when working with <x-flow> components, WithWireFlow trait methods, or Livewire flow diagrams.
---

# WireFlow Development

## When to Apply

Activate this skill when:
- Using `<x-flow>` or any `<x-flow-*>` Blade components
- Using the `WithWireFlow` trait in Livewire components
- Handling flow events on the server (onConnect, onNodeClick, etc.)
- Configuring WireFlow (theme, asset injection)
- Using convenience methods (flowConnect, flowHighlightNode, etc.)
- Combining whiteboard tools with WireFlow's `<x-flow>` component

Also activate the `alpineflow-development` skill — WireFlow wraps AlpineFlow, and the AlpineFlow rules apply.

## Documentation

Use `search-docs` for detailed API reference. The docs at `https://artisanflow.dev/docs/wireflow` cover components, trait methods, configuration, and events. For AlpineFlow-specific features (directives, CSS variables, animation API), search `https://artisanflow.dev/docs/alpineflow`.

## Critical Rules

### 1. Don't import Alpine separately

Livewire bundles Alpine. Never import or start Alpine yourself:

```js
// WRONG
import Alpine from 'alpinejs';
Alpine.start();

// CORRECT — register AlpineFlow on Livewire's Alpine
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
});
```

### 2. `<x-flow>` creates an isolated Alpine scope

The `<x-flow>` component renders `x-data="flowCanvas({...})"`. Attributes on `<x-flow>` evaluate in the flowCanvas scope, NOT in parent scopes.

To add custom properties (like `tool` for whiteboard), use `x-init` with `Object.assign($data, ...)`:

```blade
<!-- WRONG — tool is in parent scope, invisible to directives on <x-flow> -->
<div x-data="{ tool: null }">
    <x-flow x-flow-freehand="tool === 'draw'" ...>
    </x-flow>
</div>

<!-- CORRECT — inject into flowCanvas scope -->
<x-flow
    x-init="Object.assign($data, { tool: null, toolSettings: { strokeColor: '#333', strokeWidth: 2, opacity: 1 } })"
    x-flow-freehand.filled="tool === 'draw'"
    ...
>
```

### 3. Never use `@@event` on `<x-flow>` for custom events

Livewire 4 crashes when parsing custom event names with hyphens via `@@`. Use `$el.addEventListener` in `x-init` instead:

```blade
<!-- WRONG — Livewire crashes -->
<x-flow @@flow-freehand-end="addNodes([...])">

<!-- CORRECT — attach in x-init -->
<x-flow
    x-init="
        $el.addEventListener('flow-freehand-end', (e) => {
            addNodes([{
                id: 'ann-' + Date.now(),
                position: { x: 0, y: 0 },
                class: 'flow-node-annotation',
                data: { annotation: 'drawing', pathData: e.detail.pathData },
            }]);
        });
    "
>
```

### 4. `toolSettings` via config prop does NOT work

Drawing directives read `toolSettings` from the Alpine scope, not from config:

```blade
<!-- WRONG — toolSettings is in _config, not the scope -->
<x-flow :config="['toolSettings' => ['strokeColor' => '#333']]">

<!-- CORRECT — inject via x-init -->
<x-flow x-init="Object.assign($data, { toolSettings: { strokeColor: '#333', strokeWidth: 2, opacity: 1 } })">
```

### 5. `fitViewOnInit` not `initialFitView`

The config option was renamed:

```blade
<!-- WRONG -->
<x-flow :initial-fit-view="true">

<!-- CORRECT -->
<x-flow :fit-view-on-init="true">
```

### 6. Event listeners inside node templates use Alpine `@`, not Blade `@@`

Content inside `<x-slot:node>` is regular Blade, not a component attribute. Use single `@`:

```blade
<x-slot:node>
    <!-- This is inside the slot, Alpine handles @ directly -->
    <button @click="removeNodes([node.id])">Delete</button>
</x-slot:node>
```

## Blade Components

### `<x-flow>` — Main canvas

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    background="dots"
    :controls="true"
    :minimap="true"
    fit-view-on-init
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

### Available components

| Component | Purpose |
|-----------|---------|
| `<x-flow>` | Main canvas |
| `<x-flow-handle>` | Connection handle (type, position, id) |
| `<x-flow-panel>` | Floating overlay panel (position, resizable) |
| `<x-flow-toolbar>` | Node toolbar (position, align, offset, show) |
| `<x-flow-drag-handle>` | Restrict drag to element |
| `<x-flow-resizer>` | Resize handles (min-width, min-height) |
| `<x-flow-action>` | Action button (type: undo, redo, fit-view, etc.) |
| `<x-flow-context-menu>` | Right-click menu (scope: node, edge, pane, selection) |
| `<x-flow-collapse>` | Collapse toggle (instant, all, expand, children) |
| `<x-flow-condense>` | Condense toggle |
| `<x-flow-edge-toolbar>` | Edge toolbar (position, below, show) |
| `<x-flow-loading>` | Loading overlay (fade) |

Search docs for full prop reference per component.

## WithWireFlow Trait

### Server-to-client convenience methods

```php
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;

class MyFlow extends Component
{
    use WithWireFlow;

    public function approve(string $stepId): void
    {
        $this->flowHighlightNode($stepId, 'success');
        $this->flowLockNode($stepId);
        $this->flowConnect($stepId, $nextStep, duration: 600);
        $this->flowHighlightPath([$stepId, $nextStep]);
        $this->flowFocusNode($nextStep);
    }
}
```

### Available convenience methods

| Method | Description |
|--------|-------------|
| `flowUpdate(targets, options)` | Update nodes/edges/viewport (instant) |
| `flowAnimate(targets, options)` | Animate (300ms smooth default) |
| `flowMoveNode(id, x, y, duration?)` | Move single node |
| `flowUpdateNode(id, changes, duration?)` | Update node properties |
| `flowFocusNode(id, duration?, padding?)` | Pan+zoom to center on node |
| `flowConnect(source, target, duration?)` | Create edge with optional draw animation |
| `flowDisconnect(source, target, duration?)` | Remove edge(s) with optional fade |
| `flowHighlightNode(id, style, duration?)` | Flash preset: success/error/warning/info |
| `flowHighlightPath(nodeIds, options)` | Fire particles along node sequence |
| `flowLockNode(id)` / `flowUnlockNode(id)` | Lock/unlock node |
| `flowHideNode(id)` / `flowShowNode(id)` | Hide/show node |
| `flowSelectNodes(ids)` / `flowSelectEdges(ids)` | Select specific items |

### Available base methods

| Method | Description |
|--------|-------------|
| `flowFitView()` | Fit all nodes |
| `flowZoomIn()` / `flowZoomOut()` | Zoom |
| `flowSetCenter(x, y, zoom?)` | Center viewport |
| `flowAddNodes(nodes)` / `flowRemoveNodes(ids)` | Add/remove nodes |
| `flowAddEdges(edges)` / `flowRemoveEdges(ids)` | Add/remove edges |
| `flowLayout(options)` | Apply auto-layout |
| `flowUndo()` / `flowRedo()` | History (requires history: true) |
| `flowClear()` | Clear all |
| `flowSetLoading(bool)` | Loading overlay |
| `flowPatchConfig(changes)` | Update config at runtime |
| `flowCollapseNode(id)` / `flowExpandNode(id)` | Collapse/expand |

### Event handlers

Declare on `<x-flow>` as `@event-name="methodName"`:

```blade
<x-flow @connect="onConnect" @node-click="onNodeClick">
```

```php
public function onConnect(string $source, string $target, ?string $sourceHandle, ?string $targetHandle): void
{
    $this->edges[] = [
        'id' => "e-{$source}-{$target}",
        'source' => $source,
        'target' => $target,
    ];
}
```

Use `#[Renderless]` (Livewire 3.3+ / 4) on methods that only dispatch client-side commands (no re-render needed). On older Livewire 3.x, call `$this->skipRender()` at the end of the method instead.

Search docs for complete event handler signatures and payload shapes.

### Path motion from server

`flowAnimate()` supports `followPath` with SVG path strings for curved node motion:

```php
$this->flowAnimate([
    'nodes' => [
        'data-packet' => [
            'followPath' => 'M 0 100 Q 200 0 400 100',
        ],
    ],
], ['duration' => 2000]);
```

For programmatic paths (orbit, wave, pendulum, drift), use `$flow.animate()` client-side in Blade templates. See the paths animation docs.

## Reverb Configuration for Real-Time Features

When using WireFlow with Laravel Reverb for collaboration or real-time updates:

### Client Events (Whisper)

`accept_client_events_from` in `config/reverb.php` only accepts `'all'` or `'members'`. Any other value silently drops whispers without error:

- `'members'` — only presence channel members can whisper (requires `Echo.join()`)
- `'all'` — any authenticated connection on a private/presence channel can whisper

### TLS with Herd

HTTPS pages cannot connect to `ws://` — browsers block mixed content. With Herd's `.test` domains, configure TLS certs in `config/reverb.php`:

```php
'tls' => [
    'local_cert' => env('REVERB_TLS_CERT'),
    'local_pk' => env('REVERB_TLS_KEY'),
],
```

Herd certs are at `~/Library/Application Support/Herd/config/valet/Certificates/`.

### Message Size Limits

For large payloads (CRDT state, complex flow data), increase limits in `config/reverb.php`:

```php
'max_message_size' => 500_000,
'max_request_size' => 500_000,
```

## Whiteboard in WireFlow

This is the most complex pattern. All three pieces must be correct:

### 1. Scope injection + tool directives on `<x-flow>`

```blade
<x-flow
    :nodes="$nodes" :edges="$edges"
    :config="['selectionOnDrag' => true, 'panOnDrag' => [2]]"
    x-init="Object.assign($data, {
        tool: null,
        toolSettings: { strokeColor: '#334155', strokeWidth: 2, opacity: 1 },
    })"
    x-flow-freehand.filled="tool === 'draw'"
    x-flow-highlighter="tool === 'highlighter'"
    x-flow-eraser="tool === 'eraser'"
>
```

### 2. Event listeners via `$el.addEventListener` (NOT `@@event`)

Add to the `x-init` block:

```blade
x-init="
    Object.assign($data, { tool: null, toolSettings: {...} });
    ['flow-freehand-end','flow-highlight-end','flow-rectangle-draw','flow-arrow-draw','flow-circle-draw','flow-text-draw'].forEach(evt => {
        $el.addEventListener(evt, (e) => { /* create annotation node */ });
    });
"
```

### 3. Annotation node templates inside `<x-slot:node>`

Drawing/highlight use filled SVG path. Arrow uses SVG line with marker. Circle uses SVG ellipse. Rectangle uses a styled div. Text uses contenteditable div.

Search the whiteboard addon docs for complete annotation templates for all 6 tool types.

## Addons with WireFlow

Core loads from WireFlow vendor bundle. Addons load from npm:

```js
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';
import AlpineFlowDagre from '@getartisanflow/alpineflow/dagre';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
    window.Alpine.plugin(AlpineFlowDagre);
});
```

Install addon peer deps separately: `npm install @dagrejs/dagre` for dagre, `npm install elkjs` for ELK, etc.

## Configuration

```php
// config/wireflow.php
return [
    'inject_alpineflow' => true,  // false if you register AlpineFlow via npm yourself
    'theme' => 'default',          // 'default', 'flux', 'structural', 'none'
];
```

For AlpineFlow config options not exposed as `<x-flow>` props, use the `config` prop:

```blade
<x-flow :config="[
    'connectionSnapRadius' => 30,
    'helperLines' => true,
    'preventOverlap' => 10,
]">
```

Search docs for common config options reference.

## Install Command

```bash
php artisan wireflow:install
```

Publishes config, assets, and adds JS/CSS imports to app.js and app.css.
