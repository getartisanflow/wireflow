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

/**
 * The emitted x-data as JavaScript rather than as an HTML attribute.
 *
 * `xData()` escapes what it returns, because that string is going into an attribute — so a test
 * that greps it for `=>` or a quoted event name is really testing the escaping. Decoding first
 * lets these read as the code they are about.
 */
function emittedScript(): string
{
    $component = new WireFlow(nodes: [], edges: []);
    $component->withAttributes(['@connect-validate' => 'canConnect']);

    return html_entity_decode($component->xData(false), ENT_QUOTES);
}

it('tells the validator which line is being moved, so a reconnect is not judged against itself', function () {
    // A `Connection` is the right shape for a NEW line and the wrong one for a line being moved:
    // dragging an end asks "may this exist INSTEAD OF that one". A server rule that reasons about
    // the whole graph — cycles, reachability, scopes — sees the old line still in place and refuses
    // the move because of it.
    expect(emittedScript())
        // The note is taken off the event alpineflow already emits…
        ->toContain("addEventListener('flow-reconnect-start'")
        ->toContain('replacing = e.detail?.edge?.id ?? null')
        // …and travels as a fifth argument, after the four that were always there.
        ->toContain('connection.targetHandle ?? null, replacing');
});

it('forgets the line it was moving however the gesture ends', function () {
    // Three events, and `connect-start` among them deliberately: a NEW line drawn after a reconnect
    // that was abandoned must not inherit the id of the line that reconnect was carrying.
    $script = emittedScript();

    foreach (['flow-reconnect-end', 'flow-connect-start', 'flow-connect-end'] as $event) {
        expect($script)->toContain("addEventListener('{$event}', () => { replacing = null; })");
    }
});

it('binds the note to the canvas rather than the document, so two of them cannot share one', function () {
    // `$el` IS the container alpineflow dispatches on, so the listeners are per-canvas and die with
    // it. On `document` a reconnect begun on one canvas would be remembered by every other.
    expect(emittedScript())
        ->toContain('$el.addEventListener')
        ->not->toContain('document.addEventListener');
});

it('still hands over the four arguments a handler was always written against', function () {
    // Backwards compatible by the language: PHP ignores extra positional arguments to a userland
    // method, so a handler with the original four keeps working untouched and may grow a fifth when
    // it wants one.
    expect(emittedScript())->toContain(
        '$wire.call("canConnect", connection.source, connection.target, '
        .'connection.sourceHandle ?? null, connection.targetHandle ?? null, replacing)'
    );
});
