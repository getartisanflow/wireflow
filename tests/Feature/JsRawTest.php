<?php

use ArtisanFlow\WireFlow\JsRaw;
use ArtisanFlow\WireFlow\View\Components\WireFlow;

test('JsRaw stores expression and converts to string', function () {
    $raw = new JsRaw('function(x) { return x; }');

    expect($raw->expression)->toBe('function(x) { return x; }');
    expect((string) $raw)->toBe('function(x) { return x; }');
});

test('WireFlow::js() creates a JsRaw instance', function () {
    $raw = WireFlow::js('function(x) { return x; }');

    expect($raw)->toBeInstanceOf(JsRaw::class);
    expect($raw->expression)->toBe('function(x) { return x; }');
});

test('xData outputs JsRaw values as raw JS expressions', function () {
    $component = new WireFlow(
        nodes: [['id' => 'n1', 'position' => ['x' => 0, 'y' => 0], 'data' => []]],
        config: [
            'isValidConnection' => new JsRaw('function(conn) { return conn.source !== conn.target; }'),
        ],
    );
    $component->withAttributes([]);

    $xData = $component->xData(false);

    // The function should appear as raw JS, not as a JSON string
    expect($xData)->toContain('function(conn) { return conn.source !== conn.target; }');
    // It should NOT be wrapped in quotes
    expect($xData)->not->toContain('"function(conn)');
});

test('xData handles multiple JsRaw values', function () {
    $component = new WireFlow(
        nodes: [],
        config: [
            'isValidConnection' => new JsRaw('function(c) { return true; }'),
            'onNodeClick' => new JsRaw('function(node) { console.log(node); }'),
        ],
    );
    $component->withAttributes([]);

    $xData = $component->xData(false);

    expect($xData)->toContain('function(c) { return true; }');
    expect($xData)->toContain('function(node) { console.log(node); }');
});

test('xData handles nested JsRaw values', function () {
    $component = new WireFlow(
        nodes: [],
        config: [
            'callbacks' => [
                'validate' => new JsRaw('function(x) { return x > 0; }'),
            ],
        ],
    );
    $component->withAttributes([]);

    $xData = $component->xData(false);

    // Output is HTML-encoded for safe attribute embedding (browser decodes before Alpine evaluates)
    expect($xData)->toContain('function(x) { return x &gt; 0; }');
    expect($xData)->not->toContain('&quot;function(x)');
});

test('xData with sync mode handles JsRaw values', function () {
    $component = new WireFlow(
        nodes: [],
        sync: true,
        config: [
            'isValidConnection' => new JsRaw('function(conn) { return true; }'),
        ],
    );
    $component->withAttributes([]);

    $xData = $component->xData(false);

    expect($xData)->toContain('function(conn) { return true; }');
    expect($xData)->toContain('entangle');
    expect($xData)->not->toContain('"function(conn)');
});

test('xData without JsRaw values works as before', function () {
    $component = new WireFlow(
        nodes: [['id' => 'n1', 'position' => ['x' => 0, 'y' => 0], 'data' => []]],
        config: ['customOption' => 'string-value'],
    );
    $component->withAttributes([]);

    $xData = $component->xData(false);

    expect($xData)->toContain('customOption');
    expect($xData)->toContain('string-value');
});
