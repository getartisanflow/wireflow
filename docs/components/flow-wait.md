---
title: x-flow-wait
description: Wait-node primitive (header + formatted duration + top/bottom handles) for WireFlow workflow canvases.
order: 14
---

# x-flow-wait

Wraps AlpineFlow's `x-flow-wait` directive for WireFlow. Renders a wait-style node: a header with an optional icon, a label (defaults to "Wait"), and a formatted duration; plus a top target handle and a bottom source handle.

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <template x-if="node.type === 'flow-wait'">
            <x-flow-wait />
        </template>
    </x-slot:node>
</x-flow>
```

The bound `node` variable (from the `<x-flow>` loop) must carry:

```php
[
    'id' => 'cooldown',
    'type' => 'flow-wait',
    'position' => ['x' => 0, 'y' => 0],
    'data' => [
        'label' => 'Cooldown',     // optional — defaults to "Wait"
        'durationMs' => 2000,      // required for a sensible render
        'icon' => '⏱',             // optional — rendered as text
    ],
]
```

## Data shape

| Key | Type | Required | Purpose |
| --- | --- | --- | --- |
| `durationMs` | int | yes | Duration in milliseconds. Formatted as `500ms` / `2.5s` / `1m 30s`. |
| `label` | string | no | Header label. Defaults to `Wait`. |
| `icon` | string | no | Single character or emoji rendered before the label. Use textContent only — no HTML. |

## Standalone usage (SSR fallback)

When you render `<x-flow-wait>` outside an `<x-flow>` (for example inside a documentation page or a static preview), pass the data as props and the component emits a server-rendered fallback:

```blade
<x-flow-wait :label="'Cooldown'" :duration-ms="2000" :icon="'⏱'" />
```

The fallback renders the same header structure plus the top/bottom handle elements with the standard AlpineFlow data attributes, so the node looks correct before client init runs (and during Livewire morph diffs).

## Duration formatting

Both the directive and the SSR fallback use the same formatter:

| Input ms | Output |
| --- | --- |
| `500` | `500ms` |
| `1000` | `1s` |
| `2500` | `2.5s` |
| `60000` | `1m` |
| `90000` | `1m 30s` |

The PHP-side formatter is exposed as a static method for reuse:

```php
\ArtisanFlow\WireFlow\View\Components\FlowWait::formatDuration(2500); // "2.5s"
```

## Theming

The structural CSS positions the header, duration pill, and the top/bottom handle anchors. Theme defaults reuse existing AlpineFlow tokens — `--flow-node-bg`, `--flow-border-subtle`, `--flow-text-body`, `--flow-text-muted`, `--flow-text-faint`, `--flow-surface` — so no new CSS variables are introduced. Override any of these on `.flow-container` to retheme.
