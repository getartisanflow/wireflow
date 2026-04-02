---
title: x-flow-panel
description: Floating overlay panel.
order: 3
---

# x-flow-panel

A floating overlay panel anchored to a position within the canvas. Panels stay fixed relative to the container (not the viewport), so they don't move when users pan or zoom. Use them for controls, legends, inspectors, or any overlay UI.

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
})" class="flow-container" style="height: 250px;">
    <div x-flow-panel:top-right.static style="padding: 8px 12px; font-size: 12px;">
        <div style="font-weight: 600; margin-bottom: 4px;">Inspector</div>
        <div style="opacity: 0.6;">Select a node to view details</div>
    </div>
    <div x-flow-panel:bottom-left.static style="padding: 6px 10px; font-size: 11px; opacity: 0.6;">
        3 nodes, 2 edges
    </div>
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <div x-flow-handle:target.top></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source.bottom></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `string` | `'top-left'` | Anchor position (see below) |
| `resizable` | `bool` | `false` | Enable drag-to-resize |

### Positions

| Value | Location |
|-------|----------|
| `top-left` | Top-left corner |
| `top-center` | Top center |
| `top-right` | Top-right corner |
| `bottom-left` | Bottom-left corner |
| `bottom-center` | Bottom center |
| `bottom-right` | Bottom-right corner |

## Usage

Place `<x-flow-panel>` inside `<x-flow>` (outside the node slot):

```blade
<x-flow :nodes="$nodes" :edges="$edges">
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

### Multiple panels

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    {{-- ...node slot... --}}

    <x-flow-panel position="top-left">
        <h2 class="text-sm font-bold">My Workflow</h2>
    </x-flow-panel>

    <x-flow-panel position="bottom-right">
        <span class="text-xs text-gray-400" x-text="nodes.length + ' nodes'"></span>
    </x-flow-panel>
</x-flow>
```

### Resizable panel

```blade
<x-flow-panel position="top-right" :resizable="true">
    <div class="p-3" style="min-width: 200px;">
        <h3>Inspector</h3>
        <p>Drag corners to resize this panel.</p>
    </div>
</x-flow-panel>
```

## Common Patterns

### Legend panel

```blade
<x-flow-panel position="bottom-left">
    <div class="rounded border bg-white p-2 text-xs shadow-sm">
        <div class="font-semibold mb-1">Legend</div>
        <div class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-green-400"></span> Active</div>
        <div class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-yellow-400"></span> Pending</div>
        <div class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-red-400"></span> Error</div>
    </div>
</x-flow-panel>
```

### Dynamic inspector

```blade
<x-flow-panel position="top-right">
    <div class="rounded border bg-white p-3 shadow-sm" style="width: 200px;">
        <template x-if="selectedNodes.length > 0">
            <div>
                <h3 class="font-semibold text-sm" x-text="selectedNodes[0].data.label"></h3>
                <p class="text-xs text-gray-500 mt-1" x-text="'ID: ' + selectedNodes[0].id"></p>
                <p class="text-xs text-gray-500" x-text="'Position: ' + Math.round(selectedNodes[0].position.x) + ', ' + Math.round(selectedNodes[0].position.y)"></p>
            </div>
        </template>
        <template x-if="selectedNodes.length === 0">
            <p class="text-xs text-gray-400">Select a node</p>
        </template>
    </div>
</x-flow-panel>
```

## Directive Mapping

| Blade | Directive |
|-------|-----------|
| `<x-flow-panel position="top-right" />` | `x-flow-panel:top-right.static` |
| `<x-flow-panel position="bottom-left" :resizable="true" />` | `x-flow-panel:bottom-left` |

## See also

- [Panels](../canvas/panels.md) -- full panels documentation
- [Controls](../canvas/controls.md) -- built-in control bars
