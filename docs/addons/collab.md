---
title: Collaboration
description: Real-time multi-user editing.
order: 3
---

# Collaboration

The Collaboration addon enables real-time multi-user editing of WireFlow diagrams using [Yjs](https://yjs.dev/) conflict-free replicated data types (CRDTs). All node and edge changes sync automatically across connected clients.

## Installation

Install the required peer dependencies and the AlpineFlow npm package:

```bash
npm install @getartisanflow/alpineflow yjs y-websocket y-protocols
```

Register the plugin in your `resources/js/app.js`:

```js
// Core from WireFlow vendor bundle
import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';
// Collaboration addon from npm
import AlpineFlowCollab from '@getartisanflow/alpineflow/collab';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
    window.Alpine.plugin(AlpineFlowCollab);
});
```

Rebuild after adding the import:

```bash
npm run build
```

## Configuration

Pass a `collab` object via the `:config` prop:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="[
        'collab' => [
            'provider' => 'websocket',
            'url' => 'ws://localhost:1234',
            'room' => 'my-room',
            'user' => [
                'name' => auth()->user()->name,
                'color' => '#3b82f6',
            ],
        ],
    ]"
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

### Config options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `provider` | `string` | — | Provider type: `'websocket'` or `'reverb'` |
| `url` | `string` | — | WebSocket server URL |
| `room` | `string` | — | Room/document name for sync |
| `user` | `object` | — | `{ name: string, color: string }` |
| `cursors` | `boolean` | `true` | Show remote user cursors |
| `selections` | `boolean` | `true` | Show remote user selections |
| `throttle` | `number` | `20` | Cursor broadcast throttle in ms |

## Providers

Three provider types are available:

### WebSocket provider

Standard y-websocket connection. Requires a running [y-websocket server](https://github.com/yjs/y-websocket).

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="[
        'collab' => [
            'provider' => 'websocket',
            'url' => 'ws://localhost:1234',
            'room' => 'diagram-1',
            'user' => ['name' => 'Alice', 'color' => '#3b82f6'],
        ],
    ]"
>
    <x-slot:node>
        <span x-text="node.data.label"></span>
    </x-slot:node>
</x-flow>
```

### Laravel Reverb provider

Connects via a running [Laravel Reverb](https://reverb.laravel.com) server.

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="[
        'collab' => [
            'provider' => 'reverb',
            'url' => 'ws://localhost:8080',
            'room' => 'diagram-1',
            'user' => ['name' => auth()->user()->name, 'color' => '#3b82f6'],
        ],
    ]"
>
    <x-slot:node>
        <span x-text="node.data.label"></span>
    </x-slot:node>
</x-flow>
```

### InMemoryProvider

For testing and demos, `InMemoryProvider` requires no server. Use `linkProviders()` to synchronize two instances client-side. Import these from the collab addon:

```js
import { InMemoryProvider, linkProviders } from '@getartisanflow/alpineflow/collab';
```

This is used internally for documentation demos. See the [complete example](#complete-example) below for a two-canvas demo setup.

## Remote cursors

Use the `x-flow-cursors` directive on `<x-flow>` to render remote user cursors:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="[
        'collab' => [
            'provider' => 'websocket',
            'url' => 'ws://localhost:1234',
            'room' => 'my-room',
            'user' => ['name' => auth()->user()->name, 'color' => '#3b82f6'],
        ],
    ]"
    x-flow-cursors
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

Each remote cursor renders as:
- An SVG arrow pointer filled with the user's `color`
- A name label badge positioned beside the arrow
- Smooth CSS transitions (100ms ease-out) as the cursor moves

### Cursor CSS customization

The cursor elements have the class `.flow-collab-cursor` with children `.flow-collab-cursor-arrow` (SVG path) and `.flow-collab-cursor-label` (name badge). Override these to customize:

```css
/* Larger name labels */
.flow-collab-cursor-label {
    font-size: 13px;
    padding: 3px 10px;
}

/* Hide name labels entirely */
.flow-collab-cursor-label {
    display: none;
}

/* Custom cursor animation */
.flow-collab-cursor {
    transition: transform 200ms ease-out;
}
```

## User presence via `$flow.collab`

When collaboration is active, `$flow.collab` exposes reactive presence data:

| Property | Type | Description |
|----------|------|-------------|
| `users` | `CollabUser[]` | All connected users (reactive) |
| `userCount` | `number` | Number of connected users |
| `me` | `CollabUser` | Local user info `{ name, color }` |
| `connected` | `boolean` | Whether the provider is currently connected |
| `status` | `string` | `'connecting'`, `'connected'`, or `'disconnected'` |

### Awareness state shape

Each connected user broadcasts this state:

```js
{
    user: { name: 'Alice', color: '#3b82f6' },
    cursor: { x: 150, y: 200 },           // pointer position in flow coords, or null
    selectedNodes: ['node-1', 'node-3'],   // currently selected node IDs
    viewport: { x: 0, y: 0, zoom: 1 },    // user's viewport
}
```

### User presence list example

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :config="$collabConfig"
    x-flow-cursors
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>

    <x-flow-panel position="top-right">
        <div class="text-sm font-medium" x-text="'Online: ' + ($flow.collab?.userCount ?? 0)"></div>
        <template x-for="user in ($flow.collab?.users ?? [])" :key="user.name">
            <div class="flex items-center gap-2 text-xs py-0.5">
                <span class="w-2.5 h-2.5 rounded-full" :style="'background:' + user.color"></span>
                <span x-text="user.name"></span>
            </div>
        </template>
    </x-flow-panel>
</x-flow>
```

### Connection status indicator example

```blade
<x-flow-panel position="bottom-left">
    <div class="flex items-center gap-1 text-xs">
        <span class="w-2 h-2 rounded-full"
              :class="{
                  'bg-green-500': $flow.collab?.status === 'connected',
                  'bg-yellow-500': $flow.collab?.status === 'connecting',
                  'bg-red-500': $flow.collab?.status === 'disconnected',
              }"></span>
        <span x-text="$flow.collab?.status ?? 'offline'"></span>
    </div>
</x-flow-panel>
```

## Complete example

A full collaborative WireFlow canvas with remote cursors, user presence list, and connection status indicator.

### Livewire component

```php
<?php

namespace App\Livewire;

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;

class CollaborativeFlow extends Component
{
    use WithWireFlow;

    public array $nodes = [
        ['id' => 'a', 'position' => ['x' => 50, 'y' => 50], 'data' => ['label' => 'Node A']],
        ['id' => 'b', 'position' => ['x' => 300, 'y' => 50], 'data' => ['label' => 'Node B']],
        ['id' => 'c', 'position' => ['x' => 175, 'y' => 200], 'data' => ['label' => 'Node C']],
    ];

    public array $edges = [
        ['id' => 'e1', 'source' => 'a', 'target' => 'c', 'markerEnd' => 'arrowclosed'],
        ['id' => 'e2', 'source' => 'b', 'target' => 'c', 'markerEnd' => 'arrowclosed'],
    ];

    public function getCollabConfigProperty(): array
    {
        return [
            'collab' => [
                'provider' => 'websocket',
                'url' => config('services.yjs.url', 'ws://localhost:1234'),
                'room' => 'flow-demo-room',
                'user' => [
                    'name' => auth()->user()->name ?? 'Anonymous',
                    'color' => $this->getUserColor(),
                ],
                'cursors' => true,
                'selections' => true,
            ],
        ];
    }

    private function getUserColor(): string
    {
        $colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];

        return $colors[auth()->id() % count($colors)];
    }

    public function render(): \Illuminate\View\View
    {
        return view('livewire.collaborative-flow');
    }
}
```

### Blade template

```blade
{{-- resources/views/livewire/collaborative-flow.blade.php --}}
<div>
    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        background="dots"
        controls
        :config="$this->collabConfig"
        style="height: 500px;"
        x-flow-cursors
    >
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>

        {{-- User presence panel --}}
        <x-flow-panel position="top-right">
            <div class="p-2 text-xs">
                {{-- Connection status --}}
                <div class="flex items-center gap-1 mb-2">
                    <span class="w-2 h-2 rounded-full"
                          :class="{
                              'bg-green-500': $flow.collab?.status === 'connected',
                              'bg-yellow-500': $flow.collab?.status === 'connecting',
                              'bg-red-500': $flow.collab?.status === 'disconnected',
                          }"></span>
                    <span x-text="($flow.collab?.userCount ?? 0) + ' online'"></span>
                </div>

                {{-- User list --}}
                <template x-for="user in ($flow.collab?.users ?? [])" :key="user.name">
                    <div class="flex items-center gap-2 py-0.5">
                        <span class="w-2.5 h-2.5 rounded-full" :style="'background:' + user.color"></span>
                        <span x-text="user.name"></span>
                    </div>
                </template>
            </div>
        </x-flow-panel>
    </x-flow>
</div>
```

> **Live demos:** See the [AlpineFlow collab example](/examples/collaboration) (simulated with InMemoryProvider) and the [WireFlow collab example](/examples/wireflow/collab) (real multi-user via Reverb).

## Sync behavior

All node and edge changes automatically sync across connected clients via Yjs shared types:

- Adding, removing, and updating nodes
- Adding, removing, and updating edges
- Node position changes (drag)
- Annotation drawing (when used with the [Whiteboard](whiteboard.md) addon)
- Undo/redo operations

## Production gotchas

These apply to both AlpineFlow and WireFlow when using ReverbProvider in production. See the [AlpineFlow collab docs](/docs/alpineflow/addons/collab) for detailed coverage.

### Use stateUrl for initial state

Without `stateUrl`, clients that load simultaneously create independent Yjs Y.Map instances for the same nodes. The CRDT resolves duplicates, but modifications to the "losing" Y.Maps are invisible to other clients — causing one-directional sync.

**Always provide a `stateUrl`** endpoint that serves a pre-encoded Yjs state. All clients start from the same CRDT baseline. The ReverbProvider also saves state back to this URL every 5 seconds (debounced) so late joiners get the current graph.

```blade
:config="[
    'collab' => [
        'provider' => WireFlow::js('new window.ReverbProvider({
            roomId: \'' . $roomId . '\',
            channel: \'collab-room.' . $roomId . '\',
            user: { ... },
            stateUrl: \'/api/collab/{roomId}/state\',
        })'),
    ],
]"
```

### Reverb: accept_client_events_from

Reverb's `accept_client_events_from` setting defaults to `'members'` (presence channels only). For private channel collab, set it to `'all'` in `config/reverb.php`. Only `'all'` and `'members'` are valid — any other value silently blocks all whispers. **Restart Reverb after changing.**

### Reverb: message size limits

Yjs updates can exceed Reverb's default 10KB limit. Set `max_message_size` and `max_request_size` to at least 500KB in `config/reverb.php`.

### Cursor positioning in WireFlow

The `x-flow-cursors` element renders in WireFlow's default slot, which is **outside** the viewport div. Remote cursors use flow-space coordinates and need the viewport's CSS transform to position correctly. Move the element into the viewport on mount:

```html
<div x-flow-cursors x-init="$nextTick(() => {
    const viewport = $el.closest('.flow-container')?.querySelector('.flow-viewport');
    if (viewport && !viewport.contains($el)) viewport.appendChild($el);
})"></div>
```

### Anonymous broadcasting auth

Private channels require authentication. For anonymous collab (no user model), register a custom `/broadcasting/auth` route with manual Pusher HMAC signing that uses session-based identity instead of Laravel's auth middleware.

## Related

- [AlpineFlow Collab Docs](/docs/alpineflow/addons/collab) — full collab reference with all config options
- [Live Collaboration Example](/examples/wireflow/collab) — production Reverb example with room management
- [Installation](../getting-started/installation.md#optional-addons) — addon setup
- [Whiteboard](whiteboard.md) — annotations sync via collab
