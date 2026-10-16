<?php

use Illuminate\Support\Facades\Blade;

/**
 * Laravel-style `:placeholder` names in a message, sorted.
 *
 * @return list<string>
 */
function componentPlaceholders(string $message): array
{
    preg_match_all('/:([A-Za-z_][A-Za-z0-9_]*)/', $message, $matches);

    $names = $matches[1];
    sort($names);

    return $names;
}

describe('under the de locale', function () {
    beforeEach(function () {
        app()->setLocale('de');
    });

    it('renders <x-flow-run-button> in German', function () {
        expect(Blade::render('<x-flow-run-button start-id="trigger" />'))
            ->toContain('>Workflow ausführen</span>')
            ->toContain('>Wird ausgeführt…</span>')
            ->not->toContain('Run workflow');
    });

    it('renders <x-flow-stop-button> in German', function () {
        expect(Blade::render('<x-flow-stop-button />'))
            ->toContain(' Stoppen ')
            ->not->toContain(' Stop ');
    });

    it('renders <x-flow-reset-button> in German', function () {
        expect(Blade::render('<x-flow-reset-button />'))
            ->toContain(' Zurücksetzen ')
            ->not->toContain(' Reset ');
    });

    it('renders <x-flow-replay-controls> in German, inside the Alpine expression too', function () {
        expect(Blade::render('<x-flow-replay-controls />'))
            ->toContain("x-text=\"isPlaying ? 'Pause' : 'Abspielen'\"")
            ->toContain('title="Abspielen / Pause"')
            ->toContain('title="Neu starten"')
            ->toContain('>Neu starten</button>');
    });

    it('renders <x-flow-execution-log> in German, leaving event-type labels technical', function () {
        expect(Blade::render('<x-flow-execution-log />'))
            ->toContain('>Ausführungsprotokoll</span>')
            ->toContain('<option value="all">Alle Ereignisse</option>')
            ->toContain('<option value="errors">Nur Fehler</option>')
            ->toContain('<option value="lifecycle">Nur Lebenszyklus</option>')
            ->toContain('>Noch keine Ereignisse. Führe den Workflow aus, um Aktivität zu sehen.</div>')
            ->toContain('<span>run:started</span>')
            ->not->toContain('Execution log');
    });

    it('still lets a slot override the translated label', function () {
        expect(Blade::render('<x-flow-stop-button>Halt</x-flow-stop-button>'))
            ->toContain('Halt')
            ->not->toContain('Stoppen');

        expect(Blade::render('<x-flow-run-button start-id="trigger">Los</x-flow-run-button>'))
            ->toContain('Los')
            ->not->toContain('Workflow ausführen');
    });
});

it('falls back to English for a locale without a components catalog', function () {
    app()->setLocale('fr');

    expect(Blade::render('<x-flow-reset-button />'))->toContain(' Reset ');
    expect(Blade::render('<x-flow-execution-log />'))->toContain('>Execution log</span>');
});

it('keeps every components catalog a string-only subset of English with matching placeholders', function () {
    $root = dirname(__DIR__, 2);
    $english = require $root.'/lang/en/components.php';
    $catalogs = glob($root.'/lang/*/components.php');

    expect($catalogs)->toContain($root.'/lang/en/components.php', $root.'/lang/de/components.php');

    foreach ($catalogs as $path) {
        $locale = basename(dirname($path));
        $messages = require $path;

        expect($messages)->toBeArray()
            ->and(array_keys(array_diff_key($messages, $english)))->toBe([], "lang/{$locale}/components.php has keys English doesn't");

        foreach ($messages as $key => $message) {
            expect($message)->toBeString("lang/{$locale}/components.php: {$key} must be a string")
                // Plurals are AlpineFlow's `_one`/`_other` keys, never Laravel's `|` syntax.
                ->and(str_contains($message, '|'))->toBeFalse("lang/{$locale}/components.php: {$key} uses Laravel's | plural syntax")
                ->and(componentPlaceholders($message))->toBe(
                    componentPlaceholders($english[$key]),
                    "lang/{$locale}/components.php: {$key} placeholders differ from English",
                );
        }
    }
});
