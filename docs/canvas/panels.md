---
title: Panels
description: Floating overlay panels with <x-flow-panel>.
order: 6
---

# Panels

The `<x-flow-panel>` Blade component creates a floating overlay panel anchored to a position within the flow canvas. Use panels for custom controls, legends, inspector sidebars, or any UI overlay.

## Basic usage

Place `<x-flow-panel>` inside `<x-flow>`:

```blade
<x-flow :nodes="$nodes" :edges="$edges" style="height: 500px;">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    <x-flow-panel position="top-right">
        <h3 class="text-sm font-semibold">Properties</h3>
        <p class="text-xs text-gray-500">Select a node to see its properties.</p>
    </x-flow-panel>
</x-flow>
```

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
        { id: 'b', position: { x: 250, y: 0 }, data: { label: 'Node B' } },
        { id: 'c', position: { x: 125, y: 100 }, data: { label: 'Node C' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'c' },
        { id: 'e2', source: 'b', target: 'c' },
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 250px;">
    <div x-flow-panel:top-right.static style="padding: 8px 12px; font-size: 12px;">
        <div style="font-weight: 600; margin-bottom: 4px;">Inspector</div>
        <div style="opacity: 0.6;">Select a node to view details</div>
    </div>
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

## Position

The `position` prop sets the initial anchor within the flow container:

```blade
<x-flow-panel position="top-left">...</x-flow-panel>
<x-flow-panel position="top-center">...</x-flow-panel>
<x-flow-panel position="top-right">...</x-flow-panel>
<x-flow-panel position="bottom-left">...</x-flow-panel>
<x-flow-panel position="bottom-center">...</x-flow-panel>
<x-flow-panel position="bottom-right">...</x-flow-panel>
```

| Position | Description |
|----------|-------------|
| `top-left` | Top-left corner (default) |
| `top-center` | Centered along the top edge |
| `top-right` | Top-right corner |
| `bottom-left` | Bottom-left corner |
| `bottom-center` | Centered along the bottom edge |
| `bottom-right` | Bottom-right corner |

## Resizable

By default, panels are static (not resizable). Enable drag-to-resize with the `resizable` prop:

```blade
<x-flow-panel position="top-right" :resizable="true">
    <p>This panel can be resized by dragging the corner handle.</p>
</x-flow-panel>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `string` | `'top-left'` | Anchor position |
| `resizable` | `bool` | `false` | Enable drag-to-resize |

## Examples

### Legend panel

A static panel displaying a legend:

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    <x-flow-panel position="top-left">
        <h4 class="text-sm font-semibold">Legend</h4>
        <ul class="text-xs">
            <li class="text-blue-500">Blue = Active</li>
            <li class="text-gray-400">Gray = Inactive</li>
        </ul>
    </x-flow-panel>
</x-flow>
```

### Inspector sidebar

A panel that shows selected node details:

```blade
<x-flow :nodes="$nodes" :edges="$edges" @node-click="onNodeClick">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    <x-flow-panel position="top-right" :resizable="true">
        @if ($selectedNode)
            <h3 class="text-sm font-semibold">{{ $selectedNode['data']['label'] }}</h3>
            <p class="text-xs text-gray-500">ID: {{ $selectedNode['id'] }}</p>
            <p class="text-xs text-gray-500">
                Position: {{ $selectedNode['position']['x'] }}, {{ $selectedNode['position']['y'] }}
            </p>
        @else
            <p class="text-xs text-gray-500">Click a node to inspect it.</p>
        @endif
    </x-flow-panel>
</x-flow>
```

### Custom action bar in a panel

Combine panels with `<x-flow-action>` buttons:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :history="true">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    <x-flow-panel position="bottom-left">
        <div class="flex gap-1">
            <x-flow-action type="undo">Undo</x-flow-action>
            <x-flow-action type="redo">Redo</x-flow-action>
            <x-flow-action type="fit-view">Fit</x-flow-action>
        </div>
    </x-flow-panel>
</x-flow>
```

## Styling

Customize panel appearance with CSS variables:

| Variable | Description |
|----------|-------------|
| `--flow-panel-bg` | Panel background |
| `--flow-panel-border` | Panel border |
| `--flow-panel-border-radius` | Panel corner radius |
| `--flow-panel-min-width` | Panel minimum width |
| `--flow-panel-min-height` | Panel minimum height |
| `--flow-panel-resize-bg` | Resize grip background |
| `--flow-panel-resize-hover-bg` | Resize grip hover color |

## See also

- [Controls & Actions](controls.md) -- built-in controls and `<x-flow-action>` buttons
- [Components: x-flow-panel](../components/panel.md) -- full component API
