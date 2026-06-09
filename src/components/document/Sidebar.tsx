"use client";
import { ParsedSection } from "@/types";

interface SidebarProps {
  sections: ParsedSection[];
  active: string | null;
  theme: "dark" | "light";
  onSelect: (title: string) => void;
}

export function Sidebar({ sections, active, theme, onSelect }: SidebarProps) {
  const dark = theme === "dark";

  return (
    <aside
      className="w-52 flex-shrink-0 rounded-xl border p-2 sticky top-20 self-start"
      style={{
        background: dark ? "rgba(15,23,42,0.7)" : "#ffffff",
        borderColor: dark ? "#1e293b" : "#e2e8f0",
      }}
    >
      <p className={`text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-2 ${dark ? "text-slate-600" : "text-slate-400"}`}>
        Contents
      </p>
      <nav className="flex flex-col gap-0.5">
        {sections.map((sec) => {
          const isActive = active === sec.title;
          return (
            <button
              key={sec.title}
              onClick={() => onSelect(sec.title)}
              className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all
                ${isActive
                  ? dark ? "bg-indigo-500/10 text-indigo-300" : "bg-indigo-50 text-indigo-700"
                  : dark ? "text-slate-500 hover:bg-slate-800 hover:text-slate-300" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0 transition-transform"
                style={{ background: sec.accent, transform: isActive ? "scale(1.3)" : "scale(1)" }}
              />
              {sec.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
