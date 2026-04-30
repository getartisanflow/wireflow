<?php

namespace ArtisanFlow\WireFlow\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Validates a schema edge array shape:
 *   - Must be an array
 *   - Required: source (string), target (string)
 *   - Optional: id (string), sourceHandle, targetHandle, label (all strings when present)
 */
class SchemaEdgeShape implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_array($value)) {
            $fail('The :attribute must be an array.');

            return;
        }

        foreach (['source', 'target'] as $required) {
            if (! isset($value[$required]) || ! is_string($value[$required]) || $value[$required] === '') {
                $fail("The :attribute must include a non-empty '{$required}'.");

                return;
            }
        }

        foreach (['id', 'sourceHandle', 'targetHandle', 'label'] as $optional) {
            if (array_key_exists($optional, $value) && $value[$optional] !== null && ! is_string($value[$optional])) {
                $fail("The :attribute '{$optional}' must be a string when present.");

                return;
            }
        }
    }
}
