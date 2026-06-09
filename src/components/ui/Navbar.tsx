"use client";
import { BrainCircuit, Sun, Moon, RefreshCw } from "lucide-react";
import { Theme, AIModel } from "@/types";
import { getModelConfig } from "@/lib/models";

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  showReset?: boolean;
  onReset?: () => void;
  selectedModel?: AIModel;
}

export function Navbar({ theme, onToggleTheme, showReset, onReset, selectedModel = "gpt-5-mini" }: NavbarProps) {
  const dark = theme === "dark";
  const model = getModelConfig(selectedModel);

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        background: dark ? "rgba(6,10,20,0.92)" : "rgba(248,250,252,0.92)",
        borderColor: dark ? "#1e293b" : "#e2e8f0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <BrainCircuit size={16} strokeWidth={1.5} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-[15px] font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
              ReqAI
            </span>
            <span className={`text-[10px] font-medium uppercase tracking-widest ${dark ? "text-slate-500" : "text-slate-400"}`}>
              Enterprise Studio
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Dynamic model badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wide transition-all duration-300"
            style={{
              color: model.accent,
              borderColor: `${model.accent}30`,
              background: `${model.accent}10`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: model.accent }}
            />
            {model.name}
          </div>

          {showReset && (
            <button
              type="button"
              onClick={onReset}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all
                ${dark
                  ? "border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800"
                  : "border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100"
                }`}
            >
              <RefreshCw size={13} />
              <span className="hidden sm:inline">New Analysis</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all
              ${dark
                ? "border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
                : "border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
