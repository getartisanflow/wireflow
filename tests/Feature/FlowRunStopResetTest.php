<?php

use ArtisanFlow\WireFlow\View\Components\FlowResetButton;
use ArtisanFlow\WireFlow\View\Components\FlowRunButton;
use ArtisanFlow\WireFlow\View\Components\FlowStopButton;
use Illuminate\Support\HtmlString;
use Illuminate\View\ComponentAttributeBag;

function renderRunButton(array $props = [], ?HtmlString $slot = null): string
{
    $component = new FlowRunButton(
        startId: $props['startId'] ?? 'trigger',
        options: $props['options'] ?? [],
        handlersKey: $props['handlersKey'] ?? 'runHandlers',
        target: $props['target'] ?? null,
    );

    return view('wireflow::components.flow-run-button', [
        'startId' => $component->startId,
        'options' => $component->options,
        'handlersKey' => $component->handlersKey,
        'target' => $component->target,
        'slot' => $slot ?? new HtmlString(''),
        'attributes' => new ComponentAttributeBag,
    ])->render();
}

function renderStopButton(array $props = [], ?HtmlString $slot = null): string
{
    $component = new FlowStopButton(
        target: $props['target'] ?? null,
        alwaysVisible: $props['alwaysVisible'] ?? false,
    );

    return view('wireflow::components.flow-stop-button', [
        'target' => $component->target,
        'alwaysVisible' => $component->alwaysVisible,
        'slot' => $slot ?? new HtmlString(''),
        'attributes' => new ComponentAttributeBag,
    ])->render();
}

function renderResetButton(array $props = [], ?HtmlString $slot = null): string
{
    $component = new FlowResetButton(
        target: $props['target'] ?? null,
    );

    return view('wireflow::components.flow-reset-button', [
        'target' => $component->target,
        'slot' => $slot ?? new HtmlString(''),
        'attributes' => new ComponentAttributeBag,
    ])->render();
}

describe('<x-flow-run-button>', function () {
    it('renders with default labels and the run-button factory', function () {
        $html = renderRunButton();

        expect($html)
            ->toContain('class="flow-run-button"')
            ->toContain('flowRunButton(')
            ->toContain('Run workflow')
            ->toContain('Running…');
    });

    it('forwards startId, options, and handlersKey through @js', function () {
        $html = renderRunButton([
            'startId' => 'trigger',
            'options' => ['particleOnEdges' => true],
            'handlersKey' => 'myHandlers',
        ]);

        // Blade @js renders arrays as JSON.parse('...') with unicode-escaped
        // quotes. Match the raw key + value substring rather than a literal
        // JS object form so the test is robust to escape style.
        expect($html)
            ->toContain("startId: 'trigger'")
            ->toContain('particleOnEdges')
            ->toContain('true')
            ->toContain("handlersKey: 'myHandlers'");
    });

    it('honors slot override for custom label', function () {
        $html = renderRunButton(slot: new HtmlString('Start onboarding'));
        expect($html)
            ->toContain('Start onboarding')
            ->not->toContain('Run workflow');
    });

    it('forwards target for page-level placement', function () {
        $html = renderRunButton(['target' => '#mycanvas']);
        expect($html)->toContain('#mycanvas');
    });
});

describe('<x-flow-stop-button>', function () {
    it('renders with default Stop label and the stop-button factory', function () {
        $html = renderStopButton();

        expect($html)
            ->toContain('class="flow-stop-button"')
            ->toContain('flowStopButton(')
            ->toContain('Stop');
    });

    it('honors alwaysVisible flag in the factory config', function () {
        $html = renderStopButton(['alwaysVisible' => true]);
        expect($html)->toContain('alwaysVisible: true');
    });

    it('honors slot override', function () {
        $html = renderStopButton(slot: new HtmlString('Halt'));
        expect($html)
            ->toContain('Halt')
            ->not->toContain(' Stop ');
    });
});

describe('<x-flow-reset-button>', function () {
    it('renders with default Reset label and the reset-button factory', function () {
        $html = renderResetButton();

        expect($html)
            ->toContain('class="flow-reset-button"')
            ->toContain('flowResetButton(')
            ->toContain('Reset');
    });

    it('honors slot override', function () {
        $html = renderResetButton(slot: new HtmlString('Clear'));
        expect($html)
            ->toContain('Clear')
            ->not->toContain(' Reset ');
    });

    it('forwards target for page-level placement', function () {
        $html = renderResetButton(['target' => '#mycanvas']);
        expect($html)->toContain('#mycanvas');
    });
});
