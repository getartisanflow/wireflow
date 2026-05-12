<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-flow-schema-node> — WireFlow wrapper around AlpineFlow's x-flow-schema
 * directive. Used inside an <x-flow> component's :node slot or nodeTypes map
 * to render database-schema-style nodes.
 *
 * When used outside an <x-flow> (e.g. for standalone previews), pass explicit
 * label + fields props; the component renders a server-side HTML fallback so
 * the node looks right before JS initializes.
 */
class SchemaNode extends Component
{
    public function __construct(
        /** Optional — only used for SSR fallback when rendered outside <x-flow>. */
        public ?string $label = null,

        /**
         * Optional — only used for SSR fallback.
         *
         * @var array<int, array{name: string, type: string, key?: string, required?: bool, icon?: string}>|null
         */
        public ?array $fields = null,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.schema-node');
    }
}
