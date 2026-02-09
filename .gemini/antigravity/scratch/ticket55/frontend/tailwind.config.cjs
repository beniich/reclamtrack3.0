/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './src/app/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
        './src/pages/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#2424eb",
                "background-light": "#f6f6f8",
                "background-dark": "#111121",
                "status-new": "#2424eb",
                "status-progress": "#f59e0b",
                "status-resolved": "#10b981",
                "status-urgent": "#ef4444",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "sans": ["Inter", "sans-serif"]
            },
            borderRadius: {
                'DEFAULT': '0.5rem',
                'lg': '1rem',
                'xl': '1.5rem',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        }
    },
    plugins: []
};
