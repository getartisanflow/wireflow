# WireFlow

[![Latest Version on Packagist](https://img.shields.io/packagist/v/getartisanflow/wireflow.svg?style=flat-square)](https://packagist.org/packages/getartisanflow/wireflow)
[![License](https://img.shields.io/packagist/l/getartisanflow/wireflow.svg?style=flat-square)](https://packagist.org/packages/getartisanflow/wireflow)

Livewire components for [AlpineFlow](https://github.com/getartisanflow/alpineflow) — build interactive flow diagrams in Laravel with zero JavaScript.

## Install

```bash
composer require getartisanflow/wireflow
php artisan wireflow:install
```

## Quick Start

```php
// In your Livewire component
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;

class MyFlowEditor extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => '1', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Start']],
        ['id' => '2', 'position' => ['x' => 200, 'y' => 100], 'data' => ['label' => 'End']],
    ];

    public array $edges = [
        ['id' => 'e1', 'source' => '1', 'target' => '2'],
    ];
}
```

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

Raw AlpineFlow directives (`x-flow-handle:target.top`, `x-flow-panel`, etc.) also work inside `<x-flow>` — the Blade components are typed wrappers around the same directives. Use whichever style fits your codebase.

## Features

- **12 Blade components** matching AlpineFlow directives: `<x-flow>`, `<x-flow-handle>`, `<x-flow-panel>`, `<x-flow-toolbar>`, `<x-flow-drag-handle>`, `<x-flow-resizer>`, and more
- **Schema designer components** — `<x-schema-designer>` preset plus `<x-schema-node-inspector>`, `<x-schema-row-inspector>`, `<x-schema-edge-inspector>` slot-overridable wrappers
- **`WithWireFlow` trait** for Livewire components with 50+ flow methods
- **`WithSchemaDesigner` trait** — server-side field CRUD (`addField`, `renameField`, `removeField`, `removeNode`) with automatic edge cascade
- **Validator rules** — `SchemaFieldName` and `SchemaEdgeShape` for reusable input validation
- **Three sync modes**: static, entangled (`:sync`), and listen (server-driven)
- **`WireFlow::js()`** for client-side JavaScript callbacks
- **Server-side connection validation** via `@connect` events and async `@connect-validate` bridge
- **Bundled AlpineFlow assets** — no npm install required, includes schema + workflow addons
- **Artisan install command** (`php artisan wireflow:install`)
- **Publishable configuration** with theme support (default, flux, structural)
- **Collaboration support** with ReverbProvider
- **Livewire 3 and 4** compatible
- **Laravel 11, 12, and 13** compatible

## Configuration

```bash
php artisan vendor:publish --tag=wireflow-config
```

```php
// config/wireflow.php
return [
    'theme' => 'default', // 'default', 'flux', or 'structural'
];
```

## Acknowledgments

WireFlow is built on top of [AlpineFlow](https://github.com/getartisanflow/alpineflow), which was inspired by [React Flow](https://reactflow.dev) and its core architecture. Special thanks to the React Flow team for pioneering the open-source node-based UI space.

Follow the journey of building AlpineFlow and WireFlow at [zachiler.dev](https://zachiler.dev).

## Author

Created by [Zac Hiler](https://github.com/zachiler).

## License

MIT
