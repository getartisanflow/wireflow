<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-flow-condition-node> — WireFlow wrapper around AlpineFlow's
 * x-flow-condition directive. Used inside an <x-flow> component's :node slot
 * to render workflow decision nodes with true/false branches and post-run
 * branch-taken decoration.
 *
 * When used outside an <x-flow> (e.g. for standalone previews), pass label +
 * condition + direction props for an SSR fallback that paints before JS init.
 */
class FlowConditionNode extends Component
{
    public function __construct(
        /** Optional — only used for SSR fallback when rendered outside <x-flow>. */
        public ?string $label = null,

        /**
         * Optional condition descriptor for SSR fallback.
         *
         * @var array{field: string, op: string, value?: mixed}|null
         */
        public ?array $condition = null,

        /** 'horizontal' (default) | 'vertical'. */
        public ?string $direction = null,

        /** Optional override for the body when an evaluate function is used. */
        public ?string $evaluateLabel = null,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.flow-condition-node');
    }

    /** Pretty-print the condition for the SSR fallback. Mirrors prettyPrintCondition() in alpineflow. */
    public function prettyPrintCondition(): string
    {
        if ($this->condition === null) {
            return $this->evaluateLabel ?? '[custom evaluator]';
        }

        $field = $this->condition['field'] ?? '';
        $op = $this->condition['op'] ?? '';
        $value = $this->condition['value'] ?? null;

        return match ($op) {
            'equals' => "{$field} == ".$this->formatValue($value),
            'notEquals' => "{$field} != ".$this->formatValue($value),
            'greaterThan' => "{$field} > ".$this->formatValue($value),
            'lessThan' => "{$field} < ".$this->formatValue($value),
            'greaterThanOrEqual' => "{$field} >= ".$this->formatValue($value),
            'lessThanOrEqual' => "{$field} <= ".$this->formatValue($value),
            'in' => "{$field} in ".$this->formatValue($value),
            'notIn' => "{$field} not in ".$this->formatValue($value),
            'exists' => "{$field} exists",
            'matches' => "{$field} ~ /{$value}/",
            default => "{$field} {$op} ".$this->formatValue($value),
        };
    }

    private function formatValue(mixed $value): string
    {
        if ($value === null) {
            return 'null';
        }
        if (is_string($value)) {
            return "'{$value}'";
        }
        if (is_array($value)) {
            return '['.implode(', ', array_map(fn ($v) => $this->formatValue($v), $value)).']';
        }
        if (is_bool($value)) {
            return $value ? 'true' : 'false';
        }

        return (string) $value;
    }
}
