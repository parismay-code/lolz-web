<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Blog</title>
</head>
<body class='w-[100vw] h-[100vh] overflow-hidden'>
<div id='root' class='flex flex-col w-full h-full'></div>

@vitereactrefresh
@vite(['resources/ts/main.tsx'])
</body>
</html>
