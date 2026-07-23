<?php

use ArtisanFlow\WireFlow\View\Components\Action;
use ArtisanFlow\WireFlow\View\Components\EdgeToolbar;
use Illuminate\Support\Facades\Blade;

/**
 * WS2 — out-of-canvas directive targeting.
 *
 * alpineflow's shared canvas resolver reads a `data-flow-target="<selector>"`
 * attribute so flow directives placed OUTSIDE the canvas (a toolbar/sidebar)
 * still find their canvas. These Blade components expose it as a `target` prop,
 * and a raw `data-flow-target` still passes through via attribute merging.
 */
test('Action exposes a target prop rendered as data-flow-target', function () {
    expect((new Action(type: 'fit-view', target: '#er'))->target)->toBe('#er');

    $html = Blade::render('<x-flow-action type="fit-view" target="#er">Fit</x-flow-action>');

    expect($html)
        ->toContain('data-flow-target="#er"')
        ->toContain('x-flow-action:fit-view');
});

test('Action omits data-flow-target when no target is set', function () {
    $html = Blade::render('<x-flow-action type="fit-view">Fit</x-flow-action>');

    expect($html)->not->toContain('data-flow-target');
});

test('a raw data-flow-target attribute still passes through Action', function () {
    $html = Blade::render('<x-flow-action type="zoom-in" data-flow-target="#canvas">+</x-flow-action>');

    expect($html)->toContain('data-flow-target="#canvas"');
});

test('EdgeToolbar exposes a target prop rendered as data-flow-target', function () {
    expect((new EdgeToolbar(target: '#er'))->target)->toBe('#er');

    $html = Blade::render('<x-flow-edge-toolbar target="#er">x</x-flow-edge-toolbar>');

    expect($html)->toContain('data-flow-target="#er"');
});

test('a sidebar action placed outside the canvas targets it by selector', function () {
    // The action button lives in a sidebar, not inside the `#er` canvas element.
    $html = Blade::render(<<<'BLADE'
        <div class="sidebar">
            <x-flow-action type="fit-view" target="#er">Fit view</x-flow-action>
        </div>
    BLADE);

    expect($html)
        ->toContain('class="sidebar"')
        ->toContain('x-flow-action:fit-view')
        ->toContain('data-flow-target="#er"');
});
