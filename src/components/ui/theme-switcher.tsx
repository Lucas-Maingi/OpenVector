"use client";
import { Palette, Check } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/theme-context";
import { cn } from "@/lib/utils";

export function ThemeSwitcher({ align = "bottom" }: { align?: "top" | "bottom" }) {
  const { currentTheme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:bg-surface-elevated hover:text-text-primary transition-all duration-200"
        title="Change theme"
      >
        <Palette className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">{currentTheme.name}</span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Theme Dropdown */}
          <div className={cn(
            "absolute right-0 w-80 bg-surface border border-border rounded-lg shadow-2xl z-50 overflow-hidden animate-scale-in",
            align === "top" ? "bottom-full mb-2" : "top-full mt-2"
          )}>
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-text-primary mb-1">Theme</h3>
              <p className="text-xs text-text-tertiary">Choose your preferred color scheme</p>
            </div>

            <div className="p-2 max-h-96 overflow-y-auto">
              {themes.map((theme) => {
                const isActive = theme.id === currentTheme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-lg transition-all duration-200 group",
                      isActive
                        ? "bg-surface-elevated"
                        : "hover:bg-surface-elevated"
                    )}
                  >
                    {/* Color Preview */}
                    <div className="flex gap-1 mt-1">
                      <div
                        className="w-3 h-3 rounded-sm shadow-sm transform group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: theme.colors.background }}
                      />
                      <div
                        className="w-3 h-3 rounded-sm shadow-sm transform group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                      <div
                        className="w-3 h-3 rounded-sm shadow-sm transform group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: theme.colors.success }}
                      />
                    </div>

                    {/* Theme Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-text-primary">
                          {theme.name}
                        </span>
                        {isActive && (
                          <Check className="w-4 h-4 text-accent animate-scale-in" />
                        )}
                      </div>
                      <p className="text-xs text-text-tertiary">
                        {theme.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
