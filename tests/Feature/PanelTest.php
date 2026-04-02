<?php

use ArtisanFlow\WireFlow\View\Components\Panel;

test('Panel accepts valid positions', function (string $position) {
    $panel = new Panel(position: $position);

    expect($panel->position)->toBe($position);
})->with([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
]);

test('Panel throws on invalid position', function () {
    new Panel(position: 'middle');
})->throws(\InvalidArgumentException::class, "Invalid panel position 'middle'");

test('Panel throws on empty position', function () {
    new Panel(position: '');
})->throws(\InvalidArgumentException::class);

test('Panel defaults to top-left position', function () {
    $panel = new Panel;

    expect($panel->position)->toBe('top-left');
});

test('Panel POSITIONS constant contains all valid positions', function () {
    expect(Panel::POSITIONS)->toBe([
        'top-left', 'top-center', 'top-right',
        'bottom-left', 'bottom-center', 'bottom-right',
    ]);
});
