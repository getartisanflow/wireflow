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

it('forwards @connect-validate attribute to the inner <x-flow> where it becomes a wireEvent', function () {
    $html = Blade::render('<x-schema-designer @connect-validate="myValidator" />');

    // The attribute must NOT end up on the outer <div class="flow-schema-designer"> wrapper.
    // (If it did, the wireflow event bridge would never see it.)
    expect($html)->not->toMatch('/<div[^>]*flow-schema-designer[^>]*@connect-validate/');

    // It should be consumed by <x-flow>'s extractWireEvents(), which promotes it
    // into the flowCanvas config as a connectValidator callback that calls
    // $wire.call('myValidator', ...). So the method name should appear in the
    // serialized x-data expression.
    expect($html)->toContain('myValidator');
    expect($html)->toContain('connectValidator');
});

it('forwards multiple wire event attributes to the inner <x-flow>', function () {
    $html = Blade::render('<x-schema-designer @node-click="onClick" @connect="onConnect" />');

    // Outer wrapper must not carry the event attributes.
    expect($html)->not->toMatch('/<div[^>]*flow-schema-designer[^>]*@node-click/');
    expect($html)->not->toMatch('/<div[^>]*flow-schema-designer[^>]*@connect=/');

    // <x-flow>'s extractWireEvents bridges them into the wireEvents map,
    // so both method names appear inside the serialized canvas config.
    expect($html)->toContain('onClick');
    expect($html)->toContain('onConnect');
    expect($html)->toContain('wireEvents');
});

it('forwards x-on: prefixed event attributes to the inner <x-flow>', function () {
    $html = Blade::render('<x-schema-designer x-on:node-click="xOnHandler" />');

    expect($html)->not->toMatch('/<div[^>]*flow-schema-designer[^>]*x-on:node-click/');
    expect($html)->toContain('xOnHandler');
    expect($html)->toContain('wireEvents');
});

it('forwards wire: prefixed attributes to the inner <x-flow>', function () {
    $html = Blade::render('<x-schema-designer wire:key="my-designer-key" />');

    // wire:key should ride along on the inner flow-container, not on the outer wrapper.
    expect($html)->not->toMatch('/<div[^>]*flow-schema-designer[^>]*wire:key/');
    expect($html)->toContain('wire:key="my-designer-key"');
});

it('keeps class, id, data-*, and style on the outer wrapper', function () {
    $html = Blade::render(
        '<x-schema-designer class="my-designer" id="designer-1" data-testid="t1" style="color:red" />'
    );

    // The outer <div class="... flow-schema-designer ..."> should carry each of these.
    expect($html)->toMatch('/<div[^>]*flow-schema-designer[^>]*my-designer/');
    expect($html)->toMatch('/<div[^>]*flow-schema-designer[^>]*id="designer-1"/');
    expect($html)->toMatch('/<div[^>]*flow-schema-designer[^>]*data-testid="t1"/');
    expect($html)->toMatch('/<div[^>]*flow-schema-designer[^>]*style="color:red/');
});
