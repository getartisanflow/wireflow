<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-flow-stop-button> — halts an active workflow run. Hidden when the
 * canvas is idle by default; pass :always-visible to render it disabled
 * instead so it can stay in a toolbar layout.
 */
class FlowStopButton extends Component
{
    public function __construct(
        public ?string $target = null,
        public bool $alwaysVisible = false,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.flow-stop-button');
    }
}
