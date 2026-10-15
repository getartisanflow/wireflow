<?php

use Illuminate\Support\Facades\File;

/*
 * lang/{locale}/canvas.php is generated from the vendored AlpineFlow catalogs in
 * dist/locales/*.json by scripts/sync-locales.php. These tests fail when the two drift
 * apart — re-run the script after every dist resync.
 */

beforeEach(function () {
    $this->root = dirname(__DIR__, 2);
    $this->scratch = sys_get_temp_dir().'/wireflow-sync-locales-'.uniqid();

    $this->runSync = function (string ...$arguments): array {
        $command = escapeshellarg(PHP_BINARY).' '.escapeshellarg($this->root.'/scripts/sync-locales.php');

        foreach ($arguments as $argument) {
            $command .= ' '.escapeshellarg($argument);
        }

        exec($command.' 2>&1', $output, $exitCode);

        return [$exitCode, $output];
    };
});

afterEach(function () {
    File::deleteDirectory($this->scratch);
});

it('has a generated canvas catalog for every vendored alpineflow locale, and no others', function () {
    $fromJson = collect(glob($this->root.'/dist/locales/*.json'))
        ->map(fn (string $path) => str_replace('-', '_', basename($path, '.json')))
        ->sort()
        ->values()
        ->all();

    $fromPhp = collect(glob($this->root.'/lang/*/canvas.php'))
        ->map(fn (string $path) => basename(dirname($path)))
        ->sort()
        ->values()
        ->all();

    expect($fromJson)->toContain('en', 'de');
    expect($fromPhp)->toBe($fromJson);
});

it('keeps each canvas catalog equal to its alpineflow source, key order included', function () {
    foreach (glob($this->root.'/dist/locales/*.json') as $source) {
        $locale = str_replace('-', '_', basename($source, '.json'));

        expect(require $this->root."/lang/{$locale}/canvas.php")
            ->toBe(json_decode(file_get_contents($source), true));
    }
});

it('regenerates the committed catalogs byte for byte', function () {
    [$exitCode, $output] = ($this->runSync)($this->scratch);

    expect($exitCode)->toBe(0, implode("\n", $output));

    $committed = glob($this->root.'/lang/*/canvas.php');

    expect(glob($this->scratch.'/*/canvas.php'))->toHaveCount(count($committed));

    foreach ($committed as $path) {
        $locale = basename(dirname($path));

        expect(file_get_contents("{$this->scratch}/{$locale}/canvas.php"))->toBe(file_get_contents($path));
    }
});

it('writes nothing on a second run', function () {
    ($this->runSync)($this->scratch);

    [$exitCode, $output] = ($this->runSync)($this->scratch);

    expect($exitCode)->toBe(0)
        ->and($output)->toBe([]);
});

it('maps BCP 47 names to Laravel folders and removes only stale generated catalogs', function () {
    $source = $this->scratch.'/locales';
    $lang = $this->scratch.'/lang';

    File::ensureDirectoryExists($source);
    File::put($source.'/pt-BR.json', json_encode(['controls.zoomIn' => "Aproximar 'zoom' \\ :count"]));

    // A catalog generated from a locale that no longer exists upstream, beside a hand-written file.
    File::ensureDirectoryExists($lang.'/fr');
    File::put($lang.'/fr/canvas.php', "<?php\n\n// Generated from @getartisanflow/alpineflow locales/fr.json during the dist resync.\n\nreturn [];\n");
    File::put($lang.'/fr/components.php', "<?php\n\nreturn [];\n");

    // A hand-written canvas.php without the generated header is never removed.
    File::ensureDirectoryExists($lang.'/es');
    File::put($lang.'/es/canvas.php', "<?php\n\nreturn [];\n");

    [$exitCode, $output] = ($this->runSync)($lang, $source);

    expect($exitCode)->toBe(0, implode("\n", $output));
    expect(require $lang.'/pt_BR/canvas.php')->toBe(['controls.zoomIn' => "Aproximar 'zoom' \\ :count"]);
    expect(file_get_contents($lang.'/pt_BR/canvas.php'))
        ->toContain('locales/pt-BR.json')
        ->toContain('lang/vendor/wireflow/pt_BR/canvas.php');
    expect($lang.'/fr/canvas.php')->not->toBeFile();
    expect($lang.'/fr/components.php')->toBeFile();
    expect($lang.'/es/canvas.php')->toBeFile();
});

it('refuses a catalog with a non-string message', function () {
    $source = $this->scratch.'/locales';

    File::ensureDirectoryExists($source);
    File::put($source.'/xx.json', json_encode(['controls.zoomIn' => ['nested' => 'no']]));

    [$exitCode, $output] = ($this->runSync)($this->scratch.'/lang', $source);

    expect($exitCode)->toBe(1)
        ->and(implode("\n", $output))->toContain('"controls.zoomIn" must be a string');
    expect($this->scratch.'/lang/xx/canvas.php')->not->toBeFile();
});
