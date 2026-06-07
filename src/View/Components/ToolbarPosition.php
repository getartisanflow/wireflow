<?php

namespace ArtisanFlow\WireFlow\View\Components;

/**
 * Valid `position` values for <x-flow-toolbar> — maps to the alpineflow
 * x-flow-node-toolbar directive's side modifier.
 */
enum ToolbarPosition: string
{
    case Top = 'top';
    case Bottom = 'bottom';
    case Left = 'left';
    case Right = 'right';
}
