"use client";
import { useState } from "react";
import { Sparkles, ArrowRight, Layers, Zap, Shield, Download, AlertCircle, ChevronRight } from "lucide-react";
import { Theme, AIModel } from "@/types";
import { EXAMPLES } from "@/lib/sections";
import { ModelSelector } from "@/components/ui/ModelSelector";

interface InputViewProps {
  theme: Theme;
  onGenerate: (text: string) => void;
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
  loading?: boolean;
}

export function InputView({ theme, onGenerate, selectedModel, onModelChange, loading }: InputViewProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const dark = theme === "dark";

  const handleSubmit = () => {
    if (!text.trim()) { setError("Please describe your business challenge."); return; }
    setError("");
    onGenerate(text.trim());
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit();
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 pb-24">
      {/* Hero badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-7 border"
        style={{
          color: dark ? "#a5b4fc" : "#4f46e5",
          borderColor: dark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.25)",
          background: dark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.06)",
        }}>
        <Sparkles size={11} />
        AI-Powered IT Consulting
      </div>

      {/* Heading */}
      <h1 className={`text-4xl sm:text-[52px] font-extrabold tracking-tight leading-[1.05] mb-5 ${dark ? "text-white" : "text-slate-900"}`}>
        Business Problem
        <br />
        <span className="bg-gradient-to-br from-indigo-400 to-violet-500 bg-clip-text text-transparent">
          → IT Blueprint.
        </span>
      </h1>

      <p className={`text-[17px] leading-relaxed mb-10 max-w-lg ${dark ? "text-slate-400" : "text-slate-500"}`}>
        Describe your challenge in plain language. ReqAI generates a complete, executive-ready requirements document with functional specs, tech stack, timeline, and risk flags — in seconds.
      </p>

      {/* Quick-fill chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs self-center mr-1 ${dark ? "text-slate-500" : "text-slate-400"}`}>Try an example:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => { setText(ex.text); setError(""); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
              ${dark
                ? "bg-slate-800/60 border-slate-700 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-indigo-500/5"
                : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
              }`}
          >
            <ChevronRight size={11} />
            {ex.label}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <div className="relative mb-2">
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); if (e.target.value) setError(""); }}
          onKeyDown={handleKey}
          placeholder="e.g. We need to modernize our legacy HR system. It currently runs on a 15-year-old on-premise Oracle database with no API layer. We need it cloud-native, integrated with Active Directory, and accessible via mobile for 2,000 employees across 8 countries..."
          rows={7}
          className={`w-full rounded-xl px-5 py-4 pb-10 text-sm leading-relaxed resize-none outline-none transition-all border font-sans
            ${dark
              ? "bg-slate-900/80 border-slate-700 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
            }`}
        />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none">
          {text && (
            <span className={`text-[11px] font-mono ${dark ? "text-slate-600" : "text-slate-400"}`}>
              {text.length} chars
            </span>
          )}
          <div className="ml-auto pointer-events-auto">
            <ModelSelector theme={theme} selected={selectedModel} onChange={onModelChange} />
          </div>
        </div>
      </div>

      {/* Validation */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-xs mb-3">
          <AlertCircle size={13} />
          {error}
        </div>
      )}

      {/* Hint */}
      <p className={`text-xs mb-6 ${dark ? "text-slate-600" : "text-slate-400"}`}>
        Tip: Press <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${dark ? "border-slate-700 bg-slate-800 text-slate-400" : "border-slate-200 bg-slate-100 text-slate-500"}`}>Ctrl+Enter</kbd> to generate
      </p>

      {/* CTA */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.45)] hover:-translate-y-0.5 active:translate-y-0"
      >
        <Sparkles size={15} />
        Generate Requirements Document
        <ArrowRight size={15} />
      </button>

      {/* Trust row */}
      <div className={`flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-7 border-t text-xs ${dark ? "border-slate-800 text-slate-600" : "border-slate-100 text-slate-400"}`}>
        {[
          [Layers, "9 Structured Sections"],
          [Zap, "Live Streaming Response"],
          [Download, "Export PDF & Markdown"],
          [Shield, "Enterprise-Grade Output"],
        ].map(([Ic, label]) => {
          const IconComp = Ic as React.ComponentType<{ size: number }>;
          return (
            <span key={label as string} className="flex items-center gap-1.5">
              <IconComp size={12} />
              {label as string}
            </span>
          );
        })}
      </div>
    </main>
  );
}
