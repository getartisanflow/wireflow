---
title: Node Styling
description: Status classes and custom CSS.
order: 5
---

# Node Styling

WireFlow provides built-in status classes for semantic color coding, per-node CSS classes, accent stripes, and CSS variable overrides.

## Status classes

Apply status classes via the `class` key on a node:

```php
public array $nodes = [
    ['id' => '1', 'position' => ['x' => 0, 'y' => 0], 'class' => 'flow-node-success', 'data' => ['label' => 'Completed']],
    ['id' => '2', 'position' => ['x' => 250, 'y' => 0], 'class' => 'flow-node-warning', 'data' => ['label' => 'Pending']],
    ['id' => '3', 'position' => ['x' => 500, 'y' => 0], 'class' => 'flow-node-danger', 'data' => ['label' => 'Failed']],
    ['id' => '4', 'position' => ['x' => 0, 'y' => 120], 'class' => 'flow-node-info', 'data' => ['label' => 'Info']],
    ['id' => '5', 'position' => ['x' => 250, 'y' => 120], 'class' => 'flow-node-primary', 'data' => ['label' => 'Active']],
];
```

| Class | Purpose | Color |
|-------|---------|-------|
| `flow-node-success` | Completed or approved states | Green |
| `flow-node-warning` | Needs attention or pending review | Amber |
| `flow-node-danger` | Error or failed states | Red |
| `flow-node-info` | Informational or neutral highlights | Blue |
| `flow-node-primary` | Primary or active emphasis | Purple |

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'default', position: { x: 0, y: 0 }, data: { label: 'Default' } },
        { id: 'success', position: { x: 180, y: 0 }, data: { label: 'Success' }, class: 'flow-node-success' },
        { id: 'warning', position: { x: 360, y: 0 }, data: { label: 'Warning' }, class: 'flow-node-warning' },
        { id: 'danger', position: { x: 0, y: 80 }, data: { label: 'Danger' }, class: 'flow-node-danger' },
        { id: 'info', position: { x: 180, y: 80 }, data: { label: 'Info' }, class: 'flow-node-info' },
        { id: 'primary', position: { x: 360, y: 80 }, data: { label: 'Primary' }, class: 'flow-node-primary' },
    ],
    edges: [],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 250px;">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <span x-text="node.data.label"></span>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Custom CSS via `class`

Set the `class` key on a node to add custom CSS classes. Multiple classes can be space-separated:

```php
[
    'id' => '1',
    'position' => ['x' => 0, 'y' => 0],
    'class' => 'my-custom-node highlight',
    'data' => ['label' => 'Styled'],
]
```

These classes are applied in addition to the automatic `.flow-node` class.

## Accent stripe

Nodes have a configurable top border stripe controlled by the `--flow-node-border-top` CSS variable:

```css
.flow-container {
    --flow-node-border-top: 2.5px solid #d4d4d8;
}
```

Status classes automatically set a matching top border color. Override per node using the `style` key:

```php
[
    'id' => '1',
    'position' => ['x' => 0, 'y' => 0],
    'style' => 'border-top: 3px solid #3b82f6;',
    'data' => ['label' => 'Blue accent'],
]
```

## CSS variable overrides

Override these variables on `.flow-container` or any parent element to change the default appearance of all nodes:

| Variable | Description |
|----------|-------------|
| `--flow-node-bg` | Node background color |
| `--flow-node-color` | Node text color |
| `--flow-node-border` | Node border shorthand |
| `--flow-node-border-top` | Top border accent stripe |
| `--flow-node-border-radius` | Border radius |
| `--flow-node-padding` | Inner padding |
| `--flow-node-shadow` | Box shadow |
| `--flow-node-min-width` | Minimum node width |
| `--flow-node-hover-border-color` | Border color on hover |
| `--flow-node-selected-border-color` | Border color when selected |
| `--flow-node-selected-shadow` | Box shadow when selected |

### Example: custom theme

```css
.flow-container {
    --flow-node-bg: #1e293b;
    --flow-node-color: #e2e8f0;
    --flow-node-border: 1px solid #334155;
    --flow-node-border-top: 3px solid #6366f1;
    --flow-node-border-radius: 12px;
    --flow-node-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    --flow-node-hover-border-color: #6366f1;
    --flow-node-selected-border-color: #818cf8;
    --flow-node-selected-shadow: 0 0 0 2px #818cf8;
}
```

## Automatic CSS classes

These classes are applied automatically based on node state:

| Class | Applied when |
|-------|-------------|
| `.flow-node` | Always |
| `.flow-node-selected` | Node is selected |
| `.flow-node-locked` | `locked` is `true` (dashed border) |
| `.flow-node-group` | `type` is `'group'` |
| `.flow-node-hidden` | `hidden` is `true` |
| `.flow-node-condensed` | Node is in condensed view |
| `.flow-node-{shape}` | Node has a shape (e.g., `.flow-node-diamond`) |

## See also

- [Node Basics](basics.md) -- node `class` and `style` properties
- [Shapes](shapes.md) -- shape-specific CSS classes
- [Groups & Nesting](groups.md) -- group node styling
