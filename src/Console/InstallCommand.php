<?php

namespace ArtisanFlow\WireFlow\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class InstallCommand extends Command
{
    protected $signature = 'wireflow:install
        {--force : Overwrite existing files}';

    protected $description = 'Install WireFlow — publish config, assets, and add JS/CSS imports';

    public function handle(): int
    {
        $this->components->info('Installing WireFlow...');

        // Publish config
        $this->callSilently('vendor:publish', [
            '--tag' => 'wireflow-config',
            '--force' => $this->option('force'),
        ]);
        $this->components->task('Config published', fn () => true);

        // Publish assets
        $this->callSilently('vendor:publish', [
            '--tag' => 'wireflow-assets',
            '--force' => $this->option('force'),
        ]);
        $this->components->task('Assets published', fn () => true);

        // Add JS import to app.js
        $this->addJsImport();

        // Add CSS import to app.css
        $this->addCssImport();

        // Ensure Vite externalizes alpinejs (Livewire provides it at runtime)
        $this->patchViteConfig();

        $this->newLine();
        $this->components->info('WireFlow installed successfully.');
        $this->components->bulletList([
            'Run <comment>npm run build</comment> to compile assets.',
            'Use <comment><x-flow></comment> in your Blade views.',
            'See <comment>https://artisanflow.dev/docs/wireflow</comment> for documentation.',
        ]);

        return self::SUCCESS;
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

    private function patchViteConfig(): void
    {
        $viteConfig = base_path('vite.config.js');

        if (! File::exists($viteConfig)) {
            $this->components->task('Vite config (not found, skipped)', fn () => true);

            return;
        }

        $contents = File::get($viteConfig);

        if (str_contains($contents, "'alpinejs'") && str_contains($contents, 'external')) {
            $this->components->task('Vite config (alpinejs already externalized)', fn () => true);

            return;
        }

        // Add rollupOptions.external for alpinejs
        if (str_contains($contents, 'build:')) {
            // build key already exists — user needs manual setup
            $this->components->warn('Add alpinejs to build.rollupOptions.external in vite.config.js:');
            $this->line("  build: { rollupOptions: { external: ['alpinejs'] } }");

            return;
        }

        // Insert build config before the closing of defineConfig
        $contents = str_replace(
            'plugins: [',
            "build: {\n        rollupOptions: {\n            external: ['alpinejs'],\n        },\n    },\n    plugins: [",
            $contents
        );

        File::put($viteConfig, $contents);
        $this->components->task('Vite config patched (alpinejs externalized)', fn () => true);
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
