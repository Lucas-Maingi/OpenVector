"use client";

import { Database } from "lucide-react";

export function CopyEvidenceButton({ content }: { content: string }) {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard.writeText(content);
                // Optional: You could add a small toast notification here
            }}
            className="p-1 hover:bg-white/10 rounded transition-colors text-text-tertiary hover:text-white"
            title="Copy intelligence snippet"
        >
            <Database className="w-3 h-3" />
        </button>
    );
}
