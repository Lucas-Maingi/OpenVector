"use client";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { Search, FileText, Target, Database, TrendingUp, Settings, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  category: string;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const commands: CommandItem[] = [
    {
      id: "new-investigation",
      label: "New Investigation",
      icon: Target,
      action: () => navigate("/investigations?new=true"),
      category: "Actions",
      keywords: ["create", "start", "begin"]
    },
    {
      id: "search-investigations",
      label: "Search Investigations",
      icon: Search,
      action: () => navigate("/investigations"),
      category: "Navigation",
    },
    {
      id: "threat-intel",
      label: "Threat Intelligence",
      icon: Database,
      action: () => navigate("/intelligence"),
      category: "Navigation",
    },
    {
      id: "analytics",
      label: "Analytics Dashboard",
      icon: TrendingUp,
      action: () => navigate("/analytics"),
      category: "Navigation",
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      action: () => navigate("/reports"),
      category: "Navigation",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      action: () => navigate("/settings"),
      category: "Navigation",
    },
  ];

  const filteredCommands = query
    ? commands.filter((cmd) => {
        const searchText = `${cmd.label} ${cmd.keywords?.join(" ") || ""}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      })
    : commands;

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const executeCommand = (cmd: CommandItem) => {
    cmd.action();
    setOpen(false);
    setQuery("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Command Palette */}
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-lg shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 text-text-primary placeholder-text-tertiary focus:outline-none text-sm"
            autoFocus
          />
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-surface-elevated rounded text-xs text-text-tertiary font-mono">
            <Command className="w-3 h-3" />K
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-96 overflow-y-auto">
          {Object.entries(groupedCommands).map(([category, items]) => (
            <div key={category}>
              <div className="px-4 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider bg-background">
                {category}
              </div>
              {items.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-elevated text-left transition-colors"
                  >
                    <Icon className="w-4 h-4 text-text-tertiary" />
                    <span className="text-sm text-text-primary">{cmd.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-background text-xs text-text-tertiary">
          <span>Navigate with ↑↓ keys</span>
          <span>Enter to select • Esc to close</span>
        </div>
      </div>
    </div>
  );
}
