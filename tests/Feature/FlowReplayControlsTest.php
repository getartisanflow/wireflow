<?php

use ArtisanFlow\WireFlow\View\Components\FlowReplayControls;
use Illuminate\View\ComponentAttributeBag;

function renderReplayControls(array $props = []): string
{
    $component = new FlowReplayControls(
        handle: $props['handle'] ?? null,
        target: $props['target'] ?? null,
        speeds: $props['speeds'] ?? [0.5, 1, 2, 4],
    );

    return view('wireflow::components.flow-replay-controls', [
        'handle' => $component->handle,
        'target' => $component->target,
        'speeds' => $component->speeds,
        'attributes' => new ComponentAttributeBag,
    ])->render();
}

it('renders the toolbar root with the controls class and Alpine factory', function () {
    $html = renderReplayControls();

    expect($html)
        ->toContain('class="flow-replay-controls"')
        ->toContain('flowReplayControls(')
        ->toContain('handleExpr: null')
        ->toContain('target: null');
});

it('exposes Play, Restart, and Speed controls', function () {
    $html = renderReplayControls();

    expect($html)
        ->toContain('flow-replay-button--primary')
        ->toContain('Restart')
        ->toContain('flow-replay-speed');
});

it('forwards :speeds prop to the dropdown options', function () {
    $html = renderReplayControls(['speeds' => [1, 2]]);

    expect($html)
        ->toContain('value="1"')
        ->toContain('value="2"')
        ->not->toContain('value="4"');
});

it('forwards :target attribute through Alpine config', function () {
    $html = renderReplayControls(['target' => '#mycanvas']);

    // Blade's @js directive HTML-escapes embedded strings — `'#mycanvas'`
    // becomes `\'#mycanvas\'` in the rendered attribute value. Match the raw
    // identifier instead so the test is robust to escape style.
    expect($html)->toContain('#mycanvas');
});

it('renders progress bar markup gated on canScrub being false', function () {
    $html = renderReplayControls();

    expect($html)
        ->toContain('flow-replay-progress')
        ->toContain('x-if="!canScrub"');
});

it('renders scrubber markup gated on canScrub being true', function () {
    $html = renderReplayControls();

    expect($html)
        ->toContain('flow-replay-scrubber')
        ->toContain('x-if="canScrub"');
});

it('renders time readout via formatTime', function () {
    $html = renderReplayControls();

    expect($html)
        ->toContain('flow-replay-time')
        ->toContain('formatTime(currentTimeMs)');
});

it('renders the progress wrap gated on hasPlayableSource', function () {
    $html = renderReplayControls();

    expect($html)->toContain('x-if="hasPlayableSource"');
});
