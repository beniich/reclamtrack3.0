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
                // User Custom Palette (Orange & Violet)
                pumpkin: 'var(--pumpkin-spice)',
                harvest: 'var(--harvest-orange)',
                princeton: 'var(--princeton-orange)',
                saffron: 'var(--deep-saffron)',
                amber: 'var(--amber-glow)',
                amethyst: 'var(--dark-amethyst)',
                indigoInk: 'var(--indigo-ink)',
                indigoVelvet: 'var(--indigo-velvet)',
                royal: 'var(--royal-violet)',
                lavender: 'var(--lavender-purple)',

                // Brand colors
                primary: {
                    DEFAULT: 'var(--pumpkin-spice)',
                    50: '#fff7ed',
                    100: '#ffedd5',
                    500: 'var(--pumpkin-spice)',
                    600: 'var(--harvest-orange)',
                    700: 'var(--princeton-orange)',
                },
                brand: {
                    orange: 'var(--pumpkin-spice)',
                    deepBlue: 'var(--dark-amethyst)',
                    midnight: 'var(--indigo-ink)',
                },
                "background-light": "#f8f6f6",
                "background-dark": "var(--dark-amethyst)",
                "surface-dark": "var(--indigo-ink)",
                "border-dark": "var(--indigo-velvet)",
                "accent-red": "#fa6238",
                "accent-green": "#0bda5e",
                "accent-orange": "var(--pumpkin-spice)",
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
                input: 'hsl(var(--input) / <alpha-value>)',
                ring: 'hsl(var(--ring) / <alpha-value>)',

                // MecanicPro Palette
                mp: {
                    "tertiary-fixed-dim": "#c4c6cf",
                    "outline": "#9f8e7a",
                    "on-primary-container": "#644000",
                    "inverse-primary": "#835500",
                    "surface-container-lowest": "#0c0e12",
                    "surface-bright": "#37393e",
                    "on-secondary-container": "#4d1900",
                    "on-background": "#e2e2e8",
                    "background": "#111318",
                    "on-primary": "#452b00",
                    "error": "#ffb4ab",
                    "secondary-fixed-dim": "#ffb596",
                    "on-tertiary-fixed": "#191c22",
                    "surface-container-low": "#1a1c20",
                    "surface-container": "#1e2024",
                    "inverse-surface": "#e2e2e8",
                    "on-primary-fixed": "#291800",
                    "tertiary-fixed": "#e0e2eb",
                    "surface-container-high": "#282a2e",
                    "surface": "#111318",
                    "primary-fixed": "#ffddb4",
                    "surface-container-highest": "#333539",
                    "on-secondary-fixed-variant": "#7c2e00",
                    "on-surface": "#e2e2e8",
                    "outline-variant": "#524534",
                    "primary-fixed-dim": "#ffb955",
                    "on-secondary": "#581e00",
                    "tertiary": "#d0d2db",
                    "surface-variant": "#333539",
                    "on-tertiary-container": "#45474f",
                    "on-surface-variant": "#d7c3ae",
                    "primary": "#ffc880",
                    "surface-dim": "#111318",
                    "secondary-fixed": "#ffdbcd",
                    "on-error": "#690005",
                    "on-tertiary": "#2d3037",
                    "secondary": "#ffb596",
                    "on-tertiary-fixed-variant": "#44474e",
                    "tertiary-container": "#b4b6bf",
                    "on-secondary-fixed": "#360f00",
                    "on-error-container": "#ffdad6",
                    "inverse-on-surface": "#2f3035",
                    "secondary-container": "#f26411",
                    "primary-container": "#f5a623",
                    "surface-tint": "#ffb955",
                    "error-container": "#93000a",
                    "on-primary-fixed-variant": "#633f00"
                }
            },
            fontFamily: {
                sans: ['Cornella', 'var(--font-inter)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
                display: ["Makien", "Sora", "var(--font-inter)", "sans-serif"],
                headline: ["Bebas Neue", "sans-serif"],
                technical: ["JetBrains Mono", "monospace"],
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

