<?php

namespace ArtisanFlow\WireFlow\Concerns;

use Illuminate\Support\Facades\Validator;

/**
 * Server-side mirror of the @getartisanflow/alpineflow/schema addon's field CRUD.
 *
 * Livewire component `use`s this trait and gets addField / renameField /
 * removeField / removeNode methods that mutate $this->nodes and
 * $this->edges with cascade, validate via PHP rules, and dispatch
 * flow:update / flow:fromObject so the client canvas stays in sync.
 *
 * Requires the component to declare:
 *   public array $nodes = [];
 *   public array $edges = [];
 * and should be used alongside `WithWireFlow`.
 */
trait WithSchemaDesigner
{
    /**
     * Append a field to a node. Silently no-ops on duplicate name or invalid name.
     *
     * @param  array{name: string, type: string}  $field  Additional keys (key, required, icon) pass through.
     * @return array{applied: bool, reason?: string}
     */
    public function addField(string $nodeId, array $field): array
    {
        // TODO: switch to SchemaFieldName rule (Task 20)
        $validator = Validator::make(
            ['name' => $field['name'] ?? ''],
            ['name' => ['required', 'string', 'max:40', 'regex:/^[a-z][a-z0-9_]*$/']],
        );
        if ($validator->fails()) {
            return ['applied' => false, 'reason' => 'invalid-name'];
        }

        $nodeIndex = $this->findNodeIndex($nodeId);
        if ($nodeIndex === null) {
            return ['applied' => false, 'reason' => 'no-node'];
        }

        $fields = $this->nodes[$nodeIndex]['data']['fields'] ?? [];
        foreach ($fields as $existing) {
            if (($existing['name'] ?? null) === $field['name']) {
                return ['applied' => false, 'reason' => 'duplicate'];
            }
        }

        $fields[] = $field;
        $this->nodes[$nodeIndex]['data']['fields'] = $fields;

        $this->dispatch('flow:update', targets: [
            'nodes' => [
                $nodeId => ['data' => ['fields' => $fields]],
            ],
        ]);

        return ['applied' => true];
    }

    /**
     * Rename a field on a node and rewrite all edges that reference the old
     * handle name on that node. Fails silently for invalid names, duplicates,
     * or missing nodes/fields.
     *
     * @return array{applied: bool, reason?: string, cascadedEdgeIds?: array<int, string>}
     */
    public function renameField(string $nodeId, string $oldName, string $newName): array
    {
        if ($oldName === $newName) {
            return ['applied' => false, 'reason' => 'unchanged'];
        }

        // TODO: switch to SchemaFieldName rule (Task 20)
        $validator = Validator::make(
            ['name' => $newName],
            ['name' => ['required', 'string', 'max:40', 'regex:/^[a-z][a-z0-9_]*$/']],
        );
        if ($validator->fails()) {
            return ['applied' => false, 'reason' => 'invalid-name'];
        }

        $nodeIndex = $this->findNodeIndex($nodeId);
        if ($nodeIndex === null) {
            return ['applied' => false, 'reason' => 'no-node'];
        }

        $fields = $this->nodes[$nodeIndex]['data']['fields'] ?? [];
        $oldFieldIndex = null;
        foreach ($fields as $i => $f) {
            if (($f['name'] ?? null) === $newName) {
                return ['applied' => false, 'reason' => 'duplicate'];
            }
            if (($f['name'] ?? null) === $oldName) {
                $oldFieldIndex = $i;
            }
        }

        if ($oldFieldIndex === null) {
            return ['applied' => false, 'reason' => 'no-field'];
        }

        // Rewrite field name.
        $fields[$oldFieldIndex]['name'] = $newName;
        $this->nodes[$nodeIndex]['data']['fields'] = $fields;

        // Cascade edges.
        $cascadedIds = [];
        foreach ($this->edges as $i => $edge) {
            $changed = false;
            if (($edge['source'] ?? null) === $nodeId && ($edge['sourceHandle'] ?? null) === $oldName) {
                $this->edges[$i]['sourceHandle'] = $newName;
                $changed = true;
            }
            if (($edge['target'] ?? null) === $nodeId && ($edge['targetHandle'] ?? null) === $oldName) {
                $this->edges[$i]['targetHandle'] = $newName;
                $changed = true;
            }
            if ($changed) {
                $cascadedIds[] = $edge['id'];
            }
        }

        // fromObject is simplest for a rename+cascade — the client atomically
        // re-reads nodes+edges and re-measures handles on the new names.
        $this->dispatch('flow:fromObject', data: [
            'nodes' => $this->nodes,
            'edges' => $this->edges,
        ]);

        return ['applied' => true, 'cascadedEdgeIds' => $cascadedIds];
    }

    /**
     * Drop a field from a node and cascade-drop any edge that touches that
     * node.fieldName as a source/target handle. Fails silently on missing node/field.
     *
     * @return array{applied: bool, reason?: string, droppedEdgeIds?: array<int, string>}
     */
    public function removeField(string $nodeId, string $fieldName): array
    {
        $nodeIndex = $this->findNodeIndex($nodeId);
        if ($nodeIndex === null) {
            return ['applied' => false, 'reason' => 'no-node'];
        }

        $fields = $this->nodes[$nodeIndex]['data']['fields'] ?? [];
        $newFields = array_values(array_filter(
            $fields,
            fn (array $f) => ($f['name'] ?? null) !== $fieldName,
        ));

        if (count($newFields) === count($fields)) {
            return ['applied' => false, 'reason' => 'no-field'];
        }

        $this->nodes[$nodeIndex]['data']['fields'] = $newFields;

        $droppedIds = [];
        $this->edges = array_values(array_filter($this->edges, function (array $edge) use ($nodeId, $fieldName, &$droppedIds) {
            $touches =
                (($edge['source'] ?? null) === $nodeId && ($edge['sourceHandle'] ?? null) === $fieldName)
                || (($edge['target'] ?? null) === $nodeId && ($edge['targetHandle'] ?? null) === $fieldName);
            if ($touches) {
                $droppedIds[] = $edge['id'];

                return false;
            }

            return true;
        }));

        $this->dispatch('flow:update', targets: [
            'nodes' => [
                $nodeId => ['data' => ['fields' => $newFields]],
            ],
        ]);

        return ['applied' => true, 'droppedEdgeIds' => $droppedIds];
    }

    /**
     * Drop a node entirely, cascading all edges that touch it.
     *
     * @return array{applied: bool, reason?: string, droppedEdgeIds?: array<int, string>}
     */
    public function removeNode(string $nodeId): array
    {
        $nodeIndex = $this->findNodeIndex($nodeId);
        if ($nodeIndex === null) {
            return ['applied' => false, 'reason' => 'no-node'];
        }

        array_splice($this->nodes, $nodeIndex, 1);

        $droppedIds = [];
        $this->edges = array_values(array_filter($this->edges, function (array $edge) use ($nodeId, &$droppedIds) {
            $touches = ($edge['source'] ?? null) === $nodeId || ($edge['target'] ?? null) === $nodeId;
            if ($touches) {
                $droppedIds[] = $edge['id'];

                return false;
            }

            return true;
        }));

        $this->dispatch('flow:fromObject', data: [
            'nodes' => $this->nodes,
            'edges' => $this->edges,
        ]);

        return ['applied' => true, 'droppedEdgeIds' => $droppedIds];
    }

    private function findNodeIndex(string $nodeId): ?int
    {
        foreach ($this->nodes as $i => $node) {
            if (($node['id'] ?? null) === $nodeId) {
                return $i;
            }
        }

        return null;
    }
}
