<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-schema-edge-inspector> — Blade wrapper around AlpineFlow's
 * x-schema-edge-inspector directive. Renders an <aside> mount point whose
 * contents are driven by the currently selected schema edge (relationship).
 *
 * When the slot is empty and $defaultUi is true (default), the component
 * stamps the addon's default-UI template. Passing a slot lets consumers
 * render their own inspector markup bound to the selectedEdge.
 */
class SchemaEdgeInspector extends Component
{
    public function __construct(
        public bool $defaultUi = true,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.schema-edge-inspector');
    }
}
