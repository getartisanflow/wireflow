---
title: Artisan Commands
description: WireFlow Artisan commands for installation and asset management.
order: 11
section: Reference
---

# Artisan Commands

## wireflow:install

One-command setup for WireFlow. Replaces the manual steps in the [installation guide](getting-started/installation.md).

```bash
php artisan wireflow:install
```

This command:

1. **Publishes config** — copies `wireflow.php` to `config/wireflow.php`
2. **Publishes assets** — copies AlpineFlow JS/CSS to `public/vendor/alpineflow/`
3. **Adds JS import** — prepends the AlpineFlow import and `alpine:init` registration to `resources/js/app.js`
4. **Adds CSS imports** — adds structural and theme CSS imports to `resources/css/app.css`

If imports already exist in your files, they won't be duplicated.

### Options

| Flag | Description |
|------|-------------|
| `--force` | Overwrite existing config and asset files |
| `--with=*` | Install addons non-interactively. Repeat the flag for multiple addons (e.g. `--with=workflow`). |

### Addons

When you run the command interactively, WireFlow prompts you to pick optional addons to install. Each selected addon adds the matching import and `Alpine.plugin()` registration to `resources/js/app.js`.

| Addon | Description |
|-------|-------------|
| `workflow` | `$flow.run()` execution helper, condition nodes, and edge state mirroring. |

Use `--with` to skip the prompt in CI, containers, or scripts:

```bash
php artisan wireflow:install --no-interaction --with=workflow
```

Unknown addon names are warned but don't fail the command. Running `wireflow:install` again safely re-registers any missing imports without duplicating them.

### After running

```bash
npm run build
```

Then use `<x-flow>` in your Blade views:

```blade
<x-flow :nodes="$nodes" :edges="$edges" style="height: 400px;">
    <x-slot:node>
        <x-flow-handle type="target" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" />
    </x-slot:node>
</x-flow>
```

### What it adds to app.js

```js
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
});
```

### What it adds to app.css

```css
@import '../../vendor/getartisanflow/wireflow/dist/alpineflow.css';
@import '../../vendor/getartisanflow/wireflow/dist/alpineflow-theme.css';
```

## Related

- [Installation](getting-started/installation.md) — manual setup steps
- [Configuration](configuration.md) — config options
