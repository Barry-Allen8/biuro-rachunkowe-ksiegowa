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
            colors: {
                // Premium Navy Blue palette
                navy: {
                    50: '#f0f4f8',
                    100: '#d9e2ec',
                    200: '#bcccdc',
                    300: '#9fb3c8',
                    400: '#829ab1',
                    500: '#627d98',
                    600: '#486581',
                    700: '#334e68',
                    800: '#243b53',
                    900: '#1a2b3c',
                    950: '#102a43',
                },
                // Professional Gold accents
                gold: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#c9a227',
                    600: '#a68523',
                    700: '#856a1f',
                    800: '#634f1c',
                    900: '#423518',
                },
                // Professional Green (trust/security)
                emerald: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                },
            },
            fontFamily: {
                sans: ['Lato', 'Inter', 'sans-serif'],
                display: ['Montserrat', 'Plus Jakarta Sans', 'sans-serif'],
            },
            boxShadow: {
                // Premium depth shadows
                'studio': '0 4px 16px rgba(26,43,60,0.08), 0 2px 4px rgba(26,43,60,0.04)',
                'studio-hover': '0 8px 24px rgba(26,43,60,0.12), 0 4px 8px rgba(26,43,60,0.06)',
                'depth-sm': '0 2px 8px rgba(26,43,60,0.05), 0 1px 2px rgba(26,43,60,0.03)',
                'depth-md': '0 4px 16px rgba(26,43,60,0.08), 0 2px 4px rgba(26,43,60,0.04)',
                'depth-lg': '0 8px 24px rgba(26,43,60,0.10), 0 4px 8px rgba(26,43,60,0.05)',
                'elevated': '0 12px 40px rgba(26,43,60,0.15), 0 6px 12px rgba(26,43,60,0.08)',
                'gold': '0 4px 20px rgba(201,162,39,0.25)',
                'card': '0 1px 3px rgba(26,43,60,0.06), 0 1px 2px rgba(26,43,60,0.04)',
                'card-hover': '0 10px 40px rgba(26,43,60,0.12), 0 4px 12px rgba(26,43,60,0.08)',
            },
            transitionTimingFunction: {
                'studio': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            transitionDuration: {
                '2000': '2000ms',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-pattern': 'linear-gradient(135deg, #1a2b3c 0%, #243b53 50%, #334e68 100%)',
                'gold-gradient': 'linear-gradient(135deg, #c9a227 0%, #fbbf24 100%)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
