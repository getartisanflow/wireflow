<?php

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;
use Livewire\Livewire;

/**
 * Tiny test component that just uses the trait. Each test method calls a
 * `flowX(...)` trait method via Livewire::test and asserts the dispatched
 * event name + args match the wire-bridge contract.
 */
class WithWireFlowTestHarness extends Component
{
    use WithWireFlow;

    public function render(): string
    {
        return '<div></div>';
    }

    // Public wrappers so Livewire::test can call them via ->call()
    public function callSendParticleAlongPath(string $path, array $options): void
    {
        $this->flowSendParticleAlongPath($path, $options);
    }

    public function callSendParticleBetween(string $source, string $target, array $options): void
    {
        $this->flowSendParticleBetween($source, $target, $options);
    }

    public function callSendParticleBurst(string $edgeId, array $options): void
    {
        $this->flowSendParticleBurst($edgeId, $options);
    }

    public function callSendConverging(array $sources, array $options): void
    {
        $this->flowSendConverging($sources, $options);
    }

    public function callCancelAll(array $filter, array $options): void
    {
        $this->flowCancelAll($filter, $options);
    }

    public function callPauseAll(array $filter): void
    {
        $this->flowPauseAll($filter);
    }

    public function callResumeAll(array $filter): void
    {
        $this->flowResumeAll($filter);
    }
}

beforeEach(function () {
    Livewire::component('with-wireflow-harness', WithWireFlowTestHarness::class);
});

test('flowSendParticleAlongPath dispatches the right event + payload', function () {
    Livewire::test(WithWireFlowTestHarness::class)
        ->call('callSendParticleAlongPath', 'M 0 0 L 100 100', ['renderer' => 'beam'])
        ->assertDispatched('flow:sendParticleAlongPath', path: 'M 0 0 L 100 100', options: ['renderer' => 'beam']);
});

test('flowSendParticleBetween carries source, target, options', function () {
    Livewire::test(WithWireFlowTestHarness::class)
        ->call('callSendParticleBetween', 'a', 'b', ['color' => 'red'])
        ->assertDispatched('flow:sendParticleBetween', source: 'a', target: 'b', options: ['color' => 'red']);
});

test('flowSendParticleBurst carries edgeId + options', function () {
    Livewire::test(WithWireFlowTestHarness::class)
        ->call('callSendParticleBurst', 'e1', ['count' => 5, 'stagger' => 100])
        ->assertDispatched('flow:sendParticleBurst', edgeId: 'e1', options: ['count' => 5, 'stagger' => 100]);
});

test('flowSendConverging carries sources array + options', function () {
    Livewire::test(WithWireFlowTestHarness::class)
        ->call('callSendConverging', ['e1', 'e2'], ['targetNodeId' => 'sink'])
        ->assertDispatched('flow:sendConverging', sources: ['e1', 'e2'], options: ['targetNodeId' => 'sink']);
});

test('flowCancelAll carries filter + mode', function () {
    Livewire::test(WithWireFlowTestHarness::class)
        ->call('callCancelAll', ['tag' => 'ambient'], ['mode' => 'rollback'])
        ->assertDispatched('flow:cancelAll', filter: ['tag' => 'ambient'], options: ['mode' => 'rollback']);
});

test('flowPauseAll + flowResumeAll carry filter', function () {
    Livewire::test(WithWireFlowTestHarness::class)
        ->call('callPauseAll', ['tag' => 'ambient'])
        ->assertDispatched('flow:pauseAll', filter: ['tag' => 'ambient']);

    Livewire::test(WithWireFlowTestHarness::class)
        ->call('callResumeAll', ['tags' => ['ambient', 'background']])
        ->assertDispatched('flow:resumeAll', filter: ['tags' => ['ambient', 'background']]);
});
