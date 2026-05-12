---
title: x-flow-replay-controls
description: Duck-typed playback toolbar for AlpineFlow replay handles — Play/Pause/Restart/Speed plus capability-detected scrubber or progress bar.
order: 16
---

# x-flow-replay-controls

Duck-typed playback toolbar that drives any AlpineFlow replay handle — `$flow.replay()` (animation) and `$flow.replayExecution()` (workflow) both work without ceremony. Auto-binds to `$flow.lastReplayHandle` when present, otherwise lazy-builds `$flow.replayExecution($flow.executionLog)` on the first Play click.

```blade
<x-flow :nodes="$nodes" :edges="$edges">
    <x-flow-panel position="bottom-center">
        <x-flow-replay-controls />
    </x-flow-panel>
</x-flow>
```

Page-level placement via `:target`:

```blade
<x-flow id="mycanvas" :nodes="$nodes" :edges="$edges" />

<aside class="sidebar">
    <x-flow-replay-controls target="#mycanvas" />
</aside>
```

## Props

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `handle` | string | no | Alpine expression naming a property on the canvas that holds an explicit handle (otherwise auto-binds). |
| `target` | string | no | CSS selector for the canvas when used outside it. |
| `speeds` | array | no | Speed multipliers in the dropdown. Defaults to `[0.5, 1, 2, 4]`. |

## Capability detection

Once a handle is bound, the component inspects it once:

| Handle exposes | Component renders |
| --- | --- |
| `scrubTo()` | Interactive scrubber + time readout |
| `currentTime` + `duration` (no scrub) | Non-interactive progress bar + time readout |
| Neither | Progress bar derived from log timestamps + elapsed wall clock |

The Play / Restart / Speed controls render in all cases; the progress wrap is gated on `hasPlayableSource` (a handle exists OR the executionLog is non-empty).

## Restart behaviour

Restart calls `handle.stop()`, drops the bound reference, and rebuilds via the auto-bind path before resuming play — so the same component works whether the underlying replay system supports rewind or not.

## Speed changes

If the handle exposes a writable `speed` property, the dropdown updates it live. Workflow handles without a writable speed pick up the new value on the next Restart.
