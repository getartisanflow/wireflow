<button
    type="button"
    class="flow-stop-button"
    x-data="flowStopButton({
        target: @js($target),
        alwaysVisible: {{ $alwaysVisible ? 'true' : 'false' }},
    })"
    x-init="init()"
    x-show="alwaysVisible || isRunning"
    x-bind:disabled="!isRunning"
    x-on:click="onClick()"
    {{ $attributes }}
>
    @if(! $slot->isEmpty()){{ $slot }}@else Stop @endif
</button>
