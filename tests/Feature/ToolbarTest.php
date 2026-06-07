<?php

use ArtisanFlow\WireFlow\View\Components\Toolbar;

test('Toolbar defaults show to selected', function () {
    $toolbar = new Toolbar;

    expect($toolbar->show)->toBe('selected');
});

test('Toolbar accepts show=always', function () {
    $toolbar = new Toolbar(show: 'always');

    expect($toolbar->show)->toBe('always');
});

test('Toolbar accepts show=selected', function () {
    $toolbar = new Toolbar(show: 'selected');

    expect($toolbar->show)->toBe('selected');
});

test('Toolbar builds correct directive', function () {
    $toolbar = new Toolbar(position: 'bottom', align: 'end');

    expect($toolbar->directive)->toBe('x-flow-node-toolbar:bottom.end');
});

test('Toolbar default directive omits center align', function () {
    $toolbar = new Toolbar;

    expect($toolbar->directive)->toBe('x-flow-node-toolbar:top');
});

test('Toolbar accepts align=start and align=end', function () {
    expect((new Toolbar(align: 'start'))->directive)->toBe('x-flow-node-toolbar:top.start');
    expect((new Toolbar(align: 'end'))->directive)->toBe('x-flow-node-toolbar:top.end');
});

test('Toolbar accepts every valid position', function () {
    foreach (['top', 'bottom', 'left', 'right'] as $position) {
        expect((new Toolbar(position: $position))->position)->toBe($position);
    }
});

test('Toolbar throws on invalid align', function () {
    expect(fn () => new Toolbar(align: 'right'))
        ->toThrow(InvalidArgumentException::class, "Invalid align 'right'");
});

test('Toolbar invalid align error names the valid values', function () {
    expect(fn () => new Toolbar(align: 'right'))
        ->toThrow(InvalidArgumentException::class, 'center, start, end');
});

test('Toolbar throws on invalid position', function () {
    expect(fn () => new Toolbar(position: 'middle'))
        ->toThrow(InvalidArgumentException::class, 'top, bottom, left, right');
});

test('Toolbar throws on invalid show', function () {
    expect(fn () => new Toolbar(show: 'sometimes'))
        ->toThrow(InvalidArgumentException::class, 'selected, always');
});
