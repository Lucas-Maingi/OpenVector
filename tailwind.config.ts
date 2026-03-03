/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#0E1117',
                surface: '#161B22',
                'surface-2': '#1c2229',
                border: '#2A2F36',
                'border-bright': '#3a414a',
                accent: {
                    blue: '#3B82F6',
                    'blue-dim': '#1d4ed8',
                    'blue-glow': 'rgba(59,130,246,0.15)',
                    teal: '#0d9488',
                    'teal-dim': '#0f766e',
                },
                text: {
                    primary: '#f0f3f6',
                    secondary: '#8b949e',
                    muted: '#484f58',
                    accent: '#3B82F6',
                },
                status: {
                    active: '#238636',
                    warning: '#d29922',
                    danger: '#DC2626',
                    info: '#3B82F6',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
            },
            borderRadius: {
                DEFAULT: '8px',
                sm: '4px',
                md: '8px',
                lg: '12px',
            },
            boxShadow: {
                glow: '0 0 20px rgba(59,130,246,0.15)',
                'glow-teal': '0 0 20px rgba(13,148,136,0.15)',
                panel: '0 1px 3px rgba(0,0,0,0.5)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.2s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(8px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
