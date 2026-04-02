<div
    {{ $attributes->merge([$directive => $expression()]) }}
    @if($show === 'selected') x-show="edge.selected" x-cloak @endif
>
    {{ $slot }}
</div>
