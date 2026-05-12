{{--
    Condition node — emits a root element that AlpineFlow's x-flow-condition
    directive owns at runtime. When $label or $condition is provided, an SSR
    fallback paints server-side before JS init (and during Livewire morph
    diffs).
--}}
<div
    x-flow-condition="'{{ $direction ?? 'horizontal' }}'"
    class="flow-condition-node"
    data-flow-condition-direction="{{ $direction ?? 'horizontal' }}"
    {{ $attributes }}
>
    @if($label !== null || $condition !== null)
        <div class="flow-condition-header">{{ $label ?? 'Condition' }}</div>
        <div class="flow-condition-body">{{ $prettyPrintCondition() }}</div>
        <div class="flow-condition-handle-target"
             data-flow-handle-direction="target"
             data-flow-handle-id="in"
             data-flow-handle-type="target"></div>
        <div class="flow-condition-handle-source flow-condition-handle--true"
             data-flow-handle-direction="source"
             data-source-handle="true"
             data-flow-handle-id="true"
             data-flow-handle-type="source"></div>
        <div class="flow-condition-handle-source flow-condition-handle--false"
             data-flow-handle-direction="source"
             data-source-handle="false"
             data-flow-handle-id="false"
             data-flow-handle-type="source"></div>
    @endif
</div>
