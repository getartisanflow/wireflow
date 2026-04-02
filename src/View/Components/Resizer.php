<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;

class Resizer extends Component
{
    public string $directive;

    public function __construct(
        public ?int $minWidth = null,
        public ?int $minHeight = null,
    ) {
        $config = array_filter([
            'minWidth' => $this->minWidth,
            'minHeight' => $this->minHeight,
        ], fn ($v) => $v !== null);

        $this->directive = ! empty($config) ? json_encode($config) : '';
    }

    public function render()
    {
        return view('wireflow::components.flow-resizer');
    }
}
