<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-flow-reset-button> — clears node runState and the execution log,
 * returning the canvas to a clean pre-run state.
 */
class FlowResetButton extends Component
{
    public function __construct(
        public ?string $target = null,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.flow-reset-button');
    }
}
