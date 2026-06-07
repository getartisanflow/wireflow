<?php

namespace ArtisanFlow\WireFlow\Enums;

/**
 * Valid `align` values for <x-flow-toolbar>. Flow-relative (not physical):
 * `start`/`end` adapt to the toolbar's axis. Matches the alpineflow
 * x-flow-node-toolbar directive's `.start` / `.center` / `.end` modifiers.
 */
enum ToolbarAlign: string
{
    case Center = 'center';
    case Start = 'start';
    case End = 'end';
}
