<?php

use ArtisanFlow\WireFlow\View\Components\FlowExecutionLog;
use Illuminate\View\ComponentAttributeBag;

function renderExecutionLog(array $props = []): string
{
    $component = new FlowExecutionLog(
        source: $props['source'] ?? null,
        target: $props['target'] ?? null,
        filter: $props['filter'] ?? 'all',
        maxEvents: $props['maxEvents'] ?? 500,
    );

    return view('wireflow::components.flow-execution-log', [
        'source' => $component->source,
        'target' => $component->target,
        'filter' => $component->filter,
        'maxEvents' => $component->maxEvents,
        'attributes' => new ComponentAttributeBag,
    ])->render();
}

it('renders the execution log container with header + filter', function () {
    $html = renderExecutionLog();

    expect($html)
        ->toContain('class="flow-execution-log"')
        ->toContain('Execution log')
        ->toContain('flow-execution-log-filter')
        ->toContain('All events')
        ->toContain('Errors only')
        ->toContain('Lifecycle only');
});

it('renders the empty state template', function () {
    $html = renderExecutionLog();

    expect($html)->toContain('No events yet');
});

it('iterates filteredEvents and renders the per-type templates', function () {
    $html = renderExecutionLog();

    expect($html)
        ->toContain('x-for="(event, index) in filteredEvents"')
        ->toContain('flow-execution-log-row')
        ->toContain("event.type === 'node:enter'")
        ->toContain("event.type === 'edge:taken'")
        ->toContain("event.type === 'parallel:fork'")
        ->toContain("event.type === 'run:error'");
});

it('uses ONLY x-text for dynamic field rendering — no x-html anywhere (XSS safety)', function () {
    $html = renderExecutionLog();

    expect($html)
        ->toContain('x-text="event.nodeId"')
        ->not->toContain('x-html');
});

it('forwards :filter prop as initial filter', function () {
    $html = renderExecutionLog(['filter' => 'errors']);

    // Blade @js stringifies as JS literal; the value lands inside the
    // x-data init expression as `initialFilter: 'errors'`.
    expect($html)->toContain("initialFilter: 'errors'");
});

it('forwards :max-events as a numeric literal in the factory config', function () {
    $html = renderExecutionLog(['maxEvents' => 50]);

    expect($html)->toContain('maxEvents: 50');
});

it('forwards :source expression for non-default sources', function () {
    $html = renderExecutionLog(['source' => 'customLog']);

    expect($html)->toContain("sourceExpr: 'customLog'");
});

it('renders the click-to-highlight hook on each row (no x-html)', function () {
    $html = renderExecutionLog();

    expect($html)
        ->toContain('x-on:click="onRowClick(event)"')
        ->not->toContain('innerHTML');
});

it('renders the auto-scroll body hook', function () {
    $html = renderExecutionLog();

    expect($html)
        ->toContain('x-ref="body"')
        ->toContain('x-on:scroll="onUserScroll()"');
});
