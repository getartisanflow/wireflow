<button
    type="button"
    class="flow-run-button"
    x-data="flowRunButton({
        startId: @js($startId),
        options: @js($options),
        handlersKey: @js($handlersKey),
        target: @js($target),
    })"
    x-init="init()"
    x-bind:disabled="isRunning"
    x-on:click="onClick()"
    {{ $attributes }}
>
    @if(! $slot->isEmpty())
        {{ $slot }}
    @else
        <span x-show="!isRunning" class="flow-run-button-label">{{ __('wireflow::components.runButton.idle') }}</span>
        <span x-show="isRunning" class="flow-run-button-label flow-run-button-label--running">{{ __('wireflow::components.runButton.running') }}</span>
    @endif
</button>
