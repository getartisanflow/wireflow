<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;

class Collapse extends Component
{
    public string $directive;

    public function __construct(
        public bool $instant = false,
        public bool $all = false,
        public bool $expand = false,
        public bool $children = false,
    ) {
        $this->directive = 'x-flow-collapse';
        if ($this->instant) {
            $this->directive .= '.instant';
        }
        if ($this->all) {
            $this->directive .= '.all';
        }
        if ($this->expand) {
            $this->directive .= '.expand';
        }
        if ($this->children) {
            $this->directive .= '.children';
        }
    }

    public function render()
    {
        return view('wireflow::components.flow-collapse');
    }
}
