<button {{ $attributes->merge(['x-flow-condense' => 'node.id']) }}>
    {{ $slot }}
</button>
