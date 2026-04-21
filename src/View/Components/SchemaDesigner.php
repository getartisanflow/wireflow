<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-schema-designer> — Blade preset that wraps <x-flow> with defaults tuned
 * for database-schema diagrams and stamps three inspector mount points
 * (node / row / edge) that consumers can override via named slots.
 *
 * Consumers pass :nodes and :edges (same shape as <x-flow>) and optionally
 * override any subset of the inspector slots. When no slot override is
 * provided, the preset renders the default Alpine inspector directive with
 * the schema addon's default-UI template.
 *
 * Every <x-flow> prop is forwarded one-to-one so this preset is a true
 * drop-in replacement for the bare <x-flow>. Schema-specific additions
 * (keyboardConnect, collapseBidirectionalEdges) merge into the config
 * array — caller-provided keys in :config win over preset defaults.
 */
class SchemaDesigner extends Component
{
    public function __construct(
        // Every <x-flow> prop, forwarded 1:1. Keep in the same order as
        // WireFlow::__construct so future additions are easy to spot.
        public array $nodes = [],
        public array $edges = [],
        public array $viewport = ['x' => 0, 'y' => 0, 'zoom' => 1],
        public bool $sync = false,
        public bool $listen = false,
        public string $background = 'dots',
        public bool $minimap = false,
        public bool $controls = false,
        public bool $pannable = true,
        public bool $zoomable = true,
        public bool $fitView = false,
        public array|false $snap = false,
        public string $defaultEdgeType = 'avoidant',
        public bool $edgesReconnectable = true,
        public bool $interactive = true,
        public array $nodeTypes = [],
        public array $config = [],
        public ?float $minZoom = null,
        public ?float $maxZoom = null,
        public bool $preventCycles = false,
        public ?string $colorMode = null,
        public bool $selectionOnDrag = false,
        public ?string $computeMode = null,
        public bool $fitViewOnInit = false,
        public bool $history = false,
        public ?array $autoLayout = null,
        public ?int $backgroundGap = null,
        public bool $wireIgnore = true,
        // Schema-specific additions merged into $config
        public bool $keyboardConnect = true,
        public bool $collapseBidirectionalEdges = false,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.schema-designer');
    }
}
