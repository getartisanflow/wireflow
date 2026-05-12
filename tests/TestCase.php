<?php

namespace ArtisanFlow\WireFlow\Tests;

use ArtisanFlow\WireFlow\WireFlowServiceProvider;
use Livewire\LivewireServiceProvider;
use Orchestra\Testbench\TestCase as OrchestraTestCase;

class TestCase extends OrchestraTestCase
{
    protected function getPackageProviders($app): array
    {
        return [
            LivewireServiceProvider::class,
            WireFlowServiceProvider::class,
        ];
    }

    protected function getEnvironmentSetUp($app): void
    {
        // Livewire's view-encryption path requires an app key; without this,
        // Livewire::test() throws MissingAppKeyException when rendering.
        $app['config']->set('app.key', 'base64:'.base64_encode(random_bytes(32)));
    }
}
