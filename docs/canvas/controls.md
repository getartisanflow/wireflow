---
title: Controls & Actions
description: Built-in controls and <x-flow-action> buttons.
order: 3
---

# Controls & Actions

WireFlow provides a built-in controls panel and the `<x-flow-action>` Blade component for declarative action buttons.

## Built-in controls panel

Enable the controls panel with the `controls` prop:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :controls="true">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

### Position

Set placement via `:config`:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :controls="true" :config="[
    'controlsPosition' => 'bottom-left',
]">
```

Supported positions: `'top-left'`, `'top-right'`, `'bottom-left'` (default), `'bottom-right'`.

### Orientation

Controls stack vertically by default. Switch to horizontal layout:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :controls="true" :config="[
    'controlsOrientation' => 'horizontal',
]">
```

### Button visibility

Toggle individual buttons:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :controls="true" :config="[
    'controlsShowZoom' => true,
    'controlsShowFitView' => true,
    'controlsShowInteractive' => false,
]">
```

| Config key | Description | Default |
|------------|-------------|---------|
| `controlsShowZoom` | Zoom in (+) and zoom out (-) buttons | `true` |
| `controlsShowFitView` | Fit all nodes into viewport button | `true` |
| `controlsShowInteractive` | Toggle pan/zoom/drag button | `true` |

## `<x-flow-action>` component

For custom action bars, use the `<x-flow-action>` Blade component. It renders a `<button>` with the appropriate `x-flow-action:{type}` Alpine directive.

```blade
<x-flow :nodes="$nodes" :edges="$edges" :history="true" style="height: 400px;">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    <x-flow-panel position="top-left">
        <div class="flex gap-1">
            <x-flow-action type="undo">Undo</x-flow-action>
            <x-flow-action type="redo">Redo</x-flow-action>
            <x-flow-action type="fit-view">Fit</x-flow-action>
            <x-flow-action type="zoom-in">+</x-flow-action>
            <x-flow-action type="zoom-out">-</x-flow-action>
        </div>
    </x-flow-panel>
</x-flow>
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Start' } },
        { id: 'b', position: { x: 250, y: 0 }, data: { label: 'Process' } },
        { id: 'c', position: { x: 500, y: 0 }, data: { label: 'End' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'b', target: 'c' },
    ],
    background: 'dots',
    controls: true,
    fitViewOnInit: true,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 250px;">
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

### Available actions

| Type | Description |
|------|-------------|
| `undo` | Undo the last change (requires `:history="true"`) |
| `redo` | Redo the last undone change |
| `fit-view` | Fit all nodes into the viewport |
| `zoom-in` | Zoom in by one step |
| `zoom-out` | Zoom out by one step |
| `toggle-interactive` | Toggle interactive mode on/off |
| `clear` | Remove all nodes and edges |
| `reset` | Reset to initial state |
| `export` | Export the canvas |

### Behavior

- Auto-manages `disabled` state (e.g., `undo` is disabled when there is no history to undo).
- Auto-applies appropriate `aria-*` attributes for accessibility.

## Custom action bars

Combine `<x-flow-action>` with `<x-flow-panel>` to build custom toolbars anywhere on the canvas:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :history="true" style="height: 500px;">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    {{-- Top toolbar --}}
    <x-flow-panel position="top-center">
        <div class="flex gap-2 rounded-lg bg-white p-2 shadow">
            <x-flow-action type="undo">Undo</x-flow-action>
            <x-flow-action type="redo">Redo</x-flow-action>
        </div>
    </x-flow-panel>

    {{-- Bottom-right zoom controls --}}
    <x-flow-panel position="bottom-right">
        <div class="flex flex-col gap-1">
            <x-flow-action type="zoom-in">+</x-flow-action>
            <x-flow-action type="zoom-out">-</x-flow-action>
            <x-flow-action type="fit-view">Fit</x-flow-action>
        </div>
    </x-flow-panel>
</x-flow>
```

## See also

- [Viewport](viewport.md) -- pan, zoom, and viewport control
- [Panels](panels.md) -- floating overlay panels
- [Components: x-flow-action](../components/action.md) -- full component API
