<?php

namespace ArtisanFlow\WireFlow;

use ArtisanFlow\WireFlow\Console\InstallCommand;
use ArtisanFlow\WireFlow\View\Components\Action;
use ArtisanFlow\WireFlow\View\Components\Collapse;
use ArtisanFlow\WireFlow\View\Components\Condense;
use ArtisanFlow\WireFlow\View\Components\ContextMenu;
use ArtisanFlow\WireFlow\View\Components\DragHandle;
use ArtisanFlow\WireFlow\View\Components\EdgeToolbar;
use ArtisanFlow\WireFlow\View\Components\FlowConditionNode;
use ArtisanFlow\WireFlow\View\Components\FlowExecutionLog;
use ArtisanFlow\WireFlow\View\Components\FlowReplayControls;
use ArtisanFlow\WireFlow\View\Components\FlowResetButton;
use ArtisanFlow\WireFlow\View\Components\FlowRunButton;
use ArtisanFlow\WireFlow\View\Components\FlowStopButton;
use ArtisanFlow\WireFlow\View\Components\FlowWait;
use ArtisanFlow\WireFlow\View\Components\Handle;
use ArtisanFlow\WireFlow\View\Components\Loading;
use ArtisanFlow\WireFlow\View\Components\Panel;
use ArtisanFlow\WireFlow\View\Components\Resizer;
use ArtisanFlow\WireFlow\View\Components\SchemaDesigner;
use ArtisanFlow\WireFlow\View\Components\SchemaEdgeInspector;
use ArtisanFlow\WireFlow\View\Components\SchemaField;
use ArtisanFlow\WireFlow\View\Components\SchemaNode;
use ArtisanFlow\WireFlow\View\Components\SchemaNodeInspector;
use ArtisanFlow\WireFlow\View\Components\SchemaRowInspector;
use ArtisanFlow\WireFlow\View\Components\Toolbar;
use ArtisanFlow\WireFlow\View\Components\WireFlow;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class WireFlowServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/wireflow.php', 'wireflow');
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'wireflow');

        $this->registerBladeComponents();

        if ($this->app->runningInConsole()) {
            $this->commands([InstallCommand::class]);

            $this->publishes([
                __DIR__.'/../config/wireflow.php' => config_path('wireflow.php'),
            ], 'wireflow-config');

            $this->publishes([
                __DIR__.'/../dist' => public_path('vendor/alpineflow'),
            ], 'wireflow-assets');
        }
    }

    /**
     * Resolve the theme CSS filename based on config.
     *
     * Returns null for 'structural' (no theme file) and 'none' (no CSS at all).
     */
    public function themeStylesheet(): ?string
    {
        return match (config('wireflow.theme', 'default')) {
            'default' => 'theme-default.css',
            'flux' => 'theme-flux.css',
            'structural', 'none' => null,
            default => 'theme-default.css',
        };
    }

    private function registerBladeComponents(): void
    {
        Blade::component('flow', WireFlow::class);
        Blade::component('flow-handle', Handle::class);
        Blade::component('flow-panel', Panel::class);
        Blade::component('flow-toolbar', Toolbar::class);
        Blade::component('flow-drag-handle', DragHandle::class);
        Blade::component('flow-resizer', Resizer::class);
        Blade::component('flow-action', Action::class);
        Blade::component('flow-context-menu', ContextMenu::class);
        Blade::component('flow-collapse', Collapse::class);
        Blade::component('flow-loading', Loading::class);
        Blade::component('flow-edge-toolbar', EdgeToolbar::class);
        Blade::component('flow-condense', Condense::class);
        Blade::component('flow-wait', FlowWait::class);
        Blade::component('flow-condition-node', FlowConditionNode::class);
        Blade::component('flow-replay-controls', FlowReplayControls::class);
        Blade::component('flow-execution-log', FlowExecutionLog::class);
        Blade::component('flow-run-button', FlowRunButton::class);
        Blade::component('flow-stop-button', FlowStopButton::class);
        Blade::component('flow-reset-button', FlowResetButton::class);
        Blade::component('flow-schema-node', SchemaNode::class);
        Blade::component('schema-field', SchemaField::class);
        Blade::component('schema-designer', SchemaDesigner::class);
        Blade::component('schema-node-inspector', SchemaNodeInspector::class);
        Blade::component('schema-row-inspector', SchemaRowInspector::class);
        Blade::component('schema-edge-inspector', SchemaEdgeInspector::class);
    }
}
