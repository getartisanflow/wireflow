<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;

class ContextMenu extends Component
{
    public string $directive;

    public function __construct(
        public string $scope,
        public int $offsetX = 0,
        public int $offsetY = 0,
    ) {
        $this->directive = "x-flow-context-menu.{$this->scope}";
    }

    /**
     * @return array<string, int>|string
     */
    public function expression(): array|string
    {
        if ($this->offsetX === 0 && $this->offsetY === 0) {
            return '';
        }

        return json_encode([
            'offsetX' => $this->offsetX,
            'offsetY' => $this->offsetY,
        ]);
    }

    public function render()
    {
        return view('wireflow::components.flow-context-menu');
    }
}
