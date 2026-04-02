---
title: x-flow-context-menu
description: Right-click context menus.
order: 8
---

# x-flow-context-menu

Right-click context menus scoped to specific canvas elements. The menu appears at the cursor position and auto-dismisses on click-away or Escape.

Right-click a node or the empty canvas to see the context menu:

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 40, y: 30 }, data: { label: 'Right-click me' } },
        { id: 'b', position: { x: 280, y: 30 }, data: { label: 'Or me' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
    ],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 200px;">
    <div x-flow-context-menu.node class="rounded border border-border-subtle bg-elevated shadow-md p-1" style="min-width: 140px;">
        <div class="px-2 py-1 text-[11px] opacity-50" x-text="'Node: ' + contextMenu.node?.data?.label"></div>
        <button @click="removeNodes([contextMenu.node.id]); closeContextMenu()" class="w-full text-left px-2 py-1 text-[12px] rounded hover:bg-red-500/10 hover:text-red-400 cursor-pointer">Delete</button>
    </div>
    <div x-flow-context-menu.pane class="rounded border border-border-subtle bg-elevated shadow-md p-1" style="min-width: 140px;">
        <button @click="addNodes([{ id: 'n-' + Date.now(), position: { x: contextMenu.position.x, y: contextMenu.position.y }, data: { label: 'New' } }]); closeContextMenu()" class="w-full text-left px-2 py-1 text-[12px] rounded hover:bg-elevated cursor-pointer">Add Node Here</button>
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
| `scope` | `string` | Yes | — | Context scope: `'node'`, `'edge'`, `'pane'`, `'selection'` |
| `offset-x` | `int` | No | `0` | Horizontal offset from cursor position in pixels |
| `offset-y` | `int` | No | `0` | Vertical offset from cursor position in pixels |

## Usage

```blade
<x-flow-context-menu scope="node">
    <button @click="removeNodes([contextMenu.node.id]); closeContextMenu()">
        Delete Node
    </button>
    <button @click="duplicateNode(contextMenu.node.id); closeContextMenu()">
        Duplicate
    </button>
</x-flow-context-menu>
```

### Scopes

| Scope | Triggers on | `contextMenu` properties |
|-------|-------------|--------------------------|
| `node` | Right-click a node | `.node`, `.position` |
| `edge` | Right-click an edge | `.edge`, `.position` |
| `pane` | Right-click empty canvas | `.position` |
| `selection` | Right-click a multi-selection | `.nodes`, `.edges`, `.position` |

### Accessing context data

Inside the menu slot, the `contextMenu` object is available with properties depending on the scope:

```blade
<x-flow-context-menu scope="node">
    <div class="text-xs text-gray-500" x-text="'Node: ' + contextMenu.node.data.label"></div>
    <button @click="removeNodes([contextMenu.node.id]); closeContextMenu()">
        Delete
    </button>
</x-flow-context-menu>
```

### Closing the menu

Call `closeContextMenu()` from menu items to dismiss the menu after an action:

```blade
<button @click="lockNode(contextMenu.node.id); closeContextMenu()">
    Lock
</button>
```

### Offset positioning

```blade
<x-flow-context-menu scope="pane" :offset-x="8" :offset-y="8">
    <button @click="addNode(contextMenu.position); closeContextMenu()">
        Add Node Here
    </button>
</x-flow-context-menu>
```

## Behavior

- Auto-manages positioning relative to the cursor.
- Dismisses on click-away or `Escape` key.
- Keyboard navigation within menu items.
- Applies appropriate ARIA roles (`role="menu"`, `role="menuitem"`).

## Directive mapping

Maps to: `x-flow-context-menu.{scope}`
