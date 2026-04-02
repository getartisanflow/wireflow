---
title: x-flow-loading
description: Loading overlay while canvas initializes.
order: 12
---

# x-flow-loading

A loading overlay displayed while the canvas initializes. Provides visual feedback during initial render and data loading.

::demo
```toolbar
<button id="demo-loading-toggle" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Toggle Loading</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 40, y: 40 }, data: { label: 'Node A' } },
        { id: 'b', position: { x: 280, y: 40 }, data: { label: 'Node B' } },
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
       document.getElementById('demo-loading-toggle').addEventListener('click', () => {
           $flow.setLoading(!$flow.loading);
       });
   ">
    <div x-flow-loading.fade style="display: flex; align-items: center; justify-content: center; font-size: 13px; opacity: 0.6;">
        Loading...
    </div>
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
| `fade` | `bool` | `true` | Fade out transition when loading completes |

## Usage

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-flow-loading>Loading...</x-flow-loading>

    <x-slot:node>
        <span x-text="node.data.label"></span>
    </x-slot:node>
</x-flow>
```

### Default indicator

If no slot content is provided, the component auto-injects a default pulsing indicator:

```blade
<x-flow-loading />
```

### Without fade transition

```blade
<x-flow-loading :fade="false">Please wait...</x-flow-loading>
```

### Custom loading content

```blade
<x-flow-loading>
    <div class="flex items-center gap-2">
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">...</svg>
        <span>Building diagram...</span>
    </div>
</x-flow-loading>
```

## Server control

Control the loading state from your Livewire component using the `WithWireFlow` trait:

```php
$this->flowSetLoading(true);   // Show loading overlay
$this->flowSetLoading(false);  // Hide loading overlay
```

This is useful when loading data asynchronously or performing server-side computations before the canvas is ready.

## Behavior

- Shown when `loading: true` in the canvas config, or until the canvas completes initialization.
- Automatically dismissed once the canvas is ready unless held by `flowSetLoading(true)`.

## Directive mapping

Maps to: `x-flow-loading.fade`
