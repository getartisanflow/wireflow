---
title: x-flow-collapse
description: Toggle collapse/expand for node hierarchies.
order: 9
---

# x-flow-collapse

Toggle collapse and expand for node hierarchies. When a node is collapsed, its children are hidden and edges to them are tucked away.

::demo
```toolbar
<button id="demo-collapse-toggle" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Toggle Collapse</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'group', type: 'group', position: { x: 20, y: 10 }, data: { label: 'Team' }, dimensions: { width: 260, height: 150 } },
        { id: 'c1', position: { x: 20, y: 40 }, data: { label: 'Alice' }, parentId: 'group' },
        { id: 'c2', position: { x: 140, y: 40 }, data: { label: 'Bob' }, parentId: 'group' },
        { id: 'c3', position: { x: 80, y: 90 }, data: { label: 'Carol' }, parentId: 'group' },
        { id: 'mgr', position: { x: 350, y: 50 }, data: { label: 'Manager' } },
    ],
    edges: [
        { id: 'e1', source: 'c1', target: 'c3' },
        { id: 'e2', source: 'c2', target: 'c3' },
        { id: 'e3', source: 'group', target: 'mgr' },
    ],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 230px;"
   x-init="
       document.getElementById('demo-collapse-toggle').addEventListener('click', () => {
           const group = getNode('group');
           if (group.collapsed) {
               $flow.expandNode('group');
           } else {
               $flow.collapseNode('group');
           }
       });
   ">
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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `instant` | `bool` | `false` | Skip animation, collapse/expand immediately |
| `all` | `bool` | `false` | Collapse or expand all collapsible nodes at once |
| `expand` | `bool` | `false` | Expand only (no toggle) |
| `children` | `bool` | `false` | Collapse children of a node |

## Usage

### Inside a node template

When placed inside a node template, the button auto-binds to the current `node.id`:

```blade
<x-slot:node>
    <span x-text="node.data.label"></span>
    <x-flow-collapse>Toggle</x-flow-collapse>
</x-slot:node>
```

### Instant (no animation)

```blade
<x-flow-collapse :instant="true">Toggle</x-flow-collapse>
```

### Batch operations

Collapse or expand all nodes from outside the node template:

```blade
<x-flow-collapse :all="true">Collapse All</x-flow-collapse>
<x-flow-collapse :all="true" :expand="true">Expand All</x-flow-collapse>
```

### Collapse children only

```blade
<x-flow-collapse :children="true">Collapse Children</x-flow-collapse>
```

## Directive mapping

Maps to: `x-flow-collapse` with modifiers (`.instant`, `.all`, `.expand`, `.children`)
