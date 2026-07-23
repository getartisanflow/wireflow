<button
    {{ $attributes->merge([$directive => '']) }}
    @if($target) data-flow-target="{{ $target }}" @endif
>
    {{ $slot }}
</button>
