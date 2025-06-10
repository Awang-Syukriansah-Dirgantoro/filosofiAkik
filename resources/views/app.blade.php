<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'dark') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- SEO Meta Tags --}}
    <meta name="description" content="Filosofi Akik - Your premier destination for high-quality jewelry, collectibles, and art gallery. Discover unique pieces that tell stories.">
    <meta name="keywords" content="jewelry, collectibles, art gallery, akik, filosofi, luxury items">
    <meta name="author" content="Filosofi Akik">
    <meta name="robots" content="index, follow">
    
    {{-- Open Graph / Facebook --}}
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ config('app.url') }}">
    <meta property="og:title" content="{{ config('app.name', 'Filosofi Akik') }}">
    <meta property="og:description" content="Filosofi Akik - Your premier destination for high-quality jewelry, collectibles, and art gallery. Discover unique pieces that tell stories.">
    <meta property="og:image" content="{{ config('app.url') }}/images/og-image.jpg">
    
    {{-- Twitter --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ config('app.url') }}">
    <meta name="twitter:title" content="{{ config('app.name', 'Filosofi Akik') }}">
    <meta name="twitter:description" content="Filosofi Akik - Your premier destination for high-quality jewelry, collectibles, and art gallery. Discover unique pieces that tell stories.">
    <meta name="twitter:image" content="{{ config('app.url') }}/images/og-image.jpg">
    
    {{-- Canonical URL --}}
    <link rel="canonical" href="{{ config('app.url') }}{{ request()->path() }}">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'dark' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            } else if (appearance === 'dark') {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    {{-- Favicon and App Icons --}}
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    
    {{-- Additional Icon Sizes --}}
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    
    {{-- Microsoft Tiles --}}
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0C0C0C">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased bg-[#0C0C0C]">
    @inertia
    <script>
        window.APP_URL = "{{ config('app.url') }}";
    </script>
</body>

</html>
