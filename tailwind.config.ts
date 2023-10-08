/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './resources/views/*.php',
        './resources/ts/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'qanelas': 'Qanelas',
                sans: [
                    '"Qanelas", sans-serif',
                    {
                        fontFeatureSettings: '"cv11", "ss01"',
                        fontVariationSettings: '"opsz" 32',
                    },
                ],
            },
        },
        fontSize: {
            xs: '0.4rem',
            sm: '0.6rem',
            base: '0.8rem',
            xl: '1rem',
            '2xl': '1.25rem',
            '3xl': '1.563rem',
            '4xl': '1.953rem',
            '5xl': '2.441rem',
        },
        colors: {
            white: '#ffffff',
            green: '#28AD72',
            black: '#090913',
            shadow: '#CACACA',
            gray: '#E4E4E4',
            background: '#FAFAFA',
        },
    },
};

