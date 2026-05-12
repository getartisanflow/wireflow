<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-schema-node-inspector> — Blade wrapper around AlpineFlow's
 * x-schema-node-inspector directive. Renders an <aside> mount point whose
 * contents are driven by the currently selected schema node.
 *
 * When the slot is empty and $defaultUi is true (default), the component
 * stamps the addon's default-UI template. Passing a slot lets consumers
 * render their own inspector markup bound to the selectedNode.
 */
class SchemaNodeInspector extends Component
{
    public function __construct(
        public bool $defaultUi = true,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.schema-node-inspector');
    }
}
