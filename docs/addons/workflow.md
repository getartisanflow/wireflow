---
title: Workflow Addon
description: WireFlow surface for the AlpineFlow workflow addon — wait/condition node templates, server-driven runs, run-state sync.
order: 6
---

# Workflow Addon

The WireFlow workflow addon exposes the AlpineFlow [workflow addon](https://artisanflow.dev/alpineflow/docs/addons/workflow) to Livewire components. Use it to drive workflow runs from the server, sync run-state to nodes, and listen to execution events.

## Installation

The workflow addon is opt-in — register it on the JS side alongside AlpineFlow:

```js
import AlpineFlow from '@getartisanflow/alpineflow';
import AlpineFlowWorkflow from '@getartisanflow/alpineflow/workflow';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
    window.Alpine.plugin(AlpineFlowWorkflow);
});
```

If you're loading AlpineFlow from the bundled WireFlow dist, the workflow addon entry sits next to the core bundle:

```js
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';
import AlpineFlowWorkflow from '../../vendor/getartisanflow/wireflow/dist/alpineflow-workflow.esm.js';
```

Once registered, every `<x-flow>` canvas gains the run/replay surface (`$flow.run()`, `$flow.replayExecution()`, `$flow.executionLog`) and the workflow node templates.

## Components

| Component | Purpose |
| --- | --- |
| [`<x-flow-wait>`](../components/flow-wait.md) | Wait-node template — header (icon + label + formatted duration) plus top/bottom handles. |

More UI primitives — replay controls, execution-log viewer, condition node, run/stop/reset buttons — are tracked under the next plan.

## Server-side trait methods

These live on `WithWireFlow` — see [Trait reference](../server/trait.md#workflow-addon) for the full method table.

| Method | Description |
| --- | --- |
| `$this->flowRun(string $startId, array $options = [])` | Dispatch a `flow:run` event so the client-side workflow addon executes the workflow. |
| `$this->flowSetNodeState(string\|array $ids, string $state)` | Set `runState` on one or more nodes. |
| `$this->flowResetStates()` | Clear `runState` from all nodes. |

`flowSetNodeState()` valid states: `pending`, `running`, `completed`, `failed`, `skipped`.

## Wire bridge events

The Livewire ↔ AlpineFlow bridge translates these dispatches into client-side calls on the workflow addon:

| Dispatched event | Payload | Effect |
| --- | --- | --- |
| `flow:run` | `{ startId: string, options?: object }` | Calls `$flow.run(startId, handlers, options)` on the canvas. |
| `flow:setNodeState` | `{ ids: string \| string[], state: string }` | Updates `runState` on the matching nodes. |
| `flow:resetStates` | (none) | Clears every node's `runState`. |

## Pre-registering handlers

Workflow handlers (`onEnter`, `onExit`, `pickBranch`, …) are JavaScript callbacks; they can't be serialized from PHP. Pre-register them on the canvas with `x-init` so they're available when `flowRun()` dispatches:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    x-init="$el.runHandlers = {
        onEnter: async (node, ctx) => { /* ... */ },
        pickBranch: (node, edges, ctx) => edges[0].id,
    }"
/>
```

The forthcoming `<x-flow-run-button>` primitive reads from `$el.runHandlers` by default — see the upcoming UI-primitives release for the auto-wired flow.

## Validation

The addon ships a pure helper that mirrors `validateSchema()`:

```js
const result = $flow.validateWorkflow();
// → { valid: boolean, issues: WorkflowValidationIssue[] }
```

Issue codes returned:

| Severity | Code | Meaning |
| --- | --- | --- |
| error | `dangling-edge` | Edge source or target node doesn't exist. |
| error | `duplicate-node-id` | Two nodes share an id. |
| error | `missing-condition` | A `flow-condition` node has neither `condition` nor `evaluate`. |
| error | `condition-missing-branch` | A `flow-condition` node is missing its `true` or `false` outgoing edge. |
| error | `unhandled-source-handle` | A `flow-condition` outgoing edge has a `sourceHandle` other than `true` / `false`. |
| error | `wait-missing-duration` | A `flow-wait` node has non-numeric or missing `data.durationMs`. |
| warning | `unreachable-node` | A node has no incoming and no outgoing edges. |
| warning | `cycle` | A directed cycle exists in the graph. |

Use it from a server action via [`<x-flow-action>`](../components/action.md) or wire a `wire:click` to a button that calls `$flow.validateWorkflow()` and posts the result back.

## Quick start

```php
<?php
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;

class WorkflowEditor extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => 'trigger', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Start']],
        ['id' => 'wait', 'type' => 'flow-wait', 'position' => ['x' => 200, 'y' => 0], 'data' => ['label' => 'Cooldown', 'durationMs' => 2000]],
    ];

    public array $edges = [
        ['id' => 'e1', 'source' => 'trigger', 'target' => 'wait'],
    ];

    public function startRun(): void
    {
        $this->flowRun('trigger');
    }

    public function render()
    {
        return view('livewire.workflow-editor');
    }
}
```

```blade
<x-flow :nodes="$nodes" :edges="$edges" x-init="$el.runHandlers = { onEnter: async () => {} }">
    <x-slot:node>
        <template x-if="node.type === 'flow-wait'">
            <x-flow-wait />
        </template>
    </x-slot:node>
</x-flow>

<button wire:click="startRun">Run workflow</button>
```
