<div
    {{ $attributes->merge([$directive => $expression()]) }}
    @if($target) data-flow-target="{{ $target }}" @endif
    @if($show === 'selected') x-show="edge.selected" x-cloak @endif
>
    {{ $slot }}
</div>
