---
title: Server Patterns
description: Common WireFlow patterns and recipes.
order: 4
---

# Server Patterns

Complete working patterns for common WireFlow use cases. Each pattern includes both the Livewire component and its Blade template.

## Workflow Approval

An approval pipeline where each step can be approved or rejected. Approved steps lock, glow green, draw a connecting edge to the next step, fire particles along the path, and focus the camera on what's next.

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Attributes\Renderless;
use Livewire\Component;

class WorkflowApproval extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => 'submit', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Submit', 'status' => 'approved']],
        ['id' => 'review', 'position' => ['x' => 300, 'y' => 0], 'data' => ['label' => 'Review', 'status' => 'current']],
        ['id' => 'legal', 'position' => ['x' => 600, 'y' => 0], 'data' => ['label' => 'Legal', 'status' => 'pending']],
        ['id' => 'final', 'position' => ['x' => 900, 'y' => 0], 'data' => ['label' => 'Final Approval', 'status' => 'pending']],
    ];

    public array $edges = [
        ['id' => 'e-submit-review', 'source' => 'submit', 'target' => 'review'],
    ];

    /** @var string[] */
    private array $pipeline = ['submit', 'review', 'legal', 'final'];

    #[Renderless]
    public function approve(string $stepId): void
    {
        $nextStep = $this->getNextStep($stepId);

        // Lock the completed step
        $this->flowLockNode($stepId);

        // Visual feedback: green highlight
        $this->flowHighlightNode($stepId, 'success');

        if ($nextStep) {
            // Draw connecting edge to next step
            $this->flowConnect($stepId, $nextStep, duration: 600);

            // Fire particles along the approval path
            $this->flowHighlightPath([$stepId, $nextStep], [
                'color' => '#22c55e',
                'size' => 5,
            ]);

            // Focus the camera on the next step
            $this->flowFocusNode($nextStep, duration: 400);
        }
    }

    #[Renderless]
    public function reject(string $stepId): void
    {
        $this->flowHighlightNode($stepId, 'error', duration: 2000);
        $this->flowFocusNode($stepId);
    }

    private function getNextStep(string $current): ?string
    {
        $index = array_search($current, $this->pipeline);

        return $this->pipeline[$index + 1] ?? null;
    }

    public function render()
    {
        return view('livewire.workflow-approval');
    }
}
```

```blade
{{-- resources/views/livewire/workflow-approval.blade.php --}}
<div>
    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        :fit-view-on-init="true"
        :history="true"
        style="height: 400px;"
    >
        <x-slot:node>
            <x-flow-handle type="target" position="left" />
            <div class="p-3 text-center">
                <div class="font-semibold" x-text="node.data.label"></div>
                <div class="mt-1 text-xs capitalize" x-text="node.data.status"
                     :class="{
                         'text-green-600': node.data.status === 'approved',
                         'text-blue-600': node.data.status === 'current',
                         'text-gray-400': node.data.status === 'pending',
                     }"
                ></div>
                <div class="mt-2 flex justify-center gap-1" x-show="node.data.status === 'current'">
                    <button
                        x-on:click="$wire.approve(node.id)"
                        class="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
                    >
                        Approve
                    </button>
                    <button
                        x-on:click="$wire.reject(node.id)"
                        class="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                    >
                        Reject
                    </button>
                </div>
            </div>
            <x-flow-handle type="source" position="right" />
        </x-slot:node>
    </x-flow>
</div>
```

::demo
```toolbar
<button id="demo-wf-approve" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Approve Step</button>
<span id="demo-wf-status" class="font-mono text-[10px] text-text-faint">Status: pending</span>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'draft', position: { x: 0, y: 50 }, data: { label: 'Draft' }, class: 'flow-node-success' },
        { id: 'review', position: { x: 200, y: 50 }, data: { label: 'Review' } },
        { id: 'approved', position: { x: 400, y: 50 }, data: { label: 'Approved' } },
    ],
    edges: [
        { id: 'e1', source: 'draft', target: 'review' },
        { id: 'e2', source: 'review', target: 'approved' },
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 200px;"
   x-init="
        let step = 1;
        document.getElementById('demo-wf-approve').addEventListener('click', () => {
            const steps = ['draft', 'review', 'approved'];
            if (step < steps.length) {
                const n = nodes.find(n => n.id === steps[step]);
                if (n) n.class = 'flow-node-success';
                const e = edges.find(e => e.target === steps[step]);
                if (e) $flow.sendParticle(e.id, { color: '#14B8A6', size: 4, duration: '1s' });
                document.getElementById('demo-wf-status').textContent = 'Status: ' + steps[step];
                step++;
            }
        });
   ">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <div x-flow-handle:target></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Dashboard Monitor

A live-updating dashboard that polls the server for status changes. Nodes represent services, and their visual state updates based on health checks. Particles fire along edges to show data flow.

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use App\Services\HealthChecker;
use Livewire\Attributes\Renderless;
use Livewire\Component;

class DashboardMonitor extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => 'api', 'position' => ['x' => 0, 'y' => 100], 'data' => ['label' => 'API Gateway', 'status' => 'healthy']],
        ['id' => 'auth', 'position' => ['x' => 300, 'y' => 0], 'data' => ['label' => 'Auth Service', 'status' => 'healthy']],
        ['id' => 'db', 'position' => ['x' => 300, 'y' => 200], 'data' => ['label' => 'Database', 'status' => 'healthy']],
        ['id' => 'cache', 'position' => ['x' => 600, 'y' => 100], 'data' => ['label' => 'Cache', 'status' => 'healthy']],
    ];

    public array $edges = [
        ['id' => 'e-api-auth', 'source' => 'api', 'target' => 'auth', 'animated' => true],
        ['id' => 'e-api-db', 'source' => 'api', 'target' => 'db', 'animated' => true],
        ['id' => 'e-auth-cache', 'source' => 'auth', 'target' => 'cache', 'animated' => true],
    ];

    #[Renderless]
    public function checkHealth(HealthChecker $health): void
    {
        $statuses = $health->checkAll();

        foreach ($statuses as $serviceId => $status) {
            $this->flowUpdateNode($serviceId, [
                'data' => ['status' => $status],
            ]);

            if ($status === 'degraded') {
                $this->flowHighlightNode($serviceId, 'warning');
            } elseif ($status === 'down') {
                $this->flowHighlightNode($serviceId, 'error');
            }
        }

        // Show data flow with particles
        $this->flowSendParticle('e-api-auth', ['color' => '#3b82f6', 'size' => 4]);
        $this->flowSendParticle('e-api-db', ['color' => '#3b82f6', 'size' => 4]);
    }

    public function render()
    {
        return view('livewire.dashboard-monitor');
    }
}
```

```blade
{{-- resources/views/livewire/dashboard-monitor.blade.php --}}
<div wire:poll.5s="checkHealth">
    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        :fit-view-on-init="true"
        :controls="true"
        style="height: 500px;"
    >
        <x-slot:node>
            <x-flow-handle type="target" position="left" />
            <div class="p-3 text-center">
                <div class="font-semibold" x-text="node.data.label"></div>
                <div class="mt-1 flex items-center justify-center gap-1">
                    <span class="inline-block h-2 w-2 rounded-full"
                          :class="{
                              'bg-green-500': node.data.status === 'healthy',
                              'bg-amber-500': node.data.status === 'degraded',
                              'bg-red-500': node.data.status === 'down',
                          }"
                    ></span>
                    <span class="text-xs capitalize" x-text="node.data.status"></span>
                </div>
            </div>
            <x-flow-handle type="source" position="right" />
        </x-slot:node>
    </x-flow>
</div>
```

::demo
```toolbar
<button id="demo-dash-pulse" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Send Data</button>
<span id="demo-dash-count" class="font-mono text-[10px] text-text-faint">Events: 0</span>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'api', position: { x: 0, y: 80 }, data: { label: 'API' } },
        { id: 'cache', position: { x: 200, y: 0 }, data: { label: 'Cache' } },
        { id: 'db', position: { x: 200, y: 160 }, data: { label: 'Database' } },
        { id: 'queue', position: { x: 400, y: 80 }, data: { label: 'Queue' } },
    ],
    edges: [
        { id: 'e1', source: 'api', target: 'cache' },
        { id: 'e2', source: 'api', target: 'db' },
        { id: 'e3', source: 'cache', target: 'queue' },
        { id: 'e4', source: 'db', target: 'queue' },
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 280px;"
   x-init="
        let count = 0;
        document.getElementById('demo-dash-pulse').addEventListener('click', () => {
            count++;
            document.getElementById('demo-dash-count').textContent = 'Events: ' + count;
            edges.forEach(e => {
                setTimeout(() => $flow.sendParticle(e.id, { color: '#8B5CF6', size: 4, duration: '0.8s' }), Math.random() * 500);
            });
        });
   ">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <div x-flow-handle:target></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Dynamic Node Creation

Nodes are added from the server on button click. Connections are persisted via the `onConnect` handler. Each new node gets focused with a smooth camera pan.

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Attributes\Renderless;
use Livewire\Component;

class DynamicBuilder extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => 'start', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'Start']],
    ];

    public array $edges = [];

    public int $nodeCount = 1;

    public function addNode(string $label = 'New Node'): void
    {
        $this->nodeCount++;
        $id = 'node-' . $this->nodeCount;

        // Stagger new nodes vertically
        $x = ($this->nodeCount - 1) * 250;
        $y = ($this->nodeCount % 2 === 0) ? 100 : 0;

        $this->flowAddNodes([
            [
                'id' => $id,
                'position' => ['x' => $x, 'y' => $y],
                'data' => ['label' => $label],
            ],
        ]);

        $this->flowFocusNode($id, duration: 400);
        $this->flowHighlightNode($id, 'info');
    }

    #[Renderless]
    public function addAndConnect(string $fromId): void
    {
        $this->nodeCount++;
        $id = 'node-' . $this->nodeCount;

        $x = ($this->nodeCount - 1) * 250;
        $y = 0;

        $this->flowAddNodes([
            [
                'id' => $id,
                'position' => ['x' => $x, 'y' => $y],
                'data' => ['label' => 'Step ' . $this->nodeCount],
            ],
        ]);

        $this->flowConnect($fromId, $id, duration: 500);
        $this->flowFocusNode($id, duration: 400);
    }

    public function onConnect(string $source, string $target, ?string $sourceHandle, ?string $targetHandle): void
    {
        $this->edges[] = [
            'id' => "e-{$source}-{$target}",
            'source' => $source,
            'target' => $target,
            'sourceHandle' => $sourceHandle,
            'targetHandle' => $targetHandle,
        ];
    }

    public function render()
    {
        return view('livewire.dynamic-builder');
    }
}
```

```blade
{{-- resources/views/livewire/dynamic-builder.blade.php --}}
<div>
    <div class="mb-4 flex gap-2">
        <button
            wire:click="addNode('Custom Node')"
            class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
            Add Node
        </button>
        <button
            wire:click="addAndConnect('start')"
            class="rounded bg-indigo-500 px-3 py-1 text-sm text-white hover:bg-indigo-600"
        >
            Add & Connect to Start
        </button>
    </div>

    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        :fit-view-on-init="true"
        :history="true"
        @connect="onConnect"
        style="height: 500px;"
    >
        <x-slot:node>
            <x-flow-handle type="target" position="left" />
            <div class="flex items-center gap-2 p-2">
                <span x-text="node.data.label"></span>
                <button
                    x-on:click="$wire.addAndConnect(node.id)"
                    class="rounded bg-gray-200 px-1 text-xs hover:bg-gray-300"
                    title="Add connected node"
                >
                    +
                </button>
            </div>
            <x-flow-handle type="source" position="right" />
        </x-slot:node>
    </x-flow>
</div>
```

::demo
```toolbar
<button id="demo-dyn-add" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Add & Connect</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'start', position: { x: 50, y: 80 }, data: { label: 'Start' } },
    ],
    edges: [],
    background: 'dots',
    fitViewOnInit: true,
})" class="flow-container" style="height: 250px;"
   x-init="
        let counter = 1;
        document.getElementById('demo-dyn-add').addEventListener('click', () => {
            counter++;
            const lastNode = nodes[nodes.length - 1];
            const newId = 'node-' + counter;
            addNodes([{
                id: newId,
                position: { x: lastNode.position.x + 200, y: 80 + (counter % 2 === 0 ? -40 : 40) },
                data: { label: 'Step ' + counter },
            }]);
            addEdges([{
                id: 'e-' + counter,
                source: lastNode.id,
                target: newId,
            }]);
            $flow.fitView({ duration: 300 });
        });
   ">
    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node">
                <div x-flow-handle:target></div>
                <span x-text="node.data.label"></span>
                <div x-flow-handle:source></div>
            </div>
        </template>
    </div>
</div>
```
::enddemo

## Related

- [WithWireFlow Trait](trait.md) -- setup and base methods
- [Convenience Methods](convenience.md) -- all convenience methods
- [Event Handlers](events.md) -- handle canvas events on the server
- [Update & Animate](../animation/basics.md) -- smooth transitions
