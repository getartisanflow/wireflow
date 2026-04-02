<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;

class Action extends Component
{
    public string $directive;

    public function __construct(
        public string $type,
    ) {
        $this->directive = "x-flow-action:{$this->type}";
    }

    public function render()
    {
        return view('wireflow::components.flow-action');
    }
}
