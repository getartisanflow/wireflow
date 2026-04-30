---
title: x-flow-execution-log
description: Dense reactive event viewer for the workflow addon's execution log — filterable, click-to-highlight, XSS-safe by construction.
order: 17
---

# x-flow-execution-log

Dense reactive event viewer that renders `$flow.executionLog` as a scrolling list. Auto-scrolls while a run is active, pauses scroll when the user scrolls upward, and resumes when they scroll back to the bottom. Clicking a row dispatches a `flow:highlight-node` CustomEvent with `{ detail: { nodeId } }` so consumers can wire focus or animation.

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-flow-panel position="bottom-right">
        <x-flow-execution-log />
    </x-flow-panel>
</x-flow>
```

## Props

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `source` | string | no | Alpine expression naming a property on the canvas. Defaults to `$flow.executionLog`. |
| `target` | string | no | CSS selector for the canvas when used outside it. |
| `filter` | `'all' \| 'errors' \| 'lifecycle'` | no | Initial filter. Defaults to `'all'`. |
| `maxEvents` | int | no | Display cap (FIFO trim). Defaults to `500`. |

## Per-row layout

Each row is a `display: grid` of three columns:

```
+512ms     →   enter trigger
+520ms     ←   exit trigger 8ms
+523ms     ─   taken e1
+525ms     ⊥   fork trigger → 2 branches
```

| Column | Purpose |
| --- | --- |
| Timestamp (monospace, muted) | `+Nms` / `+N.Ns` / `+NmNs` relative to the first event in the log |
| Type icon (single character) | Color-coded by event type |
| Content | Per-type label + node/edge ID + duration (when present) |

## Filter modes

- **All events** — no filtering.
- **Errors only** — `run:error` and `edge:failed`.
- **Lifecycle only** — `run:started`, `run:complete`, `run:stopped`, `node:enter`, `node:exit`.

## Security — XSS-safe by construction

Every dynamic field (node IDs, edge IDs, error messages, durations) is rendered via `x-text` on a discrete element. The component **never** uses `x-html` with built strings, so consumer-supplied identifiers cannot inject markup. The component's Pest test asserts that `x-html` does not appear anywhere in the rendered output — this contract is locked.

## Click-to-highlight

Clicking any row dispatches a bubbling `flow:highlight-node` CustomEvent on the row element with `event.detail.nodeId`. Wire focus / pulse / pan-to from the surrounding canvas:

```blade
<x-flow x-on:flow:highlight-node="$flow.focusNode($event.detail.nodeId)">
    ...
</x-flow>
```
