<?php

namespace ArtisanFlow\WireFlow\View\Components;

use ArtisanFlow\WireFlow\JsRaw;
use Illuminate\Support\Js;
use Illuminate\View\Component;

class WireFlow extends Component
{
    public function __construct(
        public array $nodes = [],
        public array $edges = [],
        public array $viewport = ['x' => 0, 'y' => 0, 'zoom' => 1],
        public bool $sync = false,
        public bool $listen = false,
        public string $background = 'dots',
        public bool $minimap = false,
        public bool $controls = false,
        public bool $pannable = true,
        public bool $zoomable = true,
        public bool $fitView = false,
        public array|false $snap = false,
        public string $defaultEdgeType = 'bezier',
        public bool $edgesReconnectable = true,
        public bool $interactive = true,
        public array $nodeTypes = [],
        public array $config = [],
        public ?float $minZoom = null,
        public ?float $maxZoom = null,
        public bool $preventCycles = false,
        public ?string $colorMode = null,
        public bool $selectionOnDrag = false,
        public ?string $computeMode = null,
        public bool $fitViewOnInit = false,
        public bool $history = false,
        public ?array $autoLayout = null,
        public ?int $backgroundGap = null,
    ) {}

    /**
     * Create a JsRaw value that will be emitted as a raw JS expression instead of a JSON string.
     */
    public static function js(string $expression): JsRaw
    {
        return new JsRaw($expression);
    }

    /**
     * Build the flowCanvas configuration array (without nodes/edges for sync mode).
     */
    public function flowConfig(): array
    {
        $config = array_filter([
            'background' => $this->background,
            'minimap' => $this->minimap ?: null,
            'controls' => $this->controls ?: null,
            'pannable' => $this->pannable,
            'zoomable' => $this->zoomable,
            'defaultEdgeType' => $this->defaultEdgeType !== 'bezier' ? $this->defaultEdgeType : null,
            'edgesReconnectable' => $this->edgesReconnectable,
            'fitView' => $this->fitView ?: null,
            'snapToGrid' => $this->snap !== false ? $this->snap : null,
            'minZoom' => $this->minZoom,
            'maxZoom' => $this->maxZoom,
            'preventCycles' => $this->preventCycles ?: null,
            'colorMode' => $this->colorMode,
            'selectionOnDrag' => $this->selectionOnDrag ?: null,
            'computeMode' => $this->computeMode,
            'fitViewOnInit' => $this->fitViewOnInit ?: null,
            'history' => $this->history ?: null,
            'autoLayout' => $this->autoLayout,
            'backgroundGap' => $this->backgroundGap,
        ], fn ($v) => $v !== null);

        if ($this->listen || ! $this->interactive) {
            $config['interactive'] = false;
        }

        // Merge user-provided config last (overrides promoted props)
        $config = array_merge($config, $this->config);

        return $config;
    }

    /**
     * Build the nodeTypes map for AlpineFlow's type registry.
     */
    public function nodeTypesConfig(bool $hasDefaultSlot): array
    {
        $map = [];

        if ($hasDefaultSlot) {
            $map['default'] = '#wireflow-node-default';
        }

        foreach ($this->nodeTypes as $type => $component) {
            $map[$type] = '#wireflow-node-'.$type;
        }

        return $map;
    }

    /**
     * Render the x-data attribute value.
     *
     * In sync mode, nodes/edges use $wire.entangle() instead of static JSON.
     */
    public function xData(bool $hasDefaultSlot): string
    {
        $config = $this->flowConfig();

        $nodeTypesMap = $this->nodeTypesConfig($hasDefaultSlot);
        if (! empty($nodeTypesMap)) {
            $config['nodeTypes'] = $nodeTypesMap;
        }

        $wireEvents = $this->extractWireEvents();
        if (! empty($wireEvents)) {
            $config['wireEvents'] = $wireEvents;
        }

        // Extract JsRaw values and replace with sentinels before JSON serialization
        $rawExpressions = [];
        $this->extractJsRaw($config, $rawExpressions);

        if ($this->sync) {
            // Sync mode: entangle nodes and edges, pass everything else as JSON
            $config['viewport'] = $this->viewport;
            $configJson = $this->toJs($config, $rawExpressions);

            return "flowCanvas(Object.assign({$configJson}, { nodes: \$wire.entangle('nodes'), edges: \$wire.entangle('edges') }))";
        }

        // Default: pass everything as static JSON
        $config['nodes'] = $this->nodes;
        $config['edges'] = $this->edges;
        $config['viewport'] = $this->viewport;

        $configJson = $this->toJs($config, $rawExpressions);

        return "flowCanvas({$configJson})";
    }

    /** Events that WireFlow knows how to bridge to Livewire methods. */
    private const KNOWN_EVENTS = [
        'connect', 'connect-start', 'connect-end',
        'node-click', 'node-drag-start', 'node-drag-end',
        'node-resize-start', 'node-resize-end',
        'node-collapse', 'node-expand', 'node-reparent',
        'node-context-menu', 'nodes-change',
        'edge-click', 'edge-context-menu', 'edges-change',
        'reconnect', 'reconnect-start', 'reconnect-end',
        'pane-click', 'pane-context-menu',
        'viewport-change', 'selection-change',
        'selection-context-menu', 'drop', 'init',
        'row-select', 'row-deselect', 'row-selection-change',
    ];

    /**
     * Extract @event="method" attributes from the component attribute bag.
     *
     * @return array<string, string>
     */
    public function extractWireEvents(): array
    {
        $wireEvents = [];
        $attributes = $this->attributes->getAttributes();

        foreach (self::KNOWN_EVENTS as $event) {
            foreach (["@{$event}", "x-on:{$event}"] as $attr) {
                if (isset($attributes[$attr])) {
                    $wireEvents[$event] = $attributes[$attr];
                    $this->attributes->offsetUnset($attr);
                }
            }
        }

        return $wireEvents;
    }

    /**
     * Recursively extract JsRaw instances from a config array, replacing them with sentinel strings.
     *
     * @param  array<string, mixed>  $config
     * @param  array<string, string>  $rawExpressions
     */
    private function extractJsRaw(array &$config, array &$rawExpressions): void
    {
        foreach ($config as $key => &$value) {
            if ($value instanceof JsRaw) {
                $sentinel = '__JSRAW_'.count($rawExpressions).'__';
                $rawExpressions[$sentinel] = $value->expression;
                $value = $sentinel;
            } elseif (is_array($value)) {
                $this->extractJsRaw($value, $rawExpressions);
            }
        }
    }

    /**
     * Serialize config to a JS expression, handling JsRaw values safely.
     *
     * Uses json_encode for a raw object literal, replaces JsRaw sentinels
     * with raw JS, then HTML-encodes the entire output. The browser decodes
     * the HTML entities before Alpine evaluates the x-data expression.
     *
     * @param  array<string, mixed>  $config  Config with JsRaw values replaced by sentinels
     * @param  array<string, string>  $rawExpressions  Sentinel → raw JS expression map
     */
    private function toJs(array $config, array $rawExpressions): string
    {
        if (empty($rawExpressions)) {
            return (string) Js::from($config);
        }

        $json = json_encode($config, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);

        foreach ($rawExpressions as $sentinel => $expression) {
            $json = str_replace('"'.$sentinel.'"', $expression, $json);
        }

        // HTML-encode so quotes and angle brackets don't break the x-data attribute.
        // The browser decodes HTML entities before Alpine evaluates the expression.
        return htmlspecialchars($json, ENT_QUOTES, 'UTF-8', false);
    }

    public function render()
    {
        return view('wireflow::components.flow');
    }
}
