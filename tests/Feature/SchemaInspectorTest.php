<?php

use Illuminate\Support\Facades\Blade;

it('renders each inspector with its directive attribute', function (string $tag, string $directive) {
    $html = Blade::render("<x-{$tag} />");
    expect($html)->toContain($directive);
    expect($html)->toContain('<template x-schema-default-ui></template>');
})->with([
    'node' => ['schema-node-inspector', 'x-schema-node-inspector'],
    'row' => ['schema-row-inspector', 'x-schema-row-inspector'],
    'edge' => ['schema-edge-inspector', 'x-schema-edge-inspector'],
]);

it('uses <aside> as the root element for each inspector', function (string $tag) {
    $html = Blade::render("<x-{$tag} />");
    expect($html)->toContain('<aside');
})->with([
    'node' => ['schema-node-inspector'],
    'row' => ['schema-row-inspector'],
    'edge' => ['schema-edge-inspector'],
]);

it('applies the default class for each inspector', function (string $tag, string $class) {
    $html = Blade::render("<x-{$tag} />");
    expect($html)->toContain($class);
})->with([
    'node' => ['schema-node-inspector', 'flow-schema-node-inspector'],
    'row' => ['schema-row-inspector', 'flow-schema-row-inspector'],
    'edge' => ['schema-edge-inspector', 'flow-schema-edge-inspector'],
]);

it('stamps default UI template only when slot is empty', function () {
    $empty = Blade::render('<x-schema-node-inspector />');
    expect($empty)->toContain('<template x-schema-default-ui>');

    $withSlot = Blade::render('<x-schema-node-inspector><p class="custom">CUSTOM</p></x-schema-node-inspector>');
    expect($withSlot)->toContain('<p class="custom">CUSTOM</p>');
    expect($withSlot)->not->toContain('<template x-schema-default-ui>');
});

it('suppresses default UI when defaultUi prop is false', function () {
    $html = Blade::render('<x-schema-node-inspector :default-ui="false" />');
    expect($html)->toContain('x-schema-node-inspector');
    expect($html)->not->toContain('<template x-schema-default-ui>');
});

it('suppresses default UI when defaultUi is false on row inspector', function () {
    $html = Blade::render('<x-schema-row-inspector :default-ui="false" />');
    expect($html)->toContain('x-schema-row-inspector');
    expect($html)->not->toContain('<template x-schema-default-ui>');
});

it('suppresses default UI when defaultUi is false on edge inspector', function () {
    $html = Blade::render('<x-schema-edge-inspector :default-ui="false" />');
    expect($html)->toContain('x-schema-edge-inspector');
    expect($html)->not->toContain('<template x-schema-default-ui>');
});

it('forwards class attribute and merges with default class', function () {
    $html = Blade::render('<x-schema-node-inspector class="sidebar" />');
    expect($html)->toContain('flow-schema-node-inspector');
    expect($html)->toContain('sidebar');
});

it('forwards other HTML attributes', function () {
    $html = Blade::render('<x-schema-node-inspector data-test="t1" />');
    expect($html)->toContain('data-test="t1"');
});

it('renders slot content on each inspector', function (string $tag) {
    $html = Blade::render("<x-{$tag}><h2 class=\"slot-marker\">SLOT</h2></x-{$tag}>");
    expect($html)->toContain('slot-marker');
    expect($html)->toContain('SLOT');
    expect($html)->not->toContain('<template x-schema-default-ui>');
})->with([
    'node' => ['schema-node-inspector'],
    'row' => ['schema-row-inspector'],
    'edge' => ['schema-edge-inspector'],
]);
