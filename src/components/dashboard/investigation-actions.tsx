"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Trash2, RefreshCw, X, Loader2, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Investigation {
    id: string;
    title: string;
    description?: string | null;
    subjectName?: string | null;
    subjectUsername?: string | null;
    subjectEmail?: string | null;
    subjectPhone?: string | null;
    subjectDomain?: string | null;
    subjectImageUrl?: string | null;
}

export function InvestigationActions({ investigation }: { investigation: Investigation }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: investigation.title,
        description: investigation.description || "",
        subjectName: investigation.subjectName || "",
        subjectUsername: investigation.subjectUsername || "",
        subjectEmail: investigation.subjectEmail || "",
        subjectPhone: investigation.subjectPhone || "",
        subjectDomain: investigation.subjectDomain || "",
        subjectImageUrl: investigation.subjectImageUrl || "",
    });
    const router = useRouter();

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch(`/api/investigations/${investigation.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setEditing(false);
            router.refresh();
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await fetch(`/api/investigations/${investigation.id}`, { method: "DELETE" });
            router.push("/dashboard/investigations");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            {/* 3-dot menu using Radix UI for perfect z-index and click-outside handling */}
            <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 px-2 data-[state=open]:bg-white/5"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>

                {/* z-[100] to ensure it sits above all other elements */}
                <DropdownMenuContent align="end" className="w-48 bg-[#0a0a0a] border-white/10 shadow-2xl z-[100] p-1 rounded-xl">
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            setEditing(true);
                        }}
                        className="cursor-pointer gap-3 text-white/80 focus:text-white focus:bg-white/10 p-2.5 rounded-lg"
                    >
                        <Pencil className="w-4 h-4 text-accent" />
                        Edit Investigation
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            router.push(`/dashboard/investigations/${investigation.id}?scanning=1`);
                            window.location.reload();
                        }}
                        className="cursor-pointer gap-3 text-white/80 focus:text-white focus:bg-white/10 p-2.5 rounded-lg"
                    >
                        <RefreshCw className="w-4 h-4 text-green-400" />
                        Re-run Scan
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            window.print();
                        }}
                        className="cursor-pointer gap-3 text-white/80 focus:text-white focus:bg-white/10 p-2.5 rounded-lg"
                    >
                        <FileText className="w-4 h-4 text-accent-blue" />
                        Intelligence Report (PDF)
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-white/10 my-1" />

                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            if (confirm("Delete this investigation and all its data?")) handleDelete();
                        }}
                        className="cursor-pointer gap-3 text-red-400 focus:text-red-300 focus:bg-red-500/10 p-2.5 rounded-lg"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Edit Modal */}
            <Dialog open={editing} onOpenChange={setEditing}>
                <DialogContent className="w-full max-w-xl bg-surface border-white/10 p-0 shadow-2xl [&>button]:hidden">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-surface">
                        <DialogTitle className="text-base font-semibold text-white flex items-center gap-2">
                            <Pencil className="w-4 h-4 text-accent" />
                            Edit Investigation
                        </DialogTitle>
                        <button onClick={() => setEditing(false)} className="text-white/40 hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto bg-surface">
                        <EditField label="Title *" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
                        <EditField label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} textarea />
                        <div className="grid grid-cols-2 gap-3">
                            <EditField label="Full Name" value={form.subjectName} onChange={v => setForm(f => ({ ...f, subjectName: v }))} />
                            <EditField label="Username" value={form.subjectUsername} onChange={v => setForm(f => ({ ...f, subjectUsername: v }))} />
                            <EditField label="Email" value={form.subjectEmail} onChange={v => setForm(f => ({ ...f, subjectEmail: v }))} type="email" />
                            <EditField label="Phone" value={form.subjectPhone} onChange={v => setForm(f => ({ ...f, subjectPhone: v }))} />
                            <EditField label="Domain" value={form.subjectDomain} onChange={v => setForm(f => ({ ...f, subjectDomain: v }))} />
                            <EditField label="Image URL" value={form.subjectImageUrl} onChange={v => setForm(f => ({ ...f, subjectImageUrl: v }))} />
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10 bg-surface">
                        <Button variant="ghost" onClick={() => setEditing(false)} disabled={saving}>Cancel</Button>
                        <Button variant="primary" onClick={handleSave} disabled={saving || !form.title.trim()}>
                            {saving ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />Saving...</> : <><Save className="w-3.5 h-3.5 mr-2" />Save Changes</>}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

function EditField({ label, value, onChange, textarea, type = "text" }: {
    label: string; value: string; onChange: (v: string) => void; textarea?: boolean; type?: string;
}) {
    const cls = "w-full bg-white/5 border border-white/20 hover:border-white/35 focus:border-accent focus:ring-2 focus:ring-accent/25 rounded-lg px-4 py-2.5 text-sm text-white/90 placeholder:text-white/40 outline-none transition-all";
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/70 uppercase tracking-widest">{label}</label>
            {textarea
                ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={2} className={`${cls} resize-none`} />
                : <input type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} />
            }
        </div>
    );
}
