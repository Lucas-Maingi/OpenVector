"use client";

import { AletheiaLogo } from "@/components/AletheiaLogo";
import { format } from "date-fns";

export function DossierPrintHeader({ title, target }: { title: string, target: string }) {
  return (
    <div className="hidden print:block w-full border-b-2 border-slate-900 pb-6 mb-8 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-slate-900 rounded-lg">
            <AletheiaLogo className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-mono font-bold tracking-tighter text-slate-900 uppercase">
              Aletheia Intelligence Service
            </h1>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em]">
              Autonomous OSINT Collection & Analysis
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">Dossier ID</div>
          <div className="text-xs font-mono font-bold text-slate-900">
            AL-INT-{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 pt-4">
        <div>
          <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">Subject Title</div>
          <div className="text-sm font-bold text-slate-900 uppercase">{title}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">Primary Vector</div>
          <div className="text-sm font-mono font-bold text-slate-900">{target}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[9px] text-slate-400 font-mono uppercase mr-2">Classification:</span>
            <span className="text-[9px] font-bold text-slate-900 border border-slate-900 px-1.5 py-0.5 rounded">RESTRICTED</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-mono uppercase mr-2">Retention:</span>
            <span className="text-[9px] font-bold text-slate-900">60 DAYS</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 font-mono italic">
          Generated on: {format(new Date(), "yyyy-MM-dd HH:mm:ss")} UTC
        </div>
      </div>
    </div>
  );
}
