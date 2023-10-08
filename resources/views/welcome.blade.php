<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Blog</title>
</head>
<body class='w-[100vw] h-[100vh] bg-background'>
<div id='root' class='flex flex-col w-full h-full overflow-x-hidden'></div>

@vitereactrefresh
@vite(['resources/ts/main.tsx'])
</body>
</html>
