<?php

use ArtisanFlow\WireFlow\View\Components\EdgeToolbar;

test('EdgeToolbar defaults show to selected', function () {
    expect((new EdgeToolbar)->show)->toBe('selected');
});

test('EdgeToolbar accepts show=always', function () {
    expect((new EdgeToolbar(show: 'always'))->show)->toBe('always');
});

test('EdgeToolbar throws on invalid show', function () {
    expect(fn () => new EdgeToolbar(show: 'sometimes'))
        ->toThrow(InvalidArgumentException::class, 'selected, always');
});
