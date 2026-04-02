---
title: Viewport
description: Pan, zoom, and viewport control.
order: 1
---

# Viewport

The viewport determines which portion of the diagram is visible. WireFlow provides props for pan/zoom configuration and server methods for programmatic viewport control.

## Pan and zoom

Enable or disable panning and zooming with `<x-flow>` props:

```blade
<x-flow
    :nodes="$nodes"
    :edges="$edges"
    :pannable="true"
    :zoomable="true"
    :min-zoom="0.1"
    :max-zoom="4"
>
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pannable` | `bool` | `true` | Enable panning |
| `zoomable` | `bool` | `true` | Enable zooming |
| `min-zoom` | `float` | `null` | Minimum zoom level |
| `max-zoom` | `float` | `null` | Maximum zoom level |

## Fit view on init

Automatically fit all nodes into the viewport when the canvas first renders:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :fit-view-on-init="true">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

## Advanced viewport config

For options not exposed as props, use `:config`:

```blade
<x-flow :nodes="$nodes" :edges="$edges" :config="[
    'panOnScroll' => true,
    'panOnDrag' => [0],
    'translateExtent' => [[-1000, -1000], [2000, 2000]],
    'viewportCulling' => true,
    'zoomOnDoubleClick' => true,
    'autoPanOnNodeDrag' => true,
]">
    <x-slot:node>
        <x-flow-handle type="target" position="top" />
        <span x-text="node.data.label"></span>
        <x-flow-handle type="source" position="bottom" />
    </x-slot:node>
</x-flow>
```

| Config key | Type | Default | Description |
|------------|------|---------|-------------|
| `panOnScroll` | `bool` | `false` | Scroll to pan instead of zoom. Ctrl+scroll zooms. |
| `panOnDrag` | `array` | `[0]` | Mouse button indices that trigger panning (0 = left, 1 = middle, 2 = right) |
| `translateExtent` | `array` | -- | Pan boundaries: `[[minX, minY], [maxX, maxY]]` in flow coordinates |
| `viewportCulling` | `bool` | `true` | Only render visible nodes/edges for performance |
| `zoomOnDoubleClick` | `bool` | `true` | Double-click to zoom in |
| `autoPanOnNodeDrag` | `bool` | `true` | Auto-pan when dragging a node near the canvas edge |
| `autoPanOnConnect` | `bool` | `true` | Auto-pan when dragging a connection near the canvas edge |

::demo
```toolbar
<button id="demo-vp-fit" class="rounded-md border border-border-subtle bg-elevated px-3 py-1 font-mono text-[11px] text-text-muted cursor-pointer hover:text-text-body">Fit View</button>
```
```html
<div x-data="flowCanvas({
    nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Pan & zoom me' } },
        { id: 'b', position: { x: 300, y: 0 }, data: { label: 'Drag to pan' } },
        { id: 'c', position: { x: 150, y: 120 }, data: { label: 'Scroll to zoom' } },
    ],
    edges: [
        { id: 'e1', source: 'a', target: 'b' },
        { id: 'e2', source: 'a', target: 'c' },
        { id: 'e3', source: 'b', target: 'c' },
    ],
    background: 'dots',
    fitViewOnInit: true,
    controls: false,
    minZoom: 0.2,
    maxZoom: 4,
})" class="flow-container" style="height: 250px;"
   x-init="document.getElementById('demo-vp-fit').addEventListener('click', () => fitView({ padding: 0.2, duration: 300 }))">
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

## Server-side viewport control

Use the `WithWireFlow` trait methods to control the viewport from PHP:

```php
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;

class FlowEditor extends Component
{
    use WithWireFlow;

    public function fitAll(): void
    {
        $this->flowFitView();
    }

    public function zoomIn(): void
    {
        $this->flowZoomIn();
    }

    public function zoomOut(): void
    {
        $this->flowZoomOut();
    }

    public function centerOnNode(): void
    {
        $this->flowSetCenter(250.0, 150.0, 1.5);
    }

    public function panRight(): void
    {
        $this->flowPanBy(100.0, 0.0);
    }

    public function setExactViewport(): void
    {
        $this->flowSetViewport(['x' => 0, 'y' => 0, 'zoom' => 1]);
    }

    public function focusRegion(): void
    {
        $this->flowFitBounds(
            ['x' => 0, 'y' => 0, 'width' => 500, 'height' => 300],
            ['padding' => 0.1]
        );
    }
}
```

### Method reference

| Method | Description |
|--------|-------------|
| `$this->flowFitView()` | Fit all nodes in viewport |
| `$this->flowZoomIn()` | Zoom in one step |
| `$this->flowZoomOut()` | Zoom out one step |
| `$this->flowSetCenter(float $x, float $y, ?float $zoom)` | Pan/zoom to coordinates |
| `$this->flowPanBy(float $dx, float $dy)` | Pan by offset |
| `$this->flowSetViewport(array $viewport)` | Set viewport `['x' => 0, 'y' => 0, 'zoom' => 1]` |
| `$this->flowFitBounds(array $rect, array $options)` | Fit specific bounds `['x', 'y', 'width', 'height']` |
| `$this->flowToggleInteractive()` | Toggle pan/zoom/drag |

### Example Blade with server buttons

```blade
<div>
    <div class="mb-4 flex gap-2">
        <button wire:click="fitAll">Fit View</button>
        <button wire:click="zoomIn">Zoom In</button>
        <button wire:click="zoomOut">Zoom Out</button>
        <button wire:click="centerOnNode">Center</button>
        <button wire:click="panRight">Pan Right</button>
    </div>

    <x-flow :nodes="$nodes" :edges="$edges" :fit-view-on-init="true" style="height: 400px;">
        <x-slot:node>
            <x-flow-handle type="target" position="top" />
            <span x-text="node.data.label"></span>
            <x-flow-handle type="source" position="bottom" />
        </x-slot:node>
    </x-flow>
</div>
```

## Viewport change event

Listen for viewport changes on the server:

```blade
<x-flow :nodes="$nodes" :edges="$edges" @viewport-change="onViewportChange">
```

```php
public function onViewportChange(array $viewport): void
{
    // $viewport = ['x' => 0, 'y' => 0, 'zoom' => 1.0]
}
```

## See also

- [Background](background.md) -- grid patterns behind the diagram
- [Controls & Actions](controls.md) -- built-in viewport control buttons
- [Minimap](minimap.md) -- overview panel with viewport indicator
- [Server Commands](../server/trait.md) -- all server-to-client methods
