---
title: Schema Addon
description: WireFlow surface for the AlpineFlow schema addon — designer preset, inspectors, server trait, validators.
order: 5
---

# Schema Addon

The WireFlow schema addon provides Blade components, a server-side trait, and Laravel validator rules for AlpineFlow's [schema addon](https://artisanflow.dev/alpineflow/docs/addons/schema). Use it to build database-schema designers, ER diagrams, and resource graphs in Livewire.

## Installation

The schema addon ships in the same WireFlow package — no separate install required. Run the install command once and it's available:

```bash
php artisan wireflow:install
```

For consumers who load AlpineFlow from npm rather than the bundled WireFlow dist, register the schema addon plugin alongside the core:

```js
import AlpineFlow from '@getartisanflow/alpineflow';
import AlpineFlowSchema from '@getartisanflow/alpineflow/schema';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
    window.Alpine.plugin(AlpineFlowSchema);
});
```

The bundled WireFlow dist already includes the schema addon, so the npm path is only needed when you're managing AlpineFlow yourself.

## Components

| Component | Purpose |
| --- | --- |
| [`<x-schema-designer>`](../components/schema-designer.md) | Opinionated full drop-in: canvas, inspectors, save controls. |
| [`<x-flow-schema-node>`](../components/schema-node.md) | Directive wrapper for schema-style nodes with optional SSR fallback. |
| [`<x-schema-field>`](../components/schema-field.md) | Composable row primitive — use to build custom field rows. |
| [`<x-schema-node-inspector>`](../components/schema-inspector.md) | Three-scope inspector — node level. |
| [`<x-schema-row-inspector>`](../components/schema-inspector.md) | Three-scope inspector — row level. |
| [`<x-schema-edge-inspector>`](../components/schema-inspector.md) | Three-scope inspector — edge level. |

## Server-side trait

[`WithSchemaDesigner`](../traits/with-schema-designer.md) — server-side CRUD over fields, edge cascade on field rename/remove, and event hooks for downstream persistence.

## Validator rules

| Rule | Purpose |
| --- | --- |
| `SchemaFieldName` | Validates field-name shape (no spaces, leading-letter, …). |
| `SchemaEdgeShape` | Validates edge connection shape (source/target match, sourceHandle present). |

## Wire bridge

The schema addon adds an asynchronous validation gate around drag-to-connect: dispatch `@connect-validate` from the canvas, resolve from the server, and the connection only commits when the server says yes.

See [Server events](../server/events.md) for the full event reference.

## Quick start

```php
<?php
use ArtisanFlow\WireFlow\Concerns\WithSchemaDesigner;
use Livewire\Component;

class SchemaEditor extends Component
{
    use WithSchemaDesigner;

    public array $nodes = [
        ['id' => 'user', 'data' => ['label' => 'User', 'fields' => [['name' => 'id', 'type' => 'uuid', 'key' => 'primary']]]],
    ];

    public array $edges = [];

    public function render()
    {
        return view('livewire.schema-editor');
    }
}
```

```blade
<x-schema-designer :nodes="$nodes" :edges="$edges" />
```

That's the full surface — node rendering, drag-to-connect, inspectors, and server sync are all wired.
