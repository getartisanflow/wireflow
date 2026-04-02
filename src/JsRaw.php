<?php

namespace ArtisanFlow\WireFlow;

class JsRaw
{
    public function __construct(public readonly string $expression) {}

    public function __toString(): string
    {
        return $this->expression;
    }
}
