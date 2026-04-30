@props(['defaultUi' => true])

<aside
    {{ $attributes->class(['flow-schema-row-inspector']) }}
    x-schema-row-inspector
>
    @if($defaultUi && $slot->isEmpty())
        <template x-schema-default-ui></template>
    @else
        {{ $slot }}
    @endif
</aside>
