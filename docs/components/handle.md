---
title: x-flow-handle
description: Connection handles for creating and receiving edges.
order: 2
---

# x-flow-handle

Connection handles are the points on a node where edges attach. Source handles initiate connections, target handles receive them. Place them inside your `<x-slot:node>` template.

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 20, y: 50 }, data: { label: 'Source' } },
        { id: 'b', position: { x: 250, y: 10 }, data: { label: 'Target 1' } },
        { id: 'c', position: { x: 250, y: 100 }, data: { label: 'Target 2' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b', sourceHandle: 'out-1' },
        { id: 'e2', source: 'a', target: 'c', sourceHandle: 'out-2' },
    ],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 220px;">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <div x-flow-handle:target.left></div>
                <span x-text="node.data.label"></span>
                <template x-if="node.id === 'a'">
                    <span>
                        <div x-flow-handle:source.right="'out-1'" style="top: 25%;"></div>
                        <div x-flow-handle:source.right="'out-2'" style="top: 75%;"></div>
                    </span>
                </template>
                <template x-if="node.id !== 'a'">
                    <div x-flow-handle:source.right></div>
                </template>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | *(required)* | `'source'` or `'target'` |
| `position` | `string` | `''` | `'top'`, `'right'`, `'bottom'`, `'left'` |
| `id` | `string` | `''` | Handle ID (for multiple handles per node) |
| `hidden` | `bool` | `false` | Hide visually while keeping functional |

When no `position` is provided, the default is `bottom` for source handles and `top` for target handles.

## Basic Usage

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

## Multiple Handles

Use the `id` prop when a node needs more than one handle of the same type. Reference the handle ID in your edge definitions with `sourceHandle` / `targetHandle`:

```blade
<x-slot:node>
    <x-flow-handle type="target" position="left" />
    <span x-text="node.data.label"></span>
    <x-flow-handle type="source" position="right" id="success" />
    <x-flow-handle type="source" position="bottom" id="error" />
</x-slot:node>
```

```php
public array $edges = [
    ['id' => 'e1', 'source' => 'validate', 'target' => 'process', 'sourceHandle' => 'success'],
    ['id' => 'e2', 'source' => 'validate', 'target' => 'error-handler', 'sourceHandle' => 'error'],
];
```

## Hidden Handles

Set `hidden` to hide the handle visually while keeping it functional — edges still connect to it:

```blade
<x-flow-handle type="target" position="top" :hidden="true" />
```

This is useful when you want floating edges or when the handle dots don't fit your design.

## Conditional Handles

Show handles only on certain node types using Alpine expressions:

```blade
<x-slot:node>
    <x-flow-handle type="target" position="left" />
    <span x-text="node.data.label"></span>
    <template x-if="node.data.type !== 'start'">
        <x-flow-handle type="source" position="right" />
    </template>
</x-slot:node>
```

## Styling

Handles use these CSS variables for customization:

| Variable | Default | Description |
|----------|---------|-------------|
| `--flow-handle-size` | `8px` | Handle diameter |
| `--flow-handle-bg` | theme-dependent | Handle fill color |
| `--flow-handle-border` | theme-dependent | Handle border color |
| `--flow-handle-border-width` | `1px` | Handle border width |

```css
.flow-container {
    --flow-handle-size: 10px;
    --flow-handle-bg: #3b82f6;
}
```

## Directive Mapping

Maps to AlpineFlow's `x-flow-handle` directive:

| Blade | Directive |
|-------|-----------|
| `<x-flow-handle type="source" position="bottom" />` | `x-flow-handle:source.bottom` |
| `<x-flow-handle type="target" position="left" />` | `x-flow-handle:target.left` |
| `<x-flow-handle type="source" position="right" id="out-1" />` | `x-flow-handle:source.right="'out-1'"` |

## See also

- [Handles](../handles/positions.md) -- positioning, validation, and connection limits
- [Connections](../connections/basics.md) -- drag-to-connect and click-to-connect behavior
