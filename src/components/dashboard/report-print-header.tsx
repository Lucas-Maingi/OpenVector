"use client";

import { AletheiaLogo } from "@/components/AletheiaLogo";
import { format } from "date-fns";

export function ReportPrintHeader({ title, target }: { title: string, target: string }) {
  return (
    <div className="hidden print:block w-full border-b-2 border-slate-950 pb-6 mb-8 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-slate-950 rounded-lg">
            <AletheiaLogo className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-slate-950 uppercase transition-colors">
              Aletheia Professional Reports
            </h1>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              Digital Investigation & Asset Analysis
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-600 font-bold uppercase mb-1">Report ID</div>
          <div className="text-xs font-bold text-slate-950">
            AL-RPT-{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 pt-4">
        <div>
          <div className="text-[10px] text-slate-600 font-bold uppercase mb-1">Subject Description</div>
          <div className="text-sm font-bold text-slate-950 uppercase">{title}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-600 font-bold uppercase mb-1">Investigation Vector</div>
          <div className="text-sm font-bold text-slate-950">{target}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[9px] text-slate-500 font-bold uppercase mr-2">Sensitivity:</span>
            <span className="text-[9px] font-bold text-slate-950 border border-slate-950 px-1.5 py-0.5 rounded">CONFIDENTIAL</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-500 font-bold uppercase mr-2">Retention:</span>
            <span className="text-[9px] font-bold text-slate-950">60 DAYS</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-600 italic">
          Generated on: {format(new Date(), "yyyy-MM-dd HH:mm:ss")} UTC
        </div>
      </div>
    </div>
  );
}
