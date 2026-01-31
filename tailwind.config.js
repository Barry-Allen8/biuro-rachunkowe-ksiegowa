/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./data/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Plus Jakarta Sans', 'sans-serif'],
            },
            boxShadow: {
                'studio': '0 10px 30px rgba(0,0,0,0.04)',
                'studio-hover': '0 20px 40px rgba(0,0,0,0.08)',
            },
            transitionTimingFunction: {
                'studio': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            transitionDuration: {
                 '2000': '2000ms',
            }
        },
    },
    plugins: [],
}
