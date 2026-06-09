"use client";
import { useState, useCallback } from "react";
import { Copy, Check, Download, RefreshCw, AlertTriangle } from "lucide-react";
import { ParsedSection, Theme } from "@/types";
import { SectionCard } from "./SectionCard";
import { Sidebar } from "./Sidebar";

interface ResultsViewProps {
  theme: Theme;
  sections: ParsedSection[];
  rawDocument: string;
  generatedAt: Date | null;
  wordCount: number;
  error: string | null;
  onReset: () => void;
}

export function ResultsView({ theme, sections, rawDocument, generatedAt, wordCount, error, onReset }: ResultsViewProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const dark = theme === "dark";

  const handleCopy = () => {
    navigator.clipboard.writeText(rawDocument).then(() => {
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2200);
    });
  };

  const handlePDF = async () => {
    setPdfLoading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 48;
      const contentW = pageW - margin * 2;
      let y = margin;

      const checkPage = (needed: number) => {
        if (y + needed > pageH - margin) { pdf.addPage(); y = margin; }
      };

      // Document title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(30, 30, 60);
      pdf.text("Requirements Document", margin, y);
      y += 32;

      if (generatedAt) {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(140, 140, 160);
        pdf.text(generatedAt.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }), margin, y);
        y += 20;
      }

      // Divider
      pdf.setDrawColor(220, 220, 235);
      pdf.setLineWidth(0.75);
      pdf.line(margin, y, pageW - margin, y);
      y += 24;

      for (const section of sections) {
        checkPage(60);

        // Section title
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);
        pdf.setTextColor(60, 60, 120);
        pdf.text(section.title, margin, y);
        y += 18;

        // Section content
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(55, 55, 70);

        const lines = section.content.split("\n");
        for (const line of lines) {
          const trimmed = line.trimStart();
          const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("• ");
          const indent = isBullet ? margin + 10 : margin;
          const text = isBullet ? "• " + trimmed.slice(2).trim() : trimmed;
          if (!text) { y += 6; continue; }
          const wrapped = pdf.splitTextToSize(text, contentW - (isBullet ? 10 : 0));
          for (const wline of wrapped) {
            checkPage(14);
            pdf.text(wline, indent, y);
            y += 14;
          }
        }
        y += 16;

        // Section separator
        checkPage(12);
        pdf.setDrawColor(235, 235, 245);
        pdf.setLineWidth(0.4);
        pdf.line(margin, y, pageW - margin, y);
        y += 16;
      }

      pdf.save("requirements-document.pdf");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleSelectSection = useCallback((title: string) => {
    setActiveSection(title);
    const el = document.getElementById(`sec-${title.replace(/\s+/g, "-")}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const dateStr = generatedAt?.toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-20 sm:pb-24">
      {/* Top bar */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <h2 className={`text-lg sm:text-xl font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
            Requirements Document
          </h2>
          {!error && (
            <>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border"
                style={{ color: "#10b981", borderColor: "rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.08)" }}>
                <Check size={11} strokeWidth={2.5} />
                Generated
              </div>
              {dateStr && (
                <span className={`hidden sm:inline text-xs font-mono ${dark ? "text-slate-600" : "text-slate-400"}`}>
                  {dateStr}
                </span>
              )}
            </>
          )}
        </div>

        {!error && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button onClick={handleCopy}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all
                ${dark ? "border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800" : "border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}>
              {copyState === "copied" ? <Check size={13} /> : <Copy size={13} />}
              {copyState === "copied" ? "Copied!" : "Copy Markdown"}
            </button>
            <button onClick={handlePDF}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 transition-all shadow-[0_2px_12px_rgba(99,102,241,0.3)]">
              {pdfLoading
                ? <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                : <Download size={13} />}
              Export PDF
            </button>
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 flex gap-4 items-start mb-8">
          <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-red-400" />
          </div>
          <div>
            <p className="font-semibold text-red-400 mb-1">Generation Failed</p>
            <p className={`text-sm font-mono mb-4 ${dark ? "text-slate-500" : "text-slate-400"}`}>{error}</p>
            <button onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
              <RefreshCw size={13} />
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Stat strip */}
      {!error && sections.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { label: `${sections.length} Sections` },
            { label: "AI Generated" },
            { label: "Enterprise Grade" },
            { label: `${wordCount.toLocaleString()} words` },
            { label: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
          ].map((c) => (
            <div key={c.label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border
                ${dark ? "bg-slate-900/60 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {c.label}
            </div>
          ))}
        </div>
      )}

      {/* Mobile section nav (visible below lg) */}
      {!error && sections.length > 0 && (
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {sections.map((sec) => (
            <button
              key={sec.title}
              onClick={() => handleSelectSection(sec.title)}
              type="button"
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border whitespace-nowrap transition-all"
              style={{
                color: activeSection === sec.title ? "#fff" : sec.accent,
                borderColor: `${sec.accent}40`,
                background: activeSection === sec.title ? sec.accent : `${sec.accent}12`,
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>
      )}

      {/* Layout */}
      {!error && sections.length > 0 && (
        <div className="flex gap-6 items-start">
          {/* Sidebar (hidden on mobile) */}
          <div className="hidden lg:block">
            <Sidebar
              sections={sections}
              active={activeSection}
              theme={theme}
              onSelect={handleSelectSection}
            />
          </div>

          {/* Cards */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {sections.map((sec, i) => (
              <SectionCard key={sec.title} section={sec} index={i} theme={theme} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
