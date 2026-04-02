---
title: x-flow-condense
description: Toggle condensed summary view for nodes.
order: 10
---

# x-flow-condense

Toggle between full and condensed summary views for nodes. When condensed, a node shows a compact representation instead of its full content.

::demo
```toolbar
<button id="demo-condense-toggle" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Toggle Condense</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 20, y: 20 }, data: { label: 'Task', description: 'This node has extra detail that can be hidden when condensed.' } },
        { id: 'b', position: { x: 300, y: 20 }, data: { label: 'Result', description: 'Click the button above to toggle condensed view.' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
    ],
    background: 'dots',
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 200px;"
   x-init="
       document.getElementById('demo-condense-toggle').addEventListener('click', () => {
           $flow.condenseNode('a');
           $flow.condenseNode('b');
       });
   ">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node" style="max-width: 200px;">
                <div x-flow-handle:target.left></div>
                <strong style="font-size: 12px;" x-text="node.data.label"></strong>
                <p x-show="!node.condensed" style="font-size: 11px; opacity: 0.7; margin: 4px 0 0;" x-text="node.data.description"></p>
                <div x-flow-handle:source.right></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Props

No props. The component auto-binds to the current `node.id` when used inside a node template.

## Usage

Place inside a node template to add a condense toggle:

```blade
<x-slot:node>
    <span x-text="node.data.label"></span>
    <p x-show="!node.condensed" x-text="node.data.description"></p>
    <x-flow-condense>Summary</x-flow-condense>
</x-slot:node>
```

When clicked, the node toggles between its full view and condensed state. Use `node.condensed` in your template to conditionally show or hide content based on the current state.

## Programmatic Control

Toggle condense state from JavaScript:

```js
$flow.condenseNode('node-id');
```

This toggles the `condensed` flag on the node. You can call it from `x-init`, `@click`, or any Alpine expression.

## Directive mapping

Maps to: `x-flow-condense`
