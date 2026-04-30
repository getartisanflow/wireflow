<?php

use ArtisanFlow\WireFlow\Concerns\WithSchemaDesigner;
use ArtisanFlow\WireFlow\Concerns\WithWireFlow;
use Livewire\Component;
use Livewire\Livewire;

class _TestSchemaComponent extends Component
{
    use WithSchemaDesigner;
    use WithWireFlow;

    public array $nodes = [];

    public array $edges = [];

    public function mount(): void
    {
        $this->nodes = [
            ['id' => 'user', 'position' => ['x' => 0, 'y' => 0], 'data' => ['label' => 'User', 'fields' => [
                ['name' => 'id', 'type' => 'uuid', 'key' => 'primary'],
                ['name' => 'team_id', 'type' => 'uuid', 'key' => 'foreign'],
                ['name' => 'email', 'type' => 'text'],
            ]]],
            ['id' => 'team', 'position' => ['x' => 200, 'y' => 0], 'data' => ['label' => 'Team', 'fields' => [
                ['name' => 'id', 'type' => 'uuid', 'key' => 'primary'],
            ]]],
        ];
        $this->edges = [
            ['id' => 'e-user-team', 'source' => 'user', 'sourceHandle' => 'team_id', 'target' => 'team', 'targetHandle' => 'id'],
        ];
    }

    public function render(): string
    {
        return '<div></div>';
    }
}

beforeEach(function () {
    Livewire::component('with-schema-designer-harness', _TestSchemaComponent::class);
});

it('addField appends + dispatches flow:update', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('addField', 'user', ['name' => 'avatar_url', 'type' => 'text']);
    $fields = collect($c->get('nodes'))->firstWhere('id', 'user')['data']['fields'];
    expect(collect($fields)->pluck('name'))->toContain('avatar_url');
    $c->assertDispatched('flow:update');
});

it('addField rejects duplicate names silently', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('addField', 'user', ['name' => 'email', 'type' => 'text']);
    $fields = collect($c->get('nodes'))->firstWhere('id', 'user')['data']['fields'];
    expect(collect($fields)->where('name', 'email')->count())->toBe(1);
});

it('addField rejects invalid names silently', function (string $bad) {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('addField', 'user', ['name' => $bad, 'type' => 'text']);
    $fields = collect($c->get('nodes'))->firstWhere('id', 'user')['data']['fields'];
    expect(collect($fields)->pluck('name'))->not->toContain($bad);
})->with(['1field', '_field', 'Field', 'a-field', 'email address']);

it('addField rejects unknown node silently', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('addField', 'nonexistent', ['name' => 'foo', 'type' => 'text']);
    // Nothing changed.
    $nodes = $c->get('nodes');
    expect(count($nodes))->toBe(2);
});

it('renameField updates field + rewrites edges + dispatches flow:fromObject', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('renameField', 'user', 'team_id', 'team_ref');

    $user = collect($c->get('nodes'))->firstWhere('id', 'user');
    $names = collect($user['data']['fields'])->pluck('name')->all();
    expect($names)->toContain('team_ref');
    expect($names)->not->toContain('team_id');

    $edge = collect($c->get('edges'))->firstWhere('id', 'e-user-team');
    expect($edge['sourceHandle'])->toBe('team_ref');

    $c->assertDispatched('flow:fromObject');
});

it('renameField rejects if new name already exists', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('renameField', 'user', 'team_id', 'email');

    $user = collect($c->get('nodes'))->firstWhere('id', 'user');
    $names = collect($user['data']['fields'])->pluck('name')->all();
    expect($names)->toContain('team_id'); // unchanged
});

it('renameField is a no-op when oldName === newName', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('renameField', 'user', 'email', 'email');
    $user = collect($c->get('nodes'))->firstWhere('id', 'user');
    $names = collect($user['data']['fields'])->pluck('name')->all();
    expect(collect($names)->filter(fn ($n) => $n === 'email')->count())->toBe(1);
});

it('renameField rejects invalid new names silently', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('renameField', 'user', 'team_id', 'Bad-Name');

    $user = collect($c->get('nodes'))->firstWhere('id', 'user');
    $names = collect($user['data']['fields'])->pluck('name')->all();
    expect($names)->toContain('team_id'); // unchanged
    expect($names)->not->toContain('Bad-Name');
});

it('removeField drops field + cascades edges + dispatches flow:update', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('removeField', 'user', 'team_id');

    $user = collect($c->get('nodes'))->firstWhere('id', 'user');
    expect(collect($user['data']['fields'])->pluck('name'))->not->toContain('team_id');

    $edges = $c->get('edges');
    expect(collect($edges)->pluck('id'))->not->toContain('e-user-team');
    $c->assertDispatched('flow:update');
});

it('removeField is a no-op when field does not exist', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('removeField', 'user', 'nonexistent');
    $user = collect($c->get('nodes'))->firstWhere('id', 'user');
    expect(count($user['data']['fields']))->toBe(3); // unchanged
});

it('removeNode drops node + cascades all touching edges + dispatches flow:fromObject', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('removeNode', 'team');

    $nodeIds = collect($c->get('nodes'))->pluck('id')->all();
    expect($nodeIds)->not->toContain('team');
    expect($c->get('edges'))->toBeEmpty(); // the one edge touched team
    $c->assertDispatched('flow:fromObject');
});

it('removeNode is a no-op when node does not exist', function () {
    $c = Livewire::test(_TestSchemaComponent::class);
    $c->call('removeNode', 'nonexistent');
    expect(count($c->get('nodes')))->toBe(2);
});
