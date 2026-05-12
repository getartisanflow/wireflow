---
title: x-flow-condition-node
description: Condition-node template (header + pretty-printed body + true/false handles) for WireFlow workflow canvases.
order: 15
---

# x-flow-condition-node

Wraps AlpineFlow's `x-flow-condition` directive for WireFlow. Renders a workflow decision node: a header (defaults to `Condition`), a pretty-printed expression body, a target handle, and labelled `true` / `false` source handles. Reflects post-run branch-taken decoration via the surrounding theme.

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-slot:node>
        <template x-if="node.type === 'flow-condition'">
            <x-flow-condition-node />
        </template>
    </x-slot:node>
</x-flow>
```

The bound `node` carries:

```php
[
    'id' => 'plan-check',
    'type' => 'flow-condition',
    'position' => ['x' => 0, 'y' => 0],
    'data' => [
        'label' => 'Plan check',
        'condition' => ['field' => 'plan', 'op' => 'equals', 'value' => 'annual'],
        'direction' => 'horizontal',  // optional — default 'horizontal'
    ],
]
```

## Props (SSR fallback)

When you render `<x-flow-condition-node>` outside an `<x-flow>` (a static preview, a documentation page), pass props and the component emits a server-rendered fallback that paints before JS init and during Livewire morph diffs.

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `label` | string | no | Header label. Defaults to `Condition`. |
| `condition` | array | no | `['field' => …, 'op' => …, 'value' => …]`. Drives the body. |
| `direction` | `'horizontal' \| 'vertical'` | no | Layout flip. Defaults to `'horizontal'`. |
| `evaluateLabel` | string | no | Body override for `evaluate`-fn nodes; defaults to `[custom evaluator]`. |

```blade
<x-flow-condition-node
    :label="'Plan check'"
    :condition="['field' => 'plan', 'op' => 'equals', 'value' => 'annual']"
/>
```

## Pretty-printing

The PHP-side `FlowConditionNode::prettyPrintCondition()` mirrors the JS `prettyPrintCondition()` — same output across client init and SSR. Operator coverage:

| Op | Output |
| --- | --- |
| `equals` / `notEquals` | `field == 'val'` / `field != 'val'` |
| `greaterThan` / `lessThan` / `greaterThanOrEqual` / `lessThanOrEqual` | `field > 18`, `field <= 65`, … |
| `in` / `notIn` | `field in ['US', 'CA']` / `field not in ['admin']` |
| `exists` | `field exists` |
| `matches` | `field ~ /pattern/` |

## Branch-taken decoration

When a run or replay picks an outgoing edge from a condition node, the addon sets `node.data._branchTaken = 'true' \| 'false'`. The directive reflects this on the host as `data-flow-condition-branch-taken`. The default theme highlights the chosen handle with a soft glow and dims the other.

`canvas.resetStates()` clears the flag.
