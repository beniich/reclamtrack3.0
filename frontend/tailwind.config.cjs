/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './app/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Brand colors
                primary: {
                    DEFAULT: '#FF6B00',
                    50: '#fff7ed',
                    100: '#ffedd5',
                    500: '#FF6B00',
                    600: '#E66100',
                    700: '#CC5600',
                },
                brand: {
                    orange: '#FF6B00',
                    deepBlue: '#0A0E17',
                    midnight: '#020617',
                },
                "background-light": "#f8f6f6",
                "background-dark": "#020617",
                "surface-dark": "#0A0E17",
                "border-dark": "#1E293B",
                "accent-red": "#fa6238",
                "accent-green": "#0bda5e",
                "accent-orange": "#FF6B00",
                "danger": "#ef4444",
                "success": "#22c55e",
                "warning": "#f59e0b",
                // ... rest of semantic colors
                success: {
                    DEFAULT: 'var(--color-success)',
                    light: 'var(--color-success-light)',
                    dark: 'var(--color-success-dark)',
                },
                warning: {
                    DEFAULT: 'var(--color-warning)',
                    light: 'var(--color-warning-light)',
                    dark: 'var(--color-warning-dark)',
                },
                error: {
                    DEFAULT: 'var(--color-error)',
                    light: 'var(--color-error-light)',
                    dark: 'var(--color-error-dark)',
                },
                info: {
                    DEFAULT: 'var(--color-info)',
                    light: 'var(--color-info-light)',
                    dark: 'var(--color-info-dark)',
                },
                // Status colors
                status: {
                    new: 'var(--status-new)',
                    assigned: 'var(--status-assigned)',
                    progress: 'var(--status-progress)',
                    resolved: 'var(--status-resolved)',
                    closed: 'var(--status-closed)',
                    urgent: 'var(--status-urgent)',
                },
                // Background & foreground
                background: 'hsl(var(--background) / <alpha-value>)',
                foreground: 'hsl(var(--foreground) / <alpha-value>)',
                // Card
                card: {
                    DEFAULT: 'hsl(var(--card) / <alpha-value>)',
                    foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
                },
                // Popover
                popover: {
                    DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
                    foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
                },
                // Muted
                muted: {
                    DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
                    foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
                },
                // Accent
                accent: {
                    DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
                    foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
                },
                // Border & input
                border: 'hsl(var(--border) / <alpha-value>)',
                input: 'hsl(var(--input) / <alpha-value>)',
                ring: 'hsl(var(--ring) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
                display: ["Sora", "Inter", "sans-serif"],
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                DEFAULT: 'var(--radius)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
            },
            boxShadow: {
                sm: 'var(--shadow-sm)',
                DEFAULT: 'var(--shadow)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                xl: 'var(--shadow-xl)',
            },
            transitionDuration: {
                fast: 'var(--transition-fast)',
                DEFAULT: 'var(--transition-base)',
                slow: 'var(--transition-slow)',
            },
            animation: {
                'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-in-left': 'slideInFromLeft 0.5s ease-out',
                'slide-in-right': 'slideInFromRight 0.5s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideInFromLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-2rem)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInFromRight: {
                    '0%': { opacity: '0', transform: 'translateX(2rem)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
        }
    },
    plugins: []
};

