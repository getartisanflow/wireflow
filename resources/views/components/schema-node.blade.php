{{--
    Schema node view — emits a root element that AlpineFlow's x-flow-schema
    directive owns at runtime. When $label and $fields are provided, we
    also render an SSR fallback so the node renders server-side.

    The x-flow-schema directive triggers AlpineFlow's render logic; the
    x-flow-node directive is expected to already be bound on the surrounding
    <template x-for> inside <x-flow>, which means the bound `node` variable
    drives the client-side render.
--}}
<div
    x-flow-schema
    class="flow-schema-node"
    {{ $attributes }}
>
    @if($label !== null && $fields !== null)
        {{-- SSR fallback — pre-JS paint + Livewire morph diffs. AlpineFlow
             replaces these on client init. --}}
        <div class="flow-schema-header">{{ $label }}</div>
        <div class="flow-schema-body">
            @foreach($fields as $field)
                @php
                    $classes = ['flow-schema-row'];
                    if (($field['key'] ?? null) === 'primary') $classes[] = 'flow-schema-row--pk';
                    if (($field['key'] ?? null) === 'foreign') $classes[] = 'flow-schema-row--fk';
                    if (! empty($field['required'] ?? null)) $classes[] = 'flow-schema-row--required';
                @endphp
                <div class="{{ implode(' ', $classes) }}" data-flow-schema-field="{{ $field['name'] }}">
                    <div class="flow-handle flow-handle-target flow-schema-handle flow-schema-handle--target"
                         data-flow-handle-id="{{ $field['name'] }}"
                         data-flow-handle-type="target"
                         data-flow-handle-position="left"></div>
                    @if(! empty($field['icon'] ?? null))
                        <span class="flow-schema-row-icon">{{ $field['icon'] }}</span>
                    @endif
                    <span class="flow-schema-row-name">{{ $field['name'] }}</span>
                    <span class="flow-schema-row-type">{{ $field['type'] }}</span>
                    <div class="flow-handle flow-handle-source flow-schema-handle flow-schema-handle--source"
                         data-flow-handle-id="{{ $field['name'] }}"
                         data-flow-handle-type="source"
                         data-flow-handle-position="right"></div>
                </div>
            @endforeach
        </div>
    @endif
</div>
