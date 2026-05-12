---
title: Schema Nodes
description: Dedicated node type for database tables, GraphQL types, API schemas — any structured object with a list of labelled fields.
order: 6
---

# Schema Nodes

The `x-flow-schema` directive turns a node into a structured table display — header + one row per field + per-row labelled handles. It's the right primitive for ERD diagrams, GraphQL schema viewers, API payload designers, and anything where users drag connections between specific fields of one object and another.

WireFlow ships a Blade wrapper, [`<x-flow-schema-node>`](../components/schema-node.md), that applies the directive for you inside an `<x-flow>` canvas.

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        {
            id: 'user',
            position: { x: 0, y: 0 },
            data: {
                label: 'User',
                fields: [
                    { name: 'id',         type: 'uuid',      key: 'primary' },
                    { name: 'email',      type: 'text',      required: true },
                    { name: 'team_id',    type: 'uuid',      },
                    { name: 'created_at', type: 'timestamp' },
                ],
            },
        }
    ],
    edges: [
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 340px;">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node" x-flow-schema></div>
        </template>
    </div>
</div>
```
::enddemo

## Usage

Provide a `data.label` and `data.fields` array on each node, then drop `<x-flow-schema-node>` into the `node` slot:

```blade
<x-flow :nodes="$tables" :edges="$relationships">
    <x-slot:node>
        <x-flow-schema-node />
    </x-slot:node>
</x-flow>
```

```php
public array $tables = [
    [
        'id' => 'user',
        'position' => ['x' => 0, 'y' => 0],
        'data' => [
            'label' => 'User',
            'fields' => [
                ['name' => 'id',         'type' => 'uuid',      'key' => 'primary'],
                ['name' => 'email',      'type' => 'text',      'required' => true],
                ['name' => 'team_id',    'type' => 'uuid',      'key' => 'foreign'],
                ['name' => 'created_at', 'type' => 'timestamp'],
            ],
        ],
    ],
];

public array $relationships = [];
```

The directive reads `node.data.label` and `node.data.fields` at init and re-runs on any mutation to those properties. Each field becomes one row with:

- a **target handle on the left** (for incoming edges)
- the field name + optional icon prefix
- a **type pill on the right**
- a **source handle on the right** (for outgoing edges)

Both handles carry `data-flow-handle-id="<field.name>"` — edges between schema nodes set `sourceHandle` and `targetHandle` to field names, and AlpineFlow's handle infrastructure resolves the coordinates automatically.

## Field shape

```ts
interface FlowSchemaField {
  name: string;
  type: string;
  key?: 'primary' | 'foreign';
  required?: boolean;
  icon?: string;
}
```

Only `name` and `type` are load-bearing. The rest drive CSS decorations:

| Flag            | Class added                          | Default theme                |
| --------------- | ------------------------------------ | ---------------------------- |
| `key: primary`  | `flow-schema-row--pk`                | PK badge (amber)             |
| `key: foreign`  | `flow-schema-row--fk`                | FK badge (violet)            |
| `required`      | `flow-schema-row--required`          | red asterisk suffix          |
| `icon`          | renders `.flow-schema-row-icon` span | inline prefix (emoji / text) |

## Connecting fields

An edge between two schema nodes specifies which field on each side it attaches to:

```php
[
    'id' => 'user-team',
    'source' => 'user',
    'sourceHandle' => 'team_id',
    'target' => 'team',
    'targetHandle' => 'id',
]
```

Users drag from a row's right-edge handle to another row's left-edge handle — AlpineFlow records `sourceHandle` / `targetHandle` from the handle ids automatically.

::demo
```html
<div x-data="flowCanvas({
    nodes: [
        {
            id: 'user',
            position: { x: 0, y: 0 },
            data: {
                label: 'User',
                fields: [
                    { name: 'id',         type: 'uuid',      key: 'primary' },
                    { name: 'email',      type: 'text',      required: true },
                    { name: 'team_id',    type: 'uuid',      key: 'foreign' },
                    { name: 'created_at', type: 'timestamp' },
                ],
            },
        },
        {
            id: 'team',
            position: { x: 360, y: 40 },
            data: {
                label: 'Team',
                fields: [
                    { name: 'id',   type: 'uuid', key: 'primary' },
                    { name: 'name', type: 'text', required: true },
                    { name: 'plan', type: 'enum' },
                ],
            },
        },
    ],
    edges: [
        { id: 'user-team', source: 'user', sourceHandle: 'team_id', target: 'team', targetHandle: 'id' },
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 340px;">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node" x-flow-schema></div>
        </template>
    </div>
</div>
```
::enddemo

## Custom rendering

The directive fully owns the node element's contents. For custom rendering, skip `<x-flow-schema-node>` and write your own template inside the `node` slot:

```blade
<x-flow :nodes="$tables" :edges="$relationships">
    <x-slot:node>
        <div x-flow-node="node" class="w-96">
            <div class="my-header text-center text-2xl" x-text="node.data.label"></div>
            <div class="flex w-full">
                <template x-for="field in node.data.fields" :key="field.name">
                    <div class="p-2 flex-1 text-center" x-text="field.name"></div>
                </template>
            </div>
        </div>
    </x-slot:node>
</x-flow>
```


::demo
```html
<div x-data="flowCanvas({
    nodes: [
        {
            id: 'user',
            position: { x: 0, y: 0 },
            data: {
                label: 'User',
                fields: [
                    { name: 'id',         type: 'uuid',      key: 'primary' },
                    { name: 'email',      type: 'text',      required: true },
                    { name: 'team_id',    type: 'uuid',      },
                    { name: 'created_at', type: 'timestamp' },
                ],
            },
        }
    ],
    edges: [
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 340px;">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node" class="w-96">
                <div class="my-header text-center text-2xl" x-text="node.data.label"></div>
                <div class="flex w-full">
                    <template x-for="field in node.data.fields" :key="field.name">
                        <div class="p-2 flex-1 text-center" x-text="field.name"></div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

The handle ids + positions + per-row structure are the only things edge wiring cares about — everything else is yours.

## See Also

- [`<x-flow-schema-node>`](../components/schema-node.md) — the Blade wrapper for the directive
- [Schema Addon](../addons/schema.md) — designer preset, inspectors, server trait, and validator rules built on top of this primitive
- [AlpineFlow: Schema Nodes](https://artisanflow.dev/docs/alpineflow/nodes/schema) — upstream directive reference
