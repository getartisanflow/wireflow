<button
    type="button"
    class="flow-reset-button"
    x-data="flowResetButton({ target: @js($target) })"
    x-init="init()"
    x-on:click="onClick()"
    {{ $attributes }}
>
    @if(! $slot->isEmpty()){{ $slot }}@else Reset @endif
</button>
