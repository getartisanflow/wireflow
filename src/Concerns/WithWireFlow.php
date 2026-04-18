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

    /**
     * Append nodes to the server-side $nodes array (if present) and dispatch
     * to the client. Keeps server state in sync with the canvas.
     */
    public function flowAddNodes(array $nodes): void
    {
        if (property_exists($this, 'nodes') && is_array($this->nodes)) {
            $this->nodes = [...$this->nodes, ...$nodes];
        }

        $this->dispatch('flow:addNodes', nodes: $nodes);
    }

    /**
     * Remove nodes by ID from the server-side $nodes array (if present),
     * cascade-remove descendants (children via parentId), and cascade-remove
     * edges touching any removed node. Then dispatch to the client.
     *
     * Mirrors the client-side removeNodes cascade so server and client state
     * stay consistent without manual filtering in the consumer component.
     */
    public function flowRemoveNodes(array $ids): void
    {
        if (property_exists($this, 'nodes') && is_array($this->nodes)) {
            $descendants = $this->collectDescendantIds($ids);
            $allRemoved = array_unique([...$ids, ...$descendants]);
            $removedSet = array_flip($allRemoved);

            $this->nodes = array_values(array_filter(
                $this->nodes,
                fn (array $n) => ! isset($removedSet[$n['id'] ?? null]),
            ));

            if (property_exists($this, 'edges') && is_array($this->edges)) {
                $this->edges = array_values(array_filter(
                    $this->edges,
                    fn (array $e) => ! isset($removedSet[$e['source'] ?? null])
                                  && ! isset($removedSet[$e['target'] ?? null]),
                ));
            }
        }

        $this->dispatch('flow:removeNodes', ids: $ids);
    }

    /**
     * Append edges to the server-side $edges array (if present) and dispatch
     * to the client. Keeps server state in sync with the canvas.
     */
    public function flowAddEdges(array $edges): void
    {
        if (property_exists($this, 'edges') && is_array($this->edges)) {
            $this->edges = [...$this->edges, ...$edges];
        }

        $this->dispatch('flow:addEdges', edges: $edges);
    }

    /**
     * Remove edges by ID from the server-side $edges array (if present) and
     * dispatch to the client. Keeps server state in sync with the canvas.
     */
    public function flowRemoveEdges(array $ids): void
    {
        if (property_exists($this, 'edges') && is_array($this->edges)) {
            $idSet = array_flip($ids);
            $this->edges = array_values(array_filter(
                $this->edges,
                fn (array $e) => ! isset($idSet[$e['id'] ?? null]),
            ));
        }

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

    // ── v0.2.0-alpha additions ──────────────────────────────────────────

    /**
     * Fire a particle along an arbitrary SVG path string (no edge required).
     * Useful for ad-hoc visualizations that don't follow an existing edge.
     */
    public function flowSendParticleAlongPath(string $path, array $options = []): void
    {
        $this->dispatch('flow:sendParticleAlongPath', path: $path, options: $options);
    }

    /**
     * Fire a particle along a straight line between two node centers.
     */
    public function flowSendParticleBetween(string $sourceNodeId, string $targetNodeId, array $options = []): void
    {
        $this->dispatch('flow:sendParticleBetween', source: $sourceNodeId, target: $targetNodeId, options: $options);
    }

    /**
     * Fire a staggered burst of N particles along an edge. Pass `count`,
     * `stagger` (ms between each), and any other ParticleOptions.
     */
    public function flowSendParticleBurst(string $edgeId, array $options): void
    {
        $this->dispatch('flow:sendParticleBurst', edgeId: $edgeId, options: $options);
    }

    /**
     * Fire particles from multiple edges that converge at a target node.
     * Pass `targetNodeId` in options and optionally `synchronize: 'arrival'|'departure'`.
     */
    public function flowSendConverging(array $sourceEdgeIds, array $options): void
    {
        $this->dispatch('flow:sendConverging', sources: $sourceEdgeIds, options: $options);
    }

    /**
     * Cancel animations matching a tag filter. `$filter` accepts
     * ['tag' => 'name'] or ['tags' => ['a', 'b']]. `$options` accepts
     * ['mode' => 'jump-end'|'rollback'|'freeze'].
     */
    public function flowCancelAll(array $filter = [], array $options = []): void
    {
        $this->dispatch('flow:cancelAll', filter: $filter, options: $options);
    }

    /**
     * Pause animations matching a tag filter.
     */
    public function flowPauseAll(array $filter = []): void
    {
        $this->dispatch('flow:pauseAll', filter: $filter);
    }

    /**
     * Resume animations matching a tag filter.
     */
    public function flowResumeAll(array $filter = []): void
    {
        $this->dispatch('flow:resumeAll', filter: $filter);
    }

    // ── RunState (D2) ───────────────────────────────────────────────────

    /**
     * Set runState on one or more nodes. Auto-syncs server-side $nodes.
     *
     * @param  string|array<int, string>  $ids
     */
    public function flowSetNodeState(string|array $ids, string $state): void
    {
        $ids = is_array($ids) ? $ids : [$ids];

        if (property_exists($this, 'nodes') && is_array($this->nodes)) {
            foreach ($this->nodes as &$node) {
                if (in_array($node['id'] ?? null, $ids, true)) {
                    $node['runState'] = $state;
                }
            }
            unset($node);
        }

        $this->dispatch('flow:setNodeState', ids: $ids, state: $state);
    }

    /**
     * Clear all runState values. Auto-syncs server-side $nodes.
     */
    public function flowResetStates(): void
    {
        if (property_exists($this, 'nodes') && is_array($this->nodes)) {
            foreach ($this->nodes as &$node) {
                unset($node['runState']);
            }
            unset($node);
        }

        $this->dispatch('flow:resetStates');
    }

    // ── Workflow Addon ───────────────────────────────────────────────────

    /**
     * Trigger a workflow run via the workflow addon's $flow.run().
     *
     * The client-side workflow addon handles traversal, state transitions,
     * particles, and edge mirroring. Handlers (onEnter, pickBranch, etc.)
     * must be pre-registered on the canvas via x-init — JS callbacks can't
     * be serialized from PHP.
     *
     * @param  array<string, mixed>  $options  Run options: payload, defaultDurationMs, particleOnEdges, particleOptions, muteUntakenBranches, lock, logLimit
     */
    public function flowRun(string $startId, array $options = []): void
    {
        $this->dispatch('flow:run', startId: $startId, options: $options);
    }

    // ── Private Helpers ─────────────────────────────────────────────────

    /**
     * Collect all descendant node IDs (children, grandchildren, …) of the
     * given root IDs by walking the $this->nodes array's parentId references.
     *
     * @param  array<int, string>  $rootIds
     * @return array<int, string>
     */
    private function collectDescendantIds(array $rootIds): array
    {
        if (! property_exists($this, 'nodes') || ! is_array($this->nodes)) {
            return [];
        }

        $allDescendants = [];
        $toVisit = $rootIds;

        while (! empty($toVisit)) {
            $currentId = array_shift($toVisit);

            foreach ($this->nodes as $node) {
                if (($node['parentId'] ?? null) === $currentId) {
                    $childId = $node['id'];

                    if (! in_array($childId, $allDescendants, true)) {
                        $allDescendants[] = $childId;
                        $toVisit[] = $childId;
                    }
                }
            }
        }

        return $allDescendants;
    }
}
