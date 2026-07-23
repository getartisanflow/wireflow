<?php

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;
use Livewire\Livewire;

/**
 * WS5 bridge verification.
 *
 * alpineflow now stamps an `origin` discriminator on its `nodes-change` /
 * `edges-change` events ('drop' | 'paste' | 'api' | 'load'). The wire bridge
 * forwards the whole change detail to the server handler, so `onNodesChange` /
 * `onEdgesChange` receive `$changes['origin']` and can persist only user intent.
 * This pins that server-side contract.
 */
class ChangeOriginBridgeHarness extends Component
{
    /** @var array<int, array<string, mixed>> */
    public array $persisted = [];

    use WithWireFlow;

    /**
     * @param  array{type: string, nodes: array<int, mixed>, origin: string}  $changes
     */
    public function onNodesChange(array $changes): void
    {
        // Only persist changes the user drove directly.
        if (($changes['origin'] ?? null) === 'drop') {
            $this->persisted[] = $changes;
        }
    }

    public function render(): string
    {
        return '<div></div>';
    }
}

test('onNodesChange can filter on the change origin', function () {
    Livewire::test(ChangeOriginBridgeHarness::class)
        // An 'api' change is ignored...
        ->call('onNodesChange', ['type' => 'add', 'nodes' => [['id' => 'a']], 'origin' => 'api'])
        ->assertSet('persisted', [])
        // ...a user 'drop' is persisted.
        ->call('onNodesChange', ['type' => 'add', 'nodes' => [['id' => 'b']], 'origin' => 'drop'])
        ->assertSet('persisted', [
            ['type' => 'add', 'nodes' => [['id' => 'b']], 'origin' => 'drop'],
        ]);
});
