<button {{ $attributes->merge([$directive => 'node.id']) }}>
    {{ $slot }}
</button>
