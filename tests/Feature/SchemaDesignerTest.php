<?php

use Illuminate\Support\Facades\Blade;

it('renders <x-schema-designer> with nodes and edges passed through', function () {
    $html = Blade::render(
        '<x-schema-designer :nodes="$nodes" :edges="$edges" />',
        [
            'nodes' => [
                [
                    'id' => 'user',
                    'position' => ['x' => 0, 'y' => 0],
                    'data' => [
                        'label' => 'User',
                        'fields' => [['name' => 'id', 'type' => 'uuid']],
                    ],
                ],
            ],
            'edges' => [],
        ]
    );

    expect($html)->toContain('flow-schema-designer');
    expect($html)->toContain('flow-schema-designer-inspector');
    expect($html)->toContain('flow-container');
    expect($html)->toContain('x-schema-node-inspector');
    expect($html)->toContain('x-schema-row-inspector');
    expect($html)->toContain('x-schema-edge-inspector');
    // Nodes payload should be serialized into the x-data expression.
    expect($html)->toContain('User');
});

it('defaults to avoidant edge type', function () {
    $html = Blade::render('<x-schema-designer />');

    expect($html)->toContain('avoidant');
    expect($html)->toContain('defaultEdgeType');
});

it('forwards keyboardConnect default (true) into the canvas config', function () {
    $html = Blade::render('<x-schema-designer />');

    expect($html)->toContain('keyboardConnect');
});

it('forwards collapseBidirectionalEdges default (false) into the canvas config', function () {
    $html = Blade::render('<x-schema-designer />');

    expect($html)->toContain('collapseBidirectionalEdges');
});

it('allows overriding keyboard-connect and collapse-bidirectional-edges', function () {
    $html = Blade::render(
        '<x-schema-designer :keyboard-connect="false" :collapse-bidirectional-edges="true" />'
    );

    // Both names still present in the serialized config.
    expect($html)->toContain('keyboardConnect');
    expect($html)->toContain('collapseBidirectionalEdges');
});

it('uses named slot when node inspector is overridden', function () {
    $html = Blade::render(<<<'BLADE'
        <x-schema-designer>
            <x-slot:node-inspector>
                <p class="custom-node-inspector">CUSTOM_NODE</p>
            </x-slot:node-inspector>
        </x-schema-designer>
    BLADE);

    expect($html)->toContain('custom-node-inspector');
    expect($html)->toContain('CUSTOM_NODE');
    // When node slot is overridden, the default node-inspector directive should NOT appear,
    // but the row + edge default directives should still be there.
    expect($html)->not->toContain('x-schema-node-inspector');
    expect($html)->toContain('x-schema-row-inspector');
    expect($html)->toContain('x-schema-edge-inspector');
});

it('uses named slot when row inspector is overridden', function () {
    $html = Blade::render(<<<'BLADE'
        <x-schema-designer>
            <x-slot:row-inspector>
                <p class="custom-row-inspector">CUSTOM_ROW</p>
            </x-slot:row-inspector>
        </x-schema-designer>
    BLADE);

    expect($html)->toContain('custom-row-inspector');
    expect($html)->toContain('CUSTOM_ROW');
    expect($html)->not->toContain('x-schema-row-inspector');
    expect($html)->toContain('x-schema-node-inspector');
    expect($html)->toContain('x-schema-edge-inspector');
});

it('uses named slot when edge inspector is overridden', function () {
    $html = Blade::render(<<<'BLADE'
        <x-schema-designer>
            <x-slot:edge-inspector>
                <p class="custom-edge-inspector">CUSTOM_EDGE</p>
            </x-slot:edge-inspector>
        </x-schema-designer>
    BLADE);

    expect($html)->toContain('custom-edge-inspector');
    expect($html)->toContain('CUSTOM_EDGE');
    expect($html)->not->toContain('x-schema-edge-inspector');
    expect($html)->toContain('x-schema-node-inspector');
    expect($html)->toContain('x-schema-row-inspector');
});

it('defaults all three inspectors when no slots are passed', function () {
    $html = Blade::render('<x-schema-designer />');

    expect($html)->toContain('x-schema-node-inspector');
    expect($html)->toContain('x-schema-row-inspector');
    expect($html)->toContain('x-schema-edge-inspector');
    // The default-UI template should also be stamped for each.
    expect(substr_count($html, 'x-schema-default-ui'))->toBe(3);
});

it('forwards the default slot into the underlying <x-flow>', function () {
    $html = Blade::render(<<<'BLADE'
        <x-schema-designer>
            <div class="my-panel-marker">INSIDE_FLOW</div>
        </x-schema-designer>
    BLADE);

    expect($html)->toContain('my-panel-marker');
    expect($html)->toContain('INSIDE_FLOW');
});

it('passes custom classes through to the root wrapper', function () {
    $html = Blade::render('<x-schema-designer class="custom-wrapper" />');

    expect($html)->toContain('flow-schema-designer');
    expect($html)->toContain('custom-wrapper');
});
