<?php

use Illuminate\Support\Facades\Blade;

it('renders a .flow-schema-row root element', function () {
    $html = Blade::render('<x-schema-field />');
    expect($html)->toContain('class="flow-schema-row"');
});

it('stamps x-flow-row-select with the node.field convention', function () {
    $html = Blade::render('<x-schema-field />');
    expect($html)->toContain('x-flow-row-select="node.id + \'.\' + field.name"');
});

it('stamps :data-flow-schema-field binding to field.name', function () {
    $html = Blade::render('<x-schema-field />');
    expect($html)->toContain(':data-flow-schema-field="field.name"');
});

it('stamps 4 handles per row (target + source + 2 mirrors)', function () {
    $html = Blade::render('<x-schema-field />');
    expect(substr_count($html, 'x-flow-handle:'))->toBe(4);
});

it('stamps real target handle on the left and real source handle on the right', function () {
    $html = Blade::render('<x-schema-field />');
    expect($html)->toContain('x-flow-handle:target.left="field.name"');
    expect($html)->toContain('x-flow-handle:source.right="field.name"');
});

it('stamps mirror handles on the opposite sides for geometry picker', function () {
    $html = Blade::render('<x-schema-field />');
    expect($html)->toContain('x-flow-handle:target.right="field.name"');
    expect($html)->toContain('x-flow-handle:source.left="field.name"');
    expect($html)->toContain('flow-schema-handle--mirror');
});

it('renders default body (icon + name + type) when slot is empty', function () {
    $html = Blade::render('<x-schema-field />');
    expect($html)->toContain('flow-schema-row-icon');
    expect($html)->toContain('flow-schema-row-name');
    expect($html)->toContain('flow-schema-row-type');
});

it('replaces default body with slot content when provided', function () {
    $html = Blade::render(<<<'BLADE'
<x-schema-field>
    <span class="custom-body">CUSTOM</span>
</x-schema-field>
BLADE);
    expect($html)->toContain('custom-body');
    expect($html)->toContain('CUSTOM');
    expect($html)->not->toContain('flow-schema-row-name');
});

it('always stamps handles regardless of slot content', function () {
    $html = Blade::render(<<<'BLADE'
<x-schema-field><span>CUSTOM</span></x-schema-field>
BLADE);
    expect(substr_count($html, 'x-flow-handle:'))->toBe(4);
});

it('forwards class attribute with merge', function () {
    $html = Blade::render('<x-schema-field class="my-custom-row" />');
    expect($html)->toContain('flow-schema-row');
    expect($html)->toContain('my-custom-row');
});

it('forwards other HTML attributes', function () {
    $html = Blade::render('<x-schema-field data-test="t1" />');
    expect($html)->toContain('data-test="t1"');
});

it('uses :class binding for reactive PK/FK/required classes', function () {
    $html = Blade::render('<x-schema-field />');
    // Verify the reactive Alpine :class binding is emitted, not static classes.
    expect($html)->toContain(':class=');
    expect($html)->toContain("'flow-schema-row--pk': field.key === 'primary'");
    expect($html)->toContain("'flow-schema-row--fk': field.key === 'foreign'");
    expect($html)->toContain("'flow-schema-row--required': field.required");
});
