<?php

use ArtisanFlow\WireFlow\View\Components\FlowConditionNode;
use Illuminate\View\ComponentAttributeBag;

function renderConditionNode(array $props = []): string
{
    /** @var FlowConditionNode $component */
    $component = new FlowConditionNode(
        label: $props['label'] ?? null,
        condition: $props['condition'] ?? null,
        direction: $props['direction'] ?? null,
        evaluateLabel: $props['evaluateLabel'] ?? null,
    );

    return view('wireflow::components.flow-condition-node', [
        'label' => $component->label,
        'condition' => $component->condition,
        'direction' => $component->direction,
        'evaluateLabel' => $component->evaluateLabel,
        'prettyPrintCondition' => fn () => $component->prettyPrintCondition(),
        'attributes' => new ComponentAttributeBag,
    ])->render();
}

it('renders the host with x-flow-condition directive (default horizontal) when no SSR props', function () {
    $html = renderConditionNode();

    expect($html)
        ->toContain("x-flow-condition=\"'horizontal'\"")
        ->toContain('class="flow-condition-node"')
        ->toContain('data-flow-condition-direction="horizontal"')
        ->not->toContain('flow-condition-header')
        ->not->toContain('flow-condition-handle-target');
});

it('renders SSR header + body + three handles when label + condition are passed', function () {
    $html = renderConditionNode([
        'label' => 'Plan check',
        'condition' => ['field' => 'plan', 'op' => 'equals', 'value' => 'annual'],
    ]);

    expect($html)
        ->toContain('<div class="flow-condition-header">Plan check</div>')
        ->toContain('class="flow-condition-body">plan == ')
        ->toContain('annual')
        ->toContain('flow-condition-handle-target')
        ->toContain('data-source-handle="true"')
        ->toContain('data-source-handle="false"');
});

it('honors explicit direction prop', function () {
    $html = renderConditionNode(['direction' => 'vertical']);

    expect($html)
        ->toContain("x-flow-condition=\"'vertical'\"")
        ->toContain('data-flow-condition-direction="vertical"');
});

it('falls back to "Condition" header when label is null but condition is present', function () {
    $html = renderConditionNode([
        'condition' => ['field' => 'x', 'op' => 'equals', 'value' => 1],
    ]);

    expect($html)->toContain('<div class="flow-condition-header">Condition</div>');
});

describe('FlowConditionNode::prettyPrintCondition', function () {
    it('formats equals with a string value (quoted)', function () {
        $component = new FlowConditionNode(
            condition: ['field' => 'plan', 'op' => 'equals', 'value' => 'annual'],
        );
        expect($component->prettyPrintCondition())->toBe("plan == 'annual'");
    });

    it('formats equals with a numeric value', function () {
        $component = new FlowConditionNode(
            condition: ['field' => 'amount', 'op' => 'equals', 'value' => 100],
        );
        expect($component->prettyPrintCondition())->toBe('amount == 100');
    });

    it('formats notEquals', function () {
        $component = new FlowConditionNode(
            condition: ['field' => 'status', 'op' => 'notEquals', 'value' => 'cancelled'],
        );
        expect($component->prettyPrintCondition())->toBe("status != 'cancelled'");
    });

    it('formats numeric comparisons', function () {
        $gt = new FlowConditionNode(condition: ['field' => 'age', 'op' => 'greaterThan', 'value' => 18]);
        $lte = new FlowConditionNode(condition: ['field' => 'age', 'op' => 'lessThanOrEqual', 'value' => 65]);
        expect($gt->prettyPrintCondition())->toBe('age > 18');
        expect($lte->prettyPrintCondition())->toBe('age <= 65');
    });

    it('formats in and notIn with arrays', function () {
        $in = new FlowConditionNode(condition: ['field' => 'region', 'op' => 'in', 'value' => ['US', 'CA']]);
        $notIn = new FlowConditionNode(condition: ['field' => 'role', 'op' => 'notIn', 'value' => ['admin']]);
        expect($in->prettyPrintCondition())->toBe("region in ['US', 'CA']");
        expect($notIn->prettyPrintCondition())->toBe("role not in ['admin']");
    });

    it('formats exists', function () {
        $component = new FlowConditionNode(condition: ['field' => 'email', 'op' => 'exists']);
        expect($component->prettyPrintCondition())->toBe('email exists');
    });

    it('formats matches as regex', function () {
        $component = new FlowConditionNode(condition: ['field' => 'code', 'op' => 'matches', 'value' => '^PRO-\\d+$']);
        expect($component->prettyPrintCondition())->toBe('code ~ /^PRO-\\d+$/');
    });

    it('falls back to evaluateLabel when no condition is provided', function () {
        $component = new FlowConditionNode(label: 'Custom', evaluateLabel: 'amount > $1k');
        expect($component->prettyPrintCondition())->toBe('amount > $1k');
    });

    it('uses [custom evaluator] when neither condition nor evaluateLabel is provided', function () {
        $component = new FlowConditionNode(label: 'Custom');
        expect($component->prettyPrintCondition())->toBe('[custom evaluator]');
    });
});
