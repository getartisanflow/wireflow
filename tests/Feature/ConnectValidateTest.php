<?php

use ArtisanFlow\WireFlow\View\Components\WireFlow;

it('extracts @connect-validate as a known wire event', function () {
    $component = new WireFlow;
    $component->withAttributes([
        '@connect-validate' => 'canConnect',
    ]);

    $events = $component->extractWireEvents();

    expect($events)->toHaveKey('connect-validate');
    expect($events['connect-validate'])->toBe('canConnect');
});

it('extracts x-on:connect-validate as a known wire event', function () {
    $component = new WireFlow;
    $component->withAttributes([
        'x-on:connect-validate' => 'canConnect',
    ]);

    $events = $component->extractWireEvents();

    expect($events)->toHaveKey('connect-validate');
    expect($events['connect-validate'])->toBe('canConnect');
});

it('connect-validate renders the connectValidator wrapper in x-data', function () {
    $component = new WireFlow(nodes: [], edges: []);
    $component->withAttributes(['@connect-validate' => 'canConnect']);

    $xData = $component->xData(false);

    // The method name + validator wiring must appear in the emitted x-data.
    expect($xData)->toContain('canConnect');
    expect($xData)->toContain('connectValidator');
    // connect-validate must NOT flow into wireEvents (would install a dead
    // onConnectValidate callback + risk fire-and-forget dispatch).
    expect($xData)->not->toContain('connect-validate');
    // $wire.call(...) is how the async server roundtrip happens.
    expect($xData)->toContain('$wire.call');
    // Toast dispatch on rejection-with-reason should be present.
    expect($xData)->toContain('flux-toast');
});
