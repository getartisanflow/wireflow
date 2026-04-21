@php
    $presetConfig = [
        'keyboardConnect' => $keyboardConnect,
        'collapseBidirectionalEdges' => $collapseBidirectionalEdges,
    ];

    $hasNodeInspector = isset($nodeInspector) && $nodeInspector->isNotEmpty();
    $hasRowInspector = isset($rowInspector) && $rowInspector->isNotEmpty();
    $hasEdgeInspector = isset($edgeInspector) && $edgeInspector->isNotEmpty();
@endphp

<div {{ $attributes->class(['flow-schema-designer']) }}>
    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        :default-edge-type="$defaultEdgeType"
        :config="$presetConfig"
    >
        {{ $slot }}

        {{-- Inspector aside lives INSIDE flow-container so it inherits the canvas x-data scope. --}}
        <aside class="flow-schema-designer-inspector">
            <div x-show="selectedNodes?.size > 0" x-transition>
                @if($hasNodeInspector)
                    {{ $nodeInspector }}
                @else
                    <div x-schema-node-inspector>
                        <template x-schema-default-ui></template>
                    </div>
                @endif
            </div>

            <div x-show="selectedRows?.size > 0" x-transition>
                @if($hasRowInspector)
                    {{ $rowInspector }}
                @else
                    <div x-schema-row-inspector>
                        <template x-schema-default-ui></template>
                    </div>
                @endif
            </div>

            <div x-show="selectedEdges?.size > 0" x-transition>
                @if($hasEdgeInspector)
                    {{ $edgeInspector }}
                @else
                    <div x-schema-edge-inspector>
                        <template x-schema-default-ui></template>
                    </div>
                @endif
            </div>
        </aside>
    </x-flow>
</div>
