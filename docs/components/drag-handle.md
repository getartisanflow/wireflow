---
title: x-flow-drag-handle
description: Restrict node dragging to a specific element.
order: 5
---

# x-flow-drag-handle

By default, the entire node surface is draggable. Wrap an element in `<x-flow-drag-handle>` to restrict dragging to just that element — useful for card-style nodes where you want buttons, inputs, or other interactive content that shouldn't trigger a drag.

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 20, y: 20 }, data: { label: 'Drag the title bar', body: 'This area is not draggable.' } },
        { id: 'b', position: { x: 280, y: 20 }, data: { label: 'Also draggable', body: 'Only the header initiates drag.' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
    ],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 220px;">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node" style="width: 200px; padding: 0;">
                <div x-flow-handle:target.left></div>
                <div x-flow-drag-handle style="padding: 6px 10px; font-weight: 600; font-size: 12px; cursor: grab; border-bottom: 1px solid var(--flow-node-border-color);">
                    <span x-text="node.data.label"></span>
                </div>
                <div style="padding: 8px 10px; font-size: 11px; opacity: 0.7;">
                    <span x-text="node.data.body"></span>
                </div>
                <div x-flow-handle:source.right></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Props

None. The component wraps its children and marks them as the drag region.

## Usage

Wrap the draggable region of your node in `<x-flow-drag-handle>`:

```blade
<x-slot:node>
    <x-flow-drag-handle>
        <strong x-text="node.data.title"></strong>
    </x-flow-drag-handle>
    <p x-text="node.data.body" class="text-sm text-gray-500"></p>
    <button @click="$wire.editNode(node.id)" class="text-xs text-blue-500">
        Edit
    </button>
</x-slot:node>
```

Without `<x-flow-drag-handle>`, clicking the button or paragraph would also start a drag. With it, only the title area initiates dragging.

## Common Patterns

### Card with header bar

```blade
<x-slot:node>
    <div class="rounded-lg border bg-white shadow-sm" style="width: 220px;">
        <x-flow-drag-handle>
            <div class="flex items-center justify-between border-b px-3 py-2">
                <span class="font-semibold text-sm" x-text="node.data.title"></span>
            </div>
        </x-flow-drag-handle>
        <div class="p-3">
            <x-flow-handle type="target" position="left" />
            <p class="text-xs" x-text="node.data.description"></p>
            <x-flow-handle type="source" position="right" />
        </div>
    </div>
</x-slot:node>
```

### Icon-only drag grip

```blade
<x-flow-drag-handle>
    <svg class="w-4 h-4 text-gray-400 cursor-grab" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="5" cy="4" r="1.5"/><circle cx="11" cy="4" r="1.5"/>
        <circle cx="5" cy="8" r="1.5"/><circle cx="11" cy="8" r="1.5"/>
        <circle cx="5" cy="12" r="1.5"/><circle cx="11" cy="12" r="1.5"/>
    </svg>
</x-flow-drag-handle>
```

## Directive Mapping

Maps to: `x-flow-drag-handle`

## See also

- [Node Basics](../nodes/basics.md) -- node configuration and templates
- [x-flow-toolbar](toolbar.md) -- floating toolbar for node actions
