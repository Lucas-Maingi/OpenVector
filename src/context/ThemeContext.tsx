"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Theme, themes, applyTheme, getStoredTheme } from "../lib/themes";

interface ThemeContextType {
    currentTheme: Theme;
    setTheme: (theme: Theme) => void;
    themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

    useEffect(() => {
        const stored = getStoredTheme();
        setCurrentTheme(stored);
        applyTheme(stored);
    }, []);

    const setTheme = (theme: Theme) => {
        setCurrentTheme(theme);
        applyTheme(theme);
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}
