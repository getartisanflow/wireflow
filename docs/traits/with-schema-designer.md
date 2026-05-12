---
title: WithSchemaDesigner Trait
description: Server-side field CRUD for schema graphs — mirrors the AlpineFlow schema addon with cascade, validation, and client dispatch.
order: 1
---

# WithSchemaDesigner Trait

`WithSchemaDesigner` is the server-side mirror of the [AlpineFlow Schema addon's](https://artisanflow.dev/docs/alpineflow/addons/schema) field CRUD. It gives your Livewire component four methods — `addField`, `renameField`, `removeField`, `removeNode` — that mutate `$this->nodes` / `$this->edges` with the same cascade semantics the client addon uses, and dispatch `flow:update` / `flow:fromObject` so the canvas stays in sync.

Use it alongside [`WithWireFlow`](../server/trait.md) whenever the authoritative schema lives on the server (for example, when you persist to a database and want server-side validation before the client sees a change).

## Setup

The component must expose public `nodes` and `edges` arrays. Pair the trait with `WithWireFlow` so the usual flow control methods (undo, fit view, etc.) are available too:

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithSchemaDesigner;
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;

class SchemaEditor extends Component
{
    use WithWireFlow;
    use WithSchemaDesigner;

    public array $nodes = [
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

    public array $edges = [];

    public function render()
    {
        return view('livewire.schema-editor');
    }
}
```

The matching Blade template mounts `<x-schema-designer>` bound to these properties:

```blade
<x-schema-designer :nodes="$nodes" :edges="$edges" />
```

## Method reference

Each method mutates `$this->nodes` / `$this->edges` in place, dispatches a client event, and returns an array describing the outcome. None of them throw.

### `addField(string $nodeId, array $field): array`

Append a field to a node. Silently no-ops on duplicate name or invalid name.

```php
$result = $this->addField('user', [
    'name' => 'avatar_url',
    'type' => 'text',
]);
// → ['applied' => true]
```

- **Extra field keys** — `key`, `required`, `icon` (and any custom keys) pass through untouched.
- **Dispatches** — `flow:update` with the node's new `data.fields`.
- **Returns** — `['applied' => bool, 'reason' => string?]`. Reasons: `invalid-name`, `no-node`, `duplicate`.

### `renameField(string $nodeId, string $oldName, string $newName): array`

Rename a field in place. Cascades every edge whose `sourceHandle` / `targetHandle` references `(nodeId, oldName)`, rewriting the handle to `newName`.

```php
$result = $this->renameField('user', 'team_id', 'organization_id');
// → ['applied' => true, 'cascadedEdgeIds' => ['e-user-team']]
```

- **Dispatches** — `flow:fromObject` with the updated nodes + edges (a single atomic swap so the client re-measures handles on the new name).
- **Returns** — `['applied' => bool, 'reason' => string?, 'cascadedEdgeIds' => array?]`. Reasons: `unchanged`, `invalid-name`, `no-node`, `no-field`, `duplicate`.

### `removeField(string $nodeId, string $fieldName): array`

Drop a field. Cascade-drops every edge that references it as `sourceHandle` / `targetHandle`.

```php
$result = $this->removeField('user', 'team_id');
// → ['applied' => true, 'droppedEdgeIds' => ['e-user-team']]
```

- **Dispatches** — `flow:update` with the node's new `data.fields`. Cascaded edges are removed server-side before dispatch.
- **Returns** — `['applied' => bool, 'reason' => string?, 'droppedEdgeIds' => array?]`. Reasons: `no-node`, `no-field`.

### `removeNode(string $nodeId): array`

Drop a node entirely, cascading all edges that touch it.

```php
$result = $this->removeNode('team');
// → ['applied' => true, 'droppedEdgeIds' => ['e-user-team', 'e-team-owner']]
```

- **Dispatches** — `flow:fromObject` with the updated nodes + edges.
- **Returns** — `['applied' => bool, 'reason' => string?, 'droppedEdgeIds' => array?]`. Reasons: `no-node`.

## Reason values

Every non-applied return carries a `reason` string. Use it to route to UI feedback:

| Reason | Meaning |
|--------|---------|
| `invalid-name` | Name failed the [`SchemaFieldName`](#schemafieldname) validator (empty, longer than 40 chars, or does not match `/^[a-z][a-z0-9_]*$/`). |
| `no-node` | The `$nodeId` argument does not exist in `$this->nodes`. |
| `no-field` | No field with the given name exists on the specified node. |
| `duplicate` | A field with the new name already exists on the node. |
| `unchanged` | `renameField` called with `$oldName === $newName`. |

## Silent-fail discipline

These methods never throw. They return `['applied' => false, 'reason' => ...]` so Livewire control flow stays clean — you can call them from component actions without wrapping in try/catch.

If you want to surface validation errors in the UI, inspect the return value and route to a toast, a banner, or `addError()`:

```php
public function addField(string $nodeId, string $name, string $type): void
{
    $result = $this->addField($nodeId, ['name' => $name, 'type' => $type]);

    if (! $result['applied']) {
        $this->dispatch('notify', [
            'type' => 'error',
            'message' => match ($result['reason']) {
                'invalid-name' => "Field name must be lowercase letters, digits, and underscores.",
                'duplicate'    => "A field named '{$name}' already exists.",
                'no-node'      => "That table no longer exists.",
                default        => "Couldn't add the field.",
            },
        ]);
    }
}
```

> Heads up — the trait method and any wrapper you write can share the same name. In the snippet above the wrapper `addField(string, string, string)` has a different signature than the trait's `addField(string, array)`, so PHP resolves the wrapper. Pick different names if you prefer to avoid shadowing.

## Complete example

A Livewire component that renders a schema designer and surfaces cascade results via a Flux toast:

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithSchemaDesigner;
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;

class SchemaEditor extends Component
{
    use WithWireFlow;
    use WithSchemaDesigner;

    public array $nodes = [];
    public array $edges = [];

    public function appendField(string $nodeId, string $name): void
    {
        $result = $this->addField($nodeId, [
            'name' => $name,
            'type' => 'text',
        ]);

        if (! $result['applied']) {
            $this->dispatch('schema-error', reason: $result['reason']);
        }
    }

    public function renameFieldWithCascade(string $nodeId, string $old, string $new): void
    {
        $result = $this->renameField($nodeId, $old, $new);

        if ($result['applied'] && ! empty($result['cascadedEdgeIds'])) {
            $this->dispatch(
                'schema-info',
                message: count($result['cascadedEdgeIds']) . ' edges rewired',
            );
        }
    }

    public function render()
    {
        return view('livewire.schema-editor');
    }
}
```

```blade
<div>
    <x-schema-designer :nodes="$nodes" :edges="$edges" style="height: 600px;" />

    <flux:toast
        x-data
        @schema-error.window="$flux.toast({ variant: 'danger', text: $event.detail.reason })"
        @schema-info.window="$flux.toast({ variant: 'success', text: $event.detail.message })"
    />
</div>
```

## Validator rules

Two PHP validation rules ship alongside the trait. Consumers can reuse them in their own Livewire validation — the trait uses them internally for `invalid-name` rejection.

### `SchemaFieldName`

Validates a single field identifier:

- Required non-empty string
- Matches `/^[a-z][a-z0-9_]*$/` — lowercase, starts with a letter, digits and underscores allowed
- Maximum 40 characters

```php
use ArtisanFlow\WireFlow\Rules\SchemaFieldName;
use Illuminate\Support\Facades\Validator;

$validator = Validator::make($request->all(), [
    'name' => ['required', new SchemaFieldName],
]);
```

Matches the client addon's name validator, so server-side rejections line up with the addon's `invalid-name` result.

### `SchemaEdgeShape`

Validates the array shape of a single edge:

- Required: `source` + `target` — non-empty strings
- Optional: `id`, `sourceHandle`, `targetHandle`, `label` — strings when present

```php
use ArtisanFlow\WireFlow\Rules\SchemaEdgeShape;

$validator = Validator::make($request->all(), [
    'edge' => [new SchemaEdgeShape],
]);
```

Useful when accepting edge payloads from the client before storing them.

## See also

- [`<x-schema-designer>`](../components/schema-designer.md) — the Blade preset that pairs with this trait
- [`<x-schema-node-inspector>` / row / edge](../components/schema-inspector.md) — the lower-level inspector wrappers
- [`WithWireFlow` trait](../server/trait.md) — general flow control
- [AlpineFlow Schema addon](https://artisanflow.dev/docs/alpineflow/addons/schema) — the client-side counterpart
