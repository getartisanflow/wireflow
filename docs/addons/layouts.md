---
title: Layout Engines
description: Auto-layout with dagre, force, tree, and ELK.
order: 2
---

# Layout Engines

WireFlow supports four auto-layout algorithms via addon plugins. Each runs on the client to reposition nodes, with optional animated transitions.

## Installation

Install the AlpineFlow npm package (core from npm gives you access to addon sub-path imports -- WireFlow's vendor bundle provides the core runtime):

```bash
npm install @getartisanflow/alpineflow
```

Then install only the peer dependencies you need:

```bash
npm install @dagrejs/dagre    # for dagre layout
npm install d3-force          # for force-directed layout
npm install d3-hierarchy      # for tree/cluster layout
npm install elkjs             # for ELK layout engine
```

### app.js import pattern

Core comes from the WireFlow vendor bundle. Addons come from npm. They share a global registry.

```js
// resources/js/app.js

// Core from WireFlow vendor bundle
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';

// Layout addons from npm (only import what you installed)
import AlpineFlowDagre from '@getartisanflow/alpineflow/dagre';
import AlpineFlowForce from '@getartisanflow/alpineflow/force';
import AlpineFlowHierarchy from '@getartisanflow/alpineflow/hierarchy';
import AlpineFlowElk from '@getartisanflow/alpineflow/elk';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
    window.Alpine.plugin(AlpineFlowDagre);
    window.Alpine.plugin(AlpineFlowForce);
    window.Alpine.plugin(AlpineFlowHierarchy);
    window.Alpine.plugin(AlpineFlowElk);
});
```

Rebuild after adding imports:

```bash
npm run build
```

---

## Dagre Layout

Hierarchical layout using the [dagre](https://github.com/dagrejs/dagre) algorithm. Best for directed acyclic graphs, org charts, and tree-like structures.

### Client-side usage

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    <x-flow-panel position="top-right">
        <button class="px-3 py-1.5 text-sm rounded border bg-white dark:bg-zinc-800"
                x-on:click="$flow.layout({ direction: 'TB', duration: 300 })">
            Auto Layout
        </button>
    </x-flow-panel>
</x-flow>
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `direction` | `string` | `'TB'` | `'TB'` (top-bottom), `'LR'` (left-right), `'BT'` (bottom-top), `'RL'` (right-left) |
| `nodesep` | `number` | `50` | Horizontal spacing between nodes in the same rank |
| `ranksep` | `number` | `50` | Spacing between ranks (layers) |
| `adjustHandles` | `boolean` | `true` | Set handle positions to match layout direction |
| `fitView` | `boolean` | `true` | Fit viewport after layout |
| `duration` | `number` | `0` | Animation duration in ms (0 for instant) |

---

## Force Layout

Physics-based layout using [d3-force](https://github.com/d3/d3-force). Connected nodes attract, unconnected nodes repel. Produces organic, natural-looking layouts.

### Client-side usage

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    <x-flow-panel position="top-right">
        <button class="px-3 py-1.5 text-sm rounded border bg-white dark:bg-zinc-800"
                x-on:click="$flow.forceLayout({ charge: -500, duration: 500 })">
            Force Layout
        </button>
    </x-flow-panel>
</x-flow>
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `strength` | `number` | `0.1` | Link force strength -- how strongly connected nodes pull toward each other |
| `distance` | `number` | `100` | Ideal link distance between connected nodes |
| `charge` | `number` | `-300` | Charge force (negative = repel, positive = attract) |
| `iterations` | `number` | `300` | Number of simulation ticks to run |
| `center` | `{ x, y }` | `undefined` | Center point for the centering force |
| `fitView` | `boolean` | `true` | Fit viewport after layout |
| `duration` | `number` | `0` | Animation duration in ms (0 for instant) |

---

## Tree Layout

Tree and cluster layouts using [d3-hierarchy](https://github.com/d3/d3-hierarchy). Ideal for hierarchical data with a single root -- file systems, org charts, decision trees.

### Client-side usage

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    <x-flow-panel position="top-right">
        <button class="px-3 py-1.5 text-sm rounded border bg-white dark:bg-zinc-800"
                x-on:click="$flow.treeLayout({ layoutType: 'tree', direction: 'TB', duration: 300 })">
            Tree Layout
        </button>
        <button class="px-3 py-1.5 text-sm rounded border bg-white dark:bg-zinc-800"
                x-on:click="$flow.treeLayout({ layoutType: 'cluster', direction: 'LR', duration: 300 })">
            Cluster Layout
        </button>
    </x-flow-panel>
</x-flow>
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `layoutType` | `string` | `'tree'` | `'tree'` (tidy tree) or `'cluster'` (dendrogram -- all leaves at same depth) |
| `direction` | `string` | `'TB'` | `'TB'`, `'LR'`, `'BT'`, `'RL'` |
| `nodeWidth` | `number` | `150` | Horizontal spacing per node |
| `nodeHeight` | `number` | `100` | Vertical spacing per node |
| `adjustHandles` | `boolean` | `true` | Set handle positions to match layout direction |
| `fitView` | `boolean` | `true` | Fit viewport after layout |
| `duration` | `number` | `0` | Animation duration in ms (0 for instant) |

### Tree vs. Cluster

- **Tree** (`'tree'`) -- a tidy tree layout that minimizes width while keeping nodes at their natural depth.
- **Cluster** (`'cluster'`) -- a dendrogram layout that places all leaf nodes at the same depth, useful for comparing terminal nodes.

---

## ELK Layout

Advanced layout algorithms from the [Eclipse Layout Kernel](https://www.eclipse.org/elk/) via [elkjs](https://github.com/kieler/elkjs). ELK offers the most comprehensive set of layout strategies.

### Client-side usage

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    <x-flow-panel position="top-right">
        <button class="px-3 py-1.5 text-sm rounded border bg-white dark:bg-zinc-800"
                x-on:click="$flow.elkLayout({ algorithm: 'layered', direction: 'DOWN', duration: 300 })">
            ELK Layered
        </button>
        <button class="px-3 py-1.5 text-sm rounded border bg-white dark:bg-zinc-800"
                x-on:click="$flow.elkLayout({ algorithm: 'stress', duration: 300 })">
            ELK Stress
        </button>
    </x-flow-panel>
</x-flow>
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `algorithm` | `string` | `'layered'` | Layout algorithm (see algorithms table) |
| `direction` | `string` | `'DOWN'` | `'DOWN'`, `'RIGHT'`, `'UP'`, `'LEFT'` |
| `nodeSpacing` | `number` | `50` | Minimum spacing between nodes |
| `layerSpacing` | `number` | `50` | Minimum spacing between layers |
| `adjustHandles` | `boolean` | `true` | Set handle positions to match layout direction |
| `fitView` | `boolean` | `true` | Fit viewport after layout |
| `duration` | `number` | `0` | Animation duration in ms (0 for instant) |

### Algorithms

| Algorithm | Description |
|---|---|
| `'layered'` | Layer-based approach for directed graphs. Clean hierarchical layouts with minimal edge crossings. |
| `'stress'` | Stress-minimization. Graph-theoretic distances match geometric distances. |
| `'mrtree'` | Optimized for tree structures. |
| `'radial'` | Concentric circles radiating from a root node. |
| `'force'` | Force-directed layout (ELK's implementation). |
| `'box'` | Packs disconnected components into a compact rectangle. |
| `'random'` | Random placement. Starting point for other algorithms. |

---

## Server-side layout

Use the `WithWireFlow` trait to trigger layout from the server. The `flowLayout()` method dispatches the layout command to the client:

```php
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;

class FlowEditor extends Component
{
    use WithWireFlow;

    public function applyDagreLayout(): void
    {
        $this->flowLayout([
            'algorithm' => 'dagre',
            'direction' => 'TB',
            'duration' => 300,
        ]);
    }

    public function applyForceLayout(): void
    {
        $this->flowLayout([
            'algorithm' => 'force',
            'charge' => -500,
            'duration' => 500,
        ]);
    }

    public function applyTreeLayout(): void
    {
        $this->flowLayout([
            'algorithm' => 'tree',
            'direction' => 'LR',
            'duration' => 300,
        ]);
    }

    public function applyElkLayout(): void
    {
        $this->flowLayout([
            'algorithm' => 'elk',
            'elkAlgorithm' => 'layered',
            'direction' => 'DOWN',
            'duration' => 300,
        ]);
    }
}
```

```blade
<div>
    <x-flow :nodes="$nodes" :edges="$edges">
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>
    </x-flow>

    <div class="mt-4 flex gap-2">
        <button wire:click="applyDagreLayout" class="px-3 py-1.5 text-sm rounded border">Dagre</button>
        <button wire:click="applyForceLayout" class="px-3 py-1.5 text-sm rounded border">Force</button>
        <button wire:click="applyTreeLayout" class="px-3 py-1.5 text-sm rounded border">Tree</button>
        <button wire:click="applyElkLayout" class="px-3 py-1.5 text-sm rounded border">ELK</button>
    </div>
</div>
```

---

## Auto-layout config

Configure automatic layout via the `:config` prop. When enabled, the graph re-layouts on structural changes (node/edge additions and removals):

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="[
        'autoLayout' => [
            'algorithm' => 'dagre',
            'direction' => 'LR',
        ],
    ]"
>
    <x-slot:node>
        <x-flow-handle type="target" position="left" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="right" />
    </x-slot:node>
</x-flow>
```

When `autoLayout` is set, adding or removing nodes/edges triggers an automatic re-layout with the configured algorithm and options.

::demo
```toolbar
<button id="demo-layout-tb" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Top → Bottom</button>
<button id="demo-layout-lr" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Left → Right</button>
<button id="demo-layout-bt" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Bottom → Top</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Start' } },
        { id: 'b', position: { x: 50, y: 50 }, data: { label: 'Process' } },
        { id: 'c', position: { x: 100, y: 100 }, data: { label: 'Review' } },
        { id: 'd', position: { x: 150, y: 50 }, data: { label: 'Approve' } },
        { id: 'e', position: { x: 200, y: 150 }, data: { label: 'End' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'a', target: 'c' },
        { id: 'e3', source: 'b', target: 'd' },
        { id: 'e4', source: 'c', target: 'd' },
        { id: 'e5', source: 'd', target: 'e' },
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    pannable: false,
    zoomable: false,
})" class="flow-container" style="height: 250px;"
   x-init="
        document.getElementById('demo-layout-tb').addEventListener('click', () => $flow.layout({ direction: 'TB', duration: 300 }));
        document.getElementById('demo-layout-lr').addEventListener('click', () => $flow.layout({ direction: 'LR', duration: 300 }));
        document.getElementById('demo-layout-bt').addEventListener('click', () => $flow.layout({ direction: 'BT', duration: 300 }));
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

## Layout animation CSS

The transition duration for animated layouts can be customized via CSS:

```css
.flow-container {
    --flow-layout-animation-duration: 0.5s;
}
```

## Related

- [Installation](../installation.md#optional-addons) -- addon setup
- [Server Commands](../server/trait.md#layout--state) -- `flowLayout()` trait method
- [Animation Basics](../animation/basics.md) -- animating node positions
