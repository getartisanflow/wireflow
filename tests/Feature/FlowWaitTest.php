<?php

use ArtisanFlow\WireFlow\View\Components\FlowWait;
use Illuminate\View\ComponentAttributeBag;

it('renders the flow-wait component without SSR fallback when props are omitted', function () {
    $html = view('wireflow::components.flow-wait', [
        'label' => null,
        'durationMs' => null,
        'icon' => null,
        'attributes' => new ComponentAttributeBag,
    ])->render();

    expect($html)->toContain('x-flow-wait');
    expect($html)->toContain('class="flow-wait-node"');
    expect($html)->toContain('data-flow-wait="true"');
    expect($html)->not->toContain('flow-wait-header');
    expect($html)->not->toContain('flow-wait-label');
    expect($html)->not->toContain('flow-wait-handle');
});

it('renders the SSR fallback header + handles when label and durationMs are provided', function () {
    $html = view('wireflow::components.flow-wait', [
        'label' => 'Cooldown',
        'durationMs' => 2000,
        'icon' => null,
        'attributes' => new ComponentAttributeBag,
    ])->render();

    expect($html)->toContain('x-flow-wait');
    expect($html)->toContain('flow-wait-header');
    expect($html)->toContain('<span class="flow-wait-label">Cooldown</span>');
    expect($html)->toContain('<span class="flow-wait-duration">2s</span>');
    expect($html)->toContain('data-flow-handle-id="in"');
    expect($html)->toContain('data-flow-handle-id="out"');
    expect($html)->toContain('data-flow-handle-position="top"');
    expect($html)->toContain('data-flow-handle-position="bottom"');
});

it('renders an icon span when provided in the SSR fallback', function () {
    $html = view('wireflow::components.flow-wait', [
        'label' => 'Wait',
        'durationMs' => 500,
        'icon' => '⏱',
        'attributes' => new ComponentAttributeBag,
    ])->render();

    expect($html)->toContain('<span class="flow-wait-icon">⏱</span>');
});

it('omits the icon span when icon is empty', function () {
    $html = view('wireflow::components.flow-wait', [
        'label' => 'Wait',
        'durationMs' => 500,
        'icon' => null,
        'attributes' => new ComponentAttributeBag,
    ])->render();

    expect($html)->not->toContain('flow-wait-icon');
});

describe('FlowWait::formatDuration', function () {
    it('formats sub-second durations as ms', function () {
        expect(FlowWait::formatDuration(500))->toBe('500ms');
    });

    it('formats fractional-second durations with one decimal', function () {
        expect(FlowWait::formatDuration(2500))->toBe('2.5s');
    });

    it('formats whole-second durations without decimals', function () {
        expect(FlowWait::formatDuration(3000))->toBe('3s');
    });

    it('formats minute-scale durations as "Nm Ns"', function () {
        expect(FlowWait::formatDuration(90000))->toBe('1m 30s');
    });

    it('formats whole-minute durations without trailing seconds', function () {
        expect(FlowWait::formatDuration(120000))->toBe('2m');
    });
});
