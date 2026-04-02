<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;

class Handle extends Component
{
    public string $directive;

    public function __construct(
        public string $type,
        public string $position = '',
        public string $id = '',
        public bool $hidden = false,
    ) {
        // Build the Alpine directive: x-flow-handle:source, x-flow-handle:target.left, etc.
        $this->directive = "x-flow-handle:{$this->type}";
        if ($this->position) {
            $this->directive .= ".{$this->position}";
        }
    }

    public function render()
    {
        return view('wireflow::components.flow-handle');
    }
}
