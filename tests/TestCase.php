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
}
