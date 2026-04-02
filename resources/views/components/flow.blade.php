@php
    $hasDefaultSlot = isset($node) && $node->isNotEmpty();
@endphp

<div
    x-data="{!! $xData($hasDefaultSlot) !!}"
    class="flow-container"
    {{ $attributes }}
>
    {{-- Default node template --}}
    @if($hasDefaultSlot)
        <template id="wireflow-node-default">
            {{ $node }}
        </template>
    @endif

    {{-- Custom node type templates --}}
    @foreach($nodeTypes as $type => $component)
        <template id="wireflow-node-{{ $type }}">
            <x-dynamic-component :component="$component" />
        </template>
    @endforeach

    <div x-flow-viewport>
        <template x-for="node in nodes" :key="node.id">
            <div x-flow-node="node"></div>
        </template>
    </div>

    {{-- Slot for panels and other content --}}
    {{ $slot }}
</div>
