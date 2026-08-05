---
name: wireflow-development
description: Build flow diagrams with WireFlow Blade components and Livewire integration. Covers the <x-flow> canvas plus schema-designer and workflow Blade components, the WithWireFlow and WithSchemaDesigner traits, server-side flow control, and WireFlow-specific patterns. Activates when working with <x-flow>, <x-flow-schema-node> / <x-schema-*-inspector>, workflow run/replay components, WithWireFlow or WithSchemaDesigner methods, or Livewire flow diagrams.
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
- Building a schema/ER designer (`<x-flow-schema-node>`, `<x-schema-*-inspector>`, the `WithSchemaDesigner` trait)
- Building a workflow runner (`<x-flow-run-button>`, `<x-flow-execution-log>`, `<x-flow-condition-node>`, `flowRun`/`flowSetNodeState`)

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
    x-flow-freehand="tool === 'draw'"
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
| `<x-flow>` | Main canvas. Renders `wire:ignore` **by default** (`wireIgnore=true`) so Livewire morphs don't clobber the Alpine-managed canvas — pass `:wire-ignore="false"` to opt out. Extra props: `containerHeight` (`'fill'`/px/CSS length), `fullscreenTarget` (selector) |
| `<x-flow-handle>` | Connection handle (type, position, id) |
| `<x-flow-panel>` | Floating overlay panel (position, resizable). Invalid `position` **throws** `InvalidArgumentException` |
| `<x-flow-toolbar>` | Node toolbar — `position` top/bottom/left/right, `align` **start/center/end** (flow-relative, NOT left/right), `offset`, `show` selected/always. Invalid enum values **throw** `InvalidArgumentException` |
| `<x-flow-drag-handle>` | Restrict drag to element |
| `<x-flow-resizer>` | Resize handles (min-width, min-height) |
| `<x-flow-action>` | Action button (type: undo, redo, fit-view, etc.). `target` = canvas CSS selector when the button lives **outside** `<x-flow>` (renders `data-flow-target`) |
| `<x-flow-context-menu>` | Right-click menu (scope: node, edge, pane, selection) |
| `<x-flow-collapse>` | Collapse toggle (instant, all, expand, children) |
| `<x-flow-condense>` | Condense toggle |
| `<x-flow-edge-toolbar>` | Edge toolbar — `position` float 0–1 (point along edge), `below` bool, `show` selected/always (invalid `show` **throws**), `target` = canvas selector for out-of-canvas placement |
| `<x-flow-loading>` | Loading overlay (fade) |

Toolbar/EdgeToolbar enum props are validated by the `ValidatesEnumProps` trait against `src/Enums/*` and throw `InvalidArgumentException` on bad values — so `align="left"` is an error, not a silent center. Search docs for full prop reference per component.

### Schema-designer components

Registered by the provider but separate from the table above (note the prefix split: the node is `flow-schema-*`, the rest are `schema-*`):

| Component | Purpose |
|-----------|---------|
| `<x-flow-schema-node>` | Schema/table node renderer (`label`, `fields`) — drop into `<x-slot:node>` |
| `<x-schema-designer>` | Full schema canvas variant (~30 props; schema-tuned defaults like `default-edge-type="avoidant"`, `prevent-cycles`, `keyboard-connect`) |
| `<x-schema-field>` | Single field row |
| `<x-schema-node-inspector>` | Selected-node inspector (`default-ui`) → injects `selectedNode` + `inspector` |
| `<x-schema-row-inspector>` | Selected-field inspector → `selectedRow {nodeId, fieldName}` + `inspector` |
| `<x-schema-edge-inspector>` | Selected-relationship inspector → `selectedEdge` + `inspector` |

### Workflow components

| Component | Purpose |
|-----------|---------|
| `<x-flow-condition-node>` | Condition/branch node (`label`, `condition`, `direction`, `evaluate-label`) |
| `<x-flow-wait>` | Timed wait node (`label`, `duration-ms`, `icon`) |
| `<x-flow-run-button>` | Start a run (required `start-id`, `options`, `handlers-key="runHandlers"`, `target`) |
| `<x-flow-stop-button>` / `<x-flow-reset-button>` | Stop / reset the run (`target`) |
| `<x-flow-replay-controls>` | Replay the execution log (`handle`, `target`, `speeds=[0.5,1,2,4]`) |
| `<x-flow-execution-log>` | Live execution log (`source`, `filter="all"`, `max-events=500`) |

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
| `flowAddNodes(nodes)` / `flowRemoveNodes(ids)` | Add/remove nodes. Now **mutate server-side `$this->nodes`** too (when it's a public array) — `flowRemoveNodes` cascades to descendants (parentId chain) and connected edges, mirroring the client. Delete your manual `$nodes` filters. |
| `flowAddEdges(edges)` / `flowRemoveEdges(ids)` | Add/remove edges. Also mutate server-side `$this->edges` when present. |
| `flowLayout(options)` | Apply auto-layout |
| `flowUndo()` / `flowRedo()` | History (requires history: true) |
| `flowClear()` | **Destructive** — empties nodes/edges and resets the viewport to the origin (dispatches `flow:clear`; applied immediately). |
| `flowSetLoading(bool)` | Loading overlay |
| `flowPatchConfig(changes)` | Update config at runtime |
| `flowCollapseNode(id)` / `flowExpandNode(id)` | Collapse/expand |

### Run-state, particles & lifecycle (also on `WithWireFlow`)

| Method | Description |
|--------|-------------|
| `flowRun(startId, options)` | Drive a workflow run from the server (pairs with `<x-flow-run-button>` / `<x-flow-execution-log>`) |
| `flowSetNodeState(ids, state)` / `flowResetStates()` | Set/clear per-node run state — `'pending'` / `'running'` / `'completed'` / `'failed'` / `'skipped'` (drives `.flow-node-*` classes). Distinct from the *workflow* run state (`idle`/`running`/`paused`/`stopped`) that `flowRun` drives. |
| `flowSendParticle` / `flowSendParticleAlongPath` / `flowSendParticleBetween` / `flowSendParticleBurst` / `flowSendConverging` | Particle effects |
| `flowCancelAll()` / `flowPauseAll()` / `flowResumeAll()` | Animation lifecycle |
| `flowFollow(id)` / `flowUnfollow()` | Camera follow a node |
| `flowSetViewport` / `flowPanBy` / `flowFitBounds` | Viewport control |
| `flowFromObject(obj)` / `flowDeselectAll()` / `flowToggleInteractive()` | Misc |

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

`onNodesChange` / `onEdgesChange` receive `array $changes` that now carries an **`origin`** key — filter on it to persist only user intent:

```php
public function onNodesChange(array $changes): void
{
    // $changes = ['type' => 'add'|'remove', 'nodes' => [...], 'origin' => 'drop'|'paste'|'api'|'load']
    if (($changes['origin'] ?? null) === 'drop') { /* the user dropped a node */ }
}
```

The whole-graph replace methods (`replaceNodes` / `setNodes`) are client-side AlpineFlow canvas methods; there's no dedicated trait wrapper, but they're dispatchable from PHP via `$this->dispatch('flow:replaceNodes', nodes: [...], edges: [...])` (and `flow:setNodes`).

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

## WithSchemaDesigner Trait

Server-side mirror of the schema addon's field CRUD — use alongside `WithWireFlow` on a schema-designer component. Every method validates field names via the `SchemaFieldName` rule (snake_case, length-capped), cascades touching edges, and returns an `['applied' => bool, 'reason' => ...]` array:

```php
use ArtisanFlow\WireFlow\Concerns\WithSchemaDesigner;
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;

class ApiSchemaDesigner extends Component
{
    use WithSchemaDesigner, WithWireFlow;
    // public array $nodes / $edges hold the schema
}
```

| Method | Description |
|--------|-------------|
| `addField(nodeId, field)` | Append a field; rejects invalid/duplicate names |
| `renameField(nodeId, oldName, newName)` | Rename; cascades edge `sourceHandle`/`targetHandle` |
| `removeField(nodeId, fieldName)` | Remove field; cascade-drops relationship edges |
| `removeNode(nodeId)` | Remove a table; cascade-drops its edges |

Call from Blade via `$wire.call('addField', nodeId, { name, type })` for server-validated edits, or wire the `<x-schema-*-inspector>` slots to these. The pure client-side equivalents live in the AlpineFlow schema addon — see the `alpineflow-development` skill.

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
    x-flow-freehand="tool === 'draw'"
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

## Migration

Upgrading a project across **v0.1.x → v0.2.1-alpha**, or debugging behavior that changed? Consult the canonical guide: `docs/migration/v0.2.1-alpha.md` in the wireflow repo (rendered at `/docs/wireflow/migration/v0.2.1-alpha`). This release **resyncs the bundled AlpineFlow engine**, so the client-side behavior shifts arrive through the vendored bundle too — the companion `/docs/alpineflow/migration/v0.2.1-alpha` covers those. WireFlow-side gotchas to check first:

- **`<x-flow>` renders `wire:ignore` by default** — Livewire morphs no longer clobber the Alpine-managed canvas. If you *relied* on Livewire re-rendering the canvas internals, set `:wire-ignore="false"`.
- **Enum props throw** — `<x-flow-toolbar>` (`position`/`align`/`show`), `<x-flow-edge-toolbar>` (`show`), and `<x-flow-panel>` (`position`) throw `InvalidArgumentException` on an unrecognized value: `align="left"` is an error (use `start`/`end`), not a silent center.
- **Graph-mutating trait methods sync server state** — `flowAddNodes` / `flowRemoveNodes` / `flowAddEdges` / `flowRemoveEdges` now mutate `$this->nodes` / `$this->edges` (with cascade) when those are public arrays; delete your manual pre-call filters. `flowClear()` is destructive (empties nodes/edges and resets the viewport).
- **Inherited from the bundle** — selection is no longer undoable, and handle `pointerdown` is delegated in the capture phase (markup *inside* a handle stops receiving its own `pointerdown`). See the AlpineFlow migration guide for the full list.

## Install Command

```bash
php artisan wireflow:install
```

Publishes config, assets, and adds JS/CSS imports to app.js and app.css.
