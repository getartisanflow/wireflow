---
title: CSS Variables
description: Complete variable reference.
order: 3
---

# CSS Variables

Every visual property in WireFlow reads from a `--flow-*` CSS custom property declared on `.flow-container`. The structural layer provides fallback defaults; theme layers override them.

Override any variable on `.flow-container` or inline via `style`:

```css
.flow-container {
    --flow-bg-color: #0d1117;
    --flow-node-bg: #161b22;
    --flow-edge-stroke: #58a6ff;
}
```

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    style="--flow-edge-stroke: #4ade80; --flow-node-bg: #1a2e1e;"
>
    <x-slot:node>
        <span x-text="node.data.label"></span>
    </x-slot:node>
</x-flow>
```

## Quick brand override

To match your brand, override these accent-related variables. Everything else derives from the neutral scale and stays visually consistent.

```css
.flow-container {
    /* Interactive states (selection, hover, focus) */
    --flow-node-hover-border-color: #2563eb;
    --flow-node-selected-border-color: #2563eb;
    --flow-node-selected-shadow: 0 0 0 1px #2563eb;
    --flow-node-focus-outline: 2px solid #2563eb;

    /* Handles */
    --flow-handle-hover-bg: #2563eb;
    --flow-handle-active-bg: #2563eb;

    /* Edges */
    --flow-edge-stroke-selected: #2563eb;
    --flow-edge-dot-fill: #2563eb;
    --flow-edge-focus-stroke: #2563eb;

    /* Selection box & lasso */
    --flow-selection-bg: rgba(37, 99, 235, 0.06);
    --flow-selection-border: 1px solid rgba(37, 99, 235, 0.3);
    --flow-lasso-stroke: rgba(37, 99, 235, 0.5);

    /* Resize handles */
    --flow-resizer-border: 1px solid #2563eb;
    --flow-resizer-hover-bg: #2563eb;

    /* Accent stripe (top border on nodes) */
    --flow-node-border-top: 2.5px solid #93c5fd;
}
```

Replace `#2563eb` / `#93c5fd` with your brand color and its lighter variant.

## Runtime theme switching

CSS variables are live -- changing them at runtime immediately updates the flow.

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <span x-text="node.data.label"></span>
    </x-slot:node>

    <x-flow-panel position="top-right">
        <button
            class="px-3 py-1.5 text-sm rounded border"
            x-on:click="
                const c = $el.closest('.flow-container');
                c.style.setProperty('--flow-node-selected-border-color', '#dc2626');
                c.style.setProperty('--flow-edge-stroke-selected', '#dc2626');
                c.style.setProperty('--flow-handle-active-bg', '#dc2626');
            "
        >
            Red Accent
        </button>
    </x-flow-panel>
</x-flow>
```


## Full variable reference

### Container & Canvas

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-container-height` | `400px` | Container height |
| `--flow-bg-color` | `transparent` | Canvas background color |
| `--flow-bg-pattern-color` | `rgba(0,0,0,0.15)` | Dot/line pattern color |
| `--flow-bg-pattern-gap` | `20` | Pattern spacing |

### Nodes

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-node-min-width` | `0` | Minimum node width |
| `--flow-node-bg` | `#fff` | Node background |
| `--flow-node-color` | `inherit` | Node text color |
| `--flow-node-border` | `1px solid #1a192b` | Node border |
| `--flow-node-border-top` | `var(--flow-node-border)` | Top accent stripe |
| `--flow-node-border-radius` | `3px` | Node corner radius |
| `--flow-node-padding` | `5px` | Node padding |
| `--flow-node-shadow` | `none` | Node box shadow |
| `--flow-node-font-size` | `14px` | Node font size |
| `--flow-node-transition` | `none` | Node CSS transitions |
| `--flow-node-hover-border-color` | `transparent` | Hover border color |
| `--flow-node-selected-border-color` | `#555` | Selected border color |
| `--flow-node-selected-shadow` | `0 0 0 0.5px #555` | Selected shadow ring |
| `--flow-node-focus-outline` | `2px solid Highlight` | Keyboard focus outline |
| `--flow-node-focus-outline-offset` | `2px` | Focus outline offset |
| `--flow-node-locked-opacity` | `1` | Locked node opacity |
| `--flow-node-locked-border-style` | `solid` | Locked node border style |

### Handles

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-handle-size` | `10px` | Handle diameter |
| `--flow-handle-bg` | `#333` | Handle background |
| `--flow-handle-border` | `1px solid #fff` | Handle border |
| `--flow-handle-hover-bg` | (theme) | Handle hover background |
| `--flow-handle-active-bg` | `transparent` | Handle active/dragging background |
| `--flow-handle-invalid-bg` | `#ef4444` | Invalid connection target |

### Edges

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-edge-stroke` | `#b1b1b7` | Edge stroke color |
| `--flow-edge-stroke-width` | `1.5` | Edge stroke width |
| `--flow-edge-stroke-selected` | `#555` | Selected edge stroke |
| `--flow-edge-stroke-width-selected` | `2.5` | Selected edge width |
| `--flow-edge-transition` | `stroke 0.3s ease` | Edge CSS transition |
| `--flow-edge-marker-color` | (theme) | Arrow marker color |
| `--flow-edge-animated-dasharray` | `6 3` | Animated dash pattern |
| `--flow-edge-animated-duration` | `0.5s` | Dash animation duration |
| `--flow-edge-pulse-duration` | `2s` | Pulse animation cycle |
| `--flow-edge-pulse-min-opacity` | `0.3` | Pulse minimum opacity |
| `--flow-edge-dot-size` | `4` | Dot animation circle size |
| `--flow-edge-dot-fill` | `currentColor` | Dot fill color |
| `--flow-edge-dot-duration` | `2s` | Dot travel duration |
| `--flow-edge-focus-stroke` | `currentColor` | Keyboard focus stroke |
| `--flow-edge-focus-stroke-width` | `2.5` | Focus stroke width |
| `--flow-edge-reconnecting-opacity` | `0.25` | Reconnecting edge opacity |

### Edge Labels

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-edge-label-bg` | `#fff` | Label background |
| `--flow-edge-label-border` | `none` | Label border |
| `--flow-edge-label-border-radius` | `0` | Label corner radius |
| `--flow-edge-label-padding` | `2px 8px` | Label padding |
| `--flow-edge-label-font-size` | `11px` | Label font size |
| `--flow-edge-label-color` | `inherit` | Label text color |

### Connection Line

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-connectionline-stroke` | `var(--flow-edge-stroke)` | In-progress connection color |
| `--flow-connectionline-stroke-width` | `var(--flow-edge-stroke-width)` | In-progress connection width |
| `--flow-connection-line-invalid` | `#ef4444` | Invalid connection color |

### Selection

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-selection-bg` | `rgba(0,89,220,0.08)` | Selection box fill |
| `--flow-selection-border` | `1px dotted rgba(0,89,220,0.8)` | Selection box border |
| `--flow-selection-border-radius` | `0` | Selection box radius |
| `--flow-lasso-stroke` | (theme) | Lasso outline stroke |
| `--flow-selection-full-bg` | (theme) | Full-containment mode fill |
| `--flow-selection-full-border-color` | (theme) | Full-containment border |
| `--flow-lasso-stroke-full` | (theme) | Full-containment lasso stroke |

### Controls

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-controls-gap` | `1px` | Gap between control buttons |
| `--flow-controls-btn-width` | `28px` | Button width |
| `--flow-controls-btn-height` | `28px` | Button height |
| `--flow-controls-btn-bg` | `#fefefe` | Button background |
| `--flow-controls-btn-border` | `1px solid #eee` | Button border |
| `--flow-controls-btn-color` | `inherit` | Button icon/text color |
| `--flow-controls-btn-border-radius` | `0` | Button corner radius |
| `--flow-controls-btn-hover-bg` | `#f4f4f4` | Button hover background |

### Minimap

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-minimap-border` | `1px solid #eee` | Minimap border |
| `--flow-minimap-border-radius` | `0` | Minimap corner radius |
| `--flow-minimap-bg` | `#fff` | Minimap background |
| `--flow-minimap-node-color` | `#e2e2e2` | Node representation color |
| `--flow-minimap-mask-color` | `rgba(240,240,240,0.6)` | Viewport mask overlay |

### Node Toolbar

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-node-toolbar-padding` | `4px 6px` | Toolbar padding |
| `--flow-node-toolbar-bg` | `transparent` | Toolbar background |
| `--flow-node-toolbar-border` | `none` | Toolbar border |
| `--flow-node-toolbar-border-radius` | `0` | Toolbar corner radius |
| `--flow-node-toolbar-btn-bg` | `transparent` | Button background |
| `--flow-node-toolbar-btn-border` | `none` | Button border |
| `--flow-node-toolbar-btn-color` | `inherit` | Button text color |
| `--flow-node-toolbar-btn-padding` | `4px 8px` | Button padding |
| `--flow-node-toolbar-btn-border-radius` | `0` | Button corner radius |
| `--flow-node-toolbar-btn-font-size` | `12px` | Button font size |
| `--flow-node-toolbar-btn-hover-bg` | `transparent` | Button hover background |

### Drag Handle

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-drag-handle-bg` | `transparent` | Handle background |
| `--flow-drag-handle-border-bottom` | `none` | Bottom separator |
| `--flow-drag-handle-padding` | `6px 12px` | Handle padding |
| `--flow-drag-handle-border-radius` | `0` | Handle corner radius |
| `--flow-drag-handle-font-size` | `12px` | Handle font size |
| `--flow-drag-handle-font-weight` | `600` | Handle font weight |
| `--flow-drag-handle-color` | `inherit` | Handle text color |

### Resize Handles

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-resizer-bg` | `transparent` | Resizer background |
| `--flow-resizer-border` | `none` | Resizer border |
| `--flow-resizer-hover-bg` | `transparent` | Resizer hover background |

### Panel

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-panel-bg` | `transparent` | Panel background |
| `--flow-panel-border` | `none` | Panel border |
| `--flow-panel-border-radius` | `0` | Panel corner radius |
| `--flow-panel-min-width` | `100px` | Panel minimum width |
| `--flow-panel-min-height` | `60px` | Panel minimum height |
| `--flow-panel-resize-bg` | `transparent` | Resize grip background |
| `--flow-panel-resize-border-radius` | `0` | Resize grip radius |
| `--flow-panel-resize-hover-bg` | `transparent` | Resize grip hover |

### Group Nodes

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-node-group-bg` | `transparent` | Group background |
| `--flow-node-group-border` | `none` | Group border |
| `--flow-node-group-border-radius` | `0` | Group corner radius |
| `--flow-node-group-shadow` | `none` | Group shadow |
| `--flow-node-group-font-size` | `inherit` | Group label font size |
| `--flow-node-group-text-transform` | `none` | Group label text transform |
| `--flow-node-group-letter-spacing` | `normal` | Group label letter spacing |
| `--flow-node-group-padding` | `0` | Group label padding |
| `--flow-node-group-hover-border-color` | `transparent` | Group hover border |

### Validation

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-node-invalid-border` | `1.5px dashed #ef4444` | Invalid child border |
| `--flow-node-invalid-shadow` | `0 0 0 2px rgba(239,68,68,0.15)` | Invalid child shadow |
| `--flow-node-drop-target-border` | `1.5px dashed #3b82f6` | Drop target border |
| `--flow-node-drop-target-shadow` | `0 0 0 2px rgba(59,130,246,0.2)` | Drop target shadow |

### Rotate Handle

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-rotate-handle-size` | `14px` | Handle diameter |
| `--flow-rotate-handle-offset` | `24px` | Distance above node |
| `--flow-rotate-handle-bg` | (theme) | Handle fill |
| `--flow-rotate-handle-border` | (theme) | Handle border |
| `--flow-rotate-handle-line-color` | (theme) | Stem line color |

### Whiteboard Tools

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-tool-stroke-color` | `#52525b` | Default drawing stroke |
| `--flow-tool-highlighter-color` | `#fbbf24` | Highlighter color |

### Layout Animation

| Variable | Structural Default | Description |
|---|---|---|
| `--flow-layout-animation-duration` | `0.3s` | Auto-layout transition |

---

## Z-Index Layers

WireFlow uses a structured z-index system for element stacking. These values are hardcoded in structural CSS and are not themeable.

| z-index | Element | Class | Purpose |
|---------|---------|-------|---------|
| 1000 | Eraser trail | `.flow-eraser-svg` | Whiteboard eraser overlay |
| 60 | DevTools | `.flow-devtools` | Debug overlay |
| 55 | Touch selection indicator | `.flow-touch-selection-mode-indicator` | Touch mode badge |
| 50 | Loading overlay | `.flow-loading-overlay` | Blocks interaction during load |
| 20 | Node toolbar | `.flow-node-toolbar` | Floating toolbar above nodes |
| 20 | Edge toolbar | `.flow-edge-toolbar` | Floating toolbar on edges |
| 15 | Rotate handle | `.flow-rotate-handle` | Above resize handles |
| 12 | Controls panel | `.flow-controls` | Zoom/fit-view buttons |
| 12 | Minimap | `.flow-minimap` | Overview panel |
| 11 | Panel | `.flow-panel` | Draggable overlay panels |
| 10 | Handles | `.flow-handle` | Connection handles on nodes |
| 7 | Selection box | `.flow-selection-box` | Drag-to-select rectangle |
| 7 | Lasso | `.flow-lasso-svg` | Freeform selection |
| 5 | Resize handles | `.flow-resizer-handle` | Corner/edge resize grips |
| 2 | Nodes | `.flow-node` | Regular nodes |
| 1 | Edges | `.flow-edges` | Edge SVG layer |
| 1 | Edge labels | `.flow-edge-label` | HTML label overlays |
| 0 | Group nodes | `.flow-node-group` | Groups render below child nodes |
| -1 | Touch hit areas | `.flow-handle::before` | Expanded touch targets |

To override stacking for a specific use case:

```css
.flow-panel {
    z-index: 15; /* put panels above controls */
}
```

## Override examples with Blade

Override at the component level using inline styles:

```blade
{{-- Custom dark canvas with green accents --}}
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    background="dots"
    style="
        --flow-bg-color: #0f172a;
        --flow-bg-pattern-color: rgba(255,255,255,0.05);
        --flow-node-bg: #1e293b;
        --flow-node-border: 1px solid #334155;
        --flow-node-selected-border-color: #22c55e;
        --flow-edge-stroke: #64748b;
        --flow-edge-stroke-selected: #22c55e;
        --flow-handle-bg: #64748b;
        --flow-handle-hover-bg: #22c55e;
    "
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span class="text-slate-200" x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

```blade
{{-- Compact nodes with no accent stripe --}}
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    style="
        --flow-node-padding: 4px 8px;
        --flow-node-font-size: 12px;
        --flow-node-border-radius: 4px;
        --flow-node-border-top: var(--flow-node-border);
        --flow-handle-size: 8px;
    "
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

## Related

- [Themes](themes.md) -- built-in themes and custom theming
- [Dark Mode](dark-mode.md) -- class-based dark mode
