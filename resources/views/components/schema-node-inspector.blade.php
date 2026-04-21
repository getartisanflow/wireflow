@props(['defaultUi' => true])

<aside
    {{ $attributes->class(['flow-schema-node-inspector']) }}
    x-schema-node-inspector
>
    @if($defaultUi && $slot->isEmpty())
        <template x-schema-default-ui></template>
    @else
        {{ $slot }}
    @endif
</aside>
