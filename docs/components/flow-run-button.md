---
title: x-flow-run-button
description: Workflow run trigger that calls $flow.run() against the surrounding canvas — auto-disables during runs.
order: 18
---

# x-flow-run-button

Triggers a workflow run by calling `$flow.run(startId, handlers, options)` against the surrounding canvas. JavaScript handlers (`onEnter`, `pickBranch`, …) can't be serialized from PHP, so the component reads them from a property on the canvas DOM element — pre-register on `<x-flow>` via `x-init`.

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    x-init="$el.runHandlers = {
        onEnter: async (node, ctx) => { /* ... */ },
        pickBranch: (node, edges, ctx) => edges[0].id,
    }"
>
    <x-flow-panel position="top-right">
        <x-flow-run-button start-id="trigger" />
    </x-flow-panel>
</x-flow>
```

The button auto-disables while `canvas.runState` is `running` or `paused`.

## Props

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `start-id` | string | yes | Node ID to start the run from. |
| `options` | array | no | Forwarded to `$flow.run()` — `payload`, `defaultDurationMs`, `particleOnEdges`, `particleOptions`, `muteUntakenBranches`, `lock`, `logLimit`. |
| `handlers-key` | string | no | Property name on the canvas DOM element holding the handlers object. Defaults to `runHandlers`. |
| `target` | string | no | CSS selector for the canvas when used outside it. |

## Slot

Default content is the running-state-aware label: `Run workflow` / `Running…`. Slot content overrides both:

```blade
<x-flow-run-button start-id="trigger">
    <span class="flex items-center gap-2">
        <i class="i-heroicons-play"></i>
        Start onboarding
    </span>
</x-flow-run-button>
```

When you take over the slot, you also opt out of the default label swap. Handle the running state yourself if you need it via `x-show` against `isRunning` from the surrounding scope.

## Server-driven path

Consumers that prefer the server side can ignore the JS handlers route and use `wire:click` against `WithWireFlow::flowRun()`:

```blade
<button type="button" wire:click="$call('flowRun', 'trigger')">Run from server</button>
```

The standard Livewire loading state handles the disabled-during-dispatch UX.
