---
title: x-flow-stop-button
description: Halt an active workflow run. Hidden when the canvas is idle by default.
order: 19
---

# x-flow-stop-button

Calls `canvas.stopRun()` (which forwards to the active `FlowRunHandle.stop()`) on click. By default the button is hidden when the canvas is idle and visible while a run is `running` or `paused`. Pass `:always-visible` to render the button continuously and let it disable itself when there's nothing to stop.

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
| `always-visible` | bool | no | Render the button even when idle (disabled). Default `false`. |

## Slot

Default label is `Stop`. Slot content overrides:

```blade
<x-flow-stop-button>Halt</x-flow-stop-button>
```
