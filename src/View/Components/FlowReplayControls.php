<?php

namespace ArtisanFlow\WireFlow\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * <x-flow-replay-controls> — duck-typed playback toolbar around AlpineFlow's
 * replay handles. Auto-binds to `$flow.lastReplayHandle` if present, otherwise
 * lazy-builds `$flow.replayExecution($flow.executionLog)` on first Play click.
 *
 * Renders Play/Pause, Restart, and a Speed dropdown. When the bound handle
 * exposes a `scrubTo()` method, an interactive scrubber appears; when it
 * exposes `currentTime`/`duration` without scrub, a non-interactive progress
 * bar appears; otherwise progress is derived from log timestamps + elapsed
 * wall clock.
 */
class FlowReplayControls extends Component
{
    public function __construct(
        /** Optional Alpine expression naming a property on the canvas that holds an explicit handle. */
        public ?string $handle = null,

        /** Optional canvas selector for page-level placement. */
        public ?string $target = null,

        /**
         * Speed multipliers shown in the dropdown.
         *
         * @var array<int, float|int>
         */
        public array $speeds = [0.5, 1, 2, 4],
    ) {}

    public function render(): View
    {
        return view('wireflow::components.flow-replay-controls');
    }
}
