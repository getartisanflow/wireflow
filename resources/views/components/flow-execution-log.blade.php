{{--
    Execution log — dense reactive event viewer.

    SECURITY: every dynamic field is rendered via x-text on a discrete
    element. NEVER use x-html with built strings here — node IDs, edge IDs,
    and error messages come from consumer code and may contain markup.
--}}
<div
    x-data="flowExecutionLog({
        sourceExpr: @js($source),
        target: @js($target),
        initialFilter: @js($filter),
        maxEvents: {{ $maxEvents }},
    })"
    x-init="init()"
    class="flow-execution-log"
    {{ $attributes }}
>
    <div class="flow-execution-log-header">
        <span class="flow-execution-log-title">Execution log</span>
        <select class="flow-execution-log-filter" x-model="filter">
            <option value="all">All events</option>
            <option value="errors">Errors only</option>
            <option value="lifecycle">Lifecycle only</option>
        </select>
    </div>
    <div
        class="flow-execution-log-body"
        x-ref="body"
        x-on:scroll="onUserScroll()"
    >
        <template x-if="filteredEvents.length === 0">
            <div class="flow-execution-log-empty">No events yet. Run the workflow to see activity.</div>
        </template>

        <template x-for="(event, index) in filteredEvents" :key="event.t + ':' + index">
            <div
                class="flow-execution-log-row"
                x-bind:data-flow-event-type="event.type"
                x-on:click="onRowClick(event)"
            >
                <div class="flow-execution-log-row-default">
                    <span class="flow-execution-log-ts" x-text="formatTime(event.t - baseTime)"></span>
                    <span class="flow-execution-log-icon" x-bind:class="iconClassFor(event.type)" x-text="iconFor(event.type)"></span>
                    <span class="flow-execution-log-content">
                        <template x-if="event.type === 'run:started'"><span>run:started</span></template>
                        <template x-if="event.type === 'run:complete'"><span>run:complete</span></template>
                        <template x-if="event.type === 'run:stopped'"><span>run:stopped</span></template>
                        <template x-if="event.type === 'run:error'">
                            <span>error <span class="flow-execution-log-node-id" x-text="event.nodeId ?? ''"></span> <span x-text="event.payload?.error?.message ?? 'unknown'"></span></span>
                        </template>
                        <template x-if="event.type === 'node:enter'">
                            <span>enter <span class="flow-execution-log-node-id" x-text="event.nodeId"></span></span>
                        </template>
                        <template x-if="event.type === 'node:exit'">
                            <span>
                                exit <span class="flow-execution-log-node-id" x-text="event.nodeId"></span>
                                <template x-if="event.runtimeMs != null">
                                    <span class="flow-execution-log-duration" x-text="event.runtimeMs + 'ms'"></span>
                                </template>
                            </span>
                        </template>
                        <template x-if="event.type === 'edge:taken'">
                            <span>taken <span class="flow-execution-log-edge-id" x-text="event.edgeId"></span></span>
                        </template>
                        <template x-if="event.type === 'edge:untaken'">
                            <span>untaken <span class="flow-execution-log-edge-id" x-text="event.edgeId"></span></span>
                        </template>
                        <template x-if="event.type === 'edge:failed'">
                            <span>failed <span class="flow-execution-log-edge-id" x-text="event.edgeId"></span></span>
                        </template>
                        <template x-if="event.type === 'parallel:fork'">
                            <span>
                                fork <span class="flow-execution-log-node-id" x-text="event.nodeId"></span>
                                → <span x-text="(event.payload?.branches?.length ?? 0) + ' branches'"></span>
                            </span>
                        </template>
                        <template x-if="event.type === 'wait:start'">
                            <span>wait <span class="flow-execution-log-node-id" x-text="event.nodeId"></span></span>
                        </template>
                        <template x-if="event.type === 'wait:end'">
                            <span>wait done <span class="flow-execution-log-node-id" x-text="event.nodeId"></span></span>
                        </template>
                        <template x-if="event.type === 'branch:chosen'">
                            <span>branch <span class="flow-execution-log-node-id" x-text="event.nodeId"></span> → <span class="flow-execution-log-edge-id" x-text="event.edgeId"></span></span>
                        </template>
                    </span>
                </div>
            </div>
        </template>
    </div>
</div>
