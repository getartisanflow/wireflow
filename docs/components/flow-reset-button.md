---
title: x-flow-reset-button
description: Clear node runState and the execution log so a fresh run can start from a clean slate.
order: 20
---

# x-flow-reset-button

Calls `canvas.resetStates()` then `canvas.resetExecutionLog()` on click — clears every node's `runState` (and `_branchTaken` on condition nodes) and empties the execution log. Always enabled.

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-flow-panel position="top-right">
        <x-flow-toolbar>
            <x-flow-run-button start-id="trigger" />
            <x-flow-stop-button />
            <x-flow-reset-button />
        </x-flow-toolbar>
    </x-flow-panel>
</x-flow>
```

## Props

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `target` | string | no | CSS selector for the canvas when used outside it. |

## Slot

Default label is `Reset`. Slot content overrides:

```blade
<x-flow-reset-button>Clear</x-flow-reset-button>
```
