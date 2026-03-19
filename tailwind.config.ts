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
                background: '#020617', // Slate 950
                surface: '#0f172a', // Slate 900
                'surface-2': '#1e293b', // Slate 800
                border: '#1e293b', // Slate 800
                'border-bright': '#334155', // Slate 700
                accent: {
                    blue: '#8b5cf6', // Violet 500 (mapped to original 'blue' to prevent semantic breakages)
                    'blue-dim': '#6d28d9', // Violet 700
                    'blue-glow': 'rgba(139,92,246,0.15)',
                    teal: '#a3e635', // Lime 400 (mapped to original 'teal' used in landing)
                    'teal-dim': '#65a30d', // Lime 600
                },
                text: {
                    primary: '#f8fafc', // Slate 50
                    secondary: '#94a3b8', // Slate 400
                    muted: '#64748b', // Slate 500
                    accent: '#c084fc', // Purple 400
                },
                status: {
                    active: '#a3e635', // Lime 400
                    warning: '#fbbf24', // Amber 400
                    danger: '#ef4444', // Red 500
                    info: '#a855f7', // Purple 500
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
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
