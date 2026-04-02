<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Inject AlpineFlow Assets
    |--------------------------------------------------------------------------
    |
    | WireFlow bundles AlpineFlow's JS and CSS. Set to false if you already
    | register AlpineFlow via npm/Vite in your application's build pipeline.
    | WireFlow's Blade components and trait still work — only the bundled
    | AlpineFlow asset injection is skipped.
    |
    */
    'inject_alpineflow' => env('WIREFLOW_INJECT_ALPINEFLOW', true),

    /*
    |--------------------------------------------------------------------------
    | AlpineFlow Theme CSS
    |--------------------------------------------------------------------------
    |
    | Which AlpineFlow theme to inject. 'default' includes the full theme.
    | 'flux' injects the Flux/Tailwind v4 native theme (requires Tailwind v4
    | CSS variables at :root). 'structural' injects only the minimal
    | positioning CSS (no visual styles). 'none' skips CSS injection entirely.
    |
    */
    'theme' => env('WIREFLOW_THEME', 'default'),  // 'default' | 'flux' | 'structural' | 'none'
];
