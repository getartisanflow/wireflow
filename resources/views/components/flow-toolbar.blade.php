<div
    {{ $attributes->merge([$directive => '']) }}
    @if($offset !== 10) data-flow-offset="{{ $offset }}" @endif
    @if($show === 'selected') x-show="node.selected" x-cloak @endif
>
    {{ $slot }}
</div>
