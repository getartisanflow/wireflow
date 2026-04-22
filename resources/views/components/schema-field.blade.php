<div
    {{ $attributes->class(['flow-schema-row']) }}
    :class="{
        'flow-schema-row--pk': field.key === 'primary',
        'flow-schema-row--fk': field.key === 'foreign',
        'flow-schema-row--required': field.required,
    }"
    :data-flow-schema-field="field.name"
    x-flow-row-select="node.id + '.' + field.name"
>
    {{-- Target handle (real, left) --}}
    <div
        class="flow-schema-handle flow-schema-handle--target"
        x-flow-handle:target.left="field.name"
    ></div>

    {{-- Row body — consumer slot or default layout --}}
    @if($slot->isEmpty())
        <template x-if="field.icon">
            <span class="flow-schema-row-icon" x-text="field.icon"></span>
        </template>
        <span class="flow-schema-row-name" x-text="field.name"></span>
        <span class="flow-schema-row-type" x-text="field.type"></span>
    @else
        {{ $slot }}
    @endif

    {{-- Source handle (real, right) --}}
    <div
        class="flow-schema-handle flow-schema-handle--source"
        x-flow-handle:source.right="field.name"
    ></div>

    {{-- Mirror handles — invisible, on opposite sides, for geometry picker --}}
    <div
        class="flow-schema-handle flow-schema-handle--target flow-schema-handle--mirror"
        x-flow-handle:target.right="field.name"
    ></div>
    <div
        class="flow-schema-handle flow-schema-handle--source flow-schema-handle--mirror"
        x-flow-handle:source.left="field.name"
    ></div>
</div>
