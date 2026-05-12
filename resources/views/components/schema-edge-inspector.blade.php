@props(['defaultUi' => true])

<aside
    {{ $attributes->class(['flow-schema-edge-inspector']) }}
    x-schema-edge-inspector
>
    @if($defaultUi && $slot->isEmpty())
        <template x-schema-default-ui></template>
    @else
        {{ $slot }}
    @endif
</aside>
