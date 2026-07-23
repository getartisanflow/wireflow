<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;

class Action extends Component
{
    public string $directive;

    /**
     * @param  string  $type  The action name (e.g. 'fit-view', 'zoom-in').
     * @param  string|null  $target  CSS selector of the canvas to act on when this
     *                               button is placed OUTSIDE the canvas element (a
     *                               toolbar or sidebar). Rendered as `data-flow-target`,
     *                               which alpineflow's shared resolver reads.
     */
    public function __construct(
        public string $type,
        public ?string $target = null,
    ) {
        $this->directive = "x-flow-action:{$this->type}";
    }

    public function render()
    {
        return view('wireflow::components.flow-action');
    }
}
