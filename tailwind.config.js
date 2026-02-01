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
                // Restrained depth shadows - not floating, grounded
                'studio': '0 4px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03)',
                'studio-hover': '0 6px 20px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.04)',
                'depth-sm': '0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
                'depth-md': '0 4px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03)',
                'depth-lg': '0 8px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)',
                'elevated': '0 12px 32px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.05)',
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
