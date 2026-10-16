<?php

/**
 * Generate lang/{locale}/canvas.php from the vendored AlpineFlow catalogs in dist/locales/*.json.
 *
 * Run after every dist resync from alpineflow:
 *
 *     php scripts/sync-locales.php
 *
 * The optional first argument is the lang directory to write into (default: lang/ in
 * this repo), the optional second the directory to read catalogs from (default:
 * dist/locales/). File names map from BCP 47 to Laravel folder names, so pt-BR.json
 * becomes lang/pt_BR/canvas.php. Generated files whose catalog no longer exists are
 * removed. Running it twice changes nothing.
 */
$root = dirname(__DIR__);
$langDirectory = rtrim($argv[1] ?? $root.'/lang', '/');
$sourceDirectory = rtrim($argv[2] ?? $root.'/dist/locales', '/');

const GENERATED_MARKER = '// Generated from @getartisanflow/alpineflow locales/';

function fail(string $message): never
{
    fwrite(STDERR, "sync-locales: {$message}\n");

    exit(1);
}

function exportString(string $value): string
{
    return "'".str_replace(['\\', "'"], ['\\\\', "\\'"], $value)."'";
}

/**
 * @param  array<string, string>  $messages
 */
function renderCatalog(string $name, string $laravelLocale, array $messages): string
{
    $lines = [
        '<?php',
        '',
        GENERATED_MARKER."{$name}.json during the dist resync.",
        "// Do not edit: contribute translations to alpineflow's locales/, or override keys in",
        "// lang/vendor/wireflow/{$laravelLocale}/canvas.php in your app.",
        '',
        'return [',
    ];

    foreach ($messages as $key => $value) {
        $lines[] = '    '.exportString((string) $key).' => '.exportString($value).',';
    }

    $lines[] = '];';

    return implode("\n", $lines)."\n";
}

if (! is_dir($sourceDirectory)) {
    fail("no catalog directory at {$sourceDirectory}");
}

$catalogs = glob($sourceDirectory.'/*.json') ?: [];
sort($catalogs);

if ($catalogs === []) {
    fail("no *.json catalogs in {$sourceDirectory}");
}

$generated = [];

foreach ($catalogs as $catalog) {
    $name = basename($catalog, '.json');
    $laravelLocale = str_replace('-', '_', $name);

    $messages = json_decode((string) file_get_contents($catalog), true);

    if (! is_array($messages) || (array_is_list($messages) && $messages !== [])) {
        fail("{$name}.json is not a JSON object of messages");
    }

    foreach ($messages as $key => $value) {
        if (! is_string($value)) {
            fail("{$name}.json: \"{$key}\" must be a string");
        }
    }

    $target = "{$langDirectory}/{$laravelLocale}/canvas.php";
    $contents = renderCatalog($name, $laravelLocale, $messages);

    if (! is_dir(dirname($target)) && ! mkdir(dirname($target), 0755, true)) {
        fail('cannot create '.dirname($target));
    }

    if (! is_file($target) || file_get_contents($target) !== $contents) {
        file_put_contents($target, $contents);
        echo "wrote {$target}\n";
    }

    $generated[] = realpath($target);
}

foreach (glob($langDirectory.'/*/canvas.php') ?: [] as $existing) {
    $isStale = ! in_array(realpath($existing), $generated, true);

    if ($isStale && str_contains((string) file_get_contents($existing), GENERATED_MARKER)) {
        unlink($existing);
        echo "removed {$existing}\n";
    }
}
