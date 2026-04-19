---
title: x-flow
description: The main canvas component — the Livewire-aware wrapper around AlpineFlow's flowCanvas().
order: 1
---

# x-flow

`<x-flow>` is the root component. Every other WireFlow component (`<x-flow-handle>`, `<x-flow-panel>`, `<x-flow-toolbar>`, etc.) lives inside it. It accepts nodes and edges as PHP arrays and renders an AlpineFlow canvas that can be controlled server-side via the [`WithWireFlow`](../server/trait.md) trait.

```blade
<x-flow :nodes="$nodes" :edges="$edges" style="height: 400px;">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

## Props

All props are optional unless noted. Props whose default value appears as `—` are left off the underlying `flowCanvas()` config and inherit AlpineFlow's own default.

### Data

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nodes` | `array` | `[]` | Initial nodes. In [sync](../getting-started/concepts.md#sync) mode this value is entangled to the Livewire property. |
| `edges` | `array` | `[]` | Initial edges. Entangled in sync mode. |
| `viewport` | `array` | `['x' => 0, 'y' => 0, 'zoom' => 1]` | Initial pan/zoom. |

### Sync mode

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sync` | `bool` | `false` | Two-way bind `nodes`/`edges` via `$wire.entangle()`. Every client-side change flows back to the Livewire property. See [State management](../getting-started/concepts.md#state-management). |
| `listen` | `bool` | `false` | Read-only mode. Canvas is non-interactive; server drives all updates via the `WithWireFlow` trait. Implies `interactive: false`. |

### Visuals

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `string` | `'dots'` | Background pattern: `'dots'`, `'lines'`, `'cross'`, or `'none'`. |
| `backgroundGap` | `int\|null` | `—` | Pixel spacing between background dots/lines. |
| `colorMode` | `string\|null` | `—` | `'light'`, `'dark'`, or `'system'`. Overrides the parent theme for this canvas. |
| `minimap` | `bool` | `false` | Render the built-in minimap overlay. |
| `controls` | `bool` | `false` | Render the built-in zoom/fit/lock toolbar. |

### Interaction

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `interactive` | `bool` | `true` | Master switch for user input. `false` disables dragging, connecting, and selection. Automatically `false` when `listen` is `true`. |
| `pannable` | `bool` | `true` | Allow panning the viewport. |
| `zoomable` | `bool` | `true` | Allow zooming. |
| `minZoom` | `float\|null` | `—` | Minimum zoom level. |
| `maxZoom` | `float\|null` | `—` | Maximum zoom level. |
| `fitView` | `bool` | `false` | Compute initial zoom to fit all nodes. Static, one-shot. |
| `fitViewOnInit` | `bool` | `false` | Run fit-to-view once the canvas initializes. Useful when nodes are loaded asynchronously. |
| `selectionOnDrag` | `bool` | `false` | Enable a selection box when dragging on the pane. Pair with `'panOnDrag' => [2]` in `config` to keep middle-click panning. |
| `snap` | `array\|false` | `false` | Snap-to-grid: `[20, 20]` for a 20px grid, or `false` to disable. |

### Edges

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultEdgeType` | `string` | `'bezier'` | Default edge renderer: `'bezier'`, `'smoothstep'`, `'step'`, `'straight'`, or any registered custom edge type. |
| `edgesReconnectable` | `bool` | `true` | Allow users to drag an edge endpoint to a different handle. |
| `preventCycles` | `bool` | `false` | Reject connections that would create a cycle in the graph. |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoLayout` | `array\|null` | `—` | Auto-layout config passed through to AlpineFlow's layout engine (e.g. `['direction' => 'TB']`). |
| `computeMode` | `string\|null` | `—` | How node/edge geometry is computed: `'auto'` (default), `'lazy'`, or `'eager'`. Advanced — most apps leave this unset. |

### Node templates

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nodeTypes` | `array` | `[]` | Map of `nodeType => Blade component class` used when nodes have a `type` property. The default slot (`<x-slot:node>`) is used when a node has no `type`. |

### State

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `history` | `bool` | `false` | Enable undo/redo history (drives `$this->flowUndo()` / `$this->flowRedo()`). |

### Escape hatches

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `array` | `[]` | Pass-through of AlpineFlow config keys not promoted to props. Merged last, so it overrides everything. See [Configuration](../configuration.md#passing-alpineflow-config). |
| `wireIgnore` | `bool` | `true` | Adds `wire:ignore` to the canvas `<div>` so Livewire morphing never clobbers Alpine-managed DOM. Set to `false` only if you intentionally want Livewire to re-render the entire canvas element. |

## Slots

| Slot | Purpose |
|------|---------|
| Default slot | Free-form content rendered inside the flow container — typically `<x-flow-panel>`, `<x-flow-toolbar>`, `<x-flow-context-menu>`, or `<x-flow-loading>`. |
| `<x-slot:node>` | Template used for nodes that have no `type` property. Access each node as `node` inside the slot. |

Named node templates for typed nodes are provided via the `nodeTypes` prop:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :node-types="['decision' => \App\View\Flow\DecisionNode::class]"
>
    <x-slot:node>
        {{-- default template (nodes without a type) --}}
    </x-slot:node>
</x-flow>
```

## Events

Attach any of the following as `@event="methodName"` to bridge the canvas event to a Livewire method. Only events you wire up are dispatched — omitting the attribute keeps the event client-side only.

See [Event Handlers](../server/events.md) for each event's handler signature and the complete quick-reference table.

| Category | Events |
|----------|--------|
| Connections | `connect`, `connect-start`, `connect-end`, `reconnect`, `reconnect-start`, `reconnect-end` |
| Nodes | `node-click`, `node-drag-start`, `node-drag-end`, `node-resize-start`, `node-resize-end`, `node-collapse`, `node-expand`, `node-reparent`, `node-context-menu`, `nodes-change` |
| Edges | `edge-click`, `edge-context-menu`, `edges-change` |
| Canvas | `pane-click`, `pane-context-menu`, `viewport-change` |
| Selection | `selection-change`, `selection-context-menu` |
| Rows | `row-select`, `row-deselect`, `row-selection-change` |
| Other | `drop`, `init` |

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    @connect="onConnect"
    @node-drag-end="onNodeDragEnd"
    @pane-click="onPaneClick"
/>
```

For AlpineFlow events not in this list, subscribe inside `x-init` instead — see [Custom event listeners](../getting-started/concepts.md#custom-event-listeners).

## JS callbacks

Use `WireFlow::js()` to pass a client-side JavaScript expression as a config value. The expression is emitted as raw JS, so `{{ $user->id }}`-style interpolation works.

```blade
@use(ArtisanFlow\WireFlow\View\Components\WireFlow)

<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="[
        'isValidConnection' => WireFlow::js('(conn) => conn.source !== conn.target'),
    ]"
/>
```

## Related

- [Configuration](../configuration.md) — full list of AlpineFlow config options usable via the `config` prop
- [WithWireFlow Trait](../server/trait.md) — server-side control of the canvas
- [Event Handlers](../server/events.md) — every bridged event and its signature
- [State management](../getting-started/concepts.md#state-management) — static vs. `:sync` vs. `:listen`
- [Components index](_index.md) — every other `<x-flow-*>` component
