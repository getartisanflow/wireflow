<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;

class Panel extends Component
{
    public const POSITIONS = [
        'top-left', 'top-center', 'top-right',
        'bottom-left', 'bottom-center', 'bottom-right',
    ];

    public string $directive;

    public function __construct(
        public string $position = 'top-left',
        public bool $resizable = false,
    ) {
        if (! in_array($this->position, self::POSITIONS)) {
            throw new \InvalidArgumentException(
                "Invalid panel position '{$this->position}'. Valid: ".implode(', ', self::POSITIONS)
            );
        }

        $this->directive = "x-flow-panel:{$this->position}";
        if (! $this->resizable) {
            $this->directive .= '.static';
        }
    }

    public function render()
    {
        return view('wireflow::components.flow-panel');
    }
}
