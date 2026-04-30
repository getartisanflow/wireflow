<div
    x-data="flowReplayControls({
        handleExpr: @js($handle),
        target: @js($target),
    })"
    x-init="init()"
    class="flow-replay-controls"
    {{ $attributes }}
>
    <button
        type="button"
        class="flow-replay-button flow-replay-button--primary"
        x-bind:disabled="!hasPlayableSource"
        x-on:click="onPlayPause()"
        x-text="isPlaying ? 'Pause' : 'Play'"
        title="Play / Pause"
    ></button>

    <button
        type="button"
        class="flow-replay-button"
        x-bind:disabled="!hasPlayableSource"
        x-on:click="onRestart()"
        title="Restart"
    >Restart</button>

    <select
        class="flow-replay-speed"
        x-model.number="speed"
        x-on:change="onSpeedChange()"
    >
        @foreach($speeds as $s)
            <option value="{{ $s }}">{{ $s }}×</option>
        @endforeach
    </select>

    <template x-if="hasPlayableSource">
        <div class="flow-replay-progress-wrap">
            <template x-if="canScrub">
                <div
                    class="flow-replay-scrubber"
                    role="slider"
                    tabindex="0"
                    x-on:pointerdown="onScrubStart($event)"
                    x-on:pointermove.window="onScrubMove($event)"
                    x-on:pointerup.window="onScrubEnd($event)"
                >
                    <div class="flow-replay-scrubber-fill" x-bind:style="`width: ${progressPercent}%`"></div>
                    <div class="flow-replay-scrubber-thumb" x-bind:style="`left: ${progressPercent}%`"></div>
                </div>
            </template>
            <template x-if="!canScrub">
                <div class="flow-replay-progress">
                    <div class="flow-replay-progress-fill" x-bind:style="`width: ${progressPercent}%`"></div>
                </div>
            </template>
            <span class="flow-replay-time" x-text="formatTime(currentTimeMs) + ' / ' + formatTime(durationMs)"></span>
        </div>
    </template>
</div>
