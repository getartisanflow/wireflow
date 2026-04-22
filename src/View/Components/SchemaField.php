<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-schema-field> — composable schema-row primitive.
 *
 * Renders ONE row of a schema node — left target handle, field name, optional
 * icon, type pill, right source handle, plus mirror handles for geometry-aware
 * edge routing and `x-flow-row-select` wiring. Designed to be used inside a
 * consumer's own `<x-slot:node>` template with an `x-for` loop over fields.
 *
 * Reads `node` and `field` from the surrounding Alpine scope. Consumer is
 * responsible for providing both — typically `node` via `<x-flow-node="node">`
 * and `field` via `<template x-for="field in node.data.fields">`.
 *
 * Attributes and slot:
 * - `{{ $attributes }}` forwards to the root `.flow-schema-row` div (class merge)
 * - `{{ $slot }}` replaces the default row body (icon + name + type) when supplied.
 *   Handles + mirror handles are ALWAYS stamped regardless of slot content, since
 *   they're part of the row's edge-routing contract.
 */
class SchemaField extends Component
{
    public function render(): View
    {
        return view('wireflow::components.schema-field');
    }
}
