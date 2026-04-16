<?php

use Livewire\Livewire;

require_once __DIR__.'/Fixtures/StateSyncHarness.php';

beforeEach(function () {
    Livewire::component('state-sync-harness', StateSyncHarness::class);
    Livewire::component('state-sync-no-arrays-harness', StateSyncNoArraysHarness::class);
});

it('flowAddNodes appends to server-side $nodes and dispatches', function () {
    Livewire::test(StateSyncHarness::class)
        ->call('addSomeNodes')
        ->assertSet('nodes', [
            ['id' => 'a', 'position' => ['x' => 0, 'y' => 0], 'data' => []],
            ['id' => 'b', 'position' => ['x' => 100, 'y' => 0], 'data' => []],
        ])
        ->assertDispatched('flow:addNodes');
});

it('flowRemoveNodes removes from $nodes and cascades to direct children', function () {
    Livewire::test(StateSyncHarness::class)
        ->call('seedParentChild')
        ->call('removeParent')
        ->assertSet('nodes', [])
        ->assertDispatched('flow:removeNodes', ids: ['p1']);
});

it('flowRemoveNodes recursively removes grandchildren', function () {
    Livewire::test(StateSyncHarness::class)
        ->call('seedGrandchild')
        ->call('removeRoot')
        ->assertSet('nodes', [])
        ->assertDispatched('flow:removeNodes', ids: ['root']);
});

it('flowRemoveNodes cascades to edges touching any removed node', function () {
    Livewire::test(StateSyncHarness::class)
        ->call('seedEdgeCascade')
        ->call('removeN2')
        // n1 and n3 remain; n2 and both edges touching n2 are removed
        ->assertSet('nodes', [
            ['id' => 'n1', 'position' => ['x' => 0, 'y' => 0], 'data' => []],
            ['id' => 'n3', 'position' => ['x' => 200, 'y' => 0], 'data' => []],
        ])
        ->assertSet('edges', [])
        ->assertDispatched('flow:removeNodes', ids: ['n2']);
});

it('flowAddEdges appends to $edges and dispatches', function () {
    Livewire::test(StateSyncHarness::class)
        ->call('addSomeEdges')
        ->assertSet('edges', [
            ['id' => 'e1', 'source' => 'a', 'target' => 'b'],
        ])
        ->assertDispatched('flow:addEdges');
});

it('flowRemoveEdges removes matching ids from $edges and dispatches', function () {
    Livewire::test(StateSyncHarness::class)
        ->call('removeSomeEdges')
        ->assertSet('edges', [
            ['id' => 'e2', 'source' => 'b', 'target' => 'c'],
        ])
        ->assertDispatched('flow:removeEdges', ids: ['e1']);
});

it('gracefully handles components without $nodes/$edges — just dispatches', function () {
    Livewire::test(StateSyncNoArraysHarness::class)
        ->call('callAddNodes')
        ->assertDispatched('flow:addNodes');

    Livewire::test(StateSyncNoArraysHarness::class)
        ->call('callRemoveNodes')
        ->assertDispatched('flow:removeNodes');

    Livewire::test(StateSyncNoArraysHarness::class)
        ->call('callAddEdges')
        ->assertDispatched('flow:addEdges');

    Livewire::test(StateSyncNoArraysHarness::class)
        ->call('callRemoveEdges')
        ->assertDispatched('flow:removeEdges');
});
