/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './resources/views/*.php',
        './resources/ts/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        fontSize: {
            sm: '0.6rem',
            base: '0.8rem',
            xl: '1rem',
            '2xl': '1.25rem',
            '3xl': '1.563rem',
            '4xl': '1.953rem',
            '5xl': '2.441rem',
        },
    },
};

