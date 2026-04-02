---
title: Dark Mode
description: Class-based dark mode with system preference.
order: 2
---

# Dark Mode

WireFlow uses class-based dark mode, the same convention as Tailwind CSS v4 and Flux UI.

## Class-based

Place `.dark` on an ancestor element or on the flow container itself. The default and Flux themes both include `.dark` overrides for all CSS variables.

```blade
{{-- .dark on <html> (typical Flux UI / Tailwind convention) --}}
<html class="dark">
    <body>
        <x-flow :nodes="$nodes" :edges="$edges">
            <x-slot:node>
                <span x-text="node.data.label"></span>
            </x-slot:node>
        </x-flow>
    </body>
</html>
```

```blade
{{-- .dark directly on the container via class prop --}}
<x-flow :nodes="$nodes" :edges="$edges" class="dark">
    <x-slot:node>
        <span x-text="node.data.label"></span>
    </x-slot:node>
</x-flow>
```

## `colorMode` config

For self-managed color mode without a framework, pass `colorMode` via the `:config` prop:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="['colorMode' => 'system']"
>
    <x-slot:node>
        <span x-text="node.data.label"></span>
    </x-slot:node>
</x-flow>
```

| Value | Behavior |
|-------|----------|
| `'light'` | Removes `.dark` from the container |
| `'dark'` | Adds `.dark` to the container |
| `'system'` | Watches `prefers-color-scheme` via `matchMedia`, toggles `.dark` automatically |
| `undefined` (default) | No color mode management -- inherit from ancestor |

The resolved mode is available as a reactive getter: `$flow.colorMode` returns `'light'` or `'dark'`.

## System preference tracking

When `colorMode` is set to `'system'`, AlpineFlow registers a `matchMedia` listener for `(prefers-color-scheme: dark)` and toggles the `.dark` class on the container in real time. If your framework already handles this on `<html>` or `<body>`, leave `colorMode` undefined and let the ancestor class cascade.

## Runtime toggle

Toggle dark mode from a Blade button using Alpine:

```blade
<div>
    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        :config="['colorMode' => 'light']"
    >
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>

        {{-- Toggle button inside a panel --}}
        <x-flow-panel position="top-right">
            <button
                class="px-3 py-1.5 text-sm rounded border"
                x-on:click="
                    $flow.updateConfig({
                        colorMode: $flow.colorMode === 'dark' ? 'light' : 'dark'
                    })
                "
                x-text="$flow.colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'"
            ></button>
        </x-flow-panel>
    </x-flow>
</div>
```

Or toggle directly via the class:

```blade
<button x-on:click="document.querySelector('.flow-container').classList.toggle('dark')">
    Toggle Dark Mode
</button>
```


## Background patterns

Pattern colors auto-adjust when using the default or Flux theme. The theme files set appropriate `--flow-bg-pattern-color` values for both light (subtle gray) and dark (subtle white) modes.

To customize dark mode pattern colors explicitly:

```css
.flow-container.dark {
    --flow-bg-color: #0f172a;
    --flow-bg-pattern-color: rgba(255, 255, 255, 0.06);
}
```

## Related

- [Themes](themes.md) -- built-in themes and custom theming
- [CSS Variables](css-variables.md) -- full variable reference
