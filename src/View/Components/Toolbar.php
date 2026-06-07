<?php

namespace ArtisanFlow\WireFlow\View\Components;

use ArtisanFlow\WireFlow\Concerns\ValidatesEnumProps;
use Illuminate\View\Component;

class Toolbar extends Component
{
    use ValidatesEnumProps;

    public string $directive;

    public function __construct(
        public string $position = 'top',
        public string $align = 'center',
        public int $offset = 10,
        public string $show = 'selected',
    ) {
        self::validateEnum(ToolbarPosition::class, $position, 'position');
        self::validateEnum(ToolbarAlign::class, $align, 'align');
        self::validateEnum(ToolbarShow::class, $show, 'show');

        $this->directive = "x-flow-node-toolbar:{$this->position}";
        if ($this->align !== 'center') {
            $this->directive .= ".{$this->align}";
        }
    }

    public function render()
    {
        return view('wireflow::components.flow-toolbar');
    }
}
