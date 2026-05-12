<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-schema-row-inspector> — Blade wrapper around AlpineFlow's
 * x-schema-row-inspector directive. Renders an <aside> mount point whose
 * contents are driven by the currently selected schema row (field).
 *
 * When the slot is empty and $defaultUi is true (default), the component
 * stamps the addon's default-UI template. Passing a slot lets consumers
 * render their own inspector markup bound to the selectedRow.
 */
class SchemaRowInspector extends Component
{
    public function __construct(
        public bool $defaultUi = true,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.schema-row-inspector');
    }
}
