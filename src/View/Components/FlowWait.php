<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-flow-wait> — WireFlow wrapper around AlpineFlow's x-flow-wait directive.
 * Used inside an <x-flow> component's :node slot or nodeTypes map to render
 * wait-style nodes (delay, cooldown, etc.) with a formatted duration.
 *
 * When used outside an <x-flow> (e.g. for standalone previews), pass explicit
 * label + duration props; the component renders an SSR fallback so the node
 * looks right before JS initializes.
 */
class FlowWait extends Component
{
    public function __construct(
        /** Optional — only used for SSR fallback when rendered outside <x-flow>. */
        public ?string $label = null,

        /** Optional — only used for SSR fallback. Duration in milliseconds. */
        public ?int $durationMs = null,

        /** Optional — single character or icon class for SSR fallback. Rendered as text. */
        public ?string $icon = null,
    ) {}

    public function render(): View
    {
        return view('wireflow::components.flow-wait');
    }

    /**
     * Format a duration in milliseconds into a compact human-readable string.
     * Mirrors the formatWaitDuration() helper in alpineflow's flow-wait directive.
     */
    public static function formatDuration(int $ms): string
    {
        if ($ms < 0) {
            return '';
        }
        if ($ms < 1000) {
            return $ms.'ms';
        }
        if ($ms < 60_000) {
            $seconds = $ms / 1000;
            if ($ms % 1000 === 0) {
                return ((int) $seconds).'s';
            }

            return number_format($seconds, 1).'s';
        }
        $minutes = intdiv($ms, 60_000);
        $seconds = intdiv($ms % 60_000, 1000);

        return $seconds === 0 ? $minutes.'m' : $minutes.'m '.$seconds.'s';
    }
}
