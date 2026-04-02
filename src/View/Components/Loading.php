<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;

class Loading extends Component
{
    public string $directive;

    public function __construct(
        public bool $fade = true,
    ) {
        $this->directive = 'x-flow-loading';
        if ($this->fade) {
            $this->directive .= '.fade';
        }
    }

    public function render()
    {
        return view('wireflow::components.flow-loading');
    }
}
