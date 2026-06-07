<?php

namespace ArtisanFlow\WireFlow\Enums;

/**
 * Valid `show` values shared by <x-flow-toolbar> and <x-flow-edge-toolbar>:
 * `selected` (visible only when the node/edge is selected) or `always`.
 */
enum ToolbarShow: string
{
    case Selected = 'selected';
    case Always = 'always';
}
