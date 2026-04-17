<?php

namespace ArtisanFlow\WireFlow\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

use function Laravel\Prompts\multiselect;

class InstallCommand extends Command
{
    protected $signature = 'wireflow:install
        {--force : Overwrite existing files}
        {--with=* : Install specific addons non-interactively (e.g. --with=workflow)}';

    protected $description = 'Install WireFlow — publish config, assets, and add JS/CSS imports';

    /** Available addons that can be installed alongside core. */
    private const ADDONS = [
        'workflow' => [
            'label' => 'Workflow — $flow.run() execution helper, condition nodes, edge state mirroring',
            'import' => "import AlpineFlowWorkflow from '../../vendor/getartisanflow/wireflow/dist/alpineflow-workflow.esm.js';",
            'detect' => 'alpineflow-workflow.esm',
            'variable' => 'AlpineFlowWorkflow',
        ],
    ];

    public function handle(): int
    {
        $this->components->info('Installing WireFlow...');

        // Publish config
        $this->callSilently('vendor:publish', [
            '--tag' => 'wireflow-config',
            '--force' => $this->option('force'),
        ]);
        $this->components->task('Config published', fn () => true);

        // Publish assets (includes addon bundles in dist/)
        $this->callSilently('vendor:publish', [
            '--tag' => 'wireflow-assets',
            '--force' => $this->option('force'),
        ]);
        $this->components->task('Assets published', fn () => true);

        // Add core JS import to app.js
        $this->addJsImport();

        // Add CSS import to app.css
        $this->addCssImport();

        // Addon selection
        $selectedAddons = $this->resolveAddons();

        foreach ($selectedAddons as $addonKey) {
            $this->installAddon($addonKey);
        }

        $this->newLine();
        $this->components->info('WireFlow installed successfully.');

        $bullets = [
            'Run <comment>npm run build</comment> to compile assets.',
            'Use <comment><x-flow></comment> in your Blade views.',
            'See <comment>https://artisanflow.dev/docs/wireflow</comment> for documentation.',
        ];

        if (! empty($selectedAddons)) {
            $bullets[] = 'Addons installed: <comment>'.implode(', ', $selectedAddons).'</comment>';
        }

        $this->components->bulletList($bullets);

        return self::SUCCESS;
    }

    /**
     * Determine which addons to install.
     *
     * Priority:
     * 1. --with=workflow (explicit, works in non-interactive mode)
     * 2. Interactive multiselect prompt (skipped in --no-interaction)
     * 3. None (default in --no-interaction without --with)
     *
     * @return list<string>
     */
    private function resolveAddons(): array
    {
        $withOption = $this->option('with');

        // Explicit --with flag: validate and return
        if (! empty($withOption)) {
            $valid = [];
            foreach ($withOption as $addon) {
                $addon = strtolower(trim($addon));
                if (isset(self::ADDONS[$addon])) {
                    $valid[] = $addon;
                } else {
                    $this->components->warn("Unknown addon: {$addon}. Available: ".implode(', ', array_keys(self::ADDONS)));
                }
            }

            return $valid;
        }

        // Non-interactive: no addons by default
        if (! $this->input->isInteractive()) {
            return [];
        }

        // Interactive: prompt with multiselect
        if (empty(self::ADDONS)) {
            return [];
        }

        $choices = [];
        foreach (self::ADDONS as $key => $addon) {
            $choices[$key] = $addon['label'];
        }

        $selected = multiselect(
            label: 'Which addons would you like to install?',
            options: $choices,
            hint: 'Space to select, Enter to confirm. Leave empty to skip.',
        );

        return array_values($selected);
    }

    /**
     * Install a single addon: add its import + Alpine.plugin() registration to app.js.
     */
    private function installAddon(string $key): void
    {
        $addon = self::ADDONS[$key] ?? null;
        if (! $addon) {
            return;
        }

        $appJs = resource_path('js/app.js');
        if (! File::exists($appJs)) {
            $this->components->task("Addon [{$key}] (app.js not found, skipped)", fn () => true);

            return;
        }

        $contents = File::get($appJs);

        // Check if already installed
        if (str_contains($contents, $addon['detect'])) {
            $this->components->task("Addon [{$key}] (already installed)", fn () => true);

            return;
        }

        $modified = false;

        // Add import line after the core AlpineFlow import
        if (! str_contains($contents, $addon['detect'])) {
            $coreImportPattern = "/^(import\s+AlpineFlow\s+from\s+['\"].*alpineflow\.bundle\.esm.*['\"];?\s*\n)/m";
            if (preg_match($coreImportPattern, $contents, $matches)) {
                $contents = str_replace(
                    $matches[1],
                    $matches[1].$addon['import']."\n",
                    $contents,
                );
                $modified = true;
            }
        }

        // Add Alpine.plugin() call inside the alpine:init block
        $pluginCall = "    window.Alpine.plugin({$addon['variable']});";
        if (! str_contains($contents, $addon['variable'])) {
            $corePluginPattern = "/(window\.Alpine\.plugin\(AlpineFlow\);)/";
            if (preg_match($corePluginPattern, $contents, $matches)) {
                $contents = str_replace(
                    $matches[1],
                    $matches[1]."\n".$pluginCall,
                    $contents,
                );
                $modified = true;
            }
        }

        if ($modified) {
            File::put($appJs, $contents);
            $this->components->task("Addon [{$key}] added to app.js", fn () => true);
        } else {
            $this->components->task("Addon [{$key}] (could not locate insertion point in app.js)", fn () => false);
        }
    }

    private function addJsImport(): void
    {
        $appJs = resource_path('js/app.js');

        if (! File::exists($appJs)) {
            $this->components->task('JS import (app.js not found, skipped)', fn () => true);

            return;
        }

        $contents = File::get($appJs);
        $importLine = "import AlpineFlow from '../../vendor/getartisanflow/wireflow/dist/alpineflow.bundle.esm.js';";
        $registerBlock = <<<'JS'

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(AlpineFlow);
});
JS;

        if (str_contains($contents, 'alpineflow.bundle.esm')) {
            $this->components->task('JS import (already present)', fn () => true);

            return;
        }

        // Add import at the top (after any existing imports) and register block
        $contents = $importLine."\n".$contents.$registerBlock."\n";
        File::put($appJs, $contents);
        $this->components->task('JS import added to app.js', fn () => true);
    }

    private function addCssImport(): void
    {
        $appCss = resource_path('css/app.css');

        if (! File::exists($appCss)) {
            $this->components->task('CSS import (app.css not found, skipped)', fn () => true);

            return;
        }

        $contents = File::get($appCss);
        $structuralImport = "@import '../../vendor/getartisanflow/wireflow/dist/alpineflow.css';";
        $themeImport = "@import '../../vendor/getartisanflow/wireflow/dist/alpineflow-theme.css';";

        if (str_contains($contents, 'alpineflow.css')) {
            $this->components->task('CSS import (already present)', fn () => true);

            return;
        }

        // Add after the first @import line (typically tailwindcss)
        $lines = explode("\n", $contents);
        $insertAfter = 0;
        foreach ($lines as $i => $line) {
            if (str_starts_with(trim($line), '@import')) {
                $insertAfter = $i + 1;
            }
        }

        array_splice($lines, $insertAfter, 0, [$structuralImport, $themeImport]);
        File::put($appCss, implode("\n", $lines));
        $this->components->task('CSS imports added to app.css', fn () => true);
    }
}
