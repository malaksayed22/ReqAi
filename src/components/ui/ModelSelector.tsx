"use client";
import { useRef, useState, useEffect } from "react";
import { Zap, Sparkles, Crown, Check, ChevronDown } from "lucide-react";
import { AIModel, Theme } from "@/types";
import { MODEL_CONFIGS, getModelConfig } from "@/lib/models";

const ICONS = { zap: Zap, sparkles: Sparkles, crown: Crown } as const;

interface ModelSelectorProps {
  theme: Theme;
  selected: AIModel;
  onChange: (model: AIModel) => void;
}

export function ModelSelector({ theme, selected, onChange }: ModelSelectorProps) {
  const dark = theme === "dark";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = getModelConfig(selected);
  const CurrentIcon = ICONS[current.iconKey];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer outline-none"
        style={{
          color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
          background: open
            ? dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"
            : "transparent",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = dark
            ? "rgba(255,255,255,0.07)"
            : "rgba(0,0,0,0.06)";
        }}
        onMouseLeave={(e) => {
          if (!open)
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        <CurrentIcon size={12} style={{ color: current.accent }} />
        <span>{current.name}</span>
        <ChevronDown
          size={11}
          className="transition-transform duration-150"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          className="absolute bottom-full mb-1.5 right-0 z-50 rounded-xl overflow-hidden py-1 min-w-50"
          style={{
            background: dark ? "#1e1e2e" : "#ffffff",
            border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)",
            boxShadow: dark
              ? "0 8px 32px rgba(0,0,0,0.6)"
              : "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          {MODEL_CONFIGS.map((m) => {
            const Icon = ICONS[m.iconKey];
            const isSelected = selected === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => { onChange(m.id); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left transition-colors cursor-pointer outline-none"
                style={{
                  background: isSelected
                    ? dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
                    : "transparent",
                  color: dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = dark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = isSelected
                    ? dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
                    : "transparent";
                }}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `${m.accent}20` }}
                >
                  <Icon size={12} style={{ color: m.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                    {m.name}
                    {m.recommended && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white leading-none"
                        style={{ background: m.accent }}
                      >
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)" }}>
                    {m.tagline}
                  </div>
                </div>
                {isSelected && (
                  <Check size={13} className="shrink-0" style={{ color: m.accent }} strokeWidth={2.5} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
