---
title: x-flow-schema-node
description: Database-schema-style node (header + labelled rows + per-row handles) for WireFlow canvases.
order: 13
---

# x-flow-schema-node

Wraps AlpineFlow's `x-flow-schema` directive for WireFlow. Renders a table-shaped node: header with the table / type name, one row per field, per-row target (left) and source (right) handles so edges attach to specific fields.

```blade
<x-flow :nodes="$tables" :edges="$relationships">
    <x-slot:node>
        <x-flow-schema-node />
    </x-slot:node>
</x-flow>
```

The bound `node` variable (from the `<x-flow>` loop) must carry:

```php
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
]
```

## Field shape

| Key        | Type              | Required | Purpose                                                             |
| ---------- | ----------------- | -------- | ------------------------------------------------------------------- |
| `name`     | string            | yes      | Field name — used as handle id.                                     |
| `type`     | string            | yes      | Display type, rendered as a pill.                                   |
| `key`      | `'primary'` \| `'foreign'` | no | Adds the `flow-schema-row--pk` or `--fk` CSS class.             |
| `required` | bool              | no       | Adds `flow-schema-row--required`.                                   |
| `icon`     | string            | no       | Renders as a prefix inside `.flow-schema-row-icon`.                 |

## Connecting fields

Edges specify which field on each side they attach to via `sourceHandle` + `targetHandle`:

```php
[
    'id' => 'user-team',
    'source' => 'user',
    'sourceHandle' => 'team_id',
    'target' => 'team',
    'targetHandle' => 'id',
]
```

## SSR fallback

Passing explicit `:label` + `:fields` props renders the full schema HTML server-side — useful for pre-JS paint and Livewire morph diffs:

```blade
<x-flow-schema-node :label="'User'" :fields="$userFields" />
```

When used inside an `<x-flow>` loop, skip those props — the bound `node` drives the client-side render.

## See also

- [x-flow component](flow.md) — the outer canvas
- [AlpineFlow: Schema Nodes](https://artisanflow.dev/docs/alpineflow/nodes/schema) — the underlying directive
