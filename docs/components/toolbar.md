---
title: x-flow-toolbar
description: Floating toolbar adjacent to a node.
order: 4
---

# x-flow-toolbar

A floating toolbar that appears adjacent to a node. By default it shows when the node is selected, and hides when deselected. Use it for contextual actions like delete, edit, or duplicate.

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 30, y: 50 }, data: { label: 'Select me' } },
        { id: 'b', position: { x: 260, y: 50 }, data: { label: 'Or me' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
    ],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 200px;">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <div x-flow-handle:target.left></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source.right></div>
                <div x-flow-node-toolbar:top style="display: flex; gap: 4px;">
                    <button class="rounded border border-border-subtle bg-elevated px-2 py-0.5 text-[11px] cursor-pointer hover:text-text-body" @click="removeNodes([node.id])">Delete</button>
                    <button class="rounded border border-border-subtle bg-elevated px-2 py-0.5 text-[11px] cursor-pointer hover:text-text-body" @click="console.log('edit', node.id)">Edit</button>
                </div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `string` | `'top'` | `'top'`, `'bottom'`, `'left'`, `'right'` |
| `align` | `string` | `'center'` | `'center'`, `'left'`, `'right'` |
| `offset` | `int` | `10` | Distance from node in pixels |
| `show` | `string` | `'selected'` | `'selected'` or `'always'` |

## Usage

Place `<x-flow-toolbar>` inside your node template:

```blade
<x-slot:node>
    <x-flow-handle type="target" position="top" />
    <span x-text="node.data.label"></span>
    <x-flow-handle type="source" position="bottom" />

    <x-flow-toolbar position="top">
        <button @click="removeNodes([node.id])">Delete</button>
        <button @click="$wire.duplicate(node.id)">Duplicate</button>
    </x-flow-toolbar>
</x-slot:node>
```

### Always visible

Show the toolbar regardless of selection state:

```blade
<x-flow-toolbar position="bottom" show="always">
    <span class="text-xs" x-text="node.data.status"></span>
</x-flow-toolbar>
```

### Position and alignment

```blade
{{-- Bottom-right aligned --}}
<x-flow-toolbar position="bottom" align="right">
    <button @click="removeNodes([node.id])">Delete</button>
</x-flow-toolbar>

{{-- Left side with extra offset --}}
<x-flow-toolbar position="left" :offset="20">
    <span class="text-xs">Settings</span>
</x-flow-toolbar>
```

## Common Patterns

### Action toolbar with icons

```blade
<x-flow-toolbar position="top">
    <div class="flex gap-1 rounded-lg border bg-white px-2 py-1 shadow-sm">
        <button @click="$wire.edit(node.id)" class="p-1 hover:bg-gray-100 rounded" title="Edit">
            <x-heroicon-m-pencil class="w-3 h-3" />
        </button>
        <button @click="$wire.duplicate(node.id)" class="p-1 hover:bg-gray-100 rounded" title="Duplicate">
            <x-heroicon-m-document-duplicate class="w-3 h-3" />
        </button>
        <button @click="removeNodes([node.id])" class="p-1 hover:bg-red-100 rounded text-red-500" title="Delete">
            <x-heroicon-m-trash class="w-3 h-3" />
        </button>
    </div>
</x-flow-toolbar>
```

### Status badge (always visible)

```blade
<x-flow-toolbar position="bottom" show="always" :offset="5">
    <span class="rounded-full px-2 py-0.5 text-[10px] font-medium"
          :class="node.data.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'"
          x-text="node.data.status">
    </span>
</x-flow-toolbar>
```

## Directive Mapping

Maps to: `x-flow-node-toolbar:top`, `x-flow-node-toolbar:bottom`, `x-flow-node-toolbar:left`, etc. The `show` prop is handled by the Blade template, not the directive.

## See also

- [x-flow-edge-toolbar](edge-toolbar.md) -- toolbar along edge paths
- [Context Menu](context-menu.md) -- right-click menus for nodes and edges
