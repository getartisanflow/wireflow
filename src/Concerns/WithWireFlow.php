<?php

namespace ArtisanFlow\WireFlow\Concerns;

/**
 * Server-to-client flow commands and event bridge documentation.
 *
 * Every method wraps $this->dispatch('flow:methodName', [...]).
 * You can always call dispatch directly instead.
 *
 * Event method signatures (implement in your component):
 *
 * @method void onConnect(string $source, string $target, ?string $sourceHandle, ?string $targetHandle)
 * @method void onConnectStart(string $source, ?string $sourceHandle)
 * @method void onConnectEnd(?array $connection, ?string $source, ?string $sourceHandle, ?array $position)
 * @method void onNodeClick(string $nodeId, array $node)
 * @method void onNodeDragStart(string $nodeId)
 * @method void onNodeDragEnd(string $nodeId, array $position)
 * @method void onNodeResizeStart(string $nodeId, array $dimensions)
 * @method void onNodeResizeEnd(string $nodeId, array $dimensions)
 * @method void onNodeCollapse(string $nodeId)
 * @method void onNodeExpand(string $nodeId)
 * @method void onNodeReparent(string $nodeId, ?string $newParentId, ?string $oldParentId)
 * @method void onNodeContextMenu(string $nodeId, array $screenPosition)
 * @method void onNodesChange(array $changes)
 * @method void onEdgeClick(string $edgeId)
 * @method void onEdgeContextMenu(string $edgeId, array $screenPosition)
 * @method void onEdgesChange(array $changes)
 * @method void onReconnect(string $oldEdgeId, array $newConnection)
 * @method void onReconnectStart(string $edgeId, string $handleType)
 * @method void onReconnectEnd(string $edgeId, bool $successful)
 * @method void onPaneClick(array $position)
 * @method void onPaneContextMenu(array $position)
 * @method void onViewportChange(array $viewport)
 * @method void onSelectionChange(array $nodes, array $edges)
 * @method void onSelectionContextMenu(array $nodes, array $edges, array $screenPosition)
 * @method void onDrop(array $data)
 * @method void onInit(array $data)
 * @method void onRowSelect(string $nodeId, string $attrId)
 * @method void onRowDeselect(string $nodeId, string $attrId)
 * @method void onRowSelectionChange(array $rows)
 */
trait WithWireFlow
{
    public function flowUpdate(array $targets, array $options = []): void
    {
        $this->dispatch('flow:update', targets: $targets, options: $options);
    }

    public function flowAnimate(array $targets, array $options = []): void
    {
        $this->dispatch('flow:update', targets: $targets, options: array_merge(['duration' => 300], $options));
    }

    public function flowSendParticle(string $edgeId, array $options = []): void
    {
        $this->dispatch('flow:sendParticle', edgeId: $edgeId, options: $options);
    }

    public function flowFollow(string $nodeId, array $options = []): void
    {
        $this->dispatch('flow:follow', nodeId: $nodeId, options: $options);
    }

    public function flowUnfollow(): void
    {
        $this->dispatch('flow:unfollow');
    }

    public function flowFitView(): void
    {
        $this->dispatch('flow:fitView');
    }

    public function flowZoomIn(): void
    {
        $this->dispatch('flow:zoomIn');
    }

    public function flowZoomOut(): void
    {
        $this->dispatch('flow:zoomOut');
    }

    public function flowSetCenter(float $x, float $y, ?float $zoom = null): void
    {
        $this->dispatch('flow:setCenter', x: $x, y: $y, zoom: $zoom);
    }

    public function flowSetViewport(array $viewport): void
    {
        $this->dispatch('flow:setViewport', viewport: $viewport);
    }

    public function flowAddNodes(array $nodes): void
    {
        $this->dispatch('flow:addNodes', nodes: $nodes);
    }

    public function flowRemoveNodes(array $ids): void
    {
        $this->dispatch('flow:removeNodes', ids: $ids);
    }

    public function flowAddEdges(array $edges): void
    {
        $this->dispatch('flow:addEdges', edges: $edges);
    }

    public function flowRemoveEdges(array $ids): void
    {
        $this->dispatch('flow:removeEdges', ids: $ids);
    }

    public function flowUndo(): void
    {
        $this->dispatch('flow:undo');
    }

    public function flowRedo(): void
    {
        $this->dispatch('flow:redo');
    }

    public function flowLayout(array $options = []): void
    {
        $this->dispatch('flow:layout', options: $options);
    }

    public function flowFromObject(array $data): void
    {
        $this->dispatch('flow:fromObject', data: $data);
    }

    public function flowSetLoading(bool $loading): void
    {
        $this->dispatch('flow:setLoading', loading: $loading);
    }

    public function flowClear(): void
    {
        $this->dispatch('flow:clear');
    }

    public function flowToggleInteractive(): void
    {
        $this->dispatch('flow:toggleInteractive');
    }

    public function flowPanBy(float $dx, float $dy): void
    {
        $this->dispatch('flow:panBy', dx: $dx, dy: $dy);
    }

    public function flowFitBounds(array $rect, array $options = []): void
    {
        $this->dispatch('flow:fitBounds', rect: $rect, options: $options);
    }

    public function flowPatchConfig(array $changes): void
    {
        $this->dispatch('flow:patchConfig', changes: $changes);
    }

    public function flowDeselectAll(): void
    {
        $this->dispatch('flow:deselectAll');
    }

    public function flowCollapseNode(string $id): void
    {
        $this->dispatch('flow:collapseNode', id: $id);
    }

    public function flowExpandNode(string $id): void
    {
        $this->dispatch('flow:expandNode', id: $id);
    }

    public function flowToggleNode(string $id): void
    {
        $this->dispatch('flow:toggleNode', id: $id);
    }

    // ── Convenience Methods ─────────────────────────────────────────────

    public function flowMoveNode(string $id, float $x, float $y, ?int $duration = null): void
    {
        $this->dispatch('flow:moveNode', id: $id, x: $x, y: $y, duration: $duration);
    }

    public function flowUpdateNode(string $id, array $changes, ?int $duration = null): void
    {
        $this->dispatch('flow:updateNode', id: $id, changes: $changes, duration: $duration);
    }

    public function flowFocusNode(string $id, ?int $duration = 300, float $padding = 0.5): void
    {
        $this->dispatch('flow:focusNode', id: $id, duration: $duration, padding: $padding);
    }

    public function flowConnect(string $source, string $target, ?int $duration = null, ?string $edgeId = null, array $options = []): void
    {
        $this->dispatch('flow:connect', source: $source, target: $target, duration: $duration, edgeId: $edgeId, options: $options);
    }

    public function flowDisconnect(string $source, string $target, ?int $duration = null): void
    {
        $this->dispatch('flow:disconnect', source: $source, target: $target, duration: $duration);
    }

    public function flowHighlightNode(string $id, string $style = 'info', ?int $duration = 1500): void
    {
        $this->dispatch('flow:highlightNode', id: $id, style: $style, duration: $duration);
    }

    public function flowHighlightPath(array $nodeIds, array $options = []): void
    {
        $this->dispatch('flow:highlightPath', nodeIds: $nodeIds, options: $options);
    }

    public function flowLockNode(string $id): void
    {
        $this->dispatch('flow:lockNode', id: $id);
    }

    public function flowUnlockNode(string $id): void
    {
        $this->dispatch('flow:unlockNode', id: $id);
    }

    public function flowHideNode(string $id): void
    {
        $this->dispatch('flow:hideNode', id: $id);
    }

    public function flowShowNode(string $id): void
    {
        $this->dispatch('flow:showNode', id: $id);
    }

    public function flowSelectNodes(array $ids): void
    {
        $this->dispatch('flow:selectNodes', ids: $ids);
    }

    public function flowSelectEdges(array $ids): void
    {
        $this->dispatch('flow:selectEdges', ids: $ids);
    }
}
