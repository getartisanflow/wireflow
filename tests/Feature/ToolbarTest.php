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
    $toolbar = new Toolbar(position: 'bottom', align: 'left');

    expect($toolbar->directive)->toBe('x-flow-node-toolbar:bottom.left');
});

test('Toolbar default directive omits center align', function () {
    $toolbar = new Toolbar;

    expect($toolbar->directive)->toBe('x-flow-node-toolbar:top');
});
