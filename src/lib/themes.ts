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
        id: "onyx-dark",
        name: "Onyx Dark",
        description: "Premium high-contrast dark mode",
        colors: {
            background: "#020617",
            surface: "#0f172a",
            surfaceElevated: "#1e293b",
            border: "#334155",
            borderHover: "#475569",
            textPrimary: "#f8fafc",
            textSecondary: "#94a3b8",
            textTertiary: "#64748b",
            accent: "#0ea5e9", // Vibrant Azure
            accentHover: "#38bdf8",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
        },
    },
    {
        id: "pearl-light",
        name: "Pearl Light",
        description: "Ultra-clean high-contrast theme",
        colors: {
            background: "#ffffff",
            surface: "#f8fafc",
            surfaceElevated: "#f1f5f9",
            border: "#e2e8f0",
            borderHover: "#cbd5e1",
            textPrimary: "#0f172a",
            textSecondary: "#475569",
            textTertiary: "#94a3b8",
            accent: "#2563eb", // Royal Blue
            accentHover: "#1d4ed8",
            success: "#059669",
            warning: "#d97706",
            error: "#dc2626",
        },
    },
    {
        id: "royal-blue",
        name: "Royal Blue",
        description: "Deep oceanic blue with gold accents",
        colors: {
            background: "#0c1a3a", // Deep Navy
            surface: "#11224d",
            surfaceElevated: "#1a2e63",
            border: "#253b7a",
            borderHover: "#3a4f8c",
            textPrimary: "#f0f7ff",
            textSecondary: "#a5b4fc",
            textTertiary: "#6366f1",
            accent: "#fbbf24", // Premium Gold
            accentHover: "#f59e0b",
            success: "#34d399",
            warning: "#fbbf24",
            error: "#f87171",
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
