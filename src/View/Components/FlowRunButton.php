<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-flow-run-button> — workflow run trigger that calls $flow.run() against
 * the surrounding canvas. Reads run handlers from a property on the canvas
 * DOM element (default `runHandlers`, overrideable via :handlers-key) so JS
 * callbacks don't need to be serialized from PHP.
 *
 * Auto-disables while a run is in flight (canvas.runState === running|paused).
 */
class FlowRunButton extends Component
{
    public function __construct(
        /** Required — node ID to start the run from. */
        public string $startId,

        /**
         * Run options forwarded to $flow.run().
         *
         * @var array<string, mixed>
         */
        public array $options = [],

        /** Property name on the canvas DOM element holding the handlers object. */
        public string $handlersKey = 'runHandlers',

        /** Optional canvas selector when used outside the canvas. */
        public ?string $target = null,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.flow-run-button');
    }
}
