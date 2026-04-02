---
title: Whiteboard
description: Drawing tools for WireFlow.
order: 1
---

# Whiteboard

The Whiteboard addon adds freehand drawing, highlighting, shape drawing, text placement, and erasing capabilities to your WireFlow canvas.

## Installation

Install the AlpineFlow npm package (if you haven't already) and register the whiteboard plugin:

```bash
npm install @getartisanflow/alpineflow
```

No additional peer dependencies are required.

In your `resources/js/app.js`:

```js
// Core from WireFlow vendor bundle
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';
// Whiteboard addon from npm
import AlpineFlowWhiteboard from '@getartisanflow/alpineflow/whiteboard';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
    window.Alpine.plugin(AlpineFlowWhiteboard);
});
```

Rebuild after adding the import:

```bash
npm run build
```

## Directives

All whiteboard directives are placed directly on the `<x-flow>` component as attributes. Each directive's expression is a boolean that controls whether the tool is currently active.

| Directive | Description |
|---|---|
| `x-flow-freehand` | Freehand pen drawing with pressure-sensitive strokes |
| `x-flow-highlighter` | Semi-transparent highlighter strokes |
| `x-flow-arrow-draw` | Click-and-drag to draw arrow annotations |
| `x-flow-circle-draw` | Click-and-drag to draw circle annotations |
| `x-flow-rectangle-draw` | Click-and-drag to draw rectangle annotations |
| `x-flow-text-tool` | Click to place editable text annotations |
| `x-flow-eraser` | Drag to paint over elements, release to delete |

## Blade setup

Since `<x-flow>` creates its own `x-data="flowCanvas({...})"`, you cannot define `tool` and `toolSettings` in a parent scope -- directives on the `<x-flow>` element evaluate in the flowCanvas scope, not the parent. Use `x-init` with `Object.assign($data, ...)` to inject properties into the flowCanvas scope:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="['selectionOnDrag' => true, 'panOnDrag' => [2]]"
    x-init="Object.assign($data, {
        tool: null,
        toolSettings: { strokeColor: '#334155', strokeWidth: 2, opacity: 1 },
    })"
    x-flow-freehand.filled="tool === 'draw'"
    x-flow-highlighter="tool === 'highlighter'"
    x-flow-eraser="tool === 'eraser'"
    x-flow-rectangle-draw="tool === 'rectangle'"
    x-flow-arrow-draw="tool === 'arrow'"
    x-flow-circle-draw="tool === 'circle'"
    x-flow-text-tool="tool === 'text'"
>
```

> **Important:** `toolSettings` must be a top-level Alpine scope property injected via `Object.assign($data, ...)`. Do NOT pass it inside the `:config` prop.

## Tool settings

Configure drawing properties via `toolSettings` -- an object with `strokeColor`, `strokeWidth`, and `opacity`. The directives read this from the Alpine scope.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `strokeColor` | `string` | `'#334155'` | Stroke/fill color for all tools |
| `strokeWidth` | `number` | `2` | Stroke width for shapes and lines |
| `opacity` | `number` | `1` | Opacity for all drawing output |

## Event listeners

Drawing tool events (`flow-freehand-end`, `flow-rectangle-draw`, etc.) are dispatched on the `.flow-container` element. In WireFlow, you cannot use `@@event` attributes on `<x-flow>` (Livewire crashes on custom event names with hyphens). Instead, attach listeners in `x-init` using `$el.addEventListener()`:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="['selectionOnDrag' => true, 'panOnDrag' => [2]]"
    x-init="
        Object.assign($data, {
            tool: null,
            toolSettings: { strokeColor: '#334155', strokeWidth: 2, opacity: 1 },
        });

        $el.addEventListener('flow-freehand-end', (e) => {
            addNodes([{
                id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                position: { x: 0, y: 0 },
                draggable: false, selectable: false,
                class: 'flow-node-annotation',
                data: { annotation: 'drawing', pathData: e.detail.pathData, strokeColor: e.detail.strokeColor, opacity: e.detail.opacity },
            }]);
        });

        $el.addEventListener('flow-highlight-end', (e) => {
            addNodes([{
                id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                position: { x: 0, y: 0 },
                draggable: false, selectable: false,
                class: 'flow-node-annotation',
                data: { annotation: 'highlight', pathData: e.detail.pathData, strokeColor: e.detail.strokeColor, opacity: e.detail.opacity },
            }]);
        });

        $el.addEventListener('flow-rectangle-draw', (e) => {
            addNodes([{
                id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                position: { x: e.detail.bounds.x, y: e.detail.bounds.y },
                draggable: false, selectable: false,
                class: 'flow-node-annotation',
                data: { annotation: 'rectangle', w: e.detail.bounds.width, h: e.detail.bounds.height, strokeColor: e.detail.strokeColor, strokeWidth: e.detail.strokeWidth, opacity: e.detail.opacity },
            }]);
        });

        $el.addEventListener('flow-arrow-draw', (e) => {
            addNodes([{
                id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                position: { x: 0, y: 0 },
                draggable: false, selectable: false,
                class: 'flow-node-annotation',
                data: { annotation: 'arrow', start: e.detail.start, end: e.detail.end, strokeColor: e.detail.strokeColor, strokeWidth: e.detail.strokeWidth, opacity: e.detail.opacity },
            }]);
        });

        $el.addEventListener('flow-circle-draw', (e) => {
            addNodes([{
                id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                position: { x: 0, y: 0 },
                draggable: false, selectable: false,
                class: 'flow-node-annotation',
                data: { annotation: 'circle', cx: e.detail.cx, cy: e.detail.cy, rx: e.detail.rx, ry: e.detail.ry, strokeColor: e.detail.strokeColor, strokeWidth: e.detail.strokeWidth, opacity: e.detail.opacity },
            }]);
        });

        $el.addEventListener('flow-text-draw', (e) => {
            addNodes([{
                id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                position: { x: e.detail.position.x, y: e.detail.position.y },
                draggable: false, selectable: false,
                class: 'flow-node-annotation',
                data: { annotation: 'text', text: '', strokeColor: e.detail.strokeColor, fontSize: e.detail.fontSize, opacity: e.detail.opacity },
            }]);
        });
    "
>
```

### Events reference

| Event | Emitted by | Detail |
|---|---|---|
| `flow-freehand-end` | `x-flow-freehand` | `{ pathData, strokeColor, opacity }` |
| `flow-highlight-end` | `x-flow-highlighter` | `{ pathData, strokeColor, opacity }` |
| `flow-rectangle-draw` | `x-flow-rectangle-draw` | `{ bounds: { x, y, width, height }, strokeColor, strokeWidth, opacity }` |
| `flow-arrow-draw` | `x-flow-arrow-draw` | `{ start: { x, y }, end: { x, y }, strokeColor, strokeWidth, opacity }` |
| `flow-circle-draw` | `x-flow-circle-draw` | `{ cx, cy, rx, ry, strokeColor, strokeWidth, opacity }` |
| `flow-text-draw` | `x-flow-text-tool` | `{ position: { x, y }, strokeColor, fontSize, opacity }` |

## Annotation node templates

Annotations are stored as regular nodes with `class: 'flow-node-annotation'` and a `data.annotation` field that identifies the type. Your node template must render each annotation type.

All 6 annotation types need templates in addition to your regular node template:

```blade
<x-flow
    {{-- ... directives and x-init from above ... --}}
>
    <x-slot:node>
        {{-- Freehand / Highlighter: filled SVG path --}}
        <template x-if="node.data?.annotation === 'drawing' || node.data?.annotation === 'highlight'">
            <svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
                <path :d="node.data.pathData"
                      :fill="node.data.strokeColor || '#334155'"
                      :opacity="node.data.opacity ?? 1"
                      stroke="none" />
            </svg>
        </template>

        {{-- Rectangle: dashed border div --}}
        <template x-if="node.data?.annotation === 'rectangle'">
            <div :style="'pointer-events:none;width:'+node.data.w+'px;height:'+node.data.h+'px;border:'+(node.data.strokeWidth||2)+'px dashed '+(node.data.strokeColor||'rgba(148,163,184,0.7)')+';background:rgba(148,163,184,0.08);border-radius:4px;opacity:'+(node.data.opacity??1)+';'"></div>
        </template>

        {{-- Arrow: SVG line with arrowhead marker --}}
        <template x-if="node.data?.annotation === 'arrow'">
            <svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
                <defs>
                    <marker :id="'arrow-marker-'+node.id" viewBox="0 0 10 10" refX="10" refY="5"
                            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" :fill="node.data.strokeColor || '#334155'" />
                    </marker>
                </defs>
                <line :x1="node.data.start.x" :y1="node.data.start.y"
                      :x2="node.data.end.x" :y2="node.data.end.y"
                      :stroke="node.data.strokeColor || '#334155'"
                      :stroke-width="node.data.strokeWidth || 2"
                      :opacity="node.data.opacity ?? 1"
                      :marker-end="'url(#arrow-marker-'+node.id+')'" />
            </svg>
        </template>

        {{-- Circle: SVG ellipse --}}
        <template x-if="node.data?.annotation === 'circle'">
            <svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
                <ellipse :cx="node.data.cx" :cy="node.data.cy"
                         :rx="node.data.rx" :ry="node.data.ry"
                         fill="rgba(148,163,184,0.08)"
                         :stroke="node.data.strokeColor || '#334155'"
                         :stroke-width="node.data.strokeWidth || 2"
                         :opacity="node.data.opacity ?? 1" />
            </svg>
        </template>

        {{-- Text: contenteditable div --}}
        <template x-if="node.data?.annotation === 'text'">
            <div contenteditable="true"
                 @blur="node.data.text = $el.textContent; if (!$el.textContent.trim()) removeNodes([node.id])"
                 :style="'font-size:'+(node.data.fontSize||18)+'px;color:'+(node.data.strokeColor||'#334155')+';min-width:50px;min-height:1em;outline:none;white-space:pre;opacity:'+(node.data.opacity??1)+';'"
                 x-text="node.data.text"
                 x-init="if (!node.data.text) $nextTick(() => $el.focus())"></div>
        </template>

        {{-- Regular node (non-annotation) --}}
        <template x-if="!node.data?.annotation">
            <div>
                <x-flow-handle type="target" position="top" />
                <span x-text="node.data?.label"></span>
                <x-flow-handle type="source" position="bottom" />
            </div>
        </template>
    </x-slot:node>
</x-flow>
```

Key points:

- Annotation SVGs use `position:absolute;width:1px;height:1px;overflow:visible` to render at flow coordinates without affecting node sizing.
- `draggable: false` and `selectable: false` prevent annotations from being interacted with as nodes.
- The `.flow-node-annotation` CSS class strips default node styling (background, border, shadow).
- The eraser tool does not need an event listener -- it deletes nodes directly.

## Toolbar

Build a tool picker using buttons or a panel. The `tool` property was injected via `Object.assign($data, ...)`, so it is reactive in the flowCanvas scope:

```blade
<x-flow-panel position="top-left">
    <div class="flex gap-1">
        <button class="px-2 py-1 text-xs rounded border"
                :class="tool === null ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-800'"
                x-on:click="tool = null">Select</button>
        <button class="px-2 py-1 text-xs rounded border"
                :class="tool === 'draw' ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-800'"
                x-on:click="tool = 'draw'">Draw</button>
        <button class="px-2 py-1 text-xs rounded border"
                :class="tool === 'highlighter' ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-800'"
                x-on:click="tool = 'highlighter'">Highlight</button>
        <button class="px-2 py-1 text-xs rounded border"
                :class="tool === 'rectangle' ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-800'"
                x-on:click="tool = 'rectangle'">Rect</button>
        <button class="px-2 py-1 text-xs rounded border"
                :class="tool === 'arrow' ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-800'"
                x-on:click="tool = 'arrow'">Arrow</button>
        <button class="px-2 py-1 text-xs rounded border"
                :class="tool === 'circle' ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-800'"
                x-on:click="tool = 'circle'">Circle</button>
        <button class="px-2 py-1 text-xs rounded border"
                :class="tool === 'text' ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-800'"
                x-on:click="tool = 'text'">Text</button>
        <button class="px-2 py-1 text-xs rounded border"
                :class="tool === 'eraser' ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-800'"
                x-on:click="tool = 'eraser'">Eraser</button>
    </div>
</x-flow-panel>
```

### Color swatches

```blade
<x-flow-panel position="top-left" class="mt-10">
    <div class="flex gap-1">
        @foreach(['#334155', '#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'] as $color)
            <button
                class="w-5 h-5 rounded-full border-2"
                :class="toolSettings.strokeColor === '{{ $color }}' ? 'border-zinc-900 dark:border-white' : 'border-transparent'"
                style="background: {{ $color }}"
                x-on:click="toolSettings.strokeColor = '{{ $color }}'"
            ></button>
        @endforeach
    </div>
</x-flow-panel>
```

### Stroke width

```blade
<x-flow-panel position="top-left" class="mt-20">
    <div class="flex items-center gap-2 text-xs">
        <span>Width:</span>
        <input type="range" min="1" max="8" x-model.number="toolSettings.strokeWidth" class="w-20">
        <span x-text="toolSettings.strokeWidth + 'px'"></span>
    </div>
</x-flow-panel>
```

## Eraser behavior

The eraser uses a drag-to-paint interaction model. Drag over elements to mark them for deletion (a red trail follows the cursor), then release to remove them. It uses segment-rect intersection to determine which nodes fall under the eraser path. No event listener is needed -- the eraser deletes nodes directly.

## Annotations as nodes

All annotations are stored as regular nodes via `addNodes()`. This means they automatically integrate with:

- **Undo/redo** -- annotation creation and deletion are part of the history stack.
- **Collaboration** -- annotations sync across users via Yjs shared types (when used with the [Collaboration](collab.md) addon).
- **Server sync** -- annotations appear in `$nodes` on the server like any other node.

## Complete working example

A full Livewire component with whiteboard tools. This includes all 7 directives, all 6 annotation templates, a toolbar, color picker, and stroke width control.

### Livewire component

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;

class WhiteboardDemo extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => 'start', 'position' => ['x' => 100, 'y' => 150], 'data' => ['label' => 'Start']],
        ['id' => 'end', 'position' => ['x' => 400, 'y' => 150], 'data' => ['label' => 'End']],
    ];

    public array $edges = [
        ['id' => 'e1', 'source' => 'start', 'target' => 'end', 'markerEnd' => 'arrowclosed'],
    ];

    public function render(): \Illuminate\View\View
    {
        return view('livewire.whiteboard-demo');
    }
}
```

### Blade template

```blade
{{-- resources/views/livewire/whiteboard-demo.blade.php --}}
<div>
    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        background="dots"
        controls
        :config="['selectionOnDrag' => true, 'panOnDrag' => [2], 'history' => true]"
        style="height: 600px;"
        x-init="
            Object.assign($data, {
                tool: null,
                toolSettings: { strokeColor: '#334155', strokeWidth: 2, opacity: 1 },
            });

            $el.addEventListener('flow-freehand-end', (e) => {
                addNodes([{
                    id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                    position: { x: 0, y: 0 },
                    draggable: false, selectable: false,
                    class: 'flow-node-annotation',
                    data: { annotation: 'drawing', pathData: e.detail.pathData, strokeColor: e.detail.strokeColor, opacity: e.detail.opacity },
                }]);
            });

            $el.addEventListener('flow-highlight-end', (e) => {
                addNodes([{
                    id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                    position: { x: 0, y: 0 },
                    draggable: false, selectable: false,
                    class: 'flow-node-annotation',
                    data: { annotation: 'highlight', pathData: e.detail.pathData, strokeColor: e.detail.strokeColor, opacity: e.detail.opacity },
                }]);
            });

            $el.addEventListener('flow-rectangle-draw', (e) => {
                addNodes([{
                    id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                    position: { x: e.detail.bounds.x, y: e.detail.bounds.y },
                    draggable: false, selectable: false,
                    class: 'flow-node-annotation',
                    data: { annotation: 'rectangle', w: e.detail.bounds.width, h: e.detail.bounds.height, strokeColor: e.detail.strokeColor, strokeWidth: e.detail.strokeWidth, opacity: e.detail.opacity },
                }]);
            });

            $el.addEventListener('flow-arrow-draw', (e) => {
                addNodes([{
                    id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                    position: { x: 0, y: 0 },
                    draggable: false, selectable: false,
                    class: 'flow-node-annotation',
                    data: { annotation: 'arrow', start: e.detail.start, end: e.detail.end, strokeColor: e.detail.strokeColor, strokeWidth: e.detail.strokeWidth, opacity: e.detail.opacity },
                }]);
            });

            $el.addEventListener('flow-circle-draw', (e) => {
                addNodes([{
                    id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                    position: { x: 0, y: 0 },
                    draggable: false, selectable: false,
                    class: 'flow-node-annotation',
                    data: { annotation: 'circle', cx: e.detail.cx, cy: e.detail.cy, rx: e.detail.rx, ry: e.detail.ry, strokeColor: e.detail.strokeColor, strokeWidth: e.detail.strokeWidth, opacity: e.detail.opacity },
                }]);
            });

            $el.addEventListener('flow-text-draw', (e) => {
                addNodes([{
                    id: 'ann-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                    position: { x: e.detail.position.x, y: e.detail.position.y },
                    draggable: false, selectable: false,
                    class: 'flow-node-annotation',
                    data: { annotation: 'text', text: '', strokeColor: e.detail.strokeColor, fontSize: e.detail.fontSize, opacity: e.detail.opacity },
                }]);
            });
        "
        x-flow-freehand.filled="tool === 'draw'"
        x-flow-highlighter="tool === 'highlighter'"
        x-flow-eraser="tool === 'eraser'"
        x-flow-rectangle-draw="tool === 'rectangle'"
        x-flow-arrow-draw="tool === 'arrow'"
        x-flow-circle-draw="tool === 'circle'"
        x-flow-text-tool="tool === 'text'"
    >
        <x-slot:node>
            {{-- Freehand / Highlighter --}}
            <template x-if="node.data?.annotation === 'drawing' || node.data?.annotation === 'highlight'">
                <svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
                    <path :d="node.data.pathData"
                          :fill="node.data.strokeColor || '#334155'"
                          :opacity="node.data.opacity ?? 1"
                          stroke="none" />
                </svg>
            </template>

            {{-- Rectangle --}}
            <template x-if="node.data?.annotation === 'rectangle'">
                <div :style="'pointer-events:none;width:'+node.data.w+'px;height:'+node.data.h+'px;border:'+(node.data.strokeWidth||2)+'px dashed '+(node.data.strokeColor||'rgba(148,163,184,0.7)')+';background:rgba(148,163,184,0.08);border-radius:4px;opacity:'+(node.data.opacity??1)+';'"></div>
            </template>

            {{-- Arrow --}}
            <template x-if="node.data?.annotation === 'arrow'">
                <svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
                    <defs>
                        <marker :id="'arrow-marker-'+node.id" viewBox="0 0 10 10" refX="10" refY="5"
                                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" :fill="node.data.strokeColor || '#334155'" />
                        </marker>
                    </defs>
                    <line :x1="node.data.start.x" :y1="node.data.start.y"
                          :x2="node.data.end.x" :y2="node.data.end.y"
                          :stroke="node.data.strokeColor || '#334155'"
                          :stroke-width="node.data.strokeWidth || 2"
                          :opacity="node.data.opacity ?? 1"
                          :marker-end="'url(#arrow-marker-'+node.id+')'" />
                </svg>
            </template>

            {{-- Circle --}}
            <template x-if="node.data?.annotation === 'circle'">
                <svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
                    <ellipse :cx="node.data.cx" :cy="node.data.cy"
                             :rx="node.data.rx" :ry="node.data.ry"
                             fill="rgba(148,163,184,0.08)"
                             :stroke="node.data.strokeColor || '#334155'"
                             :stroke-width="node.data.strokeWidth || 2"
                             :opacity="node.data.opacity ?? 1" />
                </svg>
            </template>

            {{-- Text --}}
            <template x-if="node.data?.annotation === 'text'">
                <div contenteditable="true"
                     @blur="node.data.text = $el.textContent; if (!$el.textContent.trim()) removeNodes([node.id])"
                     :style="'font-size:'+(node.data.fontSize||18)+'px;color:'+(node.data.strokeColor||'#334155')+';min-width:50px;min-height:1em;outline:none;white-space:pre;opacity:'+(node.data.opacity??1)+';'"
                     x-text="node.data.text"
                     x-init="if (!node.data.text) $nextTick(() => $el.focus())"></div>
            </template>

            {{-- Regular node --}}
            <template x-if="!node.data?.annotation">
                <div>
                    <x-flow-handle type="target" position="top" />
                    <span x-text="node.data?.label"></span>
                    <x-flow-handle type="source" position="bottom" />
                </div>
            </template>
        </x-slot:node>

        {{-- Toolbar --}}
        <x-flow-panel position="top-left">
            <div class="flex flex-col gap-2">
                {{-- Tool buttons --}}
                <div class="flex gap-1">
                    @foreach([
                        null => 'Select',
                        'draw' => 'Draw',
                        'highlighter' => 'Highlight',
                        'rectangle' => 'Rect',
                        'arrow' => 'Arrow',
                        'circle' => 'Circle',
                        'text' => 'Text',
                        'eraser' => 'Eraser',
                    ] as $value => $label)
                        <button
                            class="px-2 py-1 text-xs rounded border"
                            :class="tool === {{ $value === '' ? 'null' : "'{$value}'" }} ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-800'"
                            x-on:click="tool = {{ $value === '' ? 'null' : "'{$value}'" }}"
                        >{{ $label }}</button>
                    @endforeach
                </div>

                {{-- Color swatches --}}
                <div class="flex gap-1">
                    @foreach(['#334155', '#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'] as $color)
                        <button
                            class="w-5 h-5 rounded-full border-2"
                            :class="toolSettings.strokeColor === '{{ $color }}' ? 'border-zinc-900 dark:border-white' : 'border-transparent'"
                            style="background: {{ $color }}"
                            x-on:click="toolSettings.strokeColor = '{{ $color }}'"
                        ></button>
                    @endforeach
                </div>

                {{-- Stroke width --}}
                <div class="flex items-center gap-2 text-xs">
                    <span>Width:</span>
                    <input type="range" min="1" max="8" x-model.number="toolSettings.strokeWidth" class="w-20">
                    <span x-text="toolSettings.strokeWidth + 'px'"></span>
                </div>
            </div>
        </x-flow-panel>
    </x-flow>
</div>
```

::demo
```html
<div x-data="{
    ...flowCanvas({
        nodes: [],
        edges: [],
        background: 'dots',
        selectionOnDrag: true,
        panOnDrag: [2],
        fitViewOnInit: false,
        controls: false,
        pannable: false,
        zoomable: false,
    }),
    tool: null,
    toolSettings: { strokeColor: '#334155', strokeWidth: 2, opacity: 1 },
}"
    class="flow-container"
    x-flow-freehand.filled="tool === 'draw'"
    x-flow-highlighter="tool === 'highlighter'"
    x-flow-eraser="tool === 'eraser'"
    x-flow-arrow-draw="tool === 'arrow'"
    x-flow-circle-draw="tool === 'circle'"
    x-flow-rectangle-draw="tool === 'rectangle'"
    x-flow-text-tool="tool === 'text'"
    @flow-freehand-end="addNodes([{ id: 'ann-'+Date.now()+'-'+Math.random().toString(36).slice(2,5), position:{x:0,y:0}, draggable:false, selectable:false, class:'flow-node-annotation', data:{annotation:'drawing', pathData:$event.detail.pathData, strokeColor:$event.detail.strokeColor, opacity:$event.detail.opacity} }])"
    @flow-highlight-end="addNodes([{ id: 'ann-'+Date.now()+'-'+Math.random().toString(36).slice(2,5), position:{x:0,y:0}, draggable:false, selectable:false, class:'flow-node-annotation', data:{annotation:'highlight', pathData:$event.detail.pathData, strokeColor:$event.detail.strokeColor, opacity:$event.detail.opacity} }])"
    @flow-arrow-draw="addNodes([{ id: 'ann-'+Date.now()+'-'+Math.random().toString(36).slice(2,5), position:{x:0,y:0}, draggable:false, selectable:false, class:'flow-node-annotation', data:{annotation:'arrow', start:$event.detail.start, end:$event.detail.end, strokeColor:$event.detail.strokeColor, strokeWidth:$event.detail.strokeWidth, opacity:$event.detail.opacity} }])"
    @flow-circle-draw="addNodes([{ id: 'ann-'+Date.now()+'-'+Math.random().toString(36).slice(2,5), position:{x:0,y:0}, draggable:false, selectable:false, class:'flow-node-annotation', data:{annotation:'circle', cx:$event.detail.cx, cy:$event.detail.cy, rx:$event.detail.rx, ry:$event.detail.ry, strokeColor:$event.detail.strokeColor, strokeWidth:$event.detail.strokeWidth, opacity:$event.detail.opacity} }])"
    @flow-rectangle-draw="addNodes([{ id: 'ann-'+Date.now()+'-'+Math.random().toString(36).slice(2,5), position:{x:$event.detail.bounds.x,y:$event.detail.bounds.y}, draggable:false, selectable:false, class:'flow-node-annotation', data:{annotation:'rectangle', w:$event.detail.bounds.width, h:$event.detail.bounds.height, strokeColor:$event.detail.strokeColor, strokeWidth:$event.detail.strokeWidth, opacity:$event.detail.opacity} }])"
    @flow-text-draw="addNodes([{ id: 'ann-'+Date.now()+'-'+Math.random().toString(36).slice(2,5), position:{x:$event.detail.position.x, y:$event.detail.position.y}, draggable:false, selectable:false, class:'flow-node-annotation', data:{annotation:'text', text:'', strokeColor:$event.detail.strokeColor, fontSize:$event.detail.fontSize, opacity:$event.detail.opacity} }])"
    style="height: 300px;">
    <div class="canvas-overlay" @mousedown.stop @pointerdown.stop style="display:flex;flex-direction:column;gap:4px;position:absolute;top:8px;left:8px;z-index:20;">
        <div style="display:flex;gap:2px;">
            <button @click="tool = null" :class="tool === null ? 'text-violet border-violet/40 bg-violet/10' : 'bg-elevated text-text-faint hover:text-text-muted'" class="rounded border border-border-subtle px-2 py-1 font-mono text-[10px] cursor-pointer">Select</button>
            <button @click="tool = 'draw'" :class="tool === 'draw' ? 'text-amber border-amber/40 bg-amber/10' : 'bg-elevated text-text-faint hover:text-text-muted'" class="rounded border border-border-subtle px-2 py-1 font-mono text-[10px] cursor-pointer">Draw</button>
            <button @click="tool = 'highlighter'" :class="tool === 'highlighter' ? 'text-violet border-violet/40 bg-violet/10' : 'bg-elevated text-text-faint hover:text-text-muted'" class="rounded border border-border-subtle px-2 py-1 font-mono text-[10px] cursor-pointer">Highlight</button>
            <button @click="tool = 'arrow'" :class="tool === 'arrow' ? 'text-teal border-teal/40 bg-teal/10' : 'bg-elevated text-text-faint hover:text-text-muted'" class="rounded border border-border-subtle px-2 py-1 font-mono text-[10px] cursor-pointer">Arrow</button>
            <button @click="tool = 'circle'" :class="tool === 'circle' ? 'text-teal border-teal/40 bg-teal/10' : 'bg-elevated text-text-faint hover:text-text-muted'" class="rounded border border-border-subtle px-2 py-1 font-mono text-[10px] cursor-pointer">Circle</button>
            <button @click="tool = 'rectangle'" :class="tool === 'rectangle' ? 'text-teal border-teal/40 bg-teal/10' : 'bg-elevated text-text-faint hover:text-text-muted'" class="rounded border border-border-subtle px-2 py-1 font-mono text-[10px] cursor-pointer">Rect</button>
            <button @click="tool = 'text'" :class="tool === 'text' ? 'text-violet border-violet/40 bg-violet/10' : 'bg-elevated text-text-faint hover:text-text-muted'" class="rounded border border-border-subtle px-2 py-1 font-mono text-[10px] cursor-pointer">Text</button>
            <button @click="tool = 'eraser'" :class="tool === 'eraser' ? 'text-[#ef4444] border-[#ef4444]/40 bg-[#ef4444]/10' : 'bg-elevated text-text-faint hover:text-text-muted'" class="rounded border border-border-subtle px-2 py-1 font-mono text-[10px] cursor-pointer">Eraser</button>
        </div>
        <div style="display:flex;gap:2px;">
            <template x-for="c in ['#334155','#ef4444','#3b82f6','#22c55e','#f59e0b']" :key="c">
                <button @click="toolSettings.strokeColor = c" :style="'width:20px;height:20px;border-radius:50%;border:2px solid '+(toolSettings.strokeColor===c?c:'transparent')+';background:'+c+';cursor:pointer;'"></button>
            </template>
        </div>
    </div>
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <template x-if="node.data?.annotation === 'drawing' || node.data?.annotation === 'highlight'">
                    <svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
                        <path :d="node.data.pathData" :fill="node.data.strokeColor || '#334155'" :opacity="node.data.opacity ?? 1" stroke="none" />
                    </svg>
                </template>
                <template x-if="node.data?.annotation === 'rectangle'">
                    <div :style="'pointer-events:none;width:'+node.data.w+'px;height:'+node.data.h+'px;border:'+(node.data.strokeWidth||2)+'px dashed '+(node.data.strokeColor||'#94a3b8')+';background:rgba(148,163,184,0.08);border-radius:4px;opacity:'+(node.data.opacity??1)+';'"></div>
                </template>
                <template x-if="node.data?.annotation === 'arrow'">
                    <svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
                        <defs><marker :id="'am-'+node.id" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" :fill="node.data.strokeColor || '#334155'" /></marker></defs>
                        <line :x1="node.data.start.x" :y1="node.data.start.y" :x2="node.data.end.x" :y2="node.data.end.y" :stroke="node.data.strokeColor || '#334155'" :stroke-width="node.data.strokeWidth || 2" :opacity="node.data.opacity ?? 1" :marker-end="'url(#am-'+node.id+')'" />
                    </svg>
                </template>
                <template x-if="node.data?.annotation === 'circle'">
                    <svg style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:visible;pointer-events:none;">
                        <ellipse :cx="node.data.cx" :cy="node.data.cy" :rx="node.data.rx" :ry="node.data.ry" fill="rgba(148,163,184,0.08)" :stroke="node.data.strokeColor || '#334155'" :stroke-width="node.data.strokeWidth || 2" :opacity="node.data.opacity ?? 1" />
                    </svg>
                </template>
                <template x-if="node.data?.annotation === 'text'">
                    <div contenteditable="true" @blur="node.data.text = $el.textContent; if (!$el.textContent.trim()) removeNodes([node.id])" :style="'font-size:'+(node.data.fontSize||18)+'px;color:'+(node.data.strokeColor||'#334155')+';min-width:50px;min-height:1em;outline:none;white-space:pre;opacity:'+(node.data.opacity??1)+';'" x-text="node.data.text" x-init="if (!node.data.text) $nextTick(() => $el.focus())"></div>
                </template>
                <template x-if="!node.data?.annotation">
                    <div>
                        <div x-flow-handle:target></div>
                        <span x-text="node.data?.label"></span>
                        <div x-flow-handle:source></div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## CSS variables

| Variable | Default | Description |
|---|---|---|
| `--flow-tool-stroke-color` | `#52525b` | Default drawing stroke |
| `--flow-tool-highlighter-color` | `#fbbf24` | Highlighter color |

## Related

- [Installation](../installation.md#optional-addons) -- addon setup
- [Collaboration](collab.md) -- annotations sync with Yjs
