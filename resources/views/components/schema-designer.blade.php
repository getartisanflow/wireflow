@php
    // Merge preset-specific config contributions with user-provided config.
    // User-supplied keys WIN on collisions — so consumers can still disable
    // keyboardConnect or tweak collapseBidirectionalEdges via :config.
    $presetConfig = array_merge([
        'keyboardConnect' => $keyboardConnect,
        'collapseBidirectionalEdges' => $collapseBidirectionalEdges,
    ], $config);

    $hasNodeInspector = isset($nodeInspector) && $nodeInspector->isNotEmpty();
    $hasRowInspector = isset($rowInspector) && $rowInspector->isNotEmpty();
    $hasEdgeInspector = isset($edgeInspector) && $edgeInspector->isNotEmpty();
    $hasNodeSlot = isset($node) && $node->isNotEmpty();

    // Partition attributes: wire event bindings (@event, x-on:event, wire:*)
    // must reach the inner <x-flow> so its extractWireEvents() can bridge
    // them to Livewire. Everything else (class, id, data-*, style) stays
    // on the outer wrapper where it belongs.
    //
    // Blade only rewrites `{{ $attributes }}` in a component tag's attribute
    // position into the bound :attributes prop (see Illuminate\View\Compilers\
    // ComponentTagCompiler::parseAttributeBag). So we keep the variable name
    // `$attributes` for the bag that must ride on <x-flow>, and introduce a
    // separate `$outerBag` for the outer wrapper.
    $wireEventAttrs = collect($attributes->getAttributes())
        ->filter(fn ($_, string $name) => str_starts_with($name, '@')
            || str_starts_with($name, 'wire:')
            || str_starts_with($name, 'x-on:'))
        ->all();
    $outerBag = $attributes->except(array_keys($wireEventAttrs));
    $attributes = new \Illuminate\View\ComponentAttributeBag($wireEventAttrs);
@endphp

<div {{ $outerBag->class(['flow-schema-designer']) }}>
    <x-flow
        :nodes="$nodes"
        :edges="$edges"
        :viewport="$viewport"
        :sync="$sync"
        :listen="$listen"
        :background="$background"
        :minimap="$minimap"
        :controls="$controls"
        :pannable="$pannable"
        :zoomable="$zoomable"
        :fit-view="$fitView"
        :snap="$snap"
        :default-edge-type="$defaultEdgeType"
        :edges-reconnectable="$edgesReconnectable"
        :interactive="$interactive"
        :node-types="$nodeTypes"
        :config="$presetConfig"
        :min-zoom="$minZoom"
        :max-zoom="$maxZoom"
        :prevent-cycles="$preventCycles"
        :color-mode="$colorMode"
        :selection-on-drag="$selectionOnDrag"
        :compute-mode="$computeMode"
        :fit-view-on-init="$fitViewOnInit"
        :history="$history"
        :auto-layout="$autoLayout"
        :background-gap="$backgroundGap"
        :wire-ignore="$wireIgnore"
        {{ $attributes }}
    >
        @if($hasNodeSlot)
            <x-slot:node>{{ $node }}</x-slot:node>
        @endif

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
