---
title: x-schema-designer
description: Blade preset that wraps x-flow with defaults tuned for database-schema / ERD-style diagrams, plus three slot-overridable inspector panes.
order: 14
---

# x-schema-designer

`<x-schema-designer>` is a one-line preset for typed-field schema graphs — ERDs, API payload shapes, GraphQL types, event schemas, or anything whose nodes are "things with labelled, typed fields". Under the hood it stamps an `<x-flow>` canvas plus three inspector mount points (node / row / edge) that the [AlpineFlow Schema addon](https://artisanflow.dev/docs/alpineflow/addons/schema) drives client-side.

Reach for `<x-schema-designer>` when you want the batteries-included schema surface. For generic flow canvases — workflow editors, DAG runners, mind maps — use [`<x-flow>`](flow.md) directly.

## Installation

The preset requires the JS addon to be registered on the Alpine side. Follow the [optional addons](../getting-started/installation.md#optional-addons) steps, then add the schema import alongside the core bundle in `resources/js/app.js`:

```js
// Core from WireFlow vendor bundle
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';
// Schema addon from npm
import AlpineFlowSchema from '@getartisanflow/alpineflow/schema';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
    window.Alpine.plugin(AlpineFlowSchema);
});
```

Rebuild after editing the import:

```bash
npm run build
```

## Minimal example

```blade
<x-schema-designer :nodes="$tables" :edges="$relationships" />
```

The `$tables` array follows the [x-flow-schema-node](schema-node.md) shape — one entry per node, each with `data.label` and `data.fields`:

```php
$tables = [
    [
        'id' => 'user',
        'position' => ['x' => 0, 'y' => 0],
        'data' => [
            'label' => 'User',
            'fields' => [
                ['name' => 'id',    'type' => 'uuid', 'key' => 'primary'],
                ['name' => 'email', 'type' => 'text', 'required' => true],
            ],
        ],
    ],
];

$relationships = [];
```

That renders the canvas, wires the default node / row / edge inspectors, enables keyboard-to-connect, and uses the `avoidant` edge router — no further setup needed.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nodes` | `array` | `[]` | Initial nodes. Same shape as [`<x-flow>`](flow.md#data). |
| `edges` | `array` | `[]` | Initial edges. Each edge should carry `sourceHandle` / `targetHandle` to pin onto a specific field. |
| `defaultEdgeType` | `string` | `'avoidant'` | Default edge renderer. `'avoidant'` is best for schema graphs because it routes around tables; switch to `'bezier'` / `'smoothstep'` / `'step'` / `'straight'` if you prefer. |
| `keyboardConnect` | `bool` | `true` | Enable the addon's keyboard-to-connect flow (select a row, press a key, click another row). |
| `collapseBidirectionalEdges` | `bool` | `false` | When `true`, edges between the same two nodes in opposite directions are visually merged into a single two-headed arrow. |

The preset passes the last two props through to the addon via the canvas `config` (`keyboardConnect`, `collapseBidirectionalEdges`). All other [`<x-flow>` props](flow.md#props) are not exposed directly — if you need to customise the canvas further, drop down to `<x-flow>` and add the three `x-schema-*-inspector` mount points by hand (see [`<x-schema-node-inspector>`](schema-inspector.md)).

## Slot overrides

| Slot | Purpose |
|------|---------|
| Default slot | Free-form children rendered inside `<x-flow>` — use this for toolbars, minimaps, context menus, extra panels. |
| `<x-slot:node-inspector>` | Replaces the node inspector body. Receives the canvas Alpine scope — `selectedNode` and `inspector` are in scope. |
| `<x-slot:row-inspector>` | Replaces the row inspector body. `selectedRow` and `inspector` are in scope. |
| `<x-slot:edge-inspector>` | Replaces the edge inspector body. `selectedEdge` and `inspector` are in scope. |

Each inspector slot is rendered inside the addon's directive wrapper, so the Alpine inspector scope (`selectedNode`, `inspector.addField(...)`, etc.) is already in scope — your markup just needs to consume it.

### Overriding the node inspector

```blade
<x-schema-designer :nodes="$tables" :edges="$relationships">
    <x-slot:node-inspector>
        <flux:card class="p-4">
            <flux:heading size="sm" x-text="selectedNode?.data?.label ?? 'No table selected'" />
            <template x-if="selectedNode">
                <flux:button
                    variant="ghost"
                    size="xs"
                    @click="inspector.addField({ name: 'created_at', type: 'timestamp' })"
                >
                    Add created_at
                </flux:button>
            </template>
        </flux:card>
    </x-slot:node-inspector>
</x-schema-designer>
```

Omitting a slot keeps the addon's default UI for that pane — mix and match as needed.

### Adding canvas children

The default slot is a pass-through to `<x-flow>`, so you can layer any other WireFlow component inside:

```blade
<x-schema-designer :nodes="$tables" :edges="$relationships">
    <x-flow-panel position="top-right">
        <flux:button wire:click="inferReferences">Infer references</flux:button>
    </x-flow-panel>

    <x-flow-toolbar />
</x-schema-designer>
```

## Server-side cascade

Pair the preset with the [`WithSchemaDesigner`](../traits/with-schema-designer.md) trait to mutate `$this->nodes` / `$this->edges` from the server with cascade semantics that match the client addon.

## See also

- [`<x-schema-node-inspector>` / `<x-schema-row-inspector>` / `<x-schema-edge-inspector>`](schema-inspector.md) — the lower-level inspector wrappers
- [`<x-flow>`](flow.md) — the underlying canvas component
- [`<x-flow-schema-node>`](schema-node.md) — the node template for typed fields
- [`WithSchemaDesigner` trait](../traits/with-schema-designer.md) — server-side field CRUD
- [AlpineFlow Schema addon](https://artisanflow.dev/docs/alpineflow/addons/schema) — the full client-side API
