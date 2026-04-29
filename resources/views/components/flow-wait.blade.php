{{--
    Wait node view — emits a root element that AlpineFlow's x-flow-wait
    directive owns at runtime. When $label and $durationMs are provided, we
    also render an SSR fallback so the node renders server-side.
--}}
<div
    x-flow-wait
    class="flow-wait-node"
    data-flow-wait="true"
    {{ $attributes }}
>
    @if($label !== null && $durationMs !== null)
        {{-- SSR fallback — pre-JS paint + Livewire morph diffs. AlpineFlow
             replaces these on client init. --}}
        <div class="flow-wait-header">
            @if(! empty($icon))
                <span class="flow-wait-icon">{{ $icon }}</span>
            @endif
            <span class="flow-wait-label">{{ $label }}</span>
            <span class="flow-wait-duration">{{ \ArtisanFlow\WireFlow\View\Components\FlowWait::formatDuration($durationMs) }}</span>
        </div>
        <div class="flow-handle flow-handle-target flow-wait-handle flow-wait-handle--target"
             data-flow-handle-id="in"
             data-flow-handle-type="target"
             data-flow-handle-position="top"></div>
        <div class="flow-handle flow-handle-source flow-wait-handle flow-wait-handle--source"
             data-flow-handle-id="out"
             data-flow-handle-type="source"
             data-flow-handle-position="bottom"></div>
    @endif
</div>
