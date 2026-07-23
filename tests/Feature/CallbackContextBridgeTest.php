<?php

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;
use Livewire\Livewire;

/**
 * WS4 bridge verification.
 *
 * alpineflow now passes the live canvas context as a SECOND argument to its JS
 * config callbacks (onConnect(detail, ctx), onDrop(detail, ctx), …). That
 * context is a client-only object and never crosses to PHP — the documented
 * server-side on* handlers still receive only the serialized event data,
 * forwarded via the `flow-*` DOM events / Livewire. This pins that contract so
 * the JS-side change can't silently alter the server bridge shape.
 */
class CallbackBridgeHarness extends Component
{
    /** @var array<string, ?string>|null */
    public ?array $lastConnection = null;

    use WithWireFlow;

    // A server handler a consumer implements — invoked by the JS bridge with the
    // serialized event data documented on WithWireFlow (never the JS ctx).
    public function onConnect(string $source, string $target, ?string $sourceHandle = null, ?string $targetHandle = null): void
    {
        $this->lastConnection = compact('source', 'target', 'sourceHandle', 'targetHandle');
    }

    public function render(): string
    {
        return '<div></div>';
    }
}

test('server on* handlers receive serialized event data, not the JS canvas context', function () {
    Livewire::test(CallbackBridgeHarness::class)
        ->call('onConnect', 'a', 'b', 'out', 'in')
        ->assertSet('lastConnection', [
            'source' => 'a',
            'target' => 'b',
            'sourceHandle' => 'out',
            'targetHandle' => 'in',
        ]);
});
