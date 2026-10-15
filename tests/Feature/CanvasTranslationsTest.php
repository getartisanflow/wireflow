<?php

use ArtisanFlow\WireFlow\View\Components\WireFlow;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Js;

/**
 * Decode the flowCanvas() config from a rendered canvas whose x-data went through
 * Js::from() — `flowCanvas(JSON.parse('…'))`, or `Object.assign(JSON.parse('…'), …)`
 * in sync mode.
 *
 * @return array<string, mixed>
 */
function renderedCanvasConfig(string $html): array
{
    expect(preg_match("/x-data=\"flowCanvas\\((?:Object\\.assign\\()?JSON\\.parse\\('(.*?)'\\)/s", $html, $match))
        ->toBe(1, 'No JSON.parse(…) canvas config found in the rendered HTML.');

    $json = json_decode('"'.$match[1].'"', flags: JSON_THROW_ON_ERROR);

    return json_decode($json, true, flags: JSON_THROW_ON_ERROR);
}

/**
 * @return array<string, string>
 */
function canvasCatalog(string $locale): array
{
    return require dirname(__DIR__, 2)."/lang/{$locale}/canvas.php";
}

it('passes the German catalog and locale when the app locale is de', function () {
    app()->setLocale('de');

    $config = renderedCanvasConfig(Blade::render('<x-flow />'));

    expect($config['translations']['controls.zoomIn'])->toBe('Vergrößern')
        ->and($config['translations'])->toBe(canvasCatalog('de'))
        ->and($config['locale'])->toBe('de');
});

it('passes the English catalog and locale by default', function () {
    $config = renderedCanvasConfig(Blade::render('<x-flow />'));

    expect($config['translations'])->toBe(canvasCatalog('en'))
        ->and($config['translations']['controls.zoomIn'])->toBe('Zoom in')
        ->and($config['locale'])->toBe('en');
});

it('falls back to the English catalog for a locale without one, keeping the app locale', function () {
    app()->setLocale('pt_BR');

    $config = renderedCanvasConfig(Blade::render('<x-flow />'));

    expect($config['translations'])->toBe(canvasCatalog('en'))
        ->and($config['locale'])->toBe('pt_BR');
});

it('lets explicit translations and locale props override the defaults', function () {
    app()->setLocale('de');

    $config = renderedCanvasConfig(Blade::render(
        '<x-flow :translations="[\'controls.zoomIn\' => \'Hineinzoomen\']" locale="de-AT" />'
    ));

    expect($config['translations'])->toBe(['controls.zoomIn' => 'Hineinzoomen'])
        ->and($config['locale'])->toBe('de-AT');
});

it('lets the config passthrough override the translations and locale props', function () {
    $config = renderedCanvasConfig(Blade::render(<<<'BLADE'
        <x-flow
            :translations="['controls.zoomIn' => 'From the prop']"
            locale="fr"
            :config="['translations' => ['controls.zoomIn' => 'From config'], 'locale' => 'it']"
        />
        BLADE));

    expect($config['translations'])->toBe(['controls.zoomIn' => 'From config'])
        ->and($config['locale'])->toBe('it');
});

it('lets the config passthrough override the app-locale defaults', function () {
    app()->setLocale('de');

    $config = renderedCanvasConfig(Blade::render('<x-flow :config="[\'locale\' => \'de-CH\']" />'));

    expect($config['translations'])->toBe(canvasCatalog('de'))
        ->and($config['locale'])->toBe('de-CH');
});

it('adds neither key when translations are disabled', function () {
    config(['wireflow.translations' => false]);
    app()->setLocale('de');

    $html = Blade::render('<x-flow :controls="true" />');
    $config = renderedCanvasConfig($html);

    expect($config)->not->toHaveKey('translations')
        ->and($config)->not->toHaveKey('locale')
        ->and(array_keys($config))->toBe([
            'background', 'controls', 'pannable', 'zoomable', 'edgesReconnectable', 'nodes', 'edges', 'viewport',
        ]);
});

it('renders the same x-data as before translations existed when they are disabled', function () {
    config(['wireflow.translations' => false]);

    $component = new WireFlow(controls: true);
    $component->withAttributes([]);

    expect($component->xData(false))->toBe('flowCanvas('.Js::from([
        'background' => 'dots',
        'controls' => true,
        'pannable' => true,
        'zoomable' => true,
        'edgesReconnectable' => true,
        'nodes' => [],
        'edges' => [],
        'viewport' => ['x' => 0, 'y' => 0, 'zoom' => 1],
    ]).')');
});

it('still honours explicit props when translations are disabled', function () {
    config(['wireflow.translations' => false]);

    $config = renderedCanvasConfig(Blade::render(
        '<x-flow :translations="[\'controls.zoomIn\' => \'Hineinzoomen\']" locale="de" />'
    ));

    expect($config['translations'])->toBe(['controls.zoomIn' => 'Hineinzoomen'])
        ->and($config['locale'])->toBe('de');
});

it('merges keys an app overrides in lang/vendor/wireflow over the shipped catalog', function () {
    $vendorLang = lang_path('vendor');
    $hadVendorLang = is_dir($vendorLang);

    File::ensureDirectoryExists(lang_path('vendor/wireflow/de'));
    File::put(
        lang_path('vendor/wireflow/de/canvas.php'),
        "<?php\n\nreturn ['controls.zoomIn' => 'Näher heran'];\n",
    );

    try {
        app()->setLocale('de');

        $config = renderedCanvasConfig(Blade::render('<x-flow />'));

        expect($config['translations']['controls.zoomIn'])->toBe('Näher heran')
            ->and($config['translations']['controls.zoomOut'])->toBe(canvasCatalog('de')['controls.zoomOut'])
            ->and($config['translations'])->toHaveCount(count(canvasCatalog('de')));
    } finally {
        File::deleteDirectory($hadVendorLang ? lang_path('vendor/wireflow') : $vendorLang);
    }
});

it('keeps umlauts and placeholders intact through JSON encoding', function () {
    app()->setLocale('de');

    $config = renderedCanvasConfig(Blade::render('<x-flow />'));

    expect($config['translations']['controls.enterFullscreen'])->toBe('Vollbild öffnen')
        ->and($config['translations']['a11y.nodeLabel'])->toBe('Knoten: :label')
        ->and($config['translations']['announce.nodesAdded_other'])->toBe(canvasCatalog('de')['announce.nodesAdded_other'])
        ->and($config['translations']['announce.nodesAdded_other'])->toContain(':count');
});

it('keeps umlauts and placeholders intact through the raw-JS encoding path', function () {
    app()->setLocale('de');

    // @connect-validate injects a raw JS function, which switches x-data to the
    // json_encode + htmlspecialchars path instead of Js::from().
    $html = Blade::render('<x-flow @connect-validate="check" />');

    expect(preg_match('/x-data="(flowCanvas\(.*?)"\s/s', $html, $match))->toBe(1);

    $expression = html_entity_decode($match[1], ENT_QUOTES, 'UTF-8');

    expect($expression)
        ->toContain('"controls.enterFullscreen":"Vollbild öffnen"')
        ->toContain('"a11y.nodeLabel":"Knoten: :label"')
        ->toContain('"locale":"de"');
});

it('keeps a locale wire:key on the canvas container, so a locale switch replaces the canvas', function () {
    app()->setLocale('de');

    $html = Blade::render('<x-flow wire:key="flow-{{ app()->getLocale() }}" />');

    expect($html)->toContain('wire:key="flow-de"')
        ->and(renderedCanvasConfig($html)['locale'])->toBe('de');
});

it('forwards translations and locale through <x-schema-designer>', function () {
    $config = renderedCanvasConfig(Blade::render(
        '<x-schema-designer :translations="[\'schema.inspector.add\' => \'Ajouter\']" locale="fr" />'
    ));

    expect($config['translations'])->toBe(['schema.inspector.add' => 'Ajouter'])
        ->and($config['locale'])->toBe('fr');
});

it('gives <x-schema-designer> the app-locale catalog by default', function () {
    app()->setLocale('de');

    $config = renderedCanvasConfig(Blade::render('<x-schema-designer />'));

    expect($config['translations'])->toBe(canvasCatalog('de'))
        ->and($config['locale'])->toBe('de');
});
