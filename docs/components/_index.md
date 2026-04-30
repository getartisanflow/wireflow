---
title: Components
order: 2
section: Building Blocks
---

# Components

Blade components that render canvas building blocks. Most are thin wrappers around AlpineFlow directives that add SSR fallbacks and Livewire-friendly props.

## Core

| Component | Purpose |
|-----------|---------|
| [`<x-flow>`](flow.md) | Root canvas container. |
| [`<x-flow-handle>`](handle.md) | Connection handle for nodes. |
| [`<x-flow-panel>`](panel.md) | Floating UI panel anchored to a corner of the canvas. |
| [`<x-flow-toolbar>`](toolbar.md) | Toolbar layout primitive used inside panels. |
| [`<x-flow-action>`](action.md) | Button that dispatches a server action. |
| [`<x-flow-resizer>`](resizer.md) | Resize handles for nodes. |
| [`<x-flow-drag-handle>`](drag-handle.md) | Restrict drag to a specific child element. |
| [`<x-flow-context-menu>`](context-menu.md) | Right-click menu container. |
| [`<x-flow-edge-toolbar>`](edge-toolbar.md) | Toolbar that follows a selected edge. |
| [`<x-flow-collapse>`](collapse.md) | Collapse/expand toggle for group nodes. |
| [`<x-flow-condense>`](condense.md) | Collapse repeated sequence runs into a single node. |
| [`<x-flow-loading>`](loading.md) | Overlay while server data loads. |

## Schema addon

| Component | Purpose |
|-----------|---------|
| [`<x-schema-designer>`](schema-designer.md) | Full schema-designer drop-in. |
| [`<x-flow-schema-node>`](schema-node.md) | Schema-style node template. |
| [`<x-schema-field>`](schema-field.md) | Composable row primitive. |
| [`<x-schema-node-inspector>` / row / edge](schema-inspector.md) | Three-scope schema inspector. |

## Workflow addon

| Component | Purpose |
|-----------|---------|
| [`<x-flow-wait>`](flow-wait.md) | Wait-node template (formatted duration + top/bottom handles). |
