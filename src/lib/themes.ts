"use client";

export interface Theme {
    id: string;
    name: string;
    description: string;
    colors: {
        background: string;
        surface: string;
        surfaceElevated: string;
        border: string;
        borderHover: string;
        textPrimary: string;
        textSecondary: string;
        textTertiary: string;
        accent: string;
        accentHover: string;
        success: string;
        warning: string;
        error: string;
    };
}

export const themes: Theme[] = [
    {
        id: "dark-slate",
        name: "Dark Slate",
        description: "Default enterprise dark theme",
        colors: {
            background: "#09090b",
            surface: "#18181b",
            surfaceElevated: "#27272a",
            border: "#3f3f46",
            borderHover: "#52525b",
            textPrimary: "#fafafa",
            textSecondary: "#a1a1aa",
            textTertiary: "#71717a",
            accent: "#3b82f6",
            accentHover: "#2563eb",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
        },
    },
    {
        id: "midnight",
        name: "Midnight Blue",
        description: "Deep blue professional theme",
        colors: {
            background: "#0a0e1a",
            surface: "#0f172a",
            surfaceElevated: "#1e293b",
            border: "#334155",
            borderHover: "#475569",
            textPrimary: "#f1f5f9",
            textSecondary: "#94a3b8",
            textTertiary: "#64748b",
            accent: "#0ea5e9",
            accentHover: "#0284c7",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
        },
    },
    {
        id: "carbon",
        name: "Carbon Black",
        description: "Pure black high-contrast theme",
        colors: {
            background: "#000000",
            surface: "#0a0a0a",
            surfaceElevated: "#171717",
            border: "#262626",
            borderHover: "#404040",
            textPrimary: "#ffffff",
            textSecondary: "#a3a3a3",
            textTertiary: "#737373",
            accent: "#6366f1",
            accentHover: "#4f46e5",
            success: "#22c55e",
            warning: "#eab308",
            error: "#f43f5e",
        },
    },
    {
        id: "forest",
        name: "Forest Green",
        description: "Subtle green enterprise theme",
        colors: {
            background: "#0a0f0a",
            surface: "#0f1410",
            surfaceElevated: "#1a1f1a",
            border: "#2d3a2d",
            borderHover: "#3d4a3d",
            textPrimary: "#f0f4f0",
            textSecondary: "#9ca99c",
            textTertiary: "#6b786b",
            accent: "#10b981",
            accentHover: "#059669",
            success: "#22c55e",
            warning: "#f59e0b",
            error: "#ef4444",
        },
    },
    {
        id: "obsidian",
        name: "Obsidian Purple",
        description: "Deep purple luxury theme",
        colors: {
            background: "#0d0a12",
            surface: "#1a1625",
            surfaceElevated: "#252033",
            border: "#3d3548",
            borderHover: "#4d4558",
            textPrimary: "#f5f3f7",
            textSecondary: "#a69cad",
            textTertiary: "#766d7d",
            accent: "#8b5cf6",
            accentHover: "#7c3aed",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
        },
    },
    {
        id: "light",
        name: "Light Professional",
        description: "Clean light theme for daytime",
        colors: {
            background: "#ffffff",
            surface: "#f9fafb",
            surfaceElevated: "#f3f4f6",
            border: "#e5e7eb",
            borderHover: "#d1d5db",
            textPrimary: "#111827",
            textSecondary: "#6b7280",
            textTertiary: "#9ca3af",
            accent: "#3b82f6",
            accentHover: "#2563eb",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
        },
    },
    {
        id: "cyberpunk",
        name: "Cyberpunk Neon",
        description: "High-contrast dark with neon accents",
        colors: {
            background: "#050511",
            surface: "#0d0a20",
            surfaceElevated: "#161033",
            border: "#291559",
            borderHover: "#42208c",
            textPrimary: "#fdf8ff",
            textSecondary: "#a899c9",
            textTertiary: "#71638f",
            accent: "#f0f",     // Neon Magenta
            accentHover: "#d0d",
            success: "#0ff",    // Neon Cyan
            warning: "#ff0",    // Neon Yellow
            error: "#f03",      // Neon Red
        },
    },
    {
        id: "solarized-light",
        name: "Solarized Light",
        description: "Warm, eye-friendly light reading theme",
        colors: {
            background: "#fdf6e3",
            surface: "#eee8d5",
            surfaceElevated: "#e5dec9",
            border: "#ccc4b0",
            borderHover: "#b5ae9a",
            textPrimary: "#657b83",
            textSecondary: "#839496",
            textTertiary: "#93a1a1",
            accent: "#268bd2",
            accentHover: "#2aa198",
            success: "#859900",
            warning: "#b58900",
            error: "#dc322f",
        },
    },
    {
        id: "solarized-dark",
        name: "Solarized Dark",
        description: "Warm, eye-friendly dark reading theme",
        colors: {
            background: "#002b36",
            surface: "#073642",
            surfaceElevated: "#094150",
            border: "#205665",
            borderHover: "#306a7a",
            textPrimary: "#839496",
            textSecondary: "#657b83",
            textTertiary: "#586e75",
            accent: "#2aa198",
            accentHover: "#268bd2",
            success: "#859900",
            warning: "#b58900",
            error: "#dc322f",
        },
    },
    {
        id: "oceanic",
        name: "Oceanic Deep",
        description: "Calm teal and deep blue water theme",
        colors: {
            background: "#081b26",
            surface: "#112633",
            surfaceElevated: "#183344",
            border: "#284b60",
            borderHover: "#3a627a",
            textPrimary: "#e0f2fe",
            textSecondary: "#7dd3fc",
            textTertiary: "#38bdf8",
            accent: "#0ea5e9",
            accentHover: "#0284c7",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
        },
    },
    {
        id: "sepia",
        name: "Sepia Comfort",
        description: "Reduced blue-light reading theme",
        colors: {
            background: "#f4ecd8",
            surface: "#e8dfc7",
            surfaceElevated: "#ddcdab",
            border: "#c3b08b",
            borderHover: "#ac956e",
            textPrimary: "#433422",
            textSecondary: "#735c3f",
            textTertiary: "#947b59",
            accent: "#c05621",
            accentHover: "#9c4221",
            success: "#38a169",
            warning: "#d69e2e",
            error: "#e53e3e",
        },
    },
];

export function applyTheme(theme: Theme) {
    if (typeof window === "undefined") return;
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([key, value]) => {
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVar, value);
    });

    localStorage.setItem("osint-theme", theme.id);
}

export function getStoredTheme(): Theme {
    if (typeof window === "undefined") return themes[0];
    const storedId = localStorage.getItem("osint-theme");
    return themes.find(t => t.id === storedId) || themes[0];
}
