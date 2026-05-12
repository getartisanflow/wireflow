<?php

use Illuminate\View\ComponentAttributeBag;

it('renders the schema-node component with SSR fallback when props are given', function () {
    $fields = [
        ['name' => 'id', 'type' => 'uuid', 'key' => 'primary'],
        ['name' => 'email', 'type' => 'text', 'required' => true],
        ['name' => 'team_id', 'type' => 'uuid', 'key' => 'foreign'],
    ];

    $html = view('wireflow::components.schema-node', [
        'label' => 'User',
        'fields' => $fields,
        'attributes' => new ComponentAttributeBag,
    ])->render();

    expect($html)->toContain('x-flow-schema');
    expect($html)->toContain('class="flow-schema-node"');
    expect($html)->toContain('<div class="flow-schema-header">User</div>');
    expect($html)->toContain('flow-schema-row--pk');
    expect($html)->toContain('flow-schema-row--required');
    expect($html)->toContain('flow-schema-row--fk');
    expect($html)->toContain('data-flow-handle-id="id"');
    expect($html)->toContain('data-flow-handle-id="email"');
    expect($html)->toContain('data-flow-handle-id="team_id"');
    expect($html)->toContain('data-flow-handle-type="target"');
    expect($html)->toContain('data-flow-handle-type="source"');
});

it('renders the component without SSR fallback when props are omitted', function () {
    $html = view('wireflow::components.schema-node', [
        'label' => null,
        'fields' => null,
        'attributes' => new ComponentAttributeBag,
    ])->render();

    expect($html)->toContain('x-flow-schema');
    expect($html)->not->toContain('flow-schema-header');
    expect($html)->not->toContain('flow-schema-row');
});
