<div
    {{ $attributes->merge([$directive => $id ? "'{$id}'" : '']) }}
    @if($hidden) style="display:none" @endif
></div>
