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
 */
class SchemaDesigner extends Component
{
    public function __construct(
        public array $nodes = [],
        public array $edges = [],
        public string $defaultEdgeType = 'avoidant',
        public bool $keyboardConnect = true,
        public bool $collapseBidirectionalEdges = false,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.schema-designer');
    }
}
