"use client";
import { BrainCircuit } from "lucide-react";
import { Theme } from "@/types";

interface GeneratingViewProps {
  theme: Theme;
  streamText: string;
}

function StreamPreview({ text, dark }: { text: string; dark: boolean }) {
  // Highlight ### headers
  const chunks = text.split(/^(### .+)$/m);
  return (
    <pre className={`whitespace-pre-wrap font-mono text-[13px] leading-7 break-words ${dark ? "text-slate-400" : "text-slate-600"}`}>
      {chunks.map((chunk, i) =>
        chunk.startsWith("### ") ? (
          <span key={i} className="text-indigo-400 font-semibold">{chunk}</span>
        ) : (
          <span key={i}>{chunk}</span>
        )
      )}
      <span className="inline-block w-0.5 h-4 bg-indigo-400 align-middle ml-0.5 animate-[blink_0.8s_step-end_infinite]" />
    </pre>
  );
}

export function GeneratingView({ theme, streamText }: GeneratingViewProps) {
  const dark = theme === "dark";

  return (
    <main className="max-w-screen-lg mx-auto px-6 py-10 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-xl font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
            Generating Requirements Document
          </h2>
          <p className={`text-sm mt-1 ${dark ? "text-slate-500" : "text-slate-400"}`}>
            AI is analyzing your business context and crafting structured output…
          </p>
        </div>
        <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Live Streaming
        </div>
      </div>

      {/* Stream box */}
      <div className={`rounded-xl border p-6 min-h-[440px] relative overflow-auto transition-colors
        ${dark ? "bg-slate-900/70 border-slate-800" : "bg-white border-slate-200"}`}>
        {streamText
          ? <StreamPreview text={streamText} dark={dark} />
          : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
                <div className="relative w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <BrainCircuit size={28} strokeWidth={1.5} className="text-indigo-400 animate-pulse" />
                </div>
              </div>
              <p className={`text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}>Waiting for OpenAI…</p>
            </div>
          )
        }
      </div>

      {/* Steps */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
        {["Parsing context","Identifying stakeholders","Mapping requirements","Evaluating tech stack","Assessing risks"].map((step, i) => {
          const wordsStreamed = streamText.split(" ").length;
          const threshold = i * 80;
          const done = wordsStreamed > threshold + 60;
          const active = wordsStreamed > threshold && !done;
          return (
            <div key={step} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border transition-all
              ${done
                ? dark ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-600"
                : active
                ? dark ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "bg-indigo-50 border-indigo-200 text-indigo-600"
                : dark ? "bg-slate-800/50 border-slate-700/50 text-slate-600" : "bg-slate-50 border-slate-200 text-slate-400"
              }`}>
              {done ? "✓ " : active ? "⟳ " : "· "}
              {step}
            </div>
          );
        })}
      </div>
    </main>
  );
}
