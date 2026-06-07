<?php

namespace ArtisanFlow\WireFlow\Concerns;

use BackedEnum;
use InvalidArgumentException;

trait ValidatesEnumProps
{
    /**
     * Throw an InvalidArgumentException when $value is not a valid case of the
     * given backed enum, naming the prop and listing the allowed values.
     *
     * @param  class-string<BackedEnum>  $enum
     */
    private static function validateEnum(string $enum, string $value, string $prop): void
    {
        if ($enum::tryFrom($value) === null) {
            throw new InvalidArgumentException(sprintf(
                "Invalid %s '%s'. Valid: %s.",
                $prop,
                $value,
                implode(', ', array_map(static fn (BackedEnum $case): string => $case->value, $enum::cases())),
            ));
        }
    }
}
