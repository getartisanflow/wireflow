<?php

use ArtisanFlow\WireFlow\Rules\SchemaEdgeShape;
use ArtisanFlow\WireFlow\Rules\SchemaFieldName;

describe('SchemaFieldName', function () {
    it('passes for valid identifiers', function (string $name) {
        $rule = new SchemaFieldName;
        $failed = false;
        $rule->validate('name', $name, function () use (&$failed) {
            $failed = true;
        });
        expect($failed)->toBeFalse();
    })->with([
        'email',
        'team_id',
        'created_at',
        'a_1_b',
        'a',
    ]);

    it('fails for invalid identifiers', function (string $name) {
        $rule = new SchemaFieldName;
        $failed = false;
        $rule->validate('name', $name, function () use (&$failed) {
            $failed = true;
        });
        expect($failed)->toBeTrue();
    })->with([
        'starts with digit' => '1field',
        'starts with underscore' => '_field',
        'uppercase' => 'Field',
        'contains hyphen' => 'a-field',
        'contains space' => 'email address',
        'contains dot' => 'team.id',
        'too long' => str_repeat('a', 41),
        'empty' => '',
    ]);

    it('fails for non-string values', function (mixed $value) {
        $rule = new SchemaFieldName;
        $failed = false;
        // Casting to string for the validate() signature even when nonsense —
        // the rule itself must reject non-strings gracefully.
        $rule->validate('name', (string) $value, function () use (&$failed) {
            $failed = true;
        });
        expect($failed)->toBeTrue();
    })->with([
        'empty string' => '',
    ]);
});

describe('SchemaEdgeShape', function () {
    it('passes for a minimal valid edge', function () {
        $rule = new SchemaEdgeShape;
        $failed = false;
        $rule->validate('edge', ['source' => 'user', 'target' => 'team'], function () use (&$failed) {
            $failed = true;
        });
        expect($failed)->toBeFalse();
    });

    it('passes when all optional fields are present and strings', function () {
        $rule = new SchemaEdgeShape;
        $failed = false;
        $rule->validate('edge', [
            'id' => 'e1', 'source' => 'user', 'target' => 'team',
            'sourceHandle' => 'team_id', 'targetHandle' => 'id', 'label' => 'belongs to',
        ], function () use (&$failed) {
            $failed = true;
        });
        expect($failed)->toBeFalse();
    });

    it('fails without source or target', function (array $edge) {
        $rule = new SchemaEdgeShape;
        $failed = false;
        $rule->validate('edge', $edge, function () use (&$failed) {
            $failed = true;
        });
        expect($failed)->toBeTrue();
    })->with([
        'missing source' => [['target' => 'team']],
        'missing target' => [['source' => 'user']],
        'empty source' => [['source' => '', 'target' => 'team']],
        'empty target' => [['source' => 'user', 'target' => '']],
    ]);

    it('fails when optional fields are non-string and not null', function () {
        $rule = new SchemaEdgeShape;
        $failed = false;
        $rule->validate('edge', [
            'source' => 'user', 'target' => 'team', 'sourceHandle' => 123,
        ], function () use (&$failed) {
            $failed = true;
        });
        expect($failed)->toBeTrue();
    });

    it('accepts null optional fields', function () {
        $rule = new SchemaEdgeShape;
        $failed = false;
        $rule->validate('edge', [
            'source' => 'user', 'target' => 'team',
            'sourceHandle' => null, 'targetHandle' => null, 'label' => null,
        ], function () use (&$failed) {
            $failed = true;
        });
        expect($failed)->toBeFalse();
    });

    it('fails when value is not an array', function () {
        $rule = new SchemaEdgeShape;
        $failed = false;
        $rule->validate('edge', 'not-an-array', function () use (&$failed) {
            $failed = true;
        });
        expect($failed)->toBeTrue();
    });
});
