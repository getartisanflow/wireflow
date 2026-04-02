<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;

class EdgeToolbar extends Component
{
    public string $directive;

    public function __construct(
        public float $position = 0.5,
        public bool $below = false,
        public string $show = 'selected',
    ) {
        $this->directive = 'x-flow-edge-toolbar';
        if ($this->below) {
            $this->directive .= '.below';
        }
    }

    public function expression(): string
    {
        if ($this->position === 0.5) {
            return '';
        }

        return (string) $this->position;
    }

    public function render()
    {
        return view('wireflow::components.flow-edge-toolbar');
    }
}
