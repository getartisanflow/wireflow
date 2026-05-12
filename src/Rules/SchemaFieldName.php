<?php

namespace ArtisanFlow\WireFlow\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Validates a schema field name:
 *   - Required string
 *   - Matches /^[a-z][a-z0-9_]*$/ (lowercase, starts with letter, underscores ok)
 *   - Max 40 characters
 *
 * Pairs with the @getartisanflow/alpineflow/schema addon's client-side
 * validator so server-side rejects match the client's expectations.
 */
class SchemaFieldName implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || $value === '') {
            $fail('The :attribute must be a non-empty string.');

            return;
        }

        if (strlen($value) > 40) {
            $fail('The :attribute must not exceed 40 characters.');

            return;
        }

        if (! preg_match('/^[a-z][a-z0-9_]*$/', $value)) {
            $fail('The :attribute must be lowercase, start with a letter, and contain only letters, digits, or underscores.');

            return;
        }
    }
}
