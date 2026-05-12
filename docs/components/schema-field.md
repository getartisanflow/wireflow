---
title: x-schema-field
description: Composable row primitive for custom schema node templates — stamps handles, row-select, and PK/FK/required classes while letting consumers own the row body.
order: 16
---

# x-schema-field

A composable Blade primitive that renders a single schema field row — target handle on the left, source handle on the right, mirror handles on the opposite sides, row-select wiring, and PK/FK/required class bindings. Reach for it when you're writing a custom `<x-slot:node>` template and want full control over the row body (icons, badges, Flux widgets, Livewire bindings) without re-implementing handle stamping.

If you just want the stock "header + name + type pill" layout, the [`<x-flow-schema-node>`](schema-node.md) auto-stamped path or the [`<x-schema-designer>`](schema-designer.md) preset cover it without touching `<x-schema-field>` directly.

> Prerequisite: the AlpineFlow schema plugin must be registered (see [Installation](schema-designer.md#installation)). Without it, edges still connect by node id but `selectedRow` / row-select inspector wiring won't resolve.

## Required Alpine scope

`<x-schema-field>` reads two reactive properties from the surrounding Alpine scope — both are available automatically inside the `<x-slot:node>` render in `<x-flow>`:

- `node` — the current `FlowNode` (must carry `id` so row-select can key `"<nodeId>.<fieldName>"`)
- `field` — a `FlowSchemaField` (must carry `name` and `type`; optionally `key`, `required`, `icon`, and the [extended metadata](https://artisanflow.dev/docs/alpineflow/addons/schema#field-metadata-extended))

The standard pattern is a `<template x-for="field in node.data.fields">` loop inside the node template — each iteration gives `<x-schema-field>` what it needs.

## Minimal example

Render the stock row body (icon + name + type pill) by leaving the slot empty:

```blade
<x-flow :nodes="$tables" :edges="$relationships">
    <x-slot:node>
        <div class="flow-schema-node">
            <div class="flow-schema-header" x-text="node.data.label"></div>
            <template x-for="field in node.data.fields" :key="field.name">
                <x-schema-field />
            </template>
        </div>
    </x-slot:node>
</x-flow>
```

## Slot override

Pass slot content to replace the default row body. Target/source/mirror handles and row-select wiring still stamp — only the inner label/type layout changes:

```blade
<template x-for="field in node.data.fields" :key="field.name">
    <x-schema-field>
        <div class="flex items-center gap-2 text-sm">
            <template x-if="field.icon">
                <span x-text="field.icon" class="text-muted"></span>
            </template>

            <span x-text="field.name" class="font-medium"></span>

            <template x-if="field.deprecated">
                <flux:badge color="zinc" size="sm">deprecated</flux:badge>
            </template>

            <span x-text="field.type" class="ml-auto font-mono text-xs text-muted"></span>
        </div>
    </x-schema-field>
</template>
```

Because row-select is stamped on the outer element, clicking anywhere inside the slot still populates `canvas.selectedRows` with `"<nodeId>.<fieldName>"`.

## Class merging

Classes passed via the component tag merge with the built-in `flow-schema-row`:

```blade
<x-schema-field class="group hover:bg-accent-subtle" />
```

The component uses `{{ $attributes->class(['flow-schema-row']) }}`, so `flow-schema-row--pk` / `--fk` / `--required` binding via `:class` still fires independently based on `field.key` and `field.required`.

## Stamped hooks (reference)

Every `<x-schema-field>` output carries:

- `class="flow-schema-row"` + conditional `flow-schema-row--pk` / `--fk` / `--required`
- `data-flow-schema-field="<fieldName>"` — for CSS targeting by field name
- `x-flow-row-select="node.id + '.' + field.name"` — row-select binding
- Four `<div class="flow-schema-handle">` elements carrying `x-flow-handle:target.left` / `x-flow-handle:source.right` (the real connection points) plus two mirror handles on the opposite sides for the edge geometry picker

## See also

- [`<x-flow-schema-node>`](schema-node.md) — the auto-stamped path when you don't need a custom template
- [`<x-schema-designer>`](schema-designer.md) — the full preset (canvas + three inspectors) when you want the whole stack in one component
- [`<x-schema-*-inspector>`](schema-inspector.md) — slot-overridable inspector wrappers that read `selectedRow` populated by `x-schema-field`
- [AlpineFlow: Schema addon — Field metadata](https://artisanflow.dev/docs/alpineflow/addons/schema#field-metadata-extended) — the extended props (`description`, `deprecated`, `tags[]`, `defaultValue`) your slot can render
