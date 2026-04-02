---
title: Core Concepts
description: How WireFlow wraps AlpineFlow for Laravel.
order: 3
---

# Core Concepts

WireFlow is a set of Laravel Blade components and a Livewire trait that wrap AlpineFlow (an Alpine.js flow diagram plugin). You write Blade — WireFlow handles the Alpine.js wiring.

## How it works

WireFlow Blade components emit Alpine.js directives. You never write the directives yourself.

| You write | WireFlow renders |
|-----------|-----------------|
| `<x-flow :nodes="$nodes">` | `<div x-data="flowCanvas({nodes: [...], ...})">` |
| `<x-flow-handle type="source" position="right" />` | `<div x-flow-handle:source.right>` |
| `<x-flow-panel position="top-left">` | `<div x-flow-panel:top-left.static>` |
| `<x-flow-toolbar position="top">` | `<div x-flow-node-toolbar:top>` |
| `<x-flow-drag-handle />` | `<div x-flow-drag-handle>` |
| `<x-flow-resizer />` | `<div x-flow-resizer>` |

The `<x-flow>` component creates the `flowCanvas()` Alpine data scope, renders the edge SVG layer, and stamps your `<x-slot:node>` template for each node. All interaction logic (dragging, panning, connecting, selecting) is handled by AlpineFlow's Alpine.js plugin on the client.

See the [First Flow](first-flow) tutorial for interactive examples.

## State management

WireFlow supports three sync modes that control how nodes and edges flow between server and client.

### Static (default)

```blade
<x-flow :nodes="$nodes" :edges="$edges">
```

Nodes and edges are passed as initial data. The client owns all state — drag positions, new connections, and deletions happen entirely in the browser. The server is not notified of changes.

Use this when you don't need to persist changes, or when you handle persistence through explicit event handlers (like `@node-drag-end`).

### Sync

```blade
<x-flow :nodes="$nodes" :edges="$edges" :sync="true">
```

Two-way binding via Livewire's `$wire.entangle()`. Every client-side change (node position, new edge, deletion) is automatically synced back to your Livewire component's `$nodes` and `$edges` properties.

Use this when the server needs to stay current with all canvas state — for example, saving to a database on every change, or rendering server-driven side panels based on the current diagram.

### Listen

```blade
<x-flow :nodes="$nodes" :edges="$edges" :listen="true">
```

Server-only updates. The canvas receives data from the server but the user cannot interact with it. Nodes are not draggable, handles don't create connections, and the canvas is non-interactive.

Use this for read-only dashboards, status monitors, or diagrams that are controlled entirely from the server.

## Server-to-client: the WithWireFlow trait

The `WithWireFlow` trait gives your Livewire component methods that control the flow canvas from the server. Each method dispatches a Livewire browser event that the AlpineFlow wire bridge receives and executes on the client.

```php
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;

class FlowEditor extends Component
{
    use WithWireFlow;

    public function centerOnNode(string $nodeId): void
    {
        // Dispatches a Livewire event -> AlpineFlow bridge receives it -> canvas pans
        $this->flowSetCenter(100, 200, 1.5);
    }

    public function addStep(): void
    {
        // Dispatches event -> bridge calls addNodes() on the canvas
        $this->flowAddNodes([
            ['id' => 'new-1', 'position' => ['x' => 300, 'y' => 100], 'data' => ['label' => 'New Step']],
        ]);
    }

    public function resetView(): void
    {
        $this->flowFitView();
    }
}
```

The flow is always: **PHP method call -> Livewire dispatch -> AlpineFlow bridge -> canvas update**. The bridge is registered automatically when you use `<x-flow>`.

Available commands include viewport control (`flowFitView`, `flowSetCenter`, `flowZoomIn`), node/edge management (`flowAddNodes`, `flowRemoveEdges`, `flowClear`), animation (`flowAnimate`, `flowSendParticle`, `flowFollow`), layout (`flowLayout`), and state management (`flowFromObject`, `flowPatchConfig`, `flowUndo`, `flowRedo`).

See [Server Commands](../server/trait.md) for the full method reference.

## Client-to-server: event bridging

Canvas events (connections, clicks, drags) are bridged to your Livewire component via `@event` attributes on `<x-flow>`.

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    @connect="onConnect"
    @node-click="onNodeClick"
    @pane-click="onPaneClick"
    @selection-change="onSelectionChange"
>
```

When the user creates a connection, AlpineFlow emits a DOM event. WireFlow's bridge intercepts it and calls the mapped Livewire method with the event payload deserialized as PHP arguments.

```php
public function onConnect(
    string $source,
    string $target,
    ?string $sourceHandle,
    ?string $targetHandle,
): void {
    $this->edges[] = [
        'id' => "e-{$source}-{$target}",
        'source' => $source,
        'target' => $target,
    ];
}
```

The `@event` syntax handles the full lifecycle: `@connect`, `@node-click`, `@node-drag-end`, `@edge-click`, `@pane-click`, `@selection-change`, `@viewport-change`, and more. See [Event Handlers](../server/events.md) for all available events and their PHP signatures.

## Scope rules

### The flowCanvas scope

`<x-flow>` creates its own `x-data="flowCanvas({...})"` Alpine scope. Everything inside the component — node templates, panels, toolbars — evaluates in this scope. You have access to AlpineFlow's reactive properties and methods like `nodes`, `edges`, `selectedNodes`, `addNodes()`, `fitView()`, etc.

### Adding custom properties

If you need custom Alpine state inside the flow canvas (for example, a `tool` property for whiteboard mode), use `x-init` with `Object.assign`:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    x-init="Object.assign($data, { tool: 'select', showPanel: false })"
>
    {{-- tool and showPanel are now in the flowCanvas scope --}}
    <button @click="tool = 'draw'" x-text="tool"></button>
</x-flow>
```

Do not wrap `<x-flow>` in a parent `x-data` and try to reference those properties from inside. Attributes and directives on `<x-flow>` and its children evaluate in the `flowCanvas()` scope, not in any parent scope.

### Custom event listeners

AlpineFlow directives emit custom DOM events on the flow container element. In WireFlow, do not use `@@event` attributes on `<x-flow>` for custom AlpineFlow events — Livewire can crash on custom event names with hyphens. Instead, attach listeners in `x-init`:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    x-init="
        $el.addEventListener('flow-freehand-end', (e) => {
            addNodes([{ id: 'annotation-1', position: e.detail.position, data: { svg: e.detail.svg } }]);
        });
    "
>
```

The `@connect`, `@node-click`, etc. attributes are safe — WireFlow explicitly bridges those. The `$el.addEventListener` pattern is for other custom events from AlpineFlow addons.

## Addons

WireFlow ships the AlpineFlow **core** via Composer. Addons (layout engines, collaboration, whiteboard tools) are installed separately via npm.

Both core and addons register into a shared `globalThis` registry, so they interoperate regardless of how each was loaded:

```js
// Core from WireFlow's Composer vendor bundle
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';

// Addons from npm
import AlpineFlowDagre from '@getartisanflow/alpineflow/dagre';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);       // registers core
    window.Alpine.plugin(AlpineFlowDagre);  // registers dagre addon
});
```

Once registered, addon features are available in your Blade components — for example, after registering the dagre addon, you can call `$this->flowLayout()` from the server or `$flow.layout()` from Alpine expressions.

See [Installation: Optional addons](installation.md#optional-addons) for the full addon list and setup.

## Related

- [First Flow](first-flow.md) — hands-on tutorial building your first diagram
- [Components](../components/_index.md) — all Blade components and their props
- [WithWireFlow Trait](../server/_index.md) — server-side commands and event handlers
- [Configuration](../configuration.md) — theme, sync, and AlpineFlow config options
