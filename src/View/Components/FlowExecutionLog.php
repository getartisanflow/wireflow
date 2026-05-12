<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-flow-execution-log> — dense reactive event viewer for the workflow
 * addon's execution log. Renders structured per-type templates with x-text
 * bindings on every dynamic field — never x-html with built strings — so
 * consumer-supplied node IDs, edge IDs, and error messages can never inject
 * HTML.
 */
class FlowExecutionLog extends Component
{
    public function __construct(
        /** Optional Alpine expression for the source array (defaults to $flow.executionLog). */
        public ?string $source = null,

        /** Optional canvas selector for page-level placement. */
        public ?string $target = null,

        /** Initial filter: 'all' (default) | 'errors' | 'lifecycle'. */
        public string $filter = 'all',

        /** Max events to render at once (FIFO display window). */
        public int $maxEvents = 500,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.flow-execution-log');
    }
}
