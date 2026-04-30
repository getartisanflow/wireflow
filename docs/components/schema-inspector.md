---
title: x-schema-*-inspector
description: Slot-overridable Blade wrappers around AlpineFlow's schema inspector directives — node, row, and edge panes.
order: 15
---

# x-schema-node-inspector / x-schema-row-inspector / x-schema-edge-inspector

Three slot-overridable Blade components that wrap the `x-schema-node-inspector`, `x-schema-row-inspector`, and `x-schema-edge-inspector` directives from the [AlpineFlow Schema addon](https://artisanflow.dev/docs/alpineflow/addons/schema). Reach for these when the [`<x-schema-designer>`](schema-designer.md) preset doesn't give you enough layout control — for example, when you need inspectors in a split-pane outside the canvas, or wrapped in a custom sidebar.

Each component renders a single `<aside>` with the matching `x-schema-*-inspector` directive attached. The directive injects a reactive scope (selection + helpers) onto the element; the component decides what to render inside that scope.

> Prerequisite: the AlpineFlow schema plugin must be registered (see [Installation](schema-designer.md#installation)). If it isn't, the components render as plain `<aside>` tags with no behaviour.

## Shared slot behaviour

All three components share the same slot contract:

| Slot content | `:default-ui` | Result |
|--------------|---------------|--------|
| Empty | `true` (default) | Stamps the addon's default-UI `<template x-schema-default-ui>` — minimal structural HTML that reacts to the current selection. Style with CSS. |
| Empty | `false` | Renders nothing inside the `<aside>`. The scope is still attached, useful if you intend to append children via JS. |
| Any content | ignored | Renders your content as-is. The scope (selection + helpers) is already in-scope, so your markup can consume it directly. |

## x-schema-node-inspector

Mounts the node inspector directive. Exposes:

- `selectedNode` — reactive `FlowNode | null` for the last-selected node
- `inspector.addField(field)` — append a field to the selected node
- `inspector.renameField(oldName, newName)` — rename a field, cascading edges
- `inspector.removeField(fieldName)` — remove a field, dropping attached edges
- `inspector.reorderFields(orderedNames)` — reorder fields in place

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `default-ui` | `bool` | `true` | When true and the slot is empty, stamps the addon's default-UI template. Set `false` to suppress it entirely. |

### Custom Flux panel

```blade
<x-flow :nodes="$tables" :edges="$relationships">
    <x-slot:node>
        <x-flow-schema-node />
    </x-slot:node>
</x-flow>

<x-schema-node-inspector class="w-72 border-l border-border-subtle p-4">
    <flux:heading size="sm" x-text="selectedNode?.data?.label ?? 'Select a table'" />

    <template x-if="selectedNode">
        <div class="mt-3 space-y-2">
            <template x-for="field in selectedNode.data.fields" :key="field.name">
                <div class="flex items-center justify-between text-xs">
                    <span x-text="field.name"></span>
                    <flux:button
                        variant="ghost"
                        size="xs"
                        @click="inspector.removeField(field.name)"
                    >
                        remove
                    </flux:button>
                </div>
            </template>
        </div>
    </template>
</x-schema-node-inspector>
```

### Calling `inspector.addField` from a form

```blade
<x-schema-node-inspector>
    <template x-if="selectedNode">
        <form
            class="flex gap-2"
            @submit.prevent="
                const result = inspector.addField({ name: $refs.name.value, type: 'text' });
                if (result.applied) { $refs.name.value = ''; }
                else { $dispatch('notify', { type: 'error', message: result.reason }); }
            "
        >
            <flux:input x-ref="name" placeholder="field_name" size="sm" />
            <flux:button type="submit" variant="primary" size="sm">Add</flux:button>
        </form>
    </template>
</x-schema-node-inspector>
```

## x-schema-row-inspector

Mounts the row inspector directive. The currently selected row is exposed as `selectedRow` — a parsed `{ nodeId, fieldName }` object (the underlying selection id in `canvas.selectedRows` has the format `"nodeId.fieldName"`).

Exposes:

- `selectedRow` — reactive `{ nodeId, fieldName } | null`
- `inspector.renameField(newName)` — rename the selected field (cascades edges)
- `inspector.removeField()` — remove the selected field (cascades edges)
- `inspector.updateField(patch)` — merge arbitrary props (`type`, `required`, `key`, `icon`, …) into the field. Does not touch `name` — use `renameField` for that so edges cascade.

### Props

Same as [`x-schema-node-inspector`](#x-schema-node-inspector) — `default-ui` (bool, default `true`).

### Example

```blade
<x-schema-row-inspector class="w-72 border-l border-border-subtle p-4">
    <template x-if="selectedRow">
        <div class="space-y-2">
            <flux:text>
                Editing <code x-text="selectedRow.nodeId + '.' + selectedRow.fieldName"></code>
            </flux:text>

            <label class="flex items-center gap-2 text-xs">
                <input
                    type="checkbox"
                    @change="inspector.updateField({ required: $event.target.checked })"
                >
                required
            </label>

            <flux:button variant="danger" size="xs" @click="inspector.removeField()">
                Remove field
            </flux:button>
        </div>
    </template>
</x-schema-row-inspector>
```

## x-schema-edge-inspector

Mounts the edge inspector directive. Exposes:

- `selectedEdge` — reactive `FlowEdge | null`
- `inspector.setLabel(text)` — convenience for updating the edge label
- `inspector.updateEdge(patch)` — patch arbitrary edge props in place (label, style, data, etc.)
- `inspector.removeEdge()` — drop the selected edge

### Props

Same as [`x-schema-node-inspector`](#x-schema-node-inspector) — `default-ui` (bool, default `true`).

### Example

```blade
<x-schema-edge-inspector class="w-72 border-l border-border-subtle p-4">
    <template x-if="selectedEdge">
        <div class="space-y-2">
            <flux:input
                :value="selectedEdge.label ?? ''"
                placeholder="Edge label"
                @change="inspector.setLabel($event.target.value)"
                size="sm"
            />

            <flux:button variant="danger" size="xs" @click="inspector.removeEdge()">
                Delete relationship
            </flux:button>
        </div>
    </template>
</x-schema-edge-inspector>
```

## Placement

The directives walk up to the nearest `[x-data]` scope to find the canvas, so the inspectors can live inside or outside the `<x-flow>` element. Common layouts:

- **Split pane** — canvas on the left, inspectors stacked on the right, both wrapped in a grid
- **Inside the canvas** — place the inspectors inside `<x-flow-panel>` so they float as overlays (this is what `<x-schema-designer>` does)

## See also

- [`<x-schema-designer>`](schema-designer.md) — the full preset that stamps all three inspectors in one shot
- [`<x-flow>`](flow.md) — the underlying canvas component
- [AlpineFlow Schema addon: Inspector scaffolding](https://artisanflow.dev/docs/alpineflow/addons/schema#inspector-scaffolding) — full directive reference, default UI details, and helper semantics
