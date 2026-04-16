<?php

use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;

/**
 * Harness with $nodes and $edges as public arrays — the normal case.
 */
class StateSyncHarness extends Component
{
    use WithWireFlow;

    public array $nodes = [];

    public array $edges = [];

    public function render(): string
    {
        return '<div></div>';
    }

    public function addSomeNodes(): void
    {
        $this->flowAddNodes([
            ['id' => 'a', 'position' => ['x' => 0, 'y' => 0], 'data' => []],
            ['id' => 'b', 'position' => ['x' => 100, 'y' => 0], 'data' => []],
        ]);
    }

    public function seedParentChild(): void
    {
        // parent p1 with children c1 and c2
        $this->nodes = [
            ['id' => 'p1', 'position' => ['x' => 0, 'y' => 0], 'data' => []],
            ['id' => 'c1', 'position' => ['x' => 10, 'y' => 10], 'data' => [], 'parentId' => 'p1'],
            ['id' => 'c2', 'position' => ['x' => 20, 'y' => 20], 'data' => [], 'parentId' => 'p1'],
        ];
    }

    public function seedGrandchild(): void
    {
        // parent → child → grandchild
        $this->nodes = [
            ['id' => 'root', 'position' => ['x' => 0, 'y' => 0], 'data' => []],
            ['id' => 'child', 'position' => ['x' => 10, 'y' => 10], 'data' => [], 'parentId' => 'root'],
            ['id' => 'grand', 'position' => ['x' => 20, 'y' => 20], 'data' => [], 'parentId' => 'child'],
        ];
    }

    public function seedEdgeCascade(): void
    {
        $this->nodes = [
            ['id' => 'n1', 'position' => ['x' => 0, 'y' => 0], 'data' => []],
            ['id' => 'n2', 'position' => ['x' => 100, 'y' => 0], 'data' => []],
            ['id' => 'n3', 'position' => ['x' => 200, 'y' => 0], 'data' => []],
        ];
        $this->edges = [
            ['id' => 'e1', 'source' => 'n1', 'target' => 'n2'],
            ['id' => 'e2', 'source' => 'n2', 'target' => 'n3'],
        ];
    }

    public function removeParent(): void
    {
        $this->flowRemoveNodes(['p1']);
    }

    public function removeRoot(): void
    {
        $this->flowRemoveNodes(['root']);
    }

    public function removeN2(): void
    {
        $this->flowRemoveNodes(['n2']);
    }

    public function addSomeEdges(): void
    {
        $this->flowAddEdges([
            ['id' => 'e1', 'source' => 'a', 'target' => 'b'],
        ]);
    }

    public function removeSomeEdges(): void
    {
        $this->edges = [
            ['id' => 'e1', 'source' => 'a', 'target' => 'b'],
            ['id' => 'e2', 'source' => 'b', 'target' => 'c'],
        ];
        $this->flowRemoveEdges(['e1']);
    }
}

/**
 * Harness without $nodes/$edges properties — graceful fallback case.
 */
class StateSyncNoArraysHarness extends Component
{
    use WithWireFlow;

    public function render(): string
    {
        return '<div></div>';
    }

    public function callAddNodes(): void
    {
        $this->flowAddNodes([['id' => 'x', 'position' => ['x' => 0, 'y' => 0], 'data' => []]]);
    }

    public function callRemoveNodes(): void
    {
        $this->flowRemoveNodes(['x']);
    }

    public function callAddEdges(): void
    {
        $this->flowAddEdges([['id' => 'e1', 'source' => 'a', 'target' => 'b']]);
    }

    public function callRemoveEdges(): void
    {
        $this->flowRemoveEdges(['e1']);
    }
}
