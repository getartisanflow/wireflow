---
title: x-flow-action
description: Declarative canvas action buttons.
order: 7
---

# x-flow-action

Declarative canvas action buttons that map to common flow canvas operations. Each button auto-manages its disabled state (e.g., undo is disabled when there's no history).

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 20, y: 40 }, data: { label: 'Node A' } },
        { id: 'b', position: { x: 220, y: 40 }, data: { label: 'Node B' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
    ],
    background: 'dots',
    controls: false,
    history: true,
})" class="flow-container" style="height: 220px;">
    <div x-flow-panel:top-left.static style="display: flex; gap: 4px; padding: 6px;">
        <button x-flow-action:undo class="rounded border border-border-subtle bg-elevated px-2 py-0.5 text-[11px] cursor-pointer hover:text-text-body disabled:opacity-30 disabled:cursor-default">Undo</button>
        <button x-flow-action:redo class="rounded border border-border-subtle bg-elevated px-2 py-0.5 text-[11px] cursor-pointer hover:text-text-body disabled:opacity-30 disabled:cursor-default">Redo</button>
        <button x-flow-action:fit-view class="rounded border border-border-subtle bg-elevated px-2 py-0.5 text-[11px] cursor-pointer hover:text-text-body">Fit View</button>
        <button x-flow-action:zoom-in class="rounded border border-border-subtle bg-elevated px-2 py-0.5 text-[11px] cursor-pointer hover:text-text-body">Zoom In</button>
        <button x-flow-action:zoom-out class="rounded border border-border-subtle bg-elevated px-2 py-0.5 text-[11px] cursor-pointer hover:text-text-body">Zoom Out</button>
    </div>
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <div x-flow-handle:target.left></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source.right></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `type` | `string` | Yes | — | Action type: `'undo'`, `'redo'`, `'fit-view'`, `'zoom-in'`, `'zoom-out'`, `'toggle-interactive'`, `'clear'`, `'reset'`, `'export'` |

## Usage

```blade
<x-flow-action type="undo">Undo</x-flow-action>
```

This renders as:

```html
<button x-flow-action:undo>Undo</button>
```

Each action type maps to the corresponding `x-flow-action:{type}` Alpine directive.

### Available actions

| Type | Description |
|------|-------------|
| `undo` | Undo the last change (requires `history` enabled) |
| `redo` | Redo the last undone change |
| `fit-view` | Fit all nodes into the viewport |
| `zoom-in` | Zoom in by one step |
| `zoom-out` | Zoom out by one step |
| `toggle-interactive` | Toggle interactive mode on/off |
| `clear` | Remove all nodes and edges |
| `reset` | Reset to initial state |
| `export` | Export the canvas (accepts options via expression) |

### Passing options

For actions that accept options (e.g., `export`), pass an expression via attributes:

```blade
<x-flow-action type="export" x-bind:value="{ format: 'png', quality: 0.9 }">
    Export PNG
</x-flow-action>
```

## Behavior

- Auto-manages `disabled` state (e.g., `undo` is disabled when there is no history to undo).
- Auto-applies appropriate `aria-*` attributes for accessibility.

## Directive mapping

Maps to: `x-flow-action:{type}`
