<?php

use ArtisanFlow\WireFlow\View\Components\WireFlow;

test('extractWireEvents extracts @event attributes', function () {
    $component = new WireFlow(
        nodes: [['id' => 'n1', 'position' => ['x' => 0, 'y' => 0], 'data' => []]],
    );
    $component->withAttributes([
        '@connect' => 'onConnect',
        '@node-drag-end' => 'onNodeDragEnd',
        'class' => 'my-flow',
    ]);

    $wireEvents = $component->extractWireEvents();

    expect($wireEvents)->toBe([
        'connect' => 'onConnect',
        'node-drag-end' => 'onNodeDragEnd',
    ]);
});

test('extractWireEvents handles x-on: syntax', function () {
    $component = new WireFlow;
    $component->withAttributes([
        'x-on:connect' => 'onConnect',
        'x-on:edge-click' => 'onEdgeClick',
    ]);

    $wireEvents = $component->extractWireEvents();

    expect($wireEvents)->toBe([
        'connect' => 'onConnect',
        'edge-click' => 'onEdgeClick',
    ]);
});

test('extractWireEvents ignores unknown event attributes', function () {
    $component = new WireFlow;
    $component->withAttributes([
        '@connect' => 'onConnect',
        '@click' => 'handleClick',
        '@mouseover' => 'handleHover',
    ]);

    $wireEvents = $component->extractWireEvents();

    expect($wireEvents)->toBe([
        'connect' => 'onConnect',
    ]);
});

test('extractWireEvents returns empty array when no events', function () {
    $component = new WireFlow;
    $component->withAttributes([
        'class' => 'my-flow',
        'id' => 'main-flow',
    ]);

    $wireEvents = $component->extractWireEvents();

    expect($wireEvents)->toBe([]);
});

test('xData includes wireEvents in config when events are present', function () {
    $component = new WireFlow(
        nodes: [['id' => 'n1', 'position' => ['x' => 0, 'y' => 0], 'data' => []]],
    );
    $component->withAttributes([
        '@connect' => 'onConnect',
    ]);

    $xData = $component->xData(false);

    expect($xData)->toContain('wireEvents');
    expect($xData)->toContain('onConnect');
});

test('xData omits wireEvents when no events declared', function () {
    $component = new WireFlow(
        nodes: [['id' => 'n1', 'position' => ['x' => 0, 'y' => 0], 'data' => []]],
    );
    $component->withAttributes([]);

    $xData = $component->xData(false);

    expect($xData)->not->toContain('wireEvents');
});

test('xData with sync mode includes wireEvents', function () {
    $component = new WireFlow(
        nodes: [['id' => 'n1', 'position' => ['x' => 0, 'y' => 0], 'data' => []]],
        sync: true,
    );
    $component->withAttributes([
        '@connect' => 'onConnect',
    ]);

    $xData = $component->xData(false);

    expect($xData)->toContain('wireEvents');
    expect($xData)->toContain('entangle');
});
